import LoadingDots from "@/components/icons/loading-dots";
import { PiSpinnerGapLight } from "react-icons/pi";

export default function Loading() {
  return (
    <>
      <div className="flex h-full h-screen  w-full items-center justify-center">
        <PiSpinnerGapLight className="animate-spin pt-28 text-white" />
      </div>
    </>
  );
}
