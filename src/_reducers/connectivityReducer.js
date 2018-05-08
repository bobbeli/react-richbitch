export default function reducer(state = {
    isOnline: false,
    stripeLoaded: false,
}, action) {
    switch (action.type) {
        case 'SET_CONNECTIVITY':
            return {
                ...state,
                isOnline: action.isOnline
            };
        case 'STRIPE_LOADED':
            return {
                ...state,
                stripeLoaded: action.isLoaded
            };
        default:
            return state
    }
}

