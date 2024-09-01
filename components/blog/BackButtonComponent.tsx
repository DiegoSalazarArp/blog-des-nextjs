// components/BackButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className="your-button-styles">
      Go Back
    </button>
  );
};

export default BackButton;
