import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({
  rating,
  interactive = false,
  onRatingChange,
  size = 'md',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
  };

  const handleClick = (val: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(val);
    }
  };

  const handleMouseEnter = (val: number) => {
    if (interactive) {
      setHoverRating(val);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hoverRating !== null ? star <= hoverRating : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 active:scale-95 transition' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              className={`${starSize[size]} ${
                active
                  ? 'text-amber-400 fill-current'
                  : 'text-gray-200 dark:text-gray-700'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
