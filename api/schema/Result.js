/*
 *  mutation 返回结果
 *  ID 返回数据
 *  retCode 返回结果类型 0: 成功  1: 错误
 *  erorr 错误描述
 */
const Result = `
  type Result {
    id: ID
    retCode: Int
    error: String
  }
`;

export default Result;
