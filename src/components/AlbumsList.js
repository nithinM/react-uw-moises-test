import React from 'react';
import {connect} from "react-redux";
import { getAlbums } from "../actions/album.action"
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingIndicator from "./common/LoadingIndicator";
import ErrorIndicator from "./common/ErrorIndicator";
import AlbumCard from "./common/AlbumCard";

const DATA_LIMIT =  18;
const loadMoreStyle = {
    margin: "20px 0 40px 0"
};

class AlbumsList extends React.Component {
    state = {
        albums: [],
        items: [],
        hasMore: true,
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
                hasMore: data.hasMore
            });
        }
    };

    renderView = () => {
        const { album: {error, loading} } = this.props;
        const { items, hasMore } = this.state;

        console.log("renderView",  { items, hasMore });

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
            hasMore: data.hasMore
        })
    };

    getNextData = (list) => {
        const { items } = this.state;
        const dataLength = items.length;
        const endIndex = dataLength+DATA_LIMIT;
        const dataLoad = list.slice(dataLength, dataLength+DATA_LIMIT);
        const hasMore = list.slice(dataLength, endIndex + 1).length === DATA_LIMIT + 1;

        return { dataLoad, hasMore }
    };

    render() {
        console.log(this.state);
        const { hasMore } = this.state;
        return (
            <div className="container">
                <Row center="xs">
                    <Col xs={8}>
                        {
                            <Row center="xs">
                                { this.renderView() }
                                { hasMore && (
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList);
