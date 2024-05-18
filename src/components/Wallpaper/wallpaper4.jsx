import WP from "../../assets/images/Wallpaper2.svg"
import "../Wallpaper/wallpaper.css"

function Wallpaper4() {
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

export default Wallpaper4;