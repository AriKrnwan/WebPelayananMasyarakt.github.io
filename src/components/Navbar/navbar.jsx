import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoDinas from '../../assets/images/Logo Pemkot Bontang.svg';
import "../Navbar/navbar.css"
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function CollapsibleExample() {
    const [scrollPosition, setScrollPosition] = useState(0);

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
            <Nav>
                <NavLink to="/home" activeclassname='active' className={`ubuntu-sans-medium px-0 ps-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Beranda</NavLink>
                <NavLink to="/profile" activeclassname='active' className={`ubuntu-sans-medium px-0 ps-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Profile</NavLink>
                <NavLink to="/notifikasi" activeclassname='active' className={`ubuntu-sans-medium px-0 ps-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Notifikasi</NavLink>
                <NavLink to="/login" activeclassname='active' className={`ubuntu-sans-medium px-0 ps-5 text-decoration-none ${scrollPosition > 0 ? 'text-black' : 'text-white'}`}>Logout</NavLink>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default CollapsibleExample;