import Image from "next/image";
import createImageUrlBuilder from "@sanity/image-url";

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
        className="p-10"
        src={urlForImage(value).url()}
        alt="post"
        width={700}
        height={700}
      />
    ),
    callToAction: ({ value, isInline }: any) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction bg-red-500">{value.text}</div>
      ),
  },
};
