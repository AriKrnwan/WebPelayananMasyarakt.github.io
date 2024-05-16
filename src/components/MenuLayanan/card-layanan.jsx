import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

function CardLayanan({ image, title, to }) {
    return (
        <>
            <NavLink to={to} id="card-layanan" className="col">
                <div className="card d-flex px-3 pt-4 align-items-center gap-4">
                    <div className="ilustration">
                        <img src={image} alt="" />
                    </div>
                    <div className="title">
                        <p className="ubuntu-sans-medium text-center">{title}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

CardLayanan.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

export default CardLayanan