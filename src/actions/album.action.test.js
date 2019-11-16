import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    getAlbums,
    getAlbumsSuccess,
    getAlbumsError,
    deleteAlbum,
    deleteAlbumSuccess,
    deleteAlbumError,
    updateAlbum,
    updateAlbumSuccess,
    updateAlbumError
} from "./album.action"

const albums = [
    {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
        "albumId": 1,
        "id": 3,
        "title": "officia porro iure quia iusto qui ipsa ut modi",
        "url": "https://via.placeholder.com/600/24f355",
        "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
        "albumId": 1,
        "id": 4,
        "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        "url": "https://via.placeholder.com/600/d32776",
        "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    }
];

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("getAlbums", () => {
    test("should fetch the albums from server", done => {
        const store = mockStore({});
        store.dispatch(getAlbums()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual("GET_ALBUM_START");
            done();
        });
    });
});

describe("getAlbumsSuccess", () => {
    test("should fetch the albums from server success", () => {
        const action = getAlbumsSuccess(albums[2]);
        expect(action).toEqual({
            type: "GET_ALBUM_SUCCESS",
            payload: albums[2]
        });
    });
});

describe("getAlbumsError", () => {
    test("should fetch the album in server error", () => {
        const action = getAlbumsError("Error");
        expect(action).toEqual({
            type: "GET_ALBUM_FAIL",
            payload: "Error"
        });
    });
});

describe("deleteAlbum", () => {
    test("should delete the album in server", done => {
        const store = mockStore({});
        store.dispatch(deleteAlbum(albums[1].id)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual("DELETE_ALBUM_START");
            done();
        });
    });
});

describe("deleteAlbumSuccess", () => {
    test("should delete the album in server success", () => {
        const action = deleteAlbumSuccess(albums[2].id);
        expect(action).toEqual({
            type: "DELETE_ALBUM_SUCCESS",
            payload: albums[2].id
        });
    });
});

describe("deleteAlbumError", () => {
    test("should delete the album in server error", () => {
        const action = deleteAlbumError("Error");
        expect(action).toEqual({
            type: "DELETE_ALBUM_FAIL",
            payload: "Error"
        });
    });
});

describe("updateAlbum", () => {
    test("should update the album on server", done => {
        const store = mockStore({});
        store.dispatch(updateAlbum(albums[1].id, {title: "test"})).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual("UPDATE_ALBUM_START");
            done();
        });
    });
});

describe("updateAlbumSuccess", () => {
    test("should update the album on server success", () => {
        const updateData = {title: "Test"};
        const action = updateAlbumSuccess(albums[2].id, updateData);
        expect(action).toEqual({
            type: "UPDATE_ALBUM_SUCCESS",
            id: albums[2].id,
            payload: { ...updateData }
        });
    });
});

describe("updateAlbumError", () => {
    test("should update the album on server error", () => {
        const action = updateAlbumError("Error");
        expect(action).toEqual({
            type: "UPDATE_ALBUM_FAIL",
            payload: "Error"
        });
    });
});
