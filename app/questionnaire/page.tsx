import { Button } from "@/components/primitives/button";

export default function page() {
  return (
    <div className="space-y-16">
      <div className="space-y-1">
        <h1 className="text-4xl font-medium">Befor es losgeht...</h1>
        <p className="text-lg text-secondary">
          Dürfen wir deine Informationen bearbeiten?
        </p>
      </div>
      <div>
        <Button variant={"pill"} size={"pill-lg"}>
          Ja, weiter
        </Button>
        <Button variant={"ghost"} size={"lg"}>
          Take me back
        </Button>
      </div>
    </div>
  );
}
