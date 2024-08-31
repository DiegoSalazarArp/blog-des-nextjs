import { SanityDocument } from "next-sanity";

// Interfaz para la imagen
interface Image {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  crop?: {
    _type: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    _type: string;
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Interfaz para el autor
interface Author {
  name: string;
  image: Image;
}

// Interfaz para las categorías
interface Category {
  title: string;
}

// Interfaz para el contenido del cuerpo (body)
interface BodyBlock {
  _key: string;
  _type: string;
  style?: string;
  markDefs?: any[];
  children: Array<{
    _key: string;
    _type: string;
    text: string;
    marks?: string[];
  }>;
}

// Interfaz principal que extiende SanityDocument
export interface PostSanityDocument extends SanityDocument {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  mainImage: Image;
  publishedAt: string | null;
  body: BodyBlock[];
  author: Author;
  categories: Category[];
}