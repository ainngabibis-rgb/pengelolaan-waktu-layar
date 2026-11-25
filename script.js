// 1. Fungsi Kalkulator Screen Time
function hitungScreenTime() {
    const medsos = parseFloat(document.getElementById('jamMedsos').value) || 0;
    const game = parseFloat(document.getElementById('jamGame').value) || 0;
    const total = medsos + game;
    const totalSeminggu = total * 7;

    const hasilDiv = document.getElementById('hasilKalkulator');
    hasilDiv.classList.remove('hidden');

    let kategori = "";
    let saran = "";

    if (total <= 2) {
        kategori = "Sehat & Terkendali 🟢";
        saran = "Pertahankan kebiasaan baik ini! Waktu belajarmu sangat terjaga.";
    } else if (total <= 4) {
        kategori = "Waspada Sedang 🟡";
        saran = "Mulai batasi penggunaan layar di malam hari dengan mengaktifkan fitur pengingat waktu aplikasi.";
    } else {
        kategori = "Berlebih / Berisiko Tinggi 🔴";
        saran = "Durasi layar hiburanmu setara dengan " + totalSeminggu + " jam per minggu! Segera terapkan teknik Pomodoro.";
    }

    hasilDiv.innerHTML = `
        <strong>Total Hiburan Layar:</strong> ${total} jam/hari (${totalSeminggu} jam/minggu)<br>
        <strong>Status:</strong> ${kategori}<br>
        <strong>Saran:</strong> ${saran}
    `;
}

// 2. Fungsi Simulasi Rekomendasi AI
function generateRekomendasiAI() {
    const kendala = document.getElementById('kendalaUtama').value;
    const outputDiv = document.getElementById('outputAI');
    outputDiv.classList.remove('hidden');

    let rekomendasi = "";
    if (kendala === "notif") {
        rekomendasi = "<strong>Rekomendasi Prototipe AI:</strong><br>1. Aktifkan mode <em>Do Not Disturb</em> (Jangan Ganggu) pukul 19.00 - 21.00.<br>2. Gunakan 2 sesi Pomodoro (25 menit belajar, 5 menit cek pesan).";
    } else if (kendala === "begadang") {
        rekomendasi = "<strong>Rekomendasi Prototipe AI:</strong><br>1. Terapkan jam malam digital pukul 21.30.<br>2. Ubah layar ponsel menjadi mode <em>Grayscale</em> (hitam-putih) setelah pukul 21.00 agar tidak menarik secara visual.";
    } else {
        rekomendasi = "<strong>Rekomendasi Prototipe AI:</strong><br>1. Beri jeda istirahat 30 menit tanpa layar sepulang sekolah.<br>2. Jadikan waktu bermain gim (maksimal 1 jam) sebagai <em>reward</em> setelah PR selesai.";
    }

    outputDiv.innerHTML = rekomendasi;
}

// 3. Pengiriman Formulir ke Google Apps Script
document.getElementById('komitmenForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const targetJam = document.getElementById('targetJam').value;
    const langkahKomitmen = document.getElementById('langkahKomitmen').value;
    const statusDiv = document.getElementById('formStatus');

    // GANTI URL DI BAWAH INI DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA
    const scriptURL = 'URL_WEB_APP_APPS_SCRIPT_ANDA';

    statusDiv.classList.remove('hidden');
    statusDiv.style.color = '#d97706';
    statusDiv.textContent = 'Mengirim data komitmen...';

    if (scriptURL === 'URL_WEB_APP_APPS_SCRIPT_ANDA') {
        // Mode simulasi jika URL Apps Script belum dipasang
        setTimeout(() => {
            statusDiv.style.color = '#16a34a';
            statusDiv.textContent = `Simulasi Berhasil! Komitmen ${nama} (Target: ${targetJam} jam/hari) telah dicatat.`;
            document.getElementById('komitmenForm').reset();
        }, 1000);
    } else {
        // Pengiriman nyata ke Google Sheets
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ nama, targetJam, langkahKomitmen })
        })
        .then(() => {
            statusDiv.style.color = '#16a34a';
            statusDiv.textContent = 'Berhasil! Komitmen Anda telah tersimpan di Google Sheets.';
            document.getElementById('komitmenForm').reset();
        })
        .catch(() => {
            statusDiv.style.color = '#dc2626';
            statusDiv.textContent = 'Terjadi kesalahan saat mengirim data.';
        });
    }
});
