import WP from "../../assets/images/Wallpaper.svg"
import "../Wallpaper/wallpaper.css"
import Wave from "../../assets/images/Wave.svg"

function Wallpaper2() {
    return (
        <>
            <div className="wallpaper position-absolute">
                <div className="wp">
                    <img src={WP} alt="" />
                </div>
                <div className="wave2">
                    <img src={Wave} alt="" />
                </div>
            </div>
        </>
    );
}

export default Wallpaper2;