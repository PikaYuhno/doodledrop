export interface APIResponse {
    data: any;
    message: string;
    success: boolean;
}

export interface JWTPayload {
    id: nubmer;
    username: string;
    iat: number;
    exp?: number;
}

export type Action<T extends string, P = undefined> = {
    type: T;
    payload: P;
};

