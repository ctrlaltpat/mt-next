import { useState, useEffect, useRef, useCallback } from 'react';
import { really_unlucky_dev_career_number } from '../utils/expensiveCount';

interface CountState {
  progress: number;
  count: number;
  isRunning: boolean;
  isCompleted: boolean;
}

interface WorkerMessage {
  progress: number;
  count: number;
  completed?: boolean;
}

export function useExpensiveCount() {
  const [state, setState] = useState<CountState>({
    progress: 0,
    count: 0,
    isRunning: false,
    isCompleted: false,
  });

  const workerRef = useRef<Worker | null>(null);

  const startCount = useCallback((limit: number = really_unlucky_dev_career_number) => {
    if (state.isRunning) return;

    setState(prev => ({
      ...prev,
      progress: 0,
      count: 0,
      isRunning: true,
      isCompleted: false,
    }));

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    workerRef.current = new Worker(
      new URL('../../workers/worker.ts', import.meta.url)
    );

    workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { progress, count, completed } = event.data;
      
      setState(prev => ({
        ...prev,
        progress,
        count,
        isRunning: !completed,
        isCompleted: !!completed,
      }));
    };

    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
      setState(prev => ({
        ...prev,
        isRunning: false,
      }));
    };

    workerRef.current.postMessage({ limit });
  }, [state.isRunning]);

  const stopCount = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setState(prev => ({
      ...prev,
      isRunning: false,
    }));
  }, []);

  const resetCount = useCallback(() => {
    stopCount();
    setState({
      progress: 0,
      count: 0,
      isRunning: false,
      isCompleted: false,
    });
  }, [stopCount]);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return {
    ...state,
    startCount,
    stopCount,
    resetCount,
  };
}