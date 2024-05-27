import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputNumber({ label, placeholder, disabled, name, value, onChange, error }) {
    const handleChange = (e) => {
        const { name, value } = e.target; // Pastikan kita mendapatkan `name` dari `e.target`
        if (onChange) {
            onChange(name, value); // Kirim `name` dan `value` secara langsung
        }
    };

    return (
        <div className="input-field col-lg-6 py-2 mb-2">
            <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
            <Form.Control
                disabled={disabled}
                type="number"
                placeholder={placeholder}
                style={{fontSize: '.85rem'}}
                name={name}
                value={value}
                onChange={handleChange}
                required
                isInvalid={!!error} // Add validation state
            />
            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </div>
    );
}

InputNumber.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accept string or number
    onChange: PropTypes.func,
    error: PropTypes.string // Add error prop type
};

InputNumber.defaultProps = {
    disabled: false,
    error: null // Default error to null
};

export default InputNumber;
