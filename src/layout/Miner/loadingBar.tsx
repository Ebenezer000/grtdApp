// src/LoadingBar.tsx
import React, { useState, useEffect } from 'react';
import './loadingBar.css';

interface LoadingBarProps {
  progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div id="loading-container">
      <div id="loading-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default LoadingBar;
