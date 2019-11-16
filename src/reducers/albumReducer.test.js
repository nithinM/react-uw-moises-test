import albumReducer from './albumReducer';

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
const defaultState = {
    list: [],
    loading: false,
    error: null
};

describe("albumReducer", () => {
    test("should setup default album values", () => {
        const action = { type: "@@INIT" };
        const state = albumReducer(undefined, action);

        expect(state).toEqual(defaultState);
    });

    test("should get album success", () => {
        const action = {
            type: "GET_ALBUM_SUCCESS",
            payload: albums
        };

        const state = albumReducer(defaultState, action);

        expect(state).toEqual({...defaultState, list: albums});
    });

    test("should delete album success", () => {
        const action = {
            type: "DELETE_ALBUM_SUCCESS",
            payload: albums[2].id
        };

        const state = albumReducer({...defaultState, list: albums}, action);

        const updateList = albums.filter(album => album.id !== albums[2].id);
        expect(state).toEqual({...defaultState, list: updateList});
    });

    test("should update album success", () => {
        const action = {
            type: "UPDATE_ALBUM_SUCCESS",
            id: albums[2].id,
            payload: {title: "Test"}
        };

        const state = albumReducer({...defaultState, list: albums}, action);

        const updateList = albums.map(album => {
            if(album.id === albums[2].id) {
                return {
                    ...album,
                    ...action.payload
                };
            }
            return album;
        });
        expect(state).toEqual({...defaultState, list: updateList});
    });
});
