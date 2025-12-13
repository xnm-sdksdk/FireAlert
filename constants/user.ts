export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    signIn: (user: User) => Promise<void>;
    signOut: () => Promise<void>;
    loadUser: () => Promise<void>;
}