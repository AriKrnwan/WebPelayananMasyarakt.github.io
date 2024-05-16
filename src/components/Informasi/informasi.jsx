import CardInformasi from "./card-informasi"

function Informasi() {
    return (
        <>
            <div className="info-and-more d-flex justify-content-between align-items-end mt-5 mb-2">
                <div className="info">
                    <h4 className="poppins-medium mb-0">Informasi</h4>
                </div>
                <div className="more">
                    <a href="" className="poppins-medium" style={{fontSize: '.8rem', color: '#333', textDecoration: 'none'}}>Informasi Lainnya</a>
                </div>
            </div>
            <div className="row g-3">
                <CardInformasi/>
                <CardInformasi/>
                <CardInformasi/>
            </div>
        </>
    )
}

export default Informasi