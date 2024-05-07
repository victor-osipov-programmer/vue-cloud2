import { useUserStore } from "./stores/user.store"


interface IQueryOptions {
    method?: string,
    body?: Object,
    token?: string
}

export function query(url: string, {method, body}: IQueryOptions) {
    const user = useUserStore()
    
    if (!method) method = 'GET'

    const options: any = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (body) options.body = JSON.stringify(body);
    if (user.token) options.headers['Authorization'] = 'Bearer ' + user.token;
    
    return fetch('http://localhost:3000' + url, options)
}
export function queryFormData(url: string, {method, body}: IQueryOptions) {
    const user = useUserStore()
    
    if (!method) method = 'GET'

    const options: RequestInit = {
        method,
        headers: {
            
        },
    }
    if (body) options.body = body as BodyInit;
    if (user.token && options.headers) options.headers['Authorization'] = 'Bearer ' + user.token;
    
    return fetch('http://localhost:3000' + url, options)
}

export function downloadBlob(blob, filename = 'download') {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename;
    a.click()
}