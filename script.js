// 1. DATA DATABASE (Pusat Data)
const gamesData = [
    { id: 1, nama: "Budi123", judul: "Resident Evil Village", genre: "Horror", platform: "PC", status: "Approved" },
    { id: 2, nama: "GamingPro", judul: "Valorant", genre: "FPS", platform: "PC", status: "Approved" },
    { id: 3, nama: "SiskaAA", judul: "Elden Ring", genre: "RPG", platform: "PS5", status: "Completed", rating: "10/10" },
    { id: 4, nama: "Andi", judul: "Mobile Legends", genre: "MOBA", platform: "Mobile", status: "Completed", rating: "9/10" }
];

// 2. INISIALISASI SWIPER
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// 3. RENDER BERANDA (Daftar Game Akan Dimainkan)
function renderShowcase(filter = "all") {
    const container = document.getElementById("gameList");
    if(!container) return;
    container.innerHTML = ""; 

    const approvedGames = gamesData.filter(g => g.status === "Approved");

    approvedGames.forEach(game => {
        if (filter === "all" || game.genre === filter) {
            const card = `
                <div class="game-card no-img">
                    <div class="card-header">
                        <span class="badge ${game.genre.toLowerCase()}">${game.genre}</span>
                        <span class="platform-tag">${game.platform}</span>
                    </div>
                    <h3>${game.judul}</h3>
                    <p>Req by: <strong>${game.nama}</strong></p>
                </div>
            `;
            container.innerHTML += card;
        }
    });
}

// 4. RENDER GAME TAMAT (Slide Hall of Fame)
function renderCompleted() {
    const swiperWrapper = document.getElementById("completedGameList");
    if(!swiperWrapper) return;
    swiperWrapper.innerHTML = "";

    // Mengambil data yang berstatus 'Completed'
    const completedGames = gamesData.filter(g => g.status === "Completed");

    completedGames.forEach(game => {
        const slide = `
            <div class="swiper-slide list-card">
                <div class="card-content">
                    <span class="platform-tag">${game.platform}</span>
                    <h4 class="game-title">${game.judul}</h4>
                    <div class="rating-stars">⭐ ${game.rating}</div>
                    <span class="badge-done">${game.genre}</span>
                </div>
            </div>
        `;
        swiperWrapper.innerHTML += slide;
    });
    
    // Refresh Swiper agar mendeteksi slide baru yang dimasukkan
    swiper.update();
}

// 5. FUNGSI FILTER BERDASARKAN GENRE
function filterGenre(genre) {
    renderShowcase(genre);
}

// RUN SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", () => {
    renderShowcase();
    renderCompleted();
});