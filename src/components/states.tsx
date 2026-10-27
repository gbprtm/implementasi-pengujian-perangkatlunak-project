import React from "react";

// ─── Loading State ───────────────────────────────────────────────────────────

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Memuat data..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label={message}
      className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400"
    >
      <svg
        className="animate-spin h-8 w-8 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ─── Error State ─────────────────────────────────────────────────────────────

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Terjadi kesalahan. Coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <p className="text-sm text-center max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "Belum ada data",
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
      <p className="text-sm font-medium text-slate-600">{title}</p>
      {description && (
        <p className="text-xs text-center max-w-xs text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
