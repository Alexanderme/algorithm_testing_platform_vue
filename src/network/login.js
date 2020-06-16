import {request} from "./request";

export function login() {
    return request({
        url: "/login"
    })
}

export function register() {
    return request({
        url: "/register"
    })
}