const isLoadingReducer = (state = true, action) => {
    switch (action.type) {
        case 'LOADED':
            return false
        case 'LOADING':
            return true
        default:
            return state
    }
}

export default isLoadingReducer;