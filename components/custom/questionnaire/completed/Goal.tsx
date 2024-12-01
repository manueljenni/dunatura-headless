
type GoalProps = {
  text: string;
  icon: React.ReactNode;
};

export default function Goal({ text, icon }: GoalProps) {
  return (
    <div className="flex items-center gap-2 bg-[#FBFCF8] rounded-full px-4 py-2 min-w-[250px]">
      <span className="flex items-center justify-center mr-2">{icon}</span>
      <span className="text-primary font-medium">{text}</span>
    </div>
  );
}
