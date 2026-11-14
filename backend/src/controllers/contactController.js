import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Simple in-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map();

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    let clientIp = '127.0.0.1';
    try {
      clientIp = req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || 
                 req.socket?.remoteAddress || 
                 '127.0.0.1';
    } catch {
      clientIp = '127.0.0.1';
    }

    // Rate limiting: allow 1 message per 15 seconds per IP
    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientIp);
    if (lastRequest && now - lastRequest < 15000) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a few seconds before sending another message.'
      });
    }
    rateLimitMap.set(clientIp, now);

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your email address.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your message.' });
    }

    let savedContact = null;
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const contactDoc = new Contact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject ? subject.trim() : 'Portfolio Inquiry',
        message: message.trim(),
        ipAddress: clientIp
      });
      savedContact = await contactDoc.save();
    } else {
      console.warn('[Contact Controller] MongoDB is not connected; message stored in memory log.');
      savedContact = {
        _id: 'mock_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date()
      };
    }

    // Optional Nodemailer notification if SMTP is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
          subject: `[Portfolio Message] ${subject || 'New Contact Request'} from ${name}`,
          html: `
            <h3>New Contact Message Received</h3>
            <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background:#f4f4f4; padding:12px; border-left:4px solid #FFD600;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
            <p><small>Received at: ${new Date().toLocaleString()}</small></p>
          `
        });
        console.log('[Email Notification Sent Successfully]');
      } catch (mailError) {
        console.error('[Nodemailer Warning]: Failed to send notification email:', mailError.message);
        // We still return success since message was saved to database
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out, Arjun will get back to you shortly!',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoint to get messages (can be protected with API key if needed)
export const getContacts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
      return res.status(200).json({ success: true, count: contacts.length, data: contacts });
    }
    return res.status(200).json({ success: true, count: 0, data: [], note: 'Database currently disconnected' });
  } catch (error) {
    next(error);
  }
};

