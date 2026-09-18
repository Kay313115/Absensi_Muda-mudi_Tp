// ===== KONFIGURASI ANTI DOWN =====
const URL_SHEET = "https://script.google.com/macros/s/AKfycbxqxVtxuRPJKZ-PKwzSF6Ilc3rvNM-G81U_pIVEJj0M4uCV0fHi2H39YgBhSRTKtZo8/exec";

const form = document.getElementById("formAbsen");
const btn = document.getElementById("btn");
const pesan = document.getElementById("pesan");
const bersih = t => t.replace(/<[^>]*>/g, "").trim();

form.onsubmit = (e) => {
  e.preventDefault();

  let nama = bersih(document.getElementById("nama").value);
  let kelompok = document.getElementById("kelompok").value;
  let jenjang = document.getElementById("jenjang").value;
  let status = document.getElementById("status").value;
  let keterangan = bersih(document.getElementById("keterangan").value);

  if(nama.length < 3 || /[^A-Za-z\s]/.test(nama)){
    pesan.style.color="red"; pesan.innerText="❌ Nama huruf aja, min 3 huruf"; return;
  }
  if(!kelompok ||!jenjang ||!status){
    pesan.style.color="red"; pesan.innerText="❌ Lengkapi semua jan!"; return;
  }

  // === 1. INSTANT SUKSES BIAR ORANG GAK KABUR ===
 const dataKirim = { mode: "absen", nama, kelompok, jenjang, status, keterangan };

  pesan.style.color="green";
  pesan.innerText="✅ Berhasil! Absen " + nama + " masuk!";
  form.reset();
  btn.disabled=true;
  btn.innerText="Terkirim ✅";

  setTimeout(()=>{ btn.disabled=false; btn.innerText="Kirim Absen "; pesan.innerText=""; }, 3000);

  // === 2. KIRIM DI BELAKANG LAYAR (ANTI DOWN) ===
  // Trik: pake text/plain biar gak kena preflight 9 detik
  try{
    const blob = new Blob([JSON.stringify(dataKirim)], {type: 'text/plain'});
    // sendBeacon itu khusus buat kasus rame, gak bakal down walau user langsung close tab
    if(!navigator.sendBeacon(URL_SHEET, blob)){
       fetch(URL_SHEET, { method:"POST", body: blob, mode:"no-cors", keepalive: true });
    }
  } catch(err){
    fetch(URL_SHEET, { method:"POST", body: JSON.stringify(dataKirim), mode:"no-cors", keepalive: true });
  }
};
