import React from 'react';

export default function SkillIcon({ name, className = "w-12 h-12" }) {
  switch (name) {
    case 'JavaScript':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect width="100" height="100" rx="14" fill="#F7DF1E" />
          <path d="M63.5 69.5c1.8 3.1 4.5 4.9 8.2 4.9 3.5 0 5.7-1.8 5.7-4.3 0-3-2.4-4.1-6.5-5.9l-2.2-.9c-6.4-2.7-10.7-6.2-10.7-13.6 0-6.8 5.2-12 13.2-12 5.8 0 10 2.3 12.8 7.3l-6.5 4.2c-1.5-2.6-3.3-3.7-6.3-3.7-2.9 0-4.7 1.6-4.7 3.8 0 2.6 1.9 3.6 5.5 5.2l2.2.9c7.6 3.2 11.9 6.8 11.9 14.3 0 8.2-6.5 12.8-14.7 12.8-8.2 0-13.5-4.2-15.6-9.1l7-4.4zM32 78.5l7-4.2c1.7 2.8 3.6 4.6 6.8 4.6 3.7 0 6.1-1.7 6.1-8.1V38.5h8.8v32.5c0 10.9-6.3 15.6-14.9 15.6-6.4 0-11.4-3.4-13.8-8.1z" fill="#000000" />
        </svg>
      );

    case 'React.js':
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );

    case 'HTML5':
    case 'HTML':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512"/>
          <path fill="#EF652A" d="M256,472 L405,431 440,37 256,37"/>
          <path fill="#ECECEC" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,265 256,265 z M256,355 L255,355 192,338 188,293 132,293 139,382 255,414 256,414 z"/>
          <path fill="#FFFFFF" d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 386,208 z M255,94 L255,150 392,150 397,94 z"/>
        </svg>
      );

    case 'CSS3':
    case 'CSS':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path fill="#1572B6" d="M71,460 L30,0 481,0 440,460 255,512"/>
          <path fill="#33A9DC" d="M256,472 L405,431 440,37 256,37"/>
          <path fill="#ECECEC" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,265 256,265 z M256,355 L255,355 192,338 188,293 132,293 139,382 255,414 256,414 z"/>
          <path fill="#FFFFFF" d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 386,208 z M255,94 L255,150 392,150 397,94 z"/>
        </svg>
      );

    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path d="M50 25c-15 0-24 7.5-27 22.5 6-7.5 13.5-10.5 22.5-9 5.1 0.9 8.8 4.6 12.9 8.7C65 53.9 74.3 63.5 90 63.5c15 0 24-7.5 27-22.5-6 7.5-13.5 10.5-22.5 9-5.1-0.9-8.8-4.6-12.9-8.7C75 34.6 65.7 25 50 25zm-25 22.5C10 47.5 1 55-2 70c6-7.5 13.5-10.5 22.5-9 5.1 0.9 8.8 4.6 12.9 8.7C40 76.4 49.3 86 65 86c15 0 24-7.5 27-22.5-6 7.5-13.5 10.5-22.5 9-5.1-0.9-8.8-4.6-12.9-8.7-6.6-6.7-15.9-16.3-31.6-16.3z" fill="#06B6D4" transform="scale(0.8) translate(5, 5)" />
        </svg>
      );

    case 'Node.js':
      return (
        <svg viewBox="0 0 256 289" className={className}>
          <path fill="#539E43" d="M128 0L9.4 68.4v136.8L128 273.6l118.6-68.4V68.4L128 0zm-8.8 238.1l-84.5-48.8V97.6l84.5 48.8v91.7zm17.6 0V146.4l84.5-48.8v91.7l-84.5 48.8zM128 128.5L43.5 79.7 128 31l84.5 48.7L128 128.5z" />
        </svg>
      );

    case 'Express.js':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="34" fontWeight="bold" fontFamily="sans-serif">ex</text>
          <circle cx="50" cy="50" r="44" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.8" />
        </svg>
      );

    case 'MongoDB':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#47A248" d="M12 0C11.5 3 7 7.5 7 13c0 4.5 3 8 5 11 2-3 5-6.5 5-11 0-5.5-4.5-10-5-13z" />
          <path fill="#499D4A" d="M12 0v24c2-3 5-6.5 5-11 0-5.5-4.5-10-5-13z" opacity="0.7" />
          <path fill="#FFFFFF" d="M12 4.5v15c.5-.7 1-1.5 1.5-2.5V7C13 6 12.5 5.2 12 4.5z" opacity="0.3" />
        </svg>
      );

    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#4479A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#4479A1" fillOpacity="0.2" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );

    case 'Java':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path d="M48 20c-5 8 5 12 8 18-5-4-8-10-8-18zm-12 12c-4 7 4 11 6 16-4-3-6-9-6-16zm25 15c-15 1-28 6-28 12s13 11 28 12 28-6 28-12-13-11-28-12zm-22 17c5 4 14 6 22 6s17-2 22-6c-5 3-13 4-22 4s-17-1-22-4z" fill="#ED8B00" />
          <path d="M30 75c8 3 20 4 30 3 10-1 15-4 15-4s-3 3-14 5c-11 2-24 1-31-4z" fill="#5382A1" />
        </svg>
      );

    case 'C':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#00599C" stroke="#A8B9CC" strokeWidth="3" />
          <path d="M68 34 C63 26, 45 25, 36 35 C26 46, 26 54, 36 65 C45 75, 63 74, 68 66 L59 59 C55 63, 47 65, 41 59 C35 53, 35 47, 41 41 C47 35, 55 37, 59 41 Z" fill="#FFFFFF" />
        </svg>
      );

    case 'C++':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#00599C" stroke="#A8B9CC" strokeWidth="3" />
          <path d="M50 35 C46 27, 33 26, 26 35 C19 44, 19 54, 26 64 C33 73, 46 72, 50 65 L42 58 C39 62, 34 63, 30 58 C26 53, 26 47, 30 42 C34 37, 39 38, 42 42 Z" fill="#FFFFFF" />
          <path d="M57 49h3.5v-3.5h2v3.5h3.5v2h-3.5v3.5h-2v-3.5h-3.5z" fill="#00E5FF" />
          <path d="M70 49h3.5v-3.5h2v3.5h3.5v2h-3.5v3.5h-2v-3.5h-3.5z" fill="#00E5FF" />
        </svg>
      );

    case 'Git':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path fill="#F05032" d="M94.6 44.5L55.5 5.4c-2.4-2.4-6.4-2.4-8.8 0L37.9 14.2l11.4 11.4c2.6-.9 5.6-.3 7.6 1.7 2 2 2.6 5 1.7 7.6l11 11c2.6-.9 5.6-.3 7.6 1.7 2.8 2.8 2.8 7.3 0 10.1-2.8 2.8-7.3 2.8-10.1 0-2.2-2.2-2.7-5.4-1.6-8.1l-10.3-10.3v27.2c.8.4 1.5 1 2.1 1.6 2.8 2.8 2.8 7.3 0 10.1-2.8 2.8-7.3 2.8-10.1 0-2.8-2.8-2.8-7.3 0-10.1.7-.7 1.5-1.2 2.3-1.6V39.5c-.8-.4-1.6-.9-2.3-1.6-2.2-2.2-2.7-5.5-1.6-8.2L27.4 18.5 5.4 40.5c-2.4 2.4-2.4 6.4 0 8.8l39.1 39.1c2.4 2.4 6.4 2.4 8.8 0l41.3-41.3c2.4-2.4 2.4-6.4 0-8.8z" />
        </svg>
      );

    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="#FFFFFF" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );

    case 'VS Code':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <path fill="#007ACC" d="M72 12l20 10v56L72 88 44 65 20 84 8 76V24l12-8 24 19z" />
          <path fill="#1F9CF0" d="M72 12L44 35l28 23z" />
          <path fill="#0066B8" d="M72 88L44 65l28-23z" />
          <path fill="#007ACC" d="M20 24L8 32v36l12 8 24-19-24-19z" />
        </svg>
      );

    case 'Postman':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#FF6C37" />
          <path d="M68 40c-2-5-9-8-15-5l-18 8c-3 1-5 4-4 8 1 3 4 5 7 4l12-5c1 3 3 5 6 5 4 0 7-3 7-7 0-3-2-6-5-8z" fill="#FFFFFF" />
        </svg>
      );

    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" className={className}>
          <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
          <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
          <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
          <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
          <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
        </svg>
      );

    default:
      return (
        <div className="w-12 h-12 rounded-xl bg-[#FFD600]/15 text-[#FFD600] flex items-center justify-center font-bold">
          {name.slice(0, 2)}
        </div>
      );
  }
}
