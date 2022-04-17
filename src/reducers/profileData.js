const data = {
    name: '',
    status: '',
    gender: '',
    image: '',
}

const profileDataReducer = (state = data, action) => {
    switch (action.type) {
        case 'SAVE_PROFILE':
            return action.payload
        default:
            return state
    }
}

export default profileDataReducer;