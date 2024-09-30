import { NavLink } from "react-router-dom";
import CardInformasi from "./card-informasi";
import "./informasi.css";

function Informasi() {
    return (
        <>
            <div className="info-and-more d-flex justify-content-between align-items-end mt-5 mb-2 mx-auto">
                <div className="info">
                    <h4 className="ubuntu-sans-medium mb-0">Informasi</h4>
                </div>
                <div className="more">
                    <NavLink to='/informasi' className="more-info ubuntu-sans-medium" style={{fontSize: '.9rem', color: '#333', textDecoration: 'none'}}>Informasi Lainnya</NavLink>
                </div>
            </div>
            <div className="row g-3 mx-auto">
                <CardInformasi maxItems={3} />
            </div>
        </>
    );
}

export default Informasi;
