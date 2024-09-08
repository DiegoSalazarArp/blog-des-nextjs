import BackButton from "@/components/blog/BackButtonComponent";
import BadgeComponent from "@/components/blog/BadgeComponent";
import PostComponent from "@/components/blog/PostComponent";
import { client, sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

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

  const posts = await sanityFetch<Post[]>({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { category: params.tag },
  })



  console.log(params)


  console.log('post: ', posts)
  return (
    <article className="">
      <BackButton />
      <div className=" mx-auto py-12 ">

        <div className="flex items-center justify-center pb-10">
          {
            tags.map((tag) => (
              <BadgeComponent key={tag._id} categoryTitle={tag.title} />
            ))
          }
        </div>

        <hr />
        <div className="pt-5 animate animate-fade-down">

          <PostComponent posts={posts} />


        </div>


      </div>
    </article>


  )
}