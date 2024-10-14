export default function RoundedContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <div className="h-full bg-background rounded-[32px] mx-4">
          <div className="w-full h-full max-w-6xl space-y-6 mx-auto pb-12 pt-6 px-4">
            {title && <h1 className="text-4xl font-medium text-primary">{title}</h1>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
