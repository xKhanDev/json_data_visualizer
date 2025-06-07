import { Github } from "lucide-react";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/visijson.png" alt="visijson logo" className="h-12" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Visi<span className="text-purple-600">JSON</span>
              </h1>
              <p className="text-gray-600 mt-1">
                From raw🤢 to readable — JSON made visual😍.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Free Tool
            </div>
            <a
              href="https://github.com/xKhanDev"
              target="_blank"
              className="bg-purple-100 text-purple-800 p-2 rounded-full text-sm font-medium"
            >
              <Github className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
