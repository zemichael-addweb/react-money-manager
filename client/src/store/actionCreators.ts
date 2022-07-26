import { ICachedJWT, JWTAction } from "../interface/authtypes"
import * as actionTypes from "./actionTypes"

export function saveArticle(article: ICachedJWT) {
    const action: JWTAction = {
        type: actionTypes.ADD_ARTICLE,
        article,
    }

    return simulateHttpRequest(action)
}

export function removeArticle(article: IArticle) {
    const action: ArticleAction = {
        type: actionTypes.REMOVE_ARTICLE,
        article,
    }
    return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: ArticleAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}