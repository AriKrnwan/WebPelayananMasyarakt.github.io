import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function TextAreaLog({ label, placeholder, disabled, value, onChange, name, error, col }) {
    return (
        <div className={`input-field ${col} py-2 mb-2`}>
            <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
            <textarea 
                className={`form-control ${error ? 'is-invalid' : ''}`} 
                disabled={disabled} 
                placeholder={placeholder} 
                style={{fontSize: '.85rem'}} 
                value={value} 
                onChange={onChange} 
                name={name} 
                required 
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

TextAreaLog.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string, // Add error prop type
    col: PropTypes.string // Add col prop type
};

TextAreaLog.defaultProps = {
    disabled: false,
    error: null, // Default error to null
    col: 'col' // Default col to 'col'
};

export default TextAreaLog;
