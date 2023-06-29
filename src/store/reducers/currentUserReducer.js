const defaultState = {
    currentUser: {}
}

const currentUserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {...state, currentUser: action.payload}

        default:
            return state
    }
}

export default currentUserReducer