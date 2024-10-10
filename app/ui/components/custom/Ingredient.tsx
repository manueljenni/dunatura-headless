import Image from "next/image";

export default function Ingredient(props: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <div className="p-4 border rounded-2xl flex space-x-4 justify-center items-center min-w-[22rem] max-w-md w-full">
      <Image
        src={props.image}
        alt="pill"
        className="h-18 w-18 object-contain rounded-full"
        style={{ height: "72px", width: "72px" }}
        width={72}
        height={72}
      />
      <div className="p-0 m-0">
        <p className="text-[#2B382B] font-medium text-xl">Vitamin C</p>
        <p className="text-[#555F54]">
          Stärkt das Immunsystem und fördert die Kollagenbildung.
        </p>
      </div>
    </div>
  );
}
