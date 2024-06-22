import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import { Form, Table } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import api from "../components/api";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";

function Users() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/all-user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Expected an array but got:', typeof response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage * entriesPerPage < filteredUsers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page whenever entries per page changes
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page whenever search term changes
    };

    const filteredUsers = users.filter(user => {
        const NIK = user.NIK ? user.NIK.toString().toLowerCase() : "";
        const nama = user.nama ? user.nama.toLowerCase() : "";
        const email = user.email ? user.email.toLowerCase() : "";
        const alamat = user.alamat ? user.alamat.toLowerCase() : "";
        const role = user.role === 1 ? 'admin' : 'pengguna';

        return (
            NIK.includes(searchTerm.toLowerCase()) ||
            nama.includes(searchTerm.toLowerCase()) ||
            email.includes(searchTerm.toLowerCase()) ||
            alamat.includes(searchTerm.toLowerCase()) ||
            role.includes(searchTerm.toLowerCase())
        );
    });

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredUsers.length);
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const deleteUser = async (NIK) => {
        // Tampilkan SweetAlert untuk konfirmasi penghapusan
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Anda akan menghapus pengguna dengan NIK: ${NIK}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await api.delete(`/user/${NIK}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        Swal.fire(
                            'Terhapus!',
                            'Pengguna berhasil dihapus.',
                            'success'
                        ).then(() => {
                            fetchData(); // Ambil ulang data setelah penghapusan berhasil
                        });
                    } else {
                        Swal.fire(
                            'Gagal!',
                            'Gagal menghapus pengguna.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire(
                        'Error!',
                        'Terjadi kesalahan saat menghapus pengguna.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <>
            <div style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 main-content min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-2">
                            <div className="row mx-auto py-3 overflow-hidden mx-auto">
                                <div className="d-flex mb-2 justify-content-between align-items-center">
                                    <div>
                                        <h5 className="ubuntu-sans-medium">
                                            Data Users
                                        </h5>
                                    </div>
                                    <NavLink to='/admin/users/tambah-user' >
                                        <div className="btn btn-success" style={{ fontSize: '.85rem' }}>
                                            Tambah Data
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="show-entries d-flex align-items-center gap-1 mb-2 w-100">
                                        <span style={{ fontSize: '.8rem' }}>Show</span>
                                        <Form.Control
                                            className='custom-entries px-1 text-center'
                                            as="select"
                                            value={entriesPerPage}
                                            onChange={handleEntriesPerPageChange}
                                            style={{ fontSize: '.8rem', width: '10%' }}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </Form.Control>
                                        <span style={{ fontSize: '.8rem' }}>entries</span>
                                    </div>
                                    <div className="search-bar w-100 d-flex align-items-center justify-content-end gap-2">
                                        <span style={{ fontSize: '.8rem' }}>Search: </span>
                                        <Form.Control
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            style={{ fontSize: '.8rem', width: '36%' }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="col fixed-table-container">
                                    <Table striped bordered hover className="fixed-table">
                                        <thead>
                                            <tr>
                                                <th className='text-center col-no'>No</th>
                                                <th className="col-nopel">NIK</th>
                                                <th className="col-tanggal">Nama</th>
                                                <th className="col-nik">Email</th>
                                                <th className="col-nama">Alamat</th>
                                                <th className="col-status">Role</th>
                                                <th className="col-aksi">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUsers.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                                    <td className="col-nopel">{user.NIK}</td>
                                                    <td className="col-tanggal">{user.nama}</td>
                                                    <td className="col-nik">{user.email}</td>
                                                    <td className="col-nama">{user.alamat}</td>
                                                    <td className='col-status'>
                                                        {user.role === 1 ? 'Admin' : 'Pengguna'}
                                                    </td>
                                                    <td className="col-aksi">
                                                        <NavLink to={`/admin/users/detail-user/${user.NIK}`}>
                                                            <div className="btn btn-primary lh-1 p-1 me-1">
                                                                <RiPencilFill size={'18px'} />
                                                            </div>
                                                        </NavLink>
                                                        <div
                                                            className="btn btn-danger lh-1 p-1 me-1"
                                                            onClick={() => deleteUser(user.NIK)}
                                                        >
                                                            <IoMdTrash size={'18px'} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div className="showing-entries" style={{ fontSize: '.85rem' }}>
                                        Showing {startIndex + 1} to {endIndex} of {filteredUsers.length} entries
                                    </div>
                                    <div className="pagination d-flex gap-2">
                                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} style={{ fontSize: '.85rem' }}>
                                            <IoIosArrowBack />
                                        </button>
                                        <button className="btn btn-primary" onClick={handleNextPage} disabled={endIndex >= filteredUsers.length} style={{ fontSize: '.85rem' }}>
                                            <IoIosArrowForward />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;
