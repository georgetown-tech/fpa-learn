"use client";

import React, { useState, useEffect } from "react";

const FizzingBubbles = () => {
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; left: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      const numBubbles = 10; // Number of bubbles to create per interval

      const newBubbles = Array.from({ length: numBubbles }, () => ({
        id: Math.random(),
        size: Math.floor(Math.random() * 20) + 10, // Random size between 10 and 30
        left: Math.random() * 100, // Random position from 0 to 100vw
        duration: Math.floor(Math.random() * 8) + 4, // Random duration between 4 and 12 seconds
      }));

      // Add the new bubbles to the array of bubbles
      setBubbles(
        (
          prevBubbles: Array<{
            id: number;
            left: number;
            size: number;
            duration: number;
          }>,
        ) => [...prevBubbles, ...newBubbles],
      );

      // Remove bubbles after animation duration
      newBubbles.forEach((newBubble) => {
        setTimeout(() => {
          setBubbles((prevBubbles) =>
            prevBubbles.filter((bubble) => bubble.id !== newBubble.id),
          );
        }, newBubble.duration * 1000);
      });
    }, 500); // Add new bubbles every 0.5 seconds

    return () => clearInterval(bubbleInterval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 h-screen overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-slate-50"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}vw`,
            bottom: "-20px",
            animation: `rise ${bubble.duration}s linear infinite`,
            zIndex: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes rise {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FizzingBubbles;
