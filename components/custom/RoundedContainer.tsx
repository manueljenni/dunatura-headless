export default function RoundedContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden h-full w-full flex justify-start max-w-6xl">
        <div className="bg-background rounded-[32px] mx-4">
          <div className="w-full h-full max-w-6xl space-y-6 mx-auto p-8">
            {title && <h1 className="text-4xl font-medium text-primary">{title}</h1>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
