import "../MenuLayanan/layanan.css"
import CardLayanan from "./card-layanan"
import ilsLay1 from "../../assets/images/Ilustrasi Layanan/1Bantuan Logistik.svg"
import ilsLay2 from "../../assets/images/Ilustrasi Layanan/2Santunan Kematian.svg"
import ilsLay3 from "../../assets/images/Ilustrasi Layanan/3SKT.svg"
import ilsLay4 from "../../assets/images/Ilustrasi Layanan/4SIO.svg"
import ilsLay5 from "../../assets/images/Ilustrasi Layanan/5Kumpul Uang dan Barang.svg"
import ilsLay6 from "../../assets/images/Ilustrasi Layanan/6Rumah Singgah.svg"
import ilsLay7 from "../../assets/images/Ilustrasi Layanan/7Rehabilitasi Lansia.svg"
import ilsLay8 from "../../assets/images/Ilustrasi Layanan/8Anak Terlantar.svg"
import ilsLay9 from "../../assets/images/Ilustrasi Layanan/9Penyandang Disabilitas.svg"
import ilsLay10 from "../../assets/images/Ilustrasi Layanan/10Pengangkatan Anak.svg"
import ilsLay11 from "../../assets/images/Ilustrasi Layanan/11DTKS.svg"
import ilsLay12 from "../../assets/images/Ilustrasi Layanan/12PBI-JK.svg"
import ilsLay13 from "../../assets/images/Ilustrasi Layanan/pengaduan.svg"

function Layanan() {
    const cardData = [
        { image: ilsLay1, title: "Pelayanan Bantuan Logistik Korban Bencana", to: "/bantuan-logistik" },
        { image: ilsLay2, title: "Pelayanan Pemberian Santunan Kematian", to: "/santunan-kematian" },
        { image: ilsLay3, title: "Pelayanan Surat Keterangan Terdaftar (SKT)", to: "/SKT" },
        { image: ilsLay4, title: "Pelayanan Surat Izin Operasional (SIO)", to: "/SIO" },
        { image: ilsLay5, title: "Pelayanan Rekomendasi Pengumpulan Uang dan Barang", to: "/pengumpulan-uang-dan-barang" },
        { image: ilsLay6, title: "Pelayanan Rumah Singgah", to: "/rumah-singgah" },
        { image: ilsLay7, title: "Pelayanan Rehabilitasi Sosial Lanjut Usia", to: "/rehabilitasi-lansia" },
        { image: ilsLay8, title: "Pelayanan Rehabilitasi Sosial Dasar Anak Terlantar", to: "/rehabilitasi-anak-terlantar" },
        { image: ilsLay9, title: "Pelayanan Data dan Pengaduan Penyandang Disabilitas", to: "/penyandang-disabilitas" },
        { image: ilsLay10, title: "Pelayanan Penertiban Rekomendasi Usulan Calon Pengangkatan Anak", to: "/pengangkatan-anak" },
        { image: ilsLay11, title: "Pelayanan Surat Keterangan Data Terpadu Kesejahteraan Sosial (DTKS)", to: "/DTKS" },
        { image: ilsLay12, title: "Pelayanan Penanganan Pengaduan Penerima Bantuan Iuran Jaminan Kesehatan (PBI-JK)", to: "/PBI-JK" },
        { image: ilsLay13, title: "Pengaduan DSPM", to: "/pengaduan-DSPM" },
    ];

    return (
        <>
            <h4 className="text-layanan ubuntu-sans-medium text-center">Layanan Publik</h4>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 p-3 mx-0 pt-2 pb-4 mt-3 border rounded">
                {cardData.map((data, index) => (
                    <CardLayanan key={index} image={data.image} title={data.title} to={data.to} />
                ))}
            </div>
        </>
    )
}

export default Layanan