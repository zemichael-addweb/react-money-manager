import { DispatchType, ICachedJWT, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"

export function saveArticle(article: ICachedJWT) {
    const action: JWTAction = {
        type: actionTypes.SAVE_JWT,
        article,
    }

    return simulateHttpRequest(action)
}

export function removeArticle(article: ICachedJWT) {
    const action: JWTAction = {
        type: actionTypes.REMOVE_JWT,
        article,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: JWTAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}