export default function(values) {
    const errors = {};
    const requiredFields = [
        'firstName'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    return errors;
}
