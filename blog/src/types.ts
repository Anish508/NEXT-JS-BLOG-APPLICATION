// src/types.ts
export type ISODateString = string;

export interface Author {
  id: string;
  name: string;
  email: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  emailVerified: boolean | null;
}

export interface Post {
  id: number;
  title: string | null;
  content: string;
  description?: string | null;
  slug: string;
  authorId: string;
  author?: Author | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
