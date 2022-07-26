import { ICachedJWT, ICachedJWTEmpty, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"

const initialState: ICachedJWT | ICachedJWTEmpty = {}

const reducer = (
    state: ICachedJWT | ICachedJWTEmpty = initialState,
    action: JWTAction
): ICachedJWT | ICachedJWTEmpty => {
    switch (action.type) {
        case actionTypes.SAVE_JWT:
            //save the JWT from session storage
            const savedJWT: ICachedJWT | ICachedJWTEmpty = {
            }
            return savedJWT
        case actionTypes.REMOVE_JWT:
            //remove jwt form session storage
            return []
    }
    return state
}

export default reducer