import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { BsQuestionCircleFill } from "react-icons/bs";
import './input.css';

function InputFile({ label, moreInfo, disabled }) {
    const [files, setFiles] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const handleFileChange = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setFiles(uploadedFiles);
    };

    const handleFileDelete = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <>
            <div className="input-field col-lg-6 py-2 mb-2">
                <div className="label-more mb-1 d-flex align-items-center justify-content-between position-relative">
                    <Form.Label className='ubuntu-sans-medium mb-1' style={{fontSize: '.85rem'}}>{label}</Form.Label>
                    {moreInfo && (
                        <BsQuestionCircleFill size={'14px'} color='#bdbdbd' className="m-0 overflow-hidden"
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
                <Form.Control
                    type="file"
                    required
                    name="files[]"
                    multiple
                    onChange={handleFileChange}
                    style={{fontSize: '.85rem'}}
                    disabled={disabled}
                />
                <div>
                    {files.map((file, index) => (
                        <div key={index}>
                            <span>{file.name}</span>
                            {!disabled && <button onClick={() => handleFileDelete(index)}>Delete</button>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

InputFile.propTypes = {
    label: PropTypes.string.isRequired,
    moreInfo: PropTypes.string,
    disabled: PropTypes.bool
};

InputFile.defaultProps = {
    disabled: false
};

export default InputFile;
