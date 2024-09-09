import { SanityDocument } from "next-sanity";
import Link from "next/link";


interface PostProps extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };

};


export default function PostComponent({ posts }: { posts: PostProps[] }) {

  console.log(posts)
  return (
    <>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post) => (
          <li className="bg-white p-4 rounded-lg" key={post._id}>
            <Link
              className="hover:underline"
              href={`/posts/${post.slug.current}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">{post?.title}</h2>
                  <p className="text-gray-500">
                    {new Date(post.publishedAt!).toLocaleDateString()}
                  </p>
                </div>
                <div className="">
                  <h1>by {post.authorName}</h1>

                </div>
              </div>
            </Link>
          </li>
        ))}

      </ul></>
  )
}