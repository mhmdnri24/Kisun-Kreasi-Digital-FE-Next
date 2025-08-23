"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Welcome
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-100 opacity-90">
          To Kisun Kreasi Digital Test
        </p>
      </motion.div>
    </div>
  );
}
