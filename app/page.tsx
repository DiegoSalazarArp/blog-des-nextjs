import PostComponent from "@/components/blog/PostComponent";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
}

const EVENTS_QUERY = `
  *[_type == "post"]{
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
    <>
      <h1 className="text-4xl font-bold tracking-tighter">Post</h1>
      <PostComponent posts={posts} />
    </>
  );
}
