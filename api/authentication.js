import { extractToken } from './utils';

// 认证系统
export async function authenticate(authorization, token) {
  const [uid, accessToken] = extractToken(authorization);
  const result = accessToken ? await token.authAccessToken(uid, accessToken) : false;
  return result;
}
