import * as actionTypes from '../actions/actionTypes';

const initialState = {
    list: [],
    loading: false,
    error: null
};

/**
 *
 * @param state
 * @returns {{loading: boolean}}
 */
const getAlbumsStart = (state) => {
    return {
        ...state,
        loading: true
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{albums: *, loading: boolean}}
 */
const getAlbumsSuccess = (state, payload) => {
    return {
        ...state,
        loading: false,
        list: payload
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{loading: boolean, error: *}}
 */
const getAlbumsFail = (state, payload) => {
    return {
        ...state,
        loading: false,
        error: payload
    }
};

const deleteAlbumStart = (state) => {
    return {
        ...state,
        loading: true
    }
};

const deleteAlbumSuccess = (state, payload) => {
    return {
        ...state,
        loading: false,
        list: state.list.filter(album => album.id !== payload)
    }
};

const deleteAlbumFail = (state, payload) => {
    return {
        ...state,
        loading: false,
        error: payload
    }
};

/**
 *
 * @param state
 * @param action
 * @returns {{albums: [], loading: boolean, error: null}|{loading: boolean}|{albums: *, loading: boolean}|{loading: boolean, error: *}}
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALBUM_START: return (getAlbumsStart(state));
        case actionTypes.GET_ALBUM_SUCCESS: return (getAlbumsSuccess(state, action.payload));
        case actionTypes.GET_ALBUM_FAIL: return (getAlbumsFail(state, action.payload));
        case actionTypes.DELETE_ALBUM_START: return (deleteAlbumStart(state));
        case actionTypes.DELETE_ALBUM_SUCCESS: return (deleteAlbumSuccess(state, action.payload));
        case actionTypes.DELETE_ALBUM_FAIL: return (deleteAlbumFail(state, action.payload));
        default: return state;
    }
};

export default userReducer;
