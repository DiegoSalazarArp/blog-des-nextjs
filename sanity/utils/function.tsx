import Image from "next/image";
import createImageUrlBuilder from "@sanity/image-url";

import SyntaxHighlighter from "react-syntax-highlighter";

export const imageBuilder = createImageUrlBuilder({
  projectId: "wzdvjy51",
  dataset: "production",
});

export const urlForImage = (source: typeof Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};

export const myPortableImageComponent = {
  types: {
    image: ({ value }: any) => (
      <Image
        className="p-2"
        src={urlForImage(value).url()}
        alt="post"
        width={700}
        height={700}
      />
    ),
    code: ({ value }: any) => (
      <SyntaxHighlighter
        language={value.language || "text"}
        showLineNumbers={true}
      >
        {value.code}
      </SyntaxHighlighter>
    ),
    callToAction: ({ value, isInline }: any) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction bg-red-500">{value.text}</div>
      ),
  },
};
