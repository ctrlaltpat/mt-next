interface WorkerMessage {
  progress: number;
  count: number;
  completed?: boolean;
}

function expensiveCountWithProgress(limit: number): void {
  let count = 0;
  const progressInterval = Math.floor(limit / 100);

  for (let i = 0; i < limit; i++) {
    ++count;

    if (progressInterval > 0 && i % progressInterval === 0) {
      const progress = Math.round((i / limit) * 100);
      postMessage({ progress, count } as WorkerMessage);
    }
  }

  postMessage({ progress: 100, count, completed: true } as WorkerMessage);
}

self.onmessage = function (event) {
  const { limit } = event.data;
  expensiveCountWithProgress(limit);
};
