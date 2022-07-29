import { refreshToken } from './authApiService';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Navigate } from 'react-router';

import { iAuthService } from '../interface/authService';
import { ICachedJWT } from '../interface/authTypes';

export class AuthService implements iAuthService {
  //store Token
  returnAccessTokenAsCachedJwt(response: any) {
    if (response.data.token) {
      console.log('saving access token..');
      this.destroyCachedJwt();
      const expiresAt = new Date(
        jwtDecode<JwtPayload>(response.data.token).exp! * 1000
      );
      //const expiresAt = new Date(Date.now() + expiresIn);
      const refreshAt = new Date(
        // Upon user's activity, refresh 5 minutes before token actually expires.
        // User inactivity till the access token expires will force re-authentication
        Date.now().valueOf() + expiresAt.valueOf() - 5 * 60
      );

      const jwt = {
        accessToken: response.data.token,
        fullName: response.data.user.name,
        userId: response.data.user._id,
        refreshToken: response.data.refreshToken,
        expiresAt,
        refreshAt,
      };
      console.log('jwtData', jwt);
      // this.saveCachedJwt(jwt);
      return jwt;
    } else {
      return response;
    }
  }

  refreshToken() {
    let jwt = this.getCachedJwt();
    let refreshTokenToken = jwt.refreshToken;
    this.destroyCachedJwt();
    try {
      jwt.accessToken = refreshToken(refreshTokenToken);
      this.saveCachedJwt(jwt);
      return jwt;
    } catch (error) {
      console.log(error);
      return console.log('error');
    }
  }

  //check the status of the token
  checkCachedJwtStatus = () => {
    let cachedJwt = this.getCachedJwt();
    console.log('cachedJwt', cachedJwt);
    if (Object.keys(cachedJwt).length != 0) {
      if (cachedJwt.refreshAt > new Date().toISOString()) {
        return 'OKAY';
      } else if (cachedJwt.expiresAt <= new Date().toISOString()) {
        return 'EXPIRED';
      } else {
        return 'NEED_REFRESH';
      }
    } else return 'NO_TOKEN';
  };

  getRefreshToken() {
    return JSON.parse(this.getCachedJwt().refreshToken);
  }

  getCachedJwt() {
    return JSON.parse(sessionStorage.getItem('cachedJwt') || '{}');
  }

  getCachedJwtToken() {
    return this.getCachedJwt().accessToken;
  }

  saveCachedJwt(jwt: ICachedJWT) {
    sessionStorage.setItem('cachedJwt', JSON.stringify(jwt));
  }

  destroyCachedJwt() {
    sessionStorage.removeItem('cachedJwt');
  }

  handleLogOut() {
    this.destroyCachedJwt();
    return <Navigate to="/login" />;
  }
}

export default new AuthService();
