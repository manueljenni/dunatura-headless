import { Button } from "@/components/primitives/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuestionnaireCard() {
  const router = useRouter();

  return (
    <div className="bg-[#E8E7DE] rounded-3xl p-6 space-y-4">
      <h4 className="text-[#0F231C] text-xl font-medium">
        Möchtest du eine personalisierte Empfehlung basierend auf deinem Lebensstil und
        deinen Zielen?
      </h4>
      <Button
        variant="pill"
        size="pill-lg"
        className="w-fit bg-white text-[#0F231C] hover:bg-gray-50 flex items-center justify-center gap-2"
        onClick={() => router.push("/questionnaire")}>
        <span className="font-medium">Mache den Test</span>
        <ChevronRight
          size={18}
          className="transform transition-transform group-hover:translate-x-1"
        />
      </Button>
    </div>
  );
}
