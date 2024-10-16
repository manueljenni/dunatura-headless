import checkmark from "@/public/images/icons/checkmark-empty.svg";
import Image from "next/image";

export default function CheckmarkItem(props: { text: string }) {
  return (
    <div className="flex items-start">
      <div className="relative flex-shrink-0 w-12 h-12 mr-4">
        <div className="absolute inset-0 bg-primaryBackground rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={checkmark}
            alt="Checkmark"
            className="w-4 h-4"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <p className="text-lg text-primary">{props.text}</p>
    </div>
  );
}
