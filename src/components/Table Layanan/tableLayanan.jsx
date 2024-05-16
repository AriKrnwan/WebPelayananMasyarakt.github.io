import Table from 'react-bootstrap/Table';
import '../Table Layanan/table.css';
import { TiEye } from "react-icons/ti";
import PropTypes from 'prop-types'; // Import PropTypes
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";


function TableLayanan({ data }) {
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleShowEntriesChange = (event) => {
        setShowEntries(parseInt(event.target.value));
        setCurrentPage(1); // Reset ke halaman pertama saat jumlah entri diubah
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Menghitung index awal dan akhir untuk data yang ditampilkan sesuai halaman saat ini
    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    return (
        <>
            <div className="row ms-1 border rounded py-3 overflow-hidden mx-auto">
                <div className="show-entries d-flex align-items-center gap-1 mb-2">
                    <span style={{fontSize: '.8rem'}}>Show</span>
                    <Form.Control
                        as="select"
                        style={{ fontSize: '.8rem', width: '10%' }}
                        value={showEntries}
                        onChange={handleShowEntriesChange}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Form.Control>
                    <span style={{fontSize: '.8rem'}}>entries</span>
                </div>
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(startIndex, endIndex).map((data, index) => (
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.tanggal}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <NavLink to='/detail-pengajuan'>
                                            <div className="btn btn-primary lh-1 p-1"><TiEye size={'20px'} /></div>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="showing-entries" style={{fontSize: '.85rem'}}>
                            Showing {Math.min(startIndex + 1, data.length)} to {Math.min(endIndex, data.length)} of {data.length} entries
                        </div>
                        <div className="pagination d-flex gap-2">
                            <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} style={{fontSize: '.85rem'}}><IoIosArrowBack /></button>
                            <button className="btn btn-primary" onClick={handleNextPage} disabled={endIndex >= data.length} style={{fontSize: '.85rem'}}><IoIosArrowForward /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

TableLayanan.propTypes = {
    data: PropTypes.array.isRequired
};

export default TableLayanan;
