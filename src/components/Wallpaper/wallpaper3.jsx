import WP from "../../assets/images/Wallpaper.svg"
import "../Wallpaper/wallpaper.css"

function Wallpaper3() {
    return (
        <>
            <div className="wallpaper position-absolute">
                <div className="wp">
                    <img src={WP} alt="" />
                </div>
            </div>
        </>
    );
}

export default Wallpaper3;