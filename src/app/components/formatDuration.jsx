const { Duration } = require("luxon");

// Fungsi untuk mengonversi menit menjadi format 10h 11m 0s
function formatDuration(minutesString) {
  const totalMinutes = parseFloat(minutesString);

  // Cek apakah totalMinutes adalah NaN
  if (isNaN(totalMinutes)) {
    return "0h 0m 0s";
  }

  // Menggunakan Luxon untuk menghitung durasi
  const duration = Duration.fromObject({ minutes: Math.floor(totalMinutes) });

  // Menghitung jumlah jam, menit, dan detik
  const hours = Math.floor(duration.as("hours"));
  const remainingMinutes = duration.minus({ hours }).as("minutes");
  const minutes = Math.floor(remainingMinutes);
  const seconds = Math.floor((remainingMinutes - minutes) * 60);

  // Membentuk string dengan format yang diinginkan
  return `${hours}h ${minutes}m ${seconds}s`;
}
