import { Button } from "@/components/ui/primitives/button";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";

interface ReusableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Optional, for dialogs that require confirmation
  isProcessing?: boolean; // To show loading state for the confirm button
  isLoading?: boolean; // To show loading state for the entire dialog
  title: string;
  description: string;
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  variant?: "default" | "destructive"; // Variants for button styles
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isProcessing = false,
  isLoading = false, // New loading state for the dialog
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription
          className={
            variant === "destructive"
              ? "border-2 border-solid border-red-500 p-2 rounded-md bg-red-100"
              : "border-2 border-solid border-green-500 p-2 rounded-md bg-green-100"
          }
        >
          {description}
        </DialogDescription>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} variant="secondary">
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant === "destructive" ? "destructive" : "default"}
            disabled={isProcessing || isLoading} // Disable button if processing or loading
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Loading..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
