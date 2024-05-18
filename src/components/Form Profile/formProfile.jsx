import InputField from '../Input Field/inputField';
import '../Form Profile/formProfile.css'

function FormProfile() {
    return (
        <>
            <div className="wrap-prof">
                <div className="form-profile row rounded border p-4 g-1 g-lg-2" style={{backgroundColor: 'white'}}>
                    <h4 className='text-center ubuntu-sans-semibold'>Profile</h4>
                    <InputField label='NIK' disabled />
                    <InputField label='Nama' disabled />
                    <InputField label='Alamat' disabled />
                    <InputField label='Kecamatan' disabled />
                    <InputField label='Kelurahan' disabled />
                    <InputField label='RT' disabled />
                    <InputField label='Email' />
                    <InputField label='No Telepon' />
                    <InputField label='Password' />
                    <div className="lg pt-3">
                        <div className="btn btn-primary w-100">Kirim</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormProfile