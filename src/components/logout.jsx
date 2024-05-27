import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import api from '../components/api.jsx'; // Import axios instance

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('selectedPengajuan');
                navigate("/login");
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Button variant="primary" onClick={handleLogout} className="ms-5 ubuntu-sans-medium" style={{backgroundColor: '#224B80', fontSize: '.85rem'}}>
            Logout
        </Button>
    );
}

export default Logout;
