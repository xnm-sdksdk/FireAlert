export interface User {
    username: string;
    password: string;
}

export interface AuthState {
    users: User[];
    user: User | null;
    register: (username: string, password: string) => Promise<boolean>;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => void;
    loadUser: () => void;
}
