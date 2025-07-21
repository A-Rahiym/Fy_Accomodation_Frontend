import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { AlertTriangle } from "lucide-react"
import type { HostelChoice } from "../../types"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  choices: HostelChoice[]
  isLoading?: boolean
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, choices, isLoading = false }: ConfirmationModalProps) {
  const selectedChoices = choices.filter((choice) => choice.hostel !== null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Confirm Hostel Selection
          </DialogTitle>
          <DialogDescription>
            Please review your hostel choices carefully. Once submitted, these selections cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {selectedChoices.map((choice) => (
            <div key={choice.choice} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium capitalize">{choice.choice} Choice:</span>
              <span className="text-sm text-gray-600">{choice.hostel?.name}</span>
            </div>
          ))}

          {selectedChoices.length === 0 && <p className="text-center text-gray-500 py-4">No hostels selected</p>}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Important Notice:</p>
              <p>
                Your hostel selections are final and cannot be modified after submission. Make sure you are satisfied
                with your choices.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Review Choices
          </Button>
          <Button
            onClick={onConfirm}
            disabled={selectedChoices.length === 0 || isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
