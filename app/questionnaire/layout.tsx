import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-screen flex flex-col relative">
      {children}
      {/* <main className="absolute inset-0 flex flex-col justify-center items-center z-10 w-full h-full">
        
      </main> */}
      <div
        className="absolute bottom-0 w-full h-[45%] bg-cover bg-center"
        style={
          {
            backgroundImage: "url('/images/landing/landscape.png')",
            "--gradient-overlay":
              "linear-gradient(to bottom, #FBFCF8 0%, rgba(251, 252, 248, 0.8) 60%, rgba(251, 252, 248, 0.8) 30%, transparent 100%)",
          } as React.CSSProperties
        }>
        <div
          className="absolute inset-0 h-4/5"
          style={{ background: "var(--gradient-overlay)" }}></div>
      </div>
    </div>
  );
}
