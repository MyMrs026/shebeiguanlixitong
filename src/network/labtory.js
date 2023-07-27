import { request } from "./request";

export function getLabList() {
  return request({
    url:'/lab/getLabList'
  })
}