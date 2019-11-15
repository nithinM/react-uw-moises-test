import React from 'react';
import {connect} from "react-redux";
import {deleteAlbum, getAlbums} from "../actions/album.action"
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {toastr} from 'react-redux-toastr'
import LoadingIndicator from "./common/LoadingIndicator";
import ErrorIndicator from "./common/ErrorIndicator";
import AlbumCard from "./AlbumCard";

const DATA_LIMIT =  18;
const loadMoreStyle = {
    margin: "20px 0 40px 0"
};

class AlbumsList extends React.Component {
    state = {
        albums: [],
        items: [],
        hasMore: true,
        endIndex: 0
    };

    async componentDidMount() {
        await this.props.getAlbums();
    }

    componentDidUpdate(prevProps, prevState) {
        const { album } = this.props;
        if (prevProps.album.list.length === 0 && album.list.length > 0) {
            console.log(album.list.length, prevProps.album.list.length, );
            const data = this.getNextData(album.list);
            this.setState({
                albums: [...album.list],
                items: data.dataLoad,
                hasMore: data.hasMore,
                endIndex: data.endIndex
            });
        }

        if (prevProps.album.list.length > album.list.length) {
            const data = this.getNextData(album.list, true);
            this.setState({
                albums: [...album.list],
                items: data.dataLoad,
                hasMore: data.hasMore,
                endIndex: data.endIndex
            });
        }
    };

    renderView = () => {
        const { album: {error, loading} } = this.props;
        const { items } = this.state;

        if ( loading ) {
            return <LoadingIndicator/>
        }

        if ( error ) {
            return <ErrorIndicator error={error} />
        }

        return (
            items.map(item => {
                return (
                    <Col key={item.id}  xs={4}>
                        <AlbumCard
                            title={item.title}
                            id={item.id}
                            image={item.url}
                            deleteAlbumHandler={this.deleteAlbumHandler}
                            editAlbumHandler={this.editAlbumHandler}
                        />
                    </Col>
                )
            })
        )
    };

    fetchMoreData = () => {
        const { albums, items } = this.state;
        const data = this.getNextData(albums);

        if(!data.hasMore) {
            this.setState({ hasMore: false });
            return;
        }

        this.setState({
            items: [ ...items, ...data.dataLoad],
            hasMore: data.hasMore,
            endIndex: data.endIndex
        })
    };

    getNextData = (list, sameEndIndex = false) => {
        const { items, endIndex: stateEndIndex } = this.state;
        const dataLength = items.length;
        const endIndex = sameEndIndex ? stateEndIndex : stateEndIndex + DATA_LIMIT;
        console.log({endIndex});
        const dataLoad = list.slice(dataLength, dataLength+DATA_LIMIT);
        const hasMore = list.slice(dataLength, endIndex + 1).length === DATA_LIMIT + 1;

        return { dataLoad, hasMore, endIndex}
    };

    deleteAlbumHandler = (id) => {
        console.log("deleteAlbumHandler", id);
        const toastrConfirmOptions = {
            onOk: async () => {
                try {
                    await this.props.deleteAlbum(id);
                    toastr.success('Success', 'Album successfully deleted')
                } catch (e) {
                    console.log(e);
                }
            },
        };
        toastr.confirm('Are you sure about that!', toastrConfirmOptions);
    };

    editAlbumHandler = (id) => {
        console.log("editAlbumHandler", id);
    };

    render() {
        const { hasMore, loading } = this.state;
        return (
            <div className="container">
                <Row center="xs">
                    <Col xs={8}>
                        {
                            <Row center="xs">
                                { this.renderView() }
                                { !loading && hasMore && (
                                    <RaisedButton
                                        label="Load more"
                                        style={loadMoreStyle}
                                        onClick={() => this.fetchMoreData()}
                                    />
                                )}
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        album: state.album,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbums: () => {
            dispatch(getAlbums());
        },
        deleteAlbum: (id) => {
            dispatch(deleteAlbum(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
