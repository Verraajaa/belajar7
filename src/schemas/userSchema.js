import { z } from "zod";

const userSchema = z.object({
    nama: z.string(). min(3, "* Nama minimal 3 karakter"),
    email: z.email("* Format email tidak valid"),
    umur: z.number().min(1, "* Umur wajib di isi"),
    alamat: z.string(). min(5, "* Alamat minimal 5 karakter"),
});

export default userSchema;