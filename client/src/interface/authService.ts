export interface iAuthService {
  saveAccessTokenAsCachedJwt: Function;
  refreshToken: Function;
  checkCachedJwtStatus: Function;
  getRefreshToken: Function;
  getCachedJwt: Function;
  getCachedJwtToken: Function;
  saveCachedJwt: Function;
  destroyCachedJwt: Function;
  handleLogOut: Function;
}
