// import { BsList } from "react-icons/bs";
// import LogoPemkot from "../assets/images/Logo Pemkot Bontang.svg"
import { BsFillPersonFill } from "react-icons/bs";
import Logout from "../components/logout";
import { NavLink } from "react-router-dom";


function Topbar() {
    const getRole = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user.role;
    };
    const role = getRole();
    const rolePrefix = role === 1 ? '/admin' : role === 3 ? '/kadis' : '';
    const roleText = role === 1 ? 'Admin Side' : role === 3 ? 'Kadis Side' : '';

    return (
        <>
            <div className="topbar w-100 px-4 py-2 bg-white" style={{boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="ubuntu-sans-medium m-0">{roleText}</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <NavLink to={`${rolePrefix}/profile`} className="btn btn-primary d-flex" style={{marginRight: '-40px'}}>
                            <BsFillPersonFill /> 
                            <p className="ubuntu-sans-medium" style={{fontSize: '.85rem'}}>Profile</p>
                        </NavLink>
                        <Logout />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topbar