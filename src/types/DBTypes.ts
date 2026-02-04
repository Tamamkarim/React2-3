export type MediaItem = {
  media_id: number;
  user_id: number;
  filename: string;
  thumbnail: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string;
  created_at: string;
  screenshots: string[];
};

export type MediaItemWithOwner = MediaItem & { username: string };

export type UserWithNoPassword = {
  user_id?: number;
  username: string;
  email?: string;
  level_name?: string;
  created_at?: string;
};
