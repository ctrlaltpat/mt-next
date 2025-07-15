"use client";

import NonBlockingCounter from "./components/NonBlockingCounter";
import BlockingCounter from "./components/BlockingCounter";
import {
  really_unlucky_dev_career_number,
  unlucky_dev_career_number,
} from "./utils/expensiveCount";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Web Workers</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Demonstrating non-blocking operations using Web Workers in Next.js.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <NonBlockingCounter
            title="Non-blocking Worker #1"
            limit={really_unlucky_dev_career_number}
          />

          <NonBlockingCounter
            title="Non-blocking Worker #2"
            limit={really_unlucky_dev_career_number}
          />

          <div className="lg:col-span-2">
            <BlockingCounter
              title="Blocking (Main Thread)"
              limit={unlucky_dev_career_number}
            />
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
          <p className="mb-2">
            <strong>Try this:</strong> Start both non-blocking workers
            simultaneously, then try the blocking operation to see the
            difference.
          </p>
          <p>
            The Web Workers run independently without affecting each other or
            the UI, while the blocking operation freezes everything.
          </p>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-gray-500">CtrlAltPat</span>
      </footer>
    </div>
  );
}
