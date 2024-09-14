import { SanityDocument } from "next-sanity";
import Link from "next/link";
import TagsComponent from "./TagsComponent";

interface PostProps extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  categories?: { title: string; _id: string }[]; // Asegúrate de que categories es opcional

};

export default function PostComponent({ posts }: { posts: PostProps[] }) {

  return (
    <>
      <ul className="grid grid-cols-1 gap-12">
        {posts.map((post) => (
          <li className="bg-white p-4 rounded-lg shadow-lg" key={post._id}>
            <Link
              className="hover:underline"
              href={`/posts/${encodeURIComponent(post.slug.current)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">{post?.title}</h2>
                  <p className="text-gray-500">
                    {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',

                    })}
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-end">
                  <h1>by {post.author.name}</h1>

                  <div className="flex justify-end">
                    {post.categories && post.categories.map((category) => (
                      <TagsComponent categoryTitle={category.title} key={category._id} />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}