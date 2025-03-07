import fs from "fs/promises"; //mengelola file secara asinkron (membaca, menulis dan menghapus file JSON)
import express from "express"; //framework untuk membuat server web 
import bodyParser from "body-parser"; //memproses request body dari form(URL-encoded)

const app = express(); //menangani request 
//mencatat alamat IP dan protocol dari request yang masuk ke server 
app.use((req, res, next) => { 
    const requestIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress; 
    const requestProtocol = req.headers["x-forwarded-proto"] || req.protocol;
    console.log(`REQUEST: ${requestIp} (${requestProtocol}) ${req.originalUrl}`);
    next();
});

//memproses request POST/PUT yang berisi data dalam format URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

//mengembalikan teks "Hello" saat diakses
app.get("/halaman-utama", (request, response) => {
    response.write("Hello");
    response.end();
});

//mencetak isi request POST ke console dan mengembalikan OK
app.post("/update", (request, response) => {
    console.log(request.body);
    response.write("OK");
    response.end();
});

//Menambah data
app.put("/add-data", async (request, response) => {
    console.log(request.body);
    const randomId = Math.random().toString(36).substring(2, 7);
    await fs.writeFile(`test-${randomId}.json`, JSON.stringify(request.body, null, 2)); //menerima data JSON dan menyimpan ke file dengan nama test-(randoomId).json dan mengembalikan ID file sebagai respons.
    response.write(`Data ditambahkan dengan id: ${randomId}`);
    response.end();
});

//membaca data 
//mencari file berdasarkan id jika ditemuka mengembalikan isisnya dalam format JSON 
//kalau filenya tidak ditemukan maka akan mengembalikan statis 404 
app.get("/get-data/:id", async (request, response) => {
    try {
        const filePath = `test-${request.params.id}.json`;
        const fileContent = await fs.readFile(filePath, "utf-8");
        const fileData = JSON.parse(fileContent);
        response.json(fileData);
    } catch (error) {
        response.status(404).json({ error: "File tidak ditemukan" });
    }
});

//menghapus data 
//menghapus file berdasrkan id
//force: true memastikan tidak eror jika filenya tidak ada  
app.delete("/delete-data/:id", async (request, response) => {
    const filePath = `test-${request.params.id}.json`;
    await fs.rm(filePath, { force: true });
    response.write("Data berhasil dihapus");
    response.end();
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
