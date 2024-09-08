import { SanityDocument } from "next-sanity";
import Link from "next/link";

interface Author extends SanityDocument {
  name: string;
  bio: string;
}

export default function AuthorComponent({ authors }: { authors: Author[] }) {
  return (
    <>

      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {authors.map((author) => (
          <li className="bg-white p-4 rounded-lg" key={author._id}>
            <Link className="hover:underline" href={`/author/${author.slug.current}`} >
              <h2 className="text-xl font-semibold">{author.name}</h2>
            </Link>
            {/* <p>{author.bio}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
}