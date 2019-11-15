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
            const response = await API.remove(`albums/${id}`);
            console.log("deleteAlbum", response);
            dispatch( deleteAlbumSuccess(id) )
        } catch (error) {
            dispatch( deleteAlbumError(error) )
        }
    };
};
