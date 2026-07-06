'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export default function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
  ...props
}: OrbitingCirclesProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg);
          }
        }
        .orbiting-circle-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          animation: orbit calc(var(--duration) * 1s) linear infinite;
          animation-delay: calc(var(--delay) * 1s);
        }
        .orbiting-circle-item-reverse {
          animation-direction: reverse;
        }
      ` }} />

      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 stroke-black/10 stroke-1 dark:stroke-white/10"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            width: radius * 2,
            height: radius * 2,
          }}
        >
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            strokeDasharray="4 4"
            className="stroke-black/5 dark:stroke-white/10"
          />
        </svg>
      )}

      <div
        style={{
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          width: '0px',
          height: '0px',
          position: 'absolute',
        } as React.CSSProperties}
        className={cn(
          "orbiting-circle-item",
          reverse && "orbiting-circle-item-reverse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
