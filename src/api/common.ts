import request from '@/utils/request'
import { ILoginInfo, ILoginResponse } from './types/common'

export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/admin/login/info'
  })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/admin/captcha_pro',
    params: {
      stamp: Date.now() // 添加时间戳传参 避免出现缓存情况 导致图片不更新
    },
    responseType: 'blob' // 请求获取图片数据
  })
}

export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => {
  return request<ILoginResponse>({
    method: 'POST',
    url: '/admin/login',
    data
  })
}

export const logout = () => {
  return request({
    method: 'GET',
    url: '/admin/setting/admin/logout'
  })
}
