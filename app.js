// ===== KONFIGURASI =====
const URL_SHEET = "https://script.google.com/macros/s/AKfycbxU8y-TNoP0FgfVRZT_1mSXew7YkpHgMWSoPLYAvrujUntaHoCXoyWCbwv5u_FhIU5A/exec";

const form = document.getElementById("formAbsen");
const btn = document.getElementById("btn");
const pesan = document.getElementById("pesan");
const bersih = t => t.replace(/<[^>]*>/g, "").trim();

form.onsubmit = async (e) => {
  e.preventDefault();

  let nama = bersih(document.getElementById("nama").value);
  let kelompok = document.getElementById("kelompok").value;
  let jenjang = document.getElementById("jenjang").value; // AMBIL JENJANG
  let status = document.getElementById("status").value;
  let keterangan = bersih(document.getElementById("keterangan").value);
   

  // Validasi
  if(nama.length < 3 || /[^A-Za-z\s]/.test(nama)){ 
    pesan.style.color="red"; pesan.innerText="❌ Nama huruf aja, min 3 huruf"; return; 
  }
  if(!kelompok){ pesan.style.color="red"; pesan.innerText="❌ Pilih kelompok dulu jan!"; return; }
  if(!jenjang){ pesan.style.color="red"; pesan.innerText="❌ Pilih jenjang dulu jan!"; return; }
  if(!status){ pesan.style.color="red"; pesan.innerText="❌ Pilih status dulu jan!"; return; }
  if(URL_SHEET.includes("ISI-LINK")){ 
    pesan.style.color="red"; pesan.innerText="❌ URL Google Sheet belum dipasang!"; return; 
  }

  btn.disabled=true; btn.innerText="Mengirim... ";
  pesan.style.color="#666"; pesan.innerText="Sedang proses...";
  
  try{
    await fetch(URL_SHEET,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        nama,kelompok,jenjang,status,keterangan
        // WAKTU UDAH GUE HAPUS JAN
      })
    });
    pesan.style.color="green"; pesan.innerText="✅ Berhasil ! Absen " + nama + " masuk!"; 
    form.reset();
  }catch(err){
    pesan.style.color="red"; pesan.innerText="❌ Gagal, coba lagi. Cek internet"; 
  } finally {
    btn.disabled=false; btn.innerText="Kirim Absen ";
  }
};
