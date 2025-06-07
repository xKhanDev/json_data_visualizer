import React from "react";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              JSON Visualizer
            </h1>
            <p className="text-gray-600 mt-1">
              Convert JSON data to interactive tables and export to Excel
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Free Tool
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
