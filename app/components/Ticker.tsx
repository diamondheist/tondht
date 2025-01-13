'use client'

import React from "react";

const Ticker = () => {
  const newsItems = [
    "Breaking: Refer now to Earn the Ambassador Badge!!!",
    "Stay tuned for updates and announcements coming soon.",
    "$DHT 5,000,000 for our first 10,000 users ",
  ];

  return (
    <div className="relative overflow-hidden bg-transparent text-white">
      <div className="flex animate-scroll gap-8">
        {/* Repeat the news items twice for seamless looping */}
        {[...newsItems, ...newsItems].map((item, index) => (
          <span
            key={index}
            className="inline-block text-sm font-medium whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
