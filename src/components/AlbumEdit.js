import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import validate from '../utils/validation/albumEdit';

const customContentStyle = {
    width: '350px',
    maxWidth: 'none',
};

const customTitleStyle = {
    borderBottom: "1px solid #dddddd"
};

const buttonStyle = {
    margin: "0 10px",
};

const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

const resetAndClose = (reset, closeHandler) => {
    reset();
    closeHandler();
};

const AlbumEdit = (props)  => {
    const {
        handleSubmit,
        valid,
        reset,
        pristine,
        submitting,
        closeHandler,
        dialogOpen,
        onSubmit,
        initialValues
    } = props;

    return (
        <Dialog
            title={`Edit Album - ${typeof initialValues === "undefined" ? "" : initialValues.title}`}
            titleStyle={customTitleStyle}
            modal={false}
            open={dialogOpen}
            onRequestClose={closeHandler}
            autoScrollBodyContent={true}
            contentStyle={customContentStyle}
        >
            <form onSubmit={handleSubmit(val => {
                onSubmit(val);
                reset();
            })}>
                <Field
                    name="title"
                    component={renderTextField}
                    label="Title"
                    fullWidth={true}
                />
                <Field
                    name="url"
                    component={renderTextField}
                    label="Image Path"
                    fullWidth={true}
                />
                <div className="dialog-button-wrapper">
                    <RaisedButton
                        secondary={true}
                        style={buttonStyle}
                        label="Cancel"
                        onClick={() => resetAndClose(reset, closeHandler)}
                    />
                    <RaisedButton
                        primary={true}
                        style={buttonStyle}
                        type="submit"
                        disabled={!valid || pristine || submitting}
                        label="Update"
                    />
                </div>
            </form>
        </Dialog>
    )
};

export default reduxForm({
    form: 'AlbumEditForm',
    validate,
})(AlbumEdit);
