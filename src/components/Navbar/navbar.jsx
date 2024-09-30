import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import "../Navbar/navbar.css"
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Logout from '../logout.jsx';
import api from "../api";

function CollapsibleExample() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.NIK;
                
                const response = await api.get(`/notifikasi/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Check if there's any unread notification
                const unreadExists = response.data.some(notif => !notif.read_at);
                setHasUnreadNotifications(unreadExists);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" className={`z-3 position-fixed fixed-top ${scrollPosition > 0 ? 'scrolled' : ''}`}>
            <Container>
                <Navbar.Brand className='d-flex' href="#home">
                    <img src={LogoDinas} className='pe-2' alt="" />
                    <div className="namaLogo">
                        <p className={`ubuntu-sans-medium ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Dinas Sosial dan Pemberdayaan</p>
                        <p className={`ubuntu-sans-medium ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Masyarakat Kota Bontang</p>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className='flex-grow-0' id="responsive-navbar-nav">
                    <Nav className='d-flex'>
                        <NavLink to="/home" activeclassname='active' className={`ubuntu-sans-medium px-0 ms-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Beranda</NavLink>
                        <NavLink to="/profile" activeclassname='active' className={`ubuntu-sans-medium px-0 ms-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Profile</NavLink>
                        <NavLink to="/notifikasi" activeclassname='active' className={`ubuntu-sans-medium position-relative px-0 ms-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>
                            {hasUnreadNotifications && (
                                <div className="dot-notif rounded-circle bg-danger position-absolute" style={{width: '8px', height: '8px'}}></div>
                            )}
                            Notifikasi
                        </NavLink>
                        <Logout />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
