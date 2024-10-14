import StepsHorizontal from "./StepsHorizontal";
import StepsVertical from "./StepsVertical";

export default function Steps() {
  return (
    <div className="container max-w-6xl h-full mx-auto">
      <div className="hidden md:block">
        <StepsHorizontal />
      </div>
      <div className="block md:hidden">
        <StepsVertical />
      </div>
    </div>
  );
}
