import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  number: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, number }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative">
      <div className="absolute -top-4 -left-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-accent mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;