import Image, { StaticImageData } from "next/image";

export default function Ingredient(props: {
  image: string | StaticImageData;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`p-4 border rounded-2xl flex space-x-4 justify-start items-center min-w-[22rem] max-w-md w-full ${props.className}`}>
      <Image
        src={props.image}
        alt="pill"
        className="h-16 w-16 object-contain rounded-full"
        width={72}
        height={72}
        style={{
          height: "72px",
          width: "72px",
          maxWidth: "100%",
          height: "auto"
        }} />
      <div className="p-0 m-0">
        <p className="text-primary font-medium text-xl">{props.title}</p>
        <p className="text-secondary">{props.text}</p>
      </div>
    </div>
  );
}
