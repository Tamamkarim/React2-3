
// Define User type locally since 'hybrid-types/DBTypes' does not exist
export type User = {
	username: string;
	password: string;
	email: string;
};

export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;