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

/**
 *
 * @param state
 * @returns {{loading: boolean}}
 */
const deleteAlbumStart = (state) => {
    return {
        ...state,
        loading: true
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{loading: boolean, list: *}}
 */
const deleteAlbumSuccess = (state, payload) => {
    return {
        ...state,
        loading: false,
        list: state.list.filter(album => album.id !== payload)
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{loading: boolean, error: *}}
 */
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
 * @returns {{loading: boolean}}
 */
const updateAlbumStart = (state) => {
    return {
        ...state,
        loading: true
    }
};

/**
 *
 * @param state
 * @param id
 * @param payload
 * @returns {{loading: boolean, list: *}}
 */
const updateAlbumSuccess = (state, id, payload) => {
    const updatedList = state.list.map(album=> {
    if (album.id === id) {
        return {
            ...album,
            ...payload
        };
    } else {
        return album;
    }});

    return {
        ...state,
        loading: false,
        list: updatedList
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{loading: boolean, error: *}}
 */
const updateAlbumFail = (state, payload) => {
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
        case actionTypes.UPDATE_ALBUM_START: return (updateAlbumStart(state));
        case actionTypes.UPDATE_ALBUM_SUCCESS: return (updateAlbumSuccess(state, action.id, action.payload));
        case actionTypes.UPDATE_ALBUM_FAIL: return (updateAlbumFail(state, action.payload));
        default: return state;
    }
};

export default userReducer;
