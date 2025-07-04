import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h1>
            <p className="mb-4 text-gray-700">An unexpected error occurred. Please try again.</p>
            <button
                onClick={resetErrorBoundary}
                className="btn-primary"
            >
                Reload Page
            </button>
            {process.env.NODE_ENV === "development" && (
                <pre className="mt-4 text-xs text-left text-red-500 bg-gray-100 p-2 rounded">
                    {error.message}
                    <br />
                    {error.stack}
                </pre>
            )}
        </div>
    )
};

// FIXME: not properly working, yet
const ErrorBoundary = ({ children }) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
                console.error("ErrorBoundary caught an error:", error, info);
            }}
        >
            {children}
        </ReactErrorBoundary>
    )
};

export default ErrorBoundary;