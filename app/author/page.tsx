import AuthorComponent from "@/components/blog/AuthorComponent";
import { sanityFetch } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

interface Author extends SanityDocument {
  name: string
  slug: {
    current: string
  }
  bio: string
}

const AUTHORS_QUERY = `
  *[_type == "author"]{
    _id,
    name,
    slug,
    bio
  }`;

export default async function AuthorPage() {
  const authors = await sanityFetch<Author[]>({ query: AUTHORS_QUERY });

  console.log(authors)



  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter">Authors</h1>
      <AuthorComponent authors={authors} />
    </>

  )
}