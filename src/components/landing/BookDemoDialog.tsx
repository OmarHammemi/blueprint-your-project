import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarClock } from "lucide-react";
import CalBookingEmbed from "@/components/landing/CalBookingEmbed";

interface BookDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookDemoDialog = ({ open, onOpenChange }: BookDemoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1100px] w-[95vw] max-h-[92vh] overflow-y-auto p-0 gap-0 bg-zinc-950 border-zinc-800">
        <DialogHeader className="px-6 pt-6 pb-3">
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-primary" />
            </div>
            Book a Demo
          </DialogTitle>
          <DialogDescription>
            Pick a 15-minute slot with Omar Hammemi via Cal Video.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <div className="px-3 pb-4 sm:px-5">
            <CalBookingEmbed namespace="blindedata-demo-dialog" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoDialog;
