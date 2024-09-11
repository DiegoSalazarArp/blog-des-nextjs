import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, sanityFetch } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, SanityDocument } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PostComponent from "@/components/blog/PostComponent";
import { myPortableImageComponent } from "@/sanity/utils/function";
import BackButton from "@/components/blog/BackButtonComponent";

interface Author extends SanityDocument {
  slug: string;
}

interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
}

const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  bio,
  slug,
  "imageUrl": image.asset->url
}`
const POST_QUERY = `*[_type == "post" && author._ref == $id]  | order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  "author": author->{
      name,
      image
    }
}`

export default async function Page({ params }: { params: { slug: string } }) {

  const { projectId, dataset } = client.config()

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const author = await sanityFetch<Author>({ query: AUTHOR_QUERY, params });

  const authorImageUrl = author.imageUrl
    ? urlFor(author.imageUrl)?.width(600).height(600).url()
    : null;

  const posts = await sanityFetch<Post[]>({ query: POST_QUERY, params: { id: author._id } });


  return (
    <div>

      <BackButton />

      <div>
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-1/3 flex items-start justify-center">
                <Avatar className="w-40 h-40 sm:w-full sm:h-auto aspect-square border-4 border-slate-200">
                  <AvatarImage src={authorImageUrl || ` /placeholder.svg?height=300&width=300`} alt="Jane Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div className="sm:w-2/3 space-y-4">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold">{author.name}</h2>
                </div>
                <div className="prose prose-rose mt-8 dark:prose-invert  tracking-normal">
                  <PortableText
                    value={author.bio}
                    components={myPortableImageComponent}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="">
          <h1 className="text-4xl my-10 font-bold tracking-tighter">Posts by {author.name}</h1>
          <PostComponent posts={posts} />
        </div>
      </div>
    </div>
  )
}