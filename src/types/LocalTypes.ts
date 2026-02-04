
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