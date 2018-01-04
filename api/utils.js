/**
 * 生成用户盐值
 */

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#$%^&*()_=+!~.>?/,][';
export function getSalt(len = 32){
  const max = CHARS.length;
  let str = '';
  for (let i = 0; i < len; i++) {
　　　　str += chars.charAt(Math.floor(Math.random() * max));
  }
  return str;
};

const HEADER_REGEX = /bearer (.*)$/;
export function extractToken(authorization) {
  return authorization && HEADER_REGEX.exec(authorization)[1].split('$');
}
