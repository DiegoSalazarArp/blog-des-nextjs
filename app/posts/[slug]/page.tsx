import Image from "next/image";
import { client, sanityFetch } from "@/sanity/client";
import { PortableText } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { myPortableImageComponent } from "@/sanity/utils/function";
import imageUrlBuilder from "@sanity/image-url";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BadgeComponent from "@/components/blog/BadgeComponent";
import { PostSanityDocument } from "@/app/types/global";
import { Suspense } from "react";


const POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    "author": author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }
`;

export default async function Page({ params }: { params: { slug: string } }) {
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const post = await sanityFetch<PostSanityDocument>({
    query: POST_QUERY,
    params,
  });

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(600).url()
    : null;

  const avatarImageUrl = urlFor(post.author.image)
    ?.width(1200)
    .height(600)
    .url();

  const avatarNamePrefix = post.author.name.split(" ")[0].charAt(0);


  // console.log(JSON.stringify(post, null, 2));

  return (
    <article className="bg-background">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Image
            src={postImageUrl || "https://via.placeholder.com/550x310"}
            width={1200}
            height={600}
            alt="Blog Post Hero"
            className="rounded-lg object-cover aspect-[2/1]"
          />
          <div className="mt-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex items-center space-x-2  text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div>
                  <Avatar>
                    <AvatarImage src={avatarImageUrl} alt="" />
                    <AvatarFallback>{avatarNamePrefix}</AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <p className="font-medium italic">{post.author.name}</p>
                </div>
              </div>

              <p className="text-sm">
                Published on {new Date(post.publishedAt!).toLocaleDateString()}
              </p>

            </div>
            {post.categories.map((category, i) => {
              return <BadgeComponent key={i} categoryTitle={category.title} />;
            })}
            <div>

            </div>
          </div>
          <div className="prose prose-rose  mt-8 dark:prose-invert  tracking-normal">
            <PortableText
              value={post.body}
              components={myPortableImageComponent}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
