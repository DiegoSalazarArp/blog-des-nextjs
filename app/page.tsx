import PostComponent from "@/components/blog/PostComponent";
import BannerTitle from "@/components/site/BannerTitle";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
}

const EVENTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "author": author->{
      name,
      image
    }
  }
`;
export default async function IndexPage() {
  const posts = await sanityFetch<Post[]>({ query: EVENTS_QUERY });

  return (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col items-center gap-6 justify-center mt-20">

        <BannerTitle className="md:text-[100px] text-[45px]" title="we_die_young" />
        <p className="text-slate-300 italic">enjoy the club</p>
      </div>
      <hr />

      <div className="flex flex-col justify-center ">
        <h1 className="text-4xl font-bold tracking-tighter my-6">Latest Post</h1>
        <PostComponent posts={posts} />

      </div>
    </div>
  );
}
