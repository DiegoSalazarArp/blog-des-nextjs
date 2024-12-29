import { PostSanityDocument } from "@/app/types/global";
import BadgeComponent from "@/components/blog/BadgeComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { client, sanityFetch } from "@/sanity/client";
import { myPortableImageComponent } from "@/sanity/utils/function";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

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
      {/* TODO: VERIFICAR */}
      {/* <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || 'Descripción por defecto'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || 'Descripción por defecto'} />
        <meta property="og:image" content={postImageUrl} />
        <meta property="og:url" content={`https://wedieyoung.vercel.app/posts/${post.slug.current}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description || 'Descripción por defecto'} />
        <meta property="twitter:image" content={postImageUrl} />
      </Head> */}
      <div>
        <article className="border-r border-l shadow bg-background">

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
              <div className="mx-auto px-4  tracking-normal 
                prose 
                prose-lg mt-8
                prose-pre:!bg-zinc-100
                prose-code:!text-zinc-900     // Color del texto para modo claro
                dark:prose-pre:!bg-zinc-900
                dark:prose-code:!text-zinc-100  // Color del texto para modo oscuro
                dark:prose-blockquote:bg-lime-400
                dark:prose-strong:text-neutral-500
                dark:prose-a:text-blue-500 
                dark:prose-p:text-neutral-300
                dark:prose-h2:text-neutral-300
                dark:prose-h6:text-neutral-300
                dark:prose-li:text-neutral-300
                prose-blockquote:bg-pink-300
                prose-strong:text-neutral-700
                prose-a:text-blue-700
                prose-p:text-neutral-800
                prose-h2:text-neutral-800">
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
