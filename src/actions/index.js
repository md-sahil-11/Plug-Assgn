export const saveProfile = data => {
    return {
        type: 'SAVE_PROFILE',
        payload: data
    }
}

export const signin = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const signout = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const loading = () => {
    return {
        type: 'LOADING'
    }
}

export const loaded = () => {
    return {
        type: 'LOADED'
    }
}

export const saveId = (id) => {
    return {
        type: 'SAVE_ID',
        payload: id
    }
}

export const deleteId = () => {
    return {
        type: 'DELETE_ID'
    }
}