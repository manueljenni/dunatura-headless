import Image from "next/image";

export default function Goal(props: { text: string; image: string }) {
  return (
    <div className="flex items-center">
      <div className="relative flex-shrink-0 w-9 h-9 mr-2">
        <div className="absolute inset-0 bg-[#EBEDE9] rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={props.image}
            alt="Checkmark"
            className="w-4 h-4"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <p className="text-lg text-primary font-medium">{props.text}</p>
    </div>
  );
}
