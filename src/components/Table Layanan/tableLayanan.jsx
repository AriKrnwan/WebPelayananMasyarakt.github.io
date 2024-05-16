import Table from 'react-bootstrap/Table';
import '../Table Layanan/table.css';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";

function TableLayanan({ data, layanan }) {
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleShowEntriesChange = (event) => {
        setShowEntries(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const startIndex = (currentPage - 1) * showEntries;
    const endIndex = startIndex + showEntries;

    return (
        <>
            <div className="row ms-1 border rounded py-3 overflow-hidden mx-auto">
                <div className="show-entries d-flex align-items-center gap-1 mb-2">
                    <span style={{ fontSize: '.8rem' }}>Show</span>
                    <Form.Control
                        as="select"
                        style={{ fontSize: '.8rem', width: '14%' }}
                        value={showEntries}
                        onChange={handleShowEntriesChange}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </Form.Control>
                    <span style={{ fontSize: '.8rem' }}>entries</span>
                </div>
                <div className="col fixed-table-container">
                    <Table striped bordered hover className="fixed-table">
                        <thead>
                            <tr>
                                <th className='text-center col-no'>No</th>
                                <th className="col-nopel">No. Pelayanan</th>
                                <th className="col-tanggal">Tanggal</th>
                                <th className="col-status">Status</th>
                                <th className="col-aksi">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(startIndex, endIndex).map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center col-no'>{startIndex + index + 1}</td>
                                    <td className="col-nopel">{item.nopel}</td>
                                    <td className="col-tanggal">{item.tanggal}</td>
                                    <td className="col-status">{item.status}</td>
                                    <td className="col-aksi">
                                        <NavLink to={`/detail-pengajuan/${layanan}`}>
                                            <div className="btn btn-primary lh-1 p-1 me-1">
                                                <IoEyeSharp size={'18px'} />
                                            </div>
                                        </NavLink>
                                        {item.status === 'Menunggu Validasi' && (
                                            <>
                                                <NavLink to='#edit-pengajuan'>
                                                    <div className="btn btn-primary lh-1 p-1 me-1">
                                                        <RiPencilFill size={'18px'} />
                                                    </div>
                                                </NavLink>
                                                <NavLink to='#hapus-pengajuan'>
                                                    <div className="btn btn-danger lh-1 p-1 me-1">
                                                        <IoMdTrash size={'18px'} />
                                                    </div>
                                                </NavLink>
                                            </>
                                        )}
                                        {item.status === 'Diterima' && (
                                            <NavLink to='#download-pengajuan'>
                                                <div className="btn btn-success lh-1 p-1 me-1">
                                                    <MdFileDownload size={'18px'} />
                                                </div>
                                            </NavLink>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="showing-entries" style={{ fontSize: '.85rem' }}>
                        Showing {Math.min(startIndex + 1, data.length)} to {Math.min(endIndex, data.length)} of {data.length} entries
                    </div>
                    <div className="pagination d-flex gap-2">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} style={{ fontSize: '.85rem' }}>
                            <IoIosArrowBack />
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={endIndex >= data.length} style={{ fontSize: '.85rem' }}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

TableLayanan.propTypes = {
    data: PropTypes.array.isRequired,
    layanan: PropTypes.string.isRequired
};

export default TableLayanan;
