import { Route } from "next";
import ArticlePreview from "../ui/components/custom/ArticlePreview";

export default function BlogPage() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <div className="h-full bg-background rounded-[32px] mx-4">
          <div className="w-full h-full max-w-6xl space-y-6 mx-auto pb-12 pt-6 px-4">
            <h1 className="text-4xl font-medium text-primary">
              <span className="underline underline-offset-4">du</span>natura Magazin
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog post item */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <ArticlePreview
                  key={i}
                  title="Wie kann man die beste Ernährung für sich finden?"
                  description="Die beste Ernährung für eine Person ist diejenige, die zu ihrem Körper passt."
                  image="/images/blog/bananas.jpg"
                  link={`/blog/${i}` as Route<string>}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
