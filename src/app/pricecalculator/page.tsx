"use client";
import { useState } from "react";
import { FaUsers, FaClock, FaCalculator } from "react-icons/fa";

export default function PriceCalculator() {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(12);

  // Example formula (you can change it)
  const calculatedPrice = invites * duration * 10;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
        <FaCalculator /> Event Price Calculator
      </h2>

      {/* Number of Invites */}
      <div className="mb-6">
        <div className="flex justify-between text-gray-700 font-medium mb-2">
          <span className="flex items-center gap-2">
            <FaUsers className="text-purple-500" /> Number of Invites
          </span>
          <span className="text-purple-600 font-bold">{invites}</span>
        </div>
        <input
          type="range"
          min={10}
          max={500}
          value={invites}
          onChange={(e) => setInvites(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>10</span>
          <span>500</span>
        </div>
      </div>

      {/* Duration of Event */}
      <div className="mb-6">
        <div className="flex justify-between text-gray-700 font-medium mb-2">
          <span className="flex items-center gap-2">
            <FaClock className="text-purple-500" /> Duration of Event (hrs)
          </span>
          <span className="text-purple-600 font-bold">{duration} hrs</span>
        </div>
        <input
          type="range"
          min={1}
          max={72}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>1 hr</span>
          <span>72 hrs</span>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-xl py-4 shadow-md">
        <p className="text-lg">Estimated Price</p>
        <p className="text-3xl font-extrabold mt-1">₹ {calculatedPrice.toLocaleString()}</p>
      </div>
    </div>
  );
}
