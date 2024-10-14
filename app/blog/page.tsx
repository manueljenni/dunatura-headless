import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <div className="h-full bg-background rounded-[32px] mx-4">
          <div className="w-full h-full max-w-6xl space-y-6 mx-auto py-12">
            <h1 className="text-4xl font-medium text-primary">
              <span className="underline underline-offset-4">du</span>natura Magazin
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Blog post item */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-72 w-full">
                  <Image
                    src="/images/blog/bananas.jpg"
                    alt="Ernährung"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    Wie kann man die beste Ernährung für sich finden?
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Die beste Ernährung für eine Person ist diejenige, die zu ihrem Körper
                    passt.
                  </p>
                  <a
                    href="#"
                    className="text-primary hover:text-primary-dark font-medium">
                    Weiterlesen →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
