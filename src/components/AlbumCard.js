import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const editIcon = <FontIcon className="material-icons">edit</FontIcon>;
const deleteIcon = <FontIcon className="material-icons">delete</FontIcon>;


const cardStyle = {
    margin: "10px 0 10px 0"
};

const AlbumCard = props => {
    const {title, id, image, editAlbumHandler, deleteAlbumHandler} = props;
    return (
        <Card style={cardStyle}>
            <CardMedia
                overlay={
                    <CardTitle subtitle={title} />
                }>
                <img src={image} alt={title} />
            </CardMedia>
            <CardActions>
                <BottomNavigation>
                    <BottomNavigationItem
                        label="Edit"
                        icon={editIcon}
                        onClick={() => editAlbumHandler(id)}
                    />
                    <BottomNavigationItem
                        label="Delete"
                        icon={deleteIcon}
                        onClick={() => deleteAlbumHandler(id)}
                    />
                </BottomNavigation>
            </CardActions>
        </Card>
    );
};

export default AlbumCard;
