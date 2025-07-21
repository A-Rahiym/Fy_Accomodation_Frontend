import type { ProgressStep } from "/src/types"

interface ProgressIndicatorProps {
  steps: ProgressStep[]
}

export function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  return (
    <div className="flex space-x-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`h-2 w-16 rounded-full transition-colors ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
          title={step.label}
        />
      ))}
    </div>
  )
}
