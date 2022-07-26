export interface ICachedJWT {
    accesstoken: string
    fullName: string
    userId: string
    refreshToken: string
    expiresAt: string
    refreshAt: string
}

export type JWTAction = {
    type: string
    article: ICachedJWT
}

export type DispatchType = (args: JWTAction) => JWTAction