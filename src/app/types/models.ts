export interface User {
  id: string;
  name: string;
  email: string;
  socialLinkProvider: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  tags: string[];
  postedAt: string;
}

export interface PostInteraction {
  id: string;
  userId: string;
  postId: number;
  post?: Post;
}

export type SortByField = 'likes' | 'comments' | 'date';

export type SortOrder = 'asc' | 'desc';
