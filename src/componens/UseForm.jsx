import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../schemas/userSchema";
import { useState } from "react";

function UseForm() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nama: "",
            email: "",
            umur: "",
            alamat: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setSuccess(false);
        setError("")
        
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            console.log(data);
            setSubmittedData((prevData) => [...prevData, data]);
            setSuccess(true);
            reset();
        } catch (err) {
            setError("Terjadi kesalahan saat mengirim data.")
        } finally {
            setLoading(false);
        }
    }
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [submittedData, setSubmittedData] = useState([]);
    return(
        <div className="container">
            <h1>User Data Form</h1>
            <p>Isi data diri kamu dengan benar ya!</p>

            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" placeholder="Masukkan nama lengkap..." {...register("nama")}/>
                        <div className="error">
                            {errors.nama && <p>{errors.nama.message}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Masukkan email..." {...register("email")} />
                        <div className="error">
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Umur</label>
                        <input type="number" placeholder="Masukkan umur..." {...register("umur", {valueAsNumber: true})} />
                        <div className="error">
                            {errors.umur && <p>{errors.umur.message}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Alamat</label>
                        <textarea placeholder="Masukkan alamat lengkap" {...register("alamat")} />
                        <div className="error">
                            {errors.alamat && <p>{errors.alamat.message}</p>}
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Mengirim..." : "Kirim data"}
                    </button>

                    {loading && <p>Loading...</p>}
                    {success && <p>Data berhasil dikirim!</p>}
                    {error && <p>{error}</p>}
                </form>
            </div>

            {submittedData && (
                < div className="data">

                    {submittedData.map((user, index) => (
                    <div className="data-card">
                        <h3>Data ke-{index + 1}</h3>

                        <p>Nama : {user.nama}</p>
                        <p>Email : {user.email}</p>
                        <p>Umur : {user.umur}</p>
                        <p>Alamat : {user.alamat}</p>
                    </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default UseForm;