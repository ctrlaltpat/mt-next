import { useExpensiveCount } from "../hooks/useExpensiveCount";
import ProgressBar from "./ProgressBar";

interface NonBlockingCounterProps {
  title?: string;
  limit?: number;
  disabled?: boolean;
  className?: string;
}

export default function NonBlockingCounter({
  title = "Non-blocking (Web Worker)",
  limit,
  disabled = false,
  className = "",
}: NonBlockingCounterProps) {
  const {
    progress,
    count,
    isRunning,
    isCompleted,
    startCount,
    stopCount,
    resetCount,
  } = useExpensiveCount();

  const handleStart = () => {
    if (limit) {
      startCount(limit);
    } else {
      startCount();
    }
  };

  return (
    <div className={`w-full p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950/20 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
        {title}
      </h3>

      <div className="w-full space-y-4">
        <ProgressBar
          progress={progress}
          color={isCompleted ? "green" : "blue"}
          className="w-full"
        />

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Count: {count.toLocaleString()}</span>
          <span>
            Status:{" "}
            {isRunning ? "Running..." : isCompleted ? "Completed" : "Ready"}
          </span>
        </div>
      </div>

      <div className="flex gap-2 w-full mt-4">
        <button
          onClick={handleStart}
          disabled={isRunning || disabled}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
        >
          {isRunning ? "Running..." : "Start Count"}
        </button>

        <button
          onClick={stopCount}
          disabled={!isRunning || disabled}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
        >
          Stop
        </button>

        <button
          onClick={resetCount}
          disabled={isRunning || disabled}
          className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}