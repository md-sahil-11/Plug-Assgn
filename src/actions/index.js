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