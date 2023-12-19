import LoadingDots from "@/components/icons/loading-dots";
import { PiSpinnerGapLight } from "react-icons/pi";

export default function Loading() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center ">
        <PiSpinnerGapLight className="mt-28 animate-spin text-white" />
      </div>
    </>
  );
}
