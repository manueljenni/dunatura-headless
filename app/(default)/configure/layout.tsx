import { ReactNode } from "react";

export default function ConfigureLayout({ children }: { children: ReactNode }) {
  return <div className="bg-[#F2F1E9] min-h-screen flex-1 flex flex-col">{children}</div>;
}
