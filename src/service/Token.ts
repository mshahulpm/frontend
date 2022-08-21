import cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { _time } from '../constants/time'


export function setToken(token: string) {

    const decoded: any = decodeToken(token)

    if (decoded) {

        const exp = new Date(((decoded.exp * 1000) - _time.day))

        cookie.set('Authorization', token, {
            expires: exp
        })
    }
}

export const verifyToken = (token?: string) => {

    token = token || getAuthToken() as string
    const decoded = decodeToken(token) as any
    if (!decoded) return false
    const isExpired = (decoded.exp * 1000) < Date.now()
    if (isExpired) return false
    return true

}

export const getAuthToken = () => cookie.get('Authorization')
export const deleteAuthToken = () => cookie.remove('Authorization')

export function getAuthDetails(token?: string) {

    token = token || cookie.get('Authorization')
    const decode = decodeToken(token as string) as any
    if (decode) {
        return {
            isAuthorized: true,
            user: decode
        }
    } else {
        return {
            isAuthorized: false,
            user: null
        }
    }
}


export function decodeToken(token: string) {
    try {
        return jwtDecode(token)
    } catch (error) {
        return false
    }
}


export const logout = (cb?: VoidFunction) => {

    deleteAuthToken()
    if (cb) cb()
    window.location.href = '/login'

} 