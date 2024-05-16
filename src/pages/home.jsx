import Footer from "../components/Footer/footer";
import Informasi from "../components/Informasi/informasi";
import Layanan from "../components/MenuLayanan/layanan";
import CollapsibleExample from "../components/Navbar/navbar";
import Wallpaper from "../components/Wallpaper/wallpaper";
import Wellcoming from "../components/Wellcoming/wellcoming";
import "../pages/home.css"

const Home = () => {
    return (
        <>
            <CollapsibleExample/>
            <div className="bg position-relative">
                <Wallpaper/>
            </div>
            <div className="container">
                <Wellcoming/>
                <Layanan/>
                <Informasi/>
            </div>
            <Footer/>
        </>
    )
};

export default Home;