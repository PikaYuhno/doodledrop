export interface APIResponse {
    data: any;
    message: string;
    success: boolean;
}

export interface JWTPayload {
    id: nubmer;
    username: string;
    avatar: string;
    iat: number;
    exp?: number;
}

export type Action<T extends string, P = undefined> = {
    type: T;
    payload: P;
};

export type Channel = {
    id: number;
    room_id: string;
    last_message: string; 
    date: Date;
    notfi: boolean;
    recipients: Recipient[];
};

export type Message = {
    id: number | undefined;
    room_id: string;
    user_id: number;
    receiver_id: number;
    body: string;
    read: boolean;
    created_at: Date;
}

export type Recipient = {
    id: number;
    user_id :number;
    avatar: string;
    username: string;
}

export type ActionCreator<T, R> = (...args: Parameters<T>) => R;

export type User = {
    id: number;
    username: string;
    avatar: string;
    bio: string;
    location: string;
}

export type Doodle = {
    id: number;
    user_id: number;
    image_path: string;
    likes: Array<number>;
    dislikes: Array<number>;
}

export type Comment = {
    id: number;
    doodle_id: number;
    user_id: number;
    content: string;
    created_at: Date;
    like: Array<number>;
    dislikes: Array<number>;
}
