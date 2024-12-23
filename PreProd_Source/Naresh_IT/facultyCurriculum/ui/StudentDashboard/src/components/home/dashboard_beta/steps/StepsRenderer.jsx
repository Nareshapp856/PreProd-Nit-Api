import clsx from "clsx";
import React from "react";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const colorClasses = [
  { bg: "bg-red-500 bg-opacity-50", border: "border-l-4 border-red-500" },
  { bg: "bg-yellow-500 bg-opacity-50", border: "border-l-4 border-yellow-500" },
  { bg: "bg-green-500 bg-opacity-50", border: "border-l-4 border-green-500" },
  { bg: "bg-blue-500 bg-opacity-50", border: "border-l-4 border-blue-500" },
  { bg: "bg-indigo-500 bg-opacity-50", border: "border-l-4 border-indigo-500" },
  { bg: "bg-purple-500 bg-opacity-50", border: "border-l-4 border-purple-500" },
  { bg: "bg-pink-500 bg-opacity-50", border: "border-l-4 border-pink-500" },
  { bg: "bg-gray-500 bg-opacity-50", border: "border-l-4 border-gray-500" },
  { bg: "bg-teal-500 bg-opacity-50", border: "border-l-4 border-teal-500" },
  { bg: "bg-cyan-500 bg-opacity-50", border: "border-l-4 border-cyan-500" },
  { bg: "bg-orange-500 bg-opacity-50", border: "border-l-4 border-orange-500" },
  { bg: "bg-lime-500 bg-opacity-50", border: "border-l-4 border-lime-500" },
  { bg: "bg-rose-500 bg-opacity-50", border: "border-l-4 border-rose-500" },
  {
    bg: "bg-emerald-500 bg-opacity-50",
    border: "border-l-4 border-emerald-500",
  },
  { bg: "bg-sky-500 bg-opacity-50", border: "border-l-4 border-sky-500" },
  {
    bg: "bg-fuchsia-500 bg-opacity-50",
    border: "border-l-4 border-fuchsia-500",
  },
];

function getColorClass(facultyName) {
  const hash = hashString(facultyName);
  const index = hash % colorClasses.length;
  return colorClasses[index];
}

function StepsRenderer({ step }) {
  const colorClass = getColorClass(step.facultyName);

  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row shadow-md my-2 bg-white w-full font-medium space-y-4 sm:space-y-0 sm:space-x-6 p-4 items-start rounded-lg transition-all",
        colorClass.border
      )}
    >
      <div className="flex flex-col w-full sm:w-[20%]">
        <p className="text-lg font-semibold text-gray-800">{step.topic}</p>
        <p className="text-gray-500 text-sm">{step.slotTime}</p>
      </div>

      <div className="flex flex-col w-full sm:w-[25%] items-center">
        <p
          className={clsx(
            `w-full py-2 rounded-lg text-center text-sm font-semibold`,
            colorClass.bg
          )}
        >
          {step.facultyName}
        </p>
      </div>

      <div className="flex flex-col w-full sm:w-[30%] items-center">
        <p className="w-full py-2 rounded-lg text-sm font-semibold text-gray-700">
          {step.subTopic}
        </p>
      </div>
    </div>
  );
}

export default StepsRenderer;
