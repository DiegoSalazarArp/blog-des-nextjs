import BackButton from "@/components/blog/BackButtonComponent";
import BadgeComponent from "@/components/blog/BadgeComponent";
import { client, sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

const TAGS_QUERY = `
   *[ _type == 'category' ]
`;

const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && $category in categories[]->title]{
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


export default async function Page({ params }: { params: { tag: string } }) {

  const tags = await sanityFetch<SanityDocument[]>({
    query: TAGS_QUERY,
  });

  const posts = await sanityFetch<SanityDocument>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { category: params.tag },
  })



  console.log(params)


  console.log('post: ', posts)
  return (
    <article className="bg-background">
      <BackButton />
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">

        <div className="flex items-center justify-center">
          {
            tags.map((tag) => (
              <BadgeComponent key={tag._id} categoryTitle={tag.title} />
            ))
          }
        </div>

        <hr />
        <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {posts.map((post: any) => (
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

      </div>
    </article>


  )
}