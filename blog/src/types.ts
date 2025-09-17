// src/types.ts
export type ISODateString = string;

export interface Author {
  id: string;
  name: string;
  email: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  emailVerified: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  description?: string;
  slug: string;
  authorId: string;
  author?: Author;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
export interface PostContentProps {
  post: {
    id: number;
    title: string;
    content: string;
    description?: string | null;
    slug: string;
    author: {
      name: string;

      createdAt: ISODateString;
      updatedAt: ISODateString;
    };
  };
  isAuthor: boolean;
}

// types.ts
export interface DeletePostButtonProps {
  postId: number;
}
