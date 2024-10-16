"use client";
import { Button } from "@/components/primitives/button";
import { Route } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ArticlePreview(props: {
  title: string;
  description: string;
  image: string;
  link: Route<string>;
}) {
  const router = useRouter();
  return (
    <div className="bg-lightBackground rounded-xl overflow-hidden shadow">
      <div className="relative h-64 w-full">
        <Image src={props.image} alt="Ernährung" layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{props.title}</h2>
        <p className="text-gray-600 mb-4">{props.description}</p>
        <Button
          variant="pill"
          onClick={() => {
            router.push(props.link);
          }}>
          Weiterlesen →
        </Button>
      </div>
    </div>
  );
}
