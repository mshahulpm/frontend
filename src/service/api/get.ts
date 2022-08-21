import _axios from "../_axios";



export async function getCategories() {
    try {
        const { data } = await _axios.get('/category')
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error)
    }
}


export async function getProducts() {
    try {
        const { data } = await _axios.get('/product')
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export function getOneCategory(id: string) {
    return async () => {
        try {
            const { data } = await _axios.get('/category/' + id)
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export function getProductsByCategory(id: string) {
    return async () => {
        try {
            const { data } = await _axios.get('/product/category/' + id)
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
