import React from "react";

interface LazyLoaderProps {
  loadingText?: string;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  loadingText = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-end justify-center space-x-2">
        {/* Wave Animation */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-2 h-10 bg-blue-500 animate-bounce"
          ></div>
        ))}
      </div>
      <h2 className="mt-4 text-2xl text-gray-800" aria-live="polite">
        {loadingText}
      </h2>
    </div>
  );
};

export default LazyLoader;
