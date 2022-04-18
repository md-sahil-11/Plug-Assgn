const data = {
    name: '',
    status: '',
    gender: '',
    image: '',
    id: '',
}

const profileDataReducer = (state = data, action) => {
    switch (action.type) {
        case 'SAVE_PROFILE':
            return {
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}

export default profileDataReducer;