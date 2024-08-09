"use client";

import React, { useEffect, useRef } from "react";

const ProgressWrapper = ({
  children,
  progress = 100,
}: Readonly<{
  children: React.ReactNode;
  progress: number;
}>) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [progress, offset]);

  return (
    <div className="progress-bar-outer relative">
      <div className="progress-bar-inner flex flex-col gap-2 items-center justify-center">
        {children}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="200px"
        height="200px"
        className="progress-bar-circle"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#DA22FF" />
            <stop offset="100%" stopColor="#9733EE" />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          cx="100"
          cy="100"
          r={radius}
          strokeLinecap="round"
          stroke="url(#GradientColor)"
          strokeWidth="20px"
          fill="none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 2s linear",
          }}
        />
      </svg>
    </div>
  );
};

export default ProgressWrapper;
