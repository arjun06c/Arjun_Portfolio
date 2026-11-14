import React from 'react';
import { experienceData } from '../../data/aboutData';
import TimelineCard from './TimelineCard';

export default function ExperienceTimeline() {
  return (
    <div className="relative pt-2">
      {experienceData.map((item, index) => (
        <TimelineCard
          key={item.id}
          index={index}
          duration={item.duration}
          title={item.title}
          subtitle={item.location ? `${item.company} • ${item.location}` : item.company}
          description={item.description}
          typeBadge={item.typeBadge}
          technologies={item.technologies}
        />
      ))}
    </div>
  );
}

