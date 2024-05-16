import Footer from "../../components/Footer/footer.jsx";
import FormProfile from "../../components/Form Profile/formProfile.jsx";
import CollapsibleExample from "../../components/Navbar/navbar";
import Wallpaper2 from "../../components/Wallpaper/wallpaper2.jsx";

function Profile() {
    return (
        <>
            <CollapsibleExample/>
            <div className="bg position-relative">
                <Wallpaper2/>
            </div>
            <div className="container">
                <FormProfile/>
            </div>
            <Footer/>
        </>
    )
}

export default Profile