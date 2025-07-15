import { useState } from "react";
import expensiveCount, { unlucky_dev_career_number } from "../utils/expensiveCount";

interface BlockingCounterProps {
  title?: string;
  limit?: number;
  disabled?: boolean;
  className?: string;
}

export default function BlockingCounter({
  title = "Blocking (Main Thread)",
  limit = unlucky_dev_career_number,
  disabled = false,
  className = "",
}: BlockingCounterProps) {
  const [blockingCount, setBlockingCount] = useState(0);
  const [isBlocking, setIsBlocking] = useState(false);

  const handleBlockingCount = () => {
    setIsBlocking(true);
    setBlockingCount(0);

    setTimeout(() => {
      const result = expensiveCount(limit);
      setBlockingCount(result);
      setIsBlocking(false);
    }, 300);
  };

  return (
    <div className={`w-full p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-red-800 dark:text-red-200">
        {title}
      </h3>

      <div className="w-full space-y-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Count: {blockingCount.toLocaleString()}</span>
          <span>
            Status:{" "}
            {isBlocking
              ? "Blocking UI..."
              : blockingCount > 0
              ? "Completed"
              : "Ready"}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleBlockingCount}
          disabled={isBlocking || disabled}
          className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
        >
          {isBlocking ? "UI Blocked..." : "Start Blocking Count"}
        </button>
      </div>

      <p className="text-xs text-red-600 dark:text-red-400 mt-2">
        ⚠️ This will freeze the UI until completion
      </p>
    </div>
  );
}