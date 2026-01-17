/**
 * Movie Guess Game - Main Application
 * 
 * A fun movie guessing game with multiple difficulty levels,
 * hints system, and timer mode for challenging gameplay.
 * 
 * @version 1.2.0
 * @author Movie Guess Team
 */

import React, { useEffect } from 'react'
import GameContainer from './components/GameContainer'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  useEffect(() => {
    ["log", "warn", "error"].forEach((level) => {
      const original = console[level];
      console[level] = (...args) => {
        original.apply(console, args);
        const safeArgs = args.map((a) => {
          if (a instanceof Error) {
            return {
              message: a.message,
              stack: a.stack,
              name: a.name,
            };
          }
          try {
            JSON.stringify(a);
            return a;
          } catch {
            return String(a);
          }
        });

        try {
          window.parent?.postMessage(
            { type: "iframe-console", level, args: safeArgs },
            "*"
          );
        } catch (e) {
          original("Failed to postMessage:", e);
        }
      };
    });

    window.onerror = (msg, url, line, col, error) => {
      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: [
            msg,
            url,
            line,
            col,
            error ? { message: error.message, stack: error.stack } : null,
          ],
        },
        "*"
      );
    };

    window.onunhandledrejection = (event) => {
      const reason =
        event.reason instanceof Error
          ? { message: event.reason.message, stack: event.reason.stack }
          : event.reason;

      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: ["Unhandled Promise Rejection:", reason],
        },
        "*"
      );
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <GameContainer />
      </div>
    </ErrorBoundary>
  )
}

export default App