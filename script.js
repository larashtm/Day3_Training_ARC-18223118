document.getElementById("ambil-data").addEventListener("click", async function() {
    try {
        // Ambil data dari Random User API
        const userResponse = await fetch("https://randomuser.me/api/");
        const userData = await userResponse.json();
        let user = userData.results[0];

        let userHTML = `
            <img src="${user.picture.large}" alt="Foto User">
            <p>Nama: ${user.name.first} ${user.name.last}</p>
            <p>Email: ${user.email}</p>
            <p>Lokasi: ${user.location.city}, ${user.location.country}</p>
        `;

        // Ambil data dari JSONPlaceholder API
        const todoResponse = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const todoData = await todoResponse.json();

        let todoHTML = `<p>Judul: ${todoData.title}</p>`;

        // Tampilkan data tanpa menimpa konten sebelumnya
        document.getElementById("hasil").innerHTML = userHTML + todoHTML;
    
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("hasil").innerText = "Gagal mengambil data.";
    }
});
