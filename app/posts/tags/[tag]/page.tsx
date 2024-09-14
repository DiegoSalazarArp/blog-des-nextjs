import BadgeComponent from "@/components/blog/BadgeComponent";
import PostComponent from "@/components/blog/PostComponent";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
}

const TAGS_QUERY = `
   *[ _type == 'category' ]
`;

const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && $category in categories[]->title] | order(publishedAt desc){
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

  const posts = await sanityFetch<Post[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { category: params.tag },
  })

  return (
    <article className="">
      <div className=" mx-auto py-12 ">
        <div className="flex items-center justify-center pb-10">
          {
            tags.map((tag) => (
              <BadgeComponent key={tag._id} categoryTitle={tag.title} />
            ))
          }
        </div>
        <hr />
        <div className="pt-5">
          <PostComponent posts={posts} />
        </div>
      </div>
    </article>


  )
}