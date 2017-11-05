/**
 * 生成用户盐值
 */
export function getSalt() {
  return Math.random().toString(16).slice(2);
}

const HEADER_REGEX = /bearer (.*)$/;
export function extractToken(authorization) {
  return authorization && HEADER_REGEX.exec(authorization)[1].split('$');
}
