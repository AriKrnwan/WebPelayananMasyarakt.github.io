import Footer from "../../components/Footer/footer";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2";
import '../../components/Form Layanan/formLayanan.css';
import CardInformasi from "./card-informasi";

function moreInfo() {

    return (
        <>
            <CollapsibleExample />
            <div className="bg position-relative">
                <Wallpaper2 />
            </div>
            <div className="container">
                <div className="wrap-prof">
                    <div className="form-profile row rounded border p-4 g-1 g-lg-2 mx-auto" style={{ backgroundColor: 'white' }}>
                        <h4 className="text-center">Informasi</h4>
                        <CardInformasi />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default moreInfo;
