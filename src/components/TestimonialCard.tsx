import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  location, 
  image, 
  quote, 
  rating 
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-accent">{name}</h4>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  );
};

export default TestimonialCard;