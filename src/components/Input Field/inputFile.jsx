import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { BsQuestionCircleFill } from "react-icons/bs";
import './input.css';

function InputFile({ label, moreInfo, name, onChange, disabled, error, filePath, onDownload, showDownloadButton }) {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file ? file.name : '');
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="input-field col-lg-6 py-2 mb-2">
            <div className="label-more mb-1 d-flex align-items-center justify-content-between position-relative lh-1">
                <Form.Label htmlFor={name} className='ubuntu-sans-medium my-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                {moreInfo && (
                    <BsQuestionCircleFill size={14} color='#bdbdbd' className="m-0 overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} 
                    />
                )}
                {moreInfo && isHovered && (
                    <div className="bubble-input p-2 position-absolute rounded">
                        <div className="isi-bubble-chat position-relative">
                            <p className="ubuntu-sans-regular text-white text-center">{moreInfo}</p>
                            <div className="arrow position-absolute"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className="d-flex gap-2">
                <Form.Control
                    type="file"
                    id={name}
                    name={name}
                    required
                    style={{fontSize: '.85rem'}}
                    disabled={disabled}
                    onChange={handleFileChange}
                    isInvalid={!!error} // Add validation state
                    multiple
                />
                {showDownloadButton && filePath && (
                    <button type="button" onClick={() => onDownload(filePath)} className="btn btn-sm btn-primary" style={{fontSize: '.85rem', backgroundColor: '#224B80'}} >Unduh</button>
                )}
            </div>
            {selectedFile && (
                <small className="form-text text-muted">{selectedFile}</small>
            )}
            {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </div>
    );
}

InputFile.propTypes = {
    label: PropTypes.string.isRequired,
    moreInfo: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    filePath: PropTypes.string, // Add filePath prop type
    onDownload: PropTypes.func, // Add onDownload prop type
    showDownloadButton: PropTypes.bool // Add showDownloadButton prop type
};

InputFile.defaultProps = {
    disabled: false,
    error: null,
    filePath: null, // Default filePath to null
    onDownload: () => {}, // Default onDownload to empty function
    showDownloadButton: false // Default showDownloadButton to true
};

export default InputFile;