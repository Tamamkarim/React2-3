
// Define User type locally since 'hybrid-types/DBTypes' does not exist
import type {UserWithNoPassword} from './DBTypes';

export type User = {
	username: string;
	password: string;
	email: string;
};

export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

export type AuthContextType = {
	user: UserWithNoPassword | null;
	handleLogin: (credentials: Credentials) => Promise<void>;
	handleLogout: () => void;
	handleAutoLogin: () => Promise<void>;
};

// API response types (replacing 'hybrid-types/MessageTypes')

export type AvailableResponse = {
	available: boolean;
};

export type LoginResponse = {
	token: string;
	user: UserWithNoPassword;
};

export type UserResponse = {
	user: UserWithNoPassword;
};

export type UploadResponse = {
	data: Record<string, unknown>;
};

// Adjust as needed if your Media API returns a more specific shape
export type MediaResponse = unknown;