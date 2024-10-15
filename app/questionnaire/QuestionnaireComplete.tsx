type QuestionnaireCompleteProps = {
  scores: Record<string, number>;
};

export default function QuestionnaireComplete({ scores }: QuestionnaireCompleteProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Questionnaire Complete</h2>
      <h3 className="text-xl">Vitamin Recommendations:</h3>
      <ul className="space-y-2">
        {Object.entries(scores).map(([vitamin, score]) => (
          <li key={vitamin} className="flex justify-between">
            <span>{vitamin}</span>
            <span>{score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
