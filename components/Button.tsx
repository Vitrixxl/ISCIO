"use client";
import { useState } from "react";
import { motion as m } from "framer-motion";
export default function CheckPrimaryBtn({
  label,
  onClick,
  loading,
}: {
  label: string;
  onClick: (...args: any[]) => void;
  loading?: boolean;
}) {
  return (
    <m.button
      whileTap={{ scale: 0.95, transition: { duration: 0.01 } }}
      onClick={onClick}
      className="bg-gradient-to-tr from-blue-i to-green-i p-0.5 rounded-md text-blue-i hover:text-white transition-all duration-100 min-w-24 buttonBg"
    >
      <div
        className={
          "px-2 py-1 bg-gray-200 rounded  transition-all duration-100 "
        }
      >
        <span className="">{label}</span>
      </div>
    </m.button>
  );
}
