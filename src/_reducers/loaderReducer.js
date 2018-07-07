export default function reducer(state = {
    loading: true,
}, action) {
    switch (action.type) {
        case 'LOADER_START':
            return {
                ...state,
                loading: true,
            };
        case 'LOADER_STOP':
            return {
                ...state,
                loading: false,
            };
        default:
            return state
    }
}
