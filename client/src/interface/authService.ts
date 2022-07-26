export interface iAuthService {
  saveAccessTokenAsCachedJwt: Function;
  refreshToken: Function;
  checkCachedJwtStatus: Function;
  checkCachedJwtRole: Function;
  getRefreshToken: Function;
  getCachedJwt: Function;
  getCachedJwtToken: Function;
  saveCachedJwt: Function;
  destroyCachedJwt: Function;
  handleLogOut: Function;
}
