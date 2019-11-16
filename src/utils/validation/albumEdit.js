import validator from 'validator'

export default function(values) {
    const errors = {};
    const requiredFields = [
        'title',
        'url'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(typeof values.url !== "undefined") {
        if (!validator.isURL(values.url)) {
            errors.url = 'This field can not be link'
        }
    }


    return errors;
}
