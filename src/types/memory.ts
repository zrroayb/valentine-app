export interface Memory {
  id: string;
  date: string;
  imageUrl: string;
  caption: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
} 