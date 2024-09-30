import React, { useEffect, useState } from 'react';
import SidebarAdmin from "../components admin/sidebar";
import Topbar from "../components admin/topbar";
import api from '../components/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FaPeopleCarryBox, FaPersonCane, FaMoneyBills, FaPersonBreastfeeding, FaPersonWalkingWithCane } from "react-icons/fa6";
import { HiDocumentCheck, HiDocumentDuplicate } from "react-icons/hi2";
import { IoDocumentText } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { LuPersonStanding } from "react-icons/lu";
import { MdHealthAndSafety } from "react-icons/md";

function Dashboard() {
    const [counts, setCounts] = useState({
        count_lay_bantuan_logistik: 0,
        count_lay_DTKS: 0,
        count_lay_PBI_JK: 0,
        count_lay_pengangkatan_anak: 0,
        count_lay_penyandang_disabilitas: 0,
        count_lay_pengumpulan_uang_dan_barang: 0,
        count_lay_rehabilitasi_anak_terlantar: 0,
        count_lay_rehabilitasi_lansia: 0,
        count_lay_rumah_singgah: 0,
        count_lay_santunan_kematian: 0,
        count_lay_SIO: 0,
        count_lay_SKT: 0
    });

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        fetchData();
    }, [selectedMonth, selectedYear]);

    const fetchData = async () => {
        try {
            let endpoint = '/count-pengajuan';

            if (selectedMonth && selectedYear) {
                endpoint += `/${selectedMonth}/${selectedYear}`;
            } else {
                const date = new Date();
                const month = date.getMonth() + 1; // bulan sekarang
                let year = date.getFullYear(); // tahun sekarang

                // Jika belum memilih tahun, set default ke tahun sekarang
                if (!selectedYear) {
                    setSelectedYear(year.toString());
                }

                endpoint += `/${month}/${year}`;
            }

            const token = localStorage.getItem('token');
            const response = await api.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCounts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const generateYearOptions = () => {
        const startYear = 2022; // Year when your application started
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 2; // Next year after the current year

        const years = [];

        for (let year = startYear; year <= nextYear; year++) {
            years.push(year);
        }

        return years.map(year => (
            <option key={year} value={year}>{year}</option>
        ));
    };

    const generateSelectedDateText = () => {
        if (selectedMonth && selectedYear) {
            const monthNames = [
                'Januari', 'Februari', 'Maret', 'April',
                'Mei', 'Juni', 'Juli', 'Agustus',
                'September', 'Oktober', 'November', 'Desember'
            ];

            const monthName = monthNames[selectedMonth - 1]; // Adjust index for monthNames array
            return `Pengajuan Bulan ${monthName} ${selectedYear}`;
        } else {
            return `Pengajuan Bulan ${getMonthName(new Date().getMonth() + 1)} ${new Date().getFullYear()}`;
        }
    };

    const getMonthName = (monthNumber) => {
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April',
            'Mei', 'Juni', 'Juli', 'Agustus',
            'September', 'Oktober', 'November', 'Desember'
        ];

        return monthNames[monthNumber - 1]; // Adjust index for monthNames array
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const text = generateSelectedDateText();
        const data = [
            { layanan: 'Bantuan Logistik Korban Bencana', jumlah: counts.count_lay_bantuan_logistik },
            { layanan: 'DTKS', jumlah: counts.count_lay_DTKS },
            { layanan: 'PBI JK', jumlah: counts.count_lay_PBI_JK },
            { layanan: 'Pengangkatan Anak', jumlah: counts.count_lay_pengangkatan_anak },
            { layanan: 'Penyandang Disabilitas', jumlah: counts.count_lay_penyandang_disabilitas },
            { layanan: 'Pengumpulan Uang dan Barang', jumlah: counts.count_lay_pengumpulan_uang_dan_barang },
            { layanan: 'Rehabilitasi Anak Terlantar', jumlah: counts.count_lay_rehabilitasi_anak_terlantar },
            { layanan: 'Rehabilitasi Lansia', jumlah: counts.count_lay_rehabilitasi_lansia },
            { layanan: 'Rumah Singgah', jumlah: counts.count_lay_rumah_singgah },
            { layanan: 'Santunan Kematian', jumlah: counts.count_lay_santunan_kematian },
            { layanan: 'SIO', jumlah: counts.count_lay_SIO },
            { layanan: 'SKT', jumlah: counts.count_lay_SKT }
        ];

        let rows = [];
        data.forEach((item, index) => {
            rows.push([index + 1, item.layanan, item.jumlah]);
        });

        doc.text(text, 10, 10);
        doc.autoTable({
            head: [['No.', 'Layanan', 'Jumlah Pengajuan']],
            body: rows,
            startY: 20
        });

        doc.save(`${text}.pdf`);
    };

    const handleDownloadExcel = () => {
        const text = generateSelectedDateText();
        const data = [
            { layanan: 'Bantuan Logistik Korban Bencana', jumlah: counts.count_lay_bantuan_logistik },
            { layanan: 'DTKS', jumlah: counts.count_lay_DTKS },
            { layanan: 'PBI JK', jumlah: counts.count_lay_PBI_JK },
            { layanan: 'Pengangkatan Anak', jumlah: counts.count_lay_pengangkatan_anak },
            { layanan: 'Penyandang Disabilitas', jumlah: counts.count_lay_penyandang_disabilitas },
            { layanan: 'Pengumpulan Uang dan Barang', jumlah: counts.count_lay_pengumpulan_uang_dan_barang },
            { layanan: 'Rehabilitasi Anak Terlantar', jumlah: counts.count_lay_rehabilitasi_anak_terlantar },
            { layanan: 'Rehabilitasi Lansia', jumlah: counts.count_lay_rehabilitasi_lansia },
            { layanan: 'Rumah Singgah', jumlah: counts.count_lay_rumah_singgah },
            { layanan: 'Santunan Kematian', jumlah: counts.count_lay_santunan_kematian },
            { layanan: 'SIO', jumlah: counts.count_lay_SIO },
            { layanan: 'SKT', jumlah: counts.count_lay_SKT }
        ];

        const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
            'No.': index + 1,
            'Layanan': item.layanan,
            'Jumlah Pengajuan': item.jumlah
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pengajuan");

        XLSX.writeFile(workbook, `${text}.xlsx`);
    };

    const serviceData = [
        { icon: <FaPeopleCarryBox size={'20px'} className='text-primary' />, title: 'Bantuan Logistik Korban Bencana', count: counts.count_lay_bantuan_logistik },
        { icon: <FaMoneyBills size={'20px'} className='text-primary' />, title: 'Santunan Kematian', count: counts.count_lay_santunan_kematian },
        { icon: <HiDocumentCheck size={'20px'} className='text-primary' />, title: 'SKT', count: counts.count_lay_SKT },
        { icon: <HiDocumentDuplicate size={'20px'} className='text-primary' />, title: 'SIO', count: counts.count_lay_SIO },
        { icon: <GiReceiveMoney size={'20px'} className='text-primary' />, title: 'Pengumpulan Uang dan Barang', count: counts.count_lay_pengumpulan_uang_dan_barang },
        { icon: <BsFillHouseFill size={'20px'} className='text-primary' />, title: 'Rumah Singgah', count: counts.count_lay_rumah_singgah },
        { icon: <FaPersonCane size={'20px'} className='text-primary' />, title: 'Rehabilitasi Lansia', count: counts.count_lay_rehabilitasi_lansia },
        { icon: <LuPersonStanding size={'20px'} className='text-primary' />, title: 'Rehabilitasi Anak Terlantar', count: counts.count_lay_rehabilitasi_anak_terlantar },
        { icon: <FaPersonWalkingWithCane size={'20px'} className='text-primary' />, title: 'Penyandang Disabilitas', count: counts.count_lay_penyandang_disabilitas },
        { icon: <FaPersonBreastfeeding size={'20px'} className='text-primary' />, title: 'Pengangkatan Anak', count: counts.count_lay_pengangkatan_anak },
        { icon: <IoDocumentText size={'20px'} className='text-primary' />, title: 'DTKS', count: counts.count_lay_DTKS },
        { icon: <MdHealthAndSafety size={'20px'} className='text-primary' />, title: 'PBI-JK', count: counts.count_lay_PBI_JK },
    ];

    return (
        <>
            <div className="overflow-hi wv-100" style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0">
                    <div className="col-2 p-0">
                        <SidebarAdmin />
                    </div>
                    <div className="col-10 p-0 min-vh-100">
                        <Topbar />
                        <div className="bg-white m-3 rounded border p-2">
                            <div className="p-4">
                                <div className='d-flex align-items-center justify-content-between mb-3'>
                                    <div>
                                        <h4>Dashboard</h4>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" style={{fontSize : '.85rem'}} onClick={handleDownloadPDF}>Download PDF</button>
                                        <button className="btn btn-success ms-2" style={{fontSize : '.85rem'}} onClick={handleDownloadExcel}>Download Excel</button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <h6>
                                            {generateSelectedDateText()}
                                        </h6>
                                    </div>
                                    <div className='d-flex'>
                                        <select
                                            className="form-select form-select-sm me-2"
                                            value={selectedMonth}
                                            onChange={handleMonthChange}
                                        >
                                            <option value="">Pilih Bulan</option>
                                            <option value="1">Januari</option>
                                            <option value="2">Februari</option>
                                            <option value="3">Maret</option>
                                            <option value="4">April</option>
                                            <option value="5">Mei</option>
                                            <option value="6">Juni</option>
                                            <option value="7">Juli</option>
                                            <option value="8">Agustus</option>
                                            <option value="9">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                        <select
                                            className="form-select form-select-sm"
                                            value={selectedYear}
                                            onChange={handleYearChange}
                                        >
                                            <option value="">Pilih Tahun</option>
                                            {generateYearOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    {serviceData.map((service, index) => (
                                        <>
                                            <div className="col-lg-3 p-1" key={index}>
                                                <div className=' border rounded p-3 d-flex align-items-center' style={{height: '104px'}}>
                                                    <div className='d-flex align-items-start gap-3 border-start border-3 border-primary rounded ps-3 justify-content-between w-100'>
                                                        <div className="isi">
                                                            <p className="ubuntu-sans-medium" style={{ fontSize: '.8rem', color: '#8f8f8f' }}>{service.title}</p>
                                                            <p className="ubuntu-sans-semibold" style={{ fontSize: '1.1rem' }}>{service.count} Pengajuan</p>
                                                        </div>
                                                        <div className="wrapper-icon mt-1 p-2 lh-1 rounded-3" style={{backgroundColor: '#f5f5f5'}}>
                                                            {service.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
