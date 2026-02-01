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
  username: string;
  // add other user fields as needed, except password
};
