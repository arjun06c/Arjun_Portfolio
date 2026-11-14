import React from 'react';
import { educationData } from '../../data/aboutData';
import TimelineCard from './TimelineCard';

export default function EducationTimeline() {
  return (
    <div className="relative pt-2">
      {educationData.map((item, index) => (
        <TimelineCard
          key={item.id}
          index={index}
          duration={item.duration}
          title={item.title}
          subtitle={item.institution}
          description={item.description}
          score={item.score}
        />
      ))}
    </div>
  );
}

