import BaseResponse from "../model/BaseResponse";


class ApiHelper {
  static isSuccess<T>(res: BaseResponse<T>): boolean {
    // if(!res.status) {
    //   return false
    // }
    // return res.status === 200 || res.status === 201
    return true
  }

  static isTokenFail<T>(res: BaseResponse<T>): boolean {
    // if(!res.status) {
    //   return true
    // }
    // return res.status === 401
    return true
  }
}

export default ApiHelper
