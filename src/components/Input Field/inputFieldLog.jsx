import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputFieldLog({ label, placeholder, disabled }) {
    return (
        <>
            <div className="input-field col py-2 mb-2">
                <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                <Form.Control disabled={disabled} type="text" placeholder={placeholder} style={{fontSize: '.85rem'}} required />
            </div>
        </>
    )
}

InputFieldLog.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

InputFieldLog.defaultProps = {
    disabled: false
};

export default InputFieldLog