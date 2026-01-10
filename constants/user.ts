export type User = {
    username: string;
    password: string;
}

export type AuthState = {
    users: User[];
    user: User | null;
    register: (username: string, password: string) => Promise<boolean>;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    loadUser: () => Promise<void>;
}
