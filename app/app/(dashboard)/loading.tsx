import LoadingDots from "@/components/icons/loading-dots";
import { PiSpinnerGapLight } from "react-icons/pi";

export default function Loading() {
  return (
    <>
      <div className="mt-28 flex h-full w-full justify-center ">
        <PiSpinnerGapLight className="animate-spin text-white" />
      </div>
    </>
  );
}
