import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import { myPortableImageComponent } from "@/sanity/utils/function";
import BadgeComponent from "@/components/blog/BadgeComponent";
import { PostSanityDocument } from "@/app/types/global";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Head from "next/head";

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
      image,
      "slug": slug.current
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
    : "https://via.placeholder.com/550x310";
  ;

  const avatarImageUrl = urlFor(post.author.image)
    ?.width(600)
    .height(600)
    .url();

  const avatarNamePrefix = post.author.name.split(" ")[0].charAt(0);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || 'Descripción por defecto'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || 'Descripción por defecto'} />
        <meta property="og:image" content={postImageUrl} />
        <meta property="og:url" content={`https://weedieyoung.vercel.app/posts/${post.slug.current}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description || 'Descripción por defecto'} />
        <meta property="twitter:image" content={postImageUrl} />
      </Head>
      <div>
        <article className="border shadow bg-background">

          <div className="sm:py-8 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto ">
              <Image
                src={postImageUrl || "https://via.placeholder.com/550x310"}
                width={1200}
                height={600}
                alt="Blog Post Hero"
                className="object-fill aspect-[2/1]"
              />
              <div className="mt-8 px-4 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
                <Link href={`/author/${post.author.slug}`}>
                  <div className="mt-4 flex items-center space-x-2  text-muted-foreground hover:underline">
                    <div className=" flex items-center ">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={avatarImageUrl} alt="" />
                        <AvatarFallback>{avatarNamePrefix}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col pl-6 ">
                      <p className="font-medium italic">{post.author.name}</p>
                      <p className="text-sm">
                        Published on {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',

                        })}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* validar primero si existen y luego hacer el map para evitar errores de renderizado */}
                {post.categories && post.categories.map((category, i) => {
                  return <BadgeComponent key={i} categoryTitle={category.title} />;
                })}
                <div>
                </div>
              </div>
              <div className="mx-auto px-4 text-justify tracking-normal prose prose-lg mt-8">
                <PortableText
                  value={post.body}
                  components={myPortableImageComponent}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
