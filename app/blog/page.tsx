import RoundedContainer from "@/components/custom/RoundedContainer";
import { Route } from "next";
import ArticlePreview from "../../components/custom/ArticlePreview";

export default function BlogPage() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <RoundedContainer title="Magazin">
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
        </RoundedContainer>
      </div>
    </div>
  );
}
