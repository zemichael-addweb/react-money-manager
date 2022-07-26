import { ICachedJWT, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"

const initialState: ICachedJWT = {}

const reducer = (
    state: ICachedJWT = initialState,
    action: JWTAction
): ICachedJWT => {
    switch (action.type) {
        case actionTypes.SAVE_JWT:
            //save the JWT from session storage
            const savedJWT: ICachedJWT = {
            }
            return savedJWT
        case actionTypes.REMOVE_JWT:
            //remove jwt form session storage
            return []
    }
    return state
}

export default reducer