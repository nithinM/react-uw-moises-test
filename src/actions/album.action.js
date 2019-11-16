import * as API from "../utils/apiHelper";
import * as actionTypes from './actionTypes';

export const getAlbumsStart = () => {
    return {
        type: actionTypes.GET_ALBUM_START
    };
};

export const getAlbumsSuccess = data => {
    return {
        type: actionTypes.GET_ALBUM_SUCCESS,
        payload: data
    };
};

export const getAlbumsError = error => {
    return {
        type: actionTypes.GET_ALBUM_FAIL,
        payload: error
    };
};

export const deleteAlbumStart = () => {
    return {
        type: actionTypes.DELETE_ALBUM_START
    };
};

export const deleteAlbumSuccess = data => {
    return {
        type: actionTypes.DELETE_ALBUM_SUCCESS,
        payload: data
    };
};

export const deleteAlbumError = error => {
    return {
        type: actionTypes.DELETE_ALBUM_FAIL,
        payload: error
    };
};

export const updateAlbumStart = () => {
    return {
        type: actionTypes.UPDATE_ALBUM_START
    };
};

export const updateAlbumSuccess = (id, data) => {
    return {
        type: actionTypes.UPDATE_ALBUM_SUCCESS,
        id,
        payload: data
    };
};

export const updateAlbumError = error => {
    return {
        type: actionTypes.UPDATE_ALBUM_FAIL,
        payload: error
    };
};

export const getAlbums = () => {
    return async dispatch => {
        dispatch( getAlbumsStart() );
        try {
            const response = await API.get("albums/1/photos");
            await dispatch( getAlbumsSuccess(response.data) )
        } catch (error) {
            dispatch( getAlbumsError(error) )
        }
    };
};

export const deleteAlbum = (id) => {
    return async dispatch => {
        dispatch( deleteAlbumStart() );
        try {
            await API.remove(`albums/${id}`);
            dispatch( deleteAlbumSuccess(id) )
        } catch (error) {
            dispatch( deleteAlbumError(error) )
        }
    };
};

export const updateAlbum = (id, payload) => {
    return async dispatch => {
        dispatch( updateAlbumStart() );
        try {
            // const response = await API.remove(`albums/${id}`);
            dispatch( updateAlbumSuccess(id, payload) )
        } catch (error) {
            dispatch( updateAlbumError(error) )
        }
    };
};
