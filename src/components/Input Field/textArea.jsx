import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function TextArea({ label, placeholder, disabled }) {
    return (
        <>
            <div className="input-field col-lg-6 py-2 mb-2">
                <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                <textarea className='form-control' disabled={disabled} type="text area" placeholder={placeholder} style={{fontSize: '.85rem'}} required />
            </div>
        </>
    )
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

TextArea.defaultProps = {
    disabled: false
};

export default TextArea