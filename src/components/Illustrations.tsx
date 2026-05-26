import React from 'react';

export const StarShape = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 6L62.5 39.5H98L69.5 60.5L80.5 94L50 72.5L19.5 94L30.5 60.5L2 39.5H37.5L50 6Z" fill="#FFDE59" stroke="#000000" strokeWidth="4" strokeLinejoin="round"/>
  </svg>
);

export const CloudShape = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M30 65C18.9543 65 10 56.0457 10 45C10 33.9543 18.9543 25 30 25C32.0622 25 34.0514 25.3129 35.9189 25.8887C40.0934 14.7797 50.8143 7 63.5 7C80.897 7 95 21.103 95 38.5C95 40.8354 94.7456 43.1114 94.2709 45.2974C96.6577 48.0645 98 51.5204 98 55.25C98 60.6348 93.6348 65 88.25 65H30Z" fill="#FF5757" stroke="#000000" strokeWidth="4" strokeLinejoin="round"/>
  </svg>
);

export const EyeShape = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none">
    <path d="M50 55C75 55 95 30 95 30C95 30 75 5 50 5C25 5 5 30 5 30C5 30 25 55 50 55Z" fill="#5271FF" stroke="#000000" strokeWidth="4" strokeLinejoin="round"/>
    <circle cx="50" cy="30" r="12" fill="#000000"/>
  </svg>
);

export const FlowerShape = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <path d="M50 15C55 5 65 5 70 15C75 25 85 25 85 35C85 45 95 55 85 65C75 75 75 85 65 85C55 85 45 95 35 85C25 75 15 75 15 65C5 55 15 45 15 35C15 25 25 25 30 15C35 5 45 5 50 15Z" fill="#FFB6C1" stroke="#000000" strokeWidth="4" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="15" fill="#FFDE59" stroke="#000000" strokeWidth="4"/>
  </svg>
);
