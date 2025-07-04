import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center" data-testid="loading-spinner">
            <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        </div>
    );
}

export default LoadingSpinner;