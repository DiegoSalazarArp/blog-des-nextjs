import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

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
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post) => (
          <li className="bg-white p-4 rounded-lg" key={post._id}>
            <Link
              className="hover:underline"
              href={`/posts/${post.slug.current}`}
            >
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="text-gray-500">
                {new Date(post?._createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
