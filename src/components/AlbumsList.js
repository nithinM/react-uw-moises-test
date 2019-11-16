import React from 'react';
import {connect} from "react-redux";
import {deleteAlbum, getAlbums, updateAlbum} from "../actions/album.action"
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import {toastr} from 'react-redux-toastr'
import LoadingIndicator from "./common/LoadingIndicator";
import ErrorIndicator from "./common/ErrorIndicator";
import AlbumCard from "./AlbumCard";
import AlbumEdit from "./AlbumEdit";

const DATA_LIMIT =  18;
const loadMoreStyle = {
    margin: "20px 0 40px 0"
};

class AlbumsList extends React.Component {
    state = {
        albums: [],
        items: [],
        hasMore: true,
        endIndex: 0,
        isDialogOpen: false,
        editAlbumId: null
    };

    async componentDidMount() {
        await this.props.getAlbums();
    }

    componentDidUpdate(prevProps, prevState) {
        const { album } = this.props;
        if (prevProps.album.list.length === 0 && album.list.length > 0) {
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

        if (prevProps.album.list.length === album.list.length &&
            prevProps.album.list.length > 0 &&
            JSON.stringify(prevProps.album.list) !== JSON.stringify(album.list)
        ) {
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
        const startIndex = sameEndIndex ? 0 : dataLength;
        const endIndex = sameEndIndex ? stateEndIndex : stateEndIndex + DATA_LIMIT;
        const dataLoad = list.slice(startIndex, endIndex);
        const hasMore = list.slice(startIndex, endIndex + 1).length === DATA_LIMIT + 1;

        return { dataLoad, hasMore, endIndex}
    };

    deleteAlbumHandler = (id) => {
        const toastrConfirmOptions = {
            onOk: async () => {
                try {
                    await this.props.deleteAlbum(id);
                    toastr.success('Success', 'Album successfully deleted');
                } catch (e) {
                    toastr.error('Error', 'Something went wrong, please try again later.');
                }
            },
        };
        toastr.confirm('Are you sure about that!', toastrConfirmOptions);
    };

    editAlbumHandler = (id) => {
        this.setState({
            isDialogOpen: true,
            editAlbumId: id,
        })
    };

    dialogCloseHandler = () => {
        this.setState({
            isDialogOpen: false
        })
    };

    onSubmitHandler = async (form) => {
        const { updateAlbum } = this.props;
        const { editAlbumId } = this.state;

        try {
            await updateAlbum(editAlbumId, form);
            toastr.success('Success', 'Album successfully updated');
            this.setState({
                isDialogOpen: false
            })
        } catch (e) {
            toastr.error('Error', 'Something went wrong, please try again later.');
        }


    };

    render() {
        const { hasMore, loading, isDialogOpen, items, editAlbumId } = this.state;
        return (
            <div className="container">
                <Row center="xs">
                    <Col xs={8}>
                        <h1>Albums</h1>
                    </Col>
                </Row>
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
                <AlbumEdit
                    dialogOpen={isDialogOpen}
                    closeHandler={this.dialogCloseHandler}
                    onSubmit={(formValues) => this.onSubmitHandler(formValues)}
                    initialValues={items.filter(item => item.id === editAlbumId)[0]}
                />
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
        },
        updateAlbum: (id, payload) => {
            dispatch(updateAlbum(id, payload));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
