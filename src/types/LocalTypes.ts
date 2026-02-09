import type {UserWithNoPassword, MediaItem} from './DBTypes';

// Local user type including password, used for auth-related payloads
export type User = {
  user_id?: number;
  username: string;
  password: string;
  email?: string;
  level_name?: string;
  created_at?: string;
};

export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<
  User,
  'username' | 'password' | 'email'
>;

export type LoginResponse = {
  token: string;
  user: UserWithNoPassword;
  message?: string;
};

export type AvailableResponse = {
  available: boolean;
  message?: string;
};

export type MediaResponse = {
  message?: string;
  data: MediaItem;
};

export type UploadResponse = {
  message?: string;
  data: Record<string, unknown>;
};

export type UserResponse = {
  user: UserWithNoPassword;
  message?: string;
};

export type AuthContextType = {
  user: UserWithNoPassword | null;
  loading: boolean;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};