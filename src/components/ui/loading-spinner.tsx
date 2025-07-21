interface LoadingSpinnerProps {
  /** Optional loading text to display below spinner */
  text?: string
  /** Size of the spinner - small, medium, or large */
  size?: "small" | "medium" | "large"
}

/**
 * Reusable loading spinner component
 * Used throughout the app for loading states
 */
export default function LoadingSpinner({ text = "Loading...", size = "medium" }: LoadingSpinnerProps) {
  // Define spinner sizes
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div
          className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto ${sizeClasses[size]}`}
          role="status"
          aria-label="Loading"
        />

        {/* Loading text */}
        {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
      </div>
    </div>
  )
}
