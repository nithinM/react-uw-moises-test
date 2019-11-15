import {get} from "../utils/apiHelper";
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

export const getAlbums = () => {
    return async dispatch => {
        dispatch( getAlbumsStart() );
        try {
            const response = await get("albums/1/photos");
            dispatch( getAlbumsSuccess(response.data) )
        } catch (error) {
            dispatch( getAlbumsError(error) )
        }
    };
};
