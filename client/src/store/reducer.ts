import { ICachedJWT, ICachedJWTEmpty, IState, JWTAction } from "../interface/authTypes"
import * as actionTypes from "./actionTypes"

import AuthService from "../services/AuthService"

const initialState: IState = {
    loggedIn: false,
    savedJWT: {}
}

export const JWTReducer = (
    state: IState = initialState,
    action: JWTAction
): IState => {
    switch (action.type) {
        case actionTypes.SAVE_JWT:
            console.log('Saving jwt..')
            let JwtToSave: any = action.JWT
            AuthService.saveCachedJwt(JwtToSave)
            const savedJWT: ICachedJWT | ICachedJWTEmpty = JwtToSave
            return { loggedIn: true, savedJWT: savedJWT }

        case actionTypes.CHECK_LOGGED_IN:
            console.log('Checking session state...')
            const status = AuthService.checkCachedJwtStatus()
            const cachedJWT = AuthService.getCachedJwt()
            console.log('JWT Status', status)
            console.log('JWT', cachedJWT)
            if (status === 'OKAY' || status === 'NEED_REFRESH') {
                return { loggedIn: true, savedJWT: cachedJWT }
            } else return { loggedIn: false, savedJWT: {} }

        case actionTypes.REMOVE_JWT:
            console.log('logging out...')
            AuthService.handleLogOut()
            return { loggedIn: false, savedJWT: {} }
        default: return state
    }
}