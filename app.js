// URL buat nmbung ke sheet//
const URL_SHEET = "https://script.google.com/macros/s/AKfycbyi05BZC9pUEgO6lXjs0rnoxQqd1tdZDSXmdoZKXNgF2mYAXa1TfyN2NxDpnIhjpK3q/exec";

// Ambil elemen HTML biar bisa dimainin JS
const form = document.getElementById("formAbsen"); 
const btn = document.getElementById("btn"); 
const pesan = document.getElementById("pesan"); 
const selectKelompok = document.getElementById("kelompok"); 
const selectNama = document.getElementById("nama");
const boxKeterangan = document.getElementById("boxKeterangan");
const selectStatus = document.getElementById("status");
const inputKeterangan = document.getElementById("keterangan");
// bersihin tag htrml dri input
const bersih = t => t.replace(/<[^>]*>/g, "").trim();

//nama mumi tp//
const dataNama = {
  "Kelompok 1": ["Adnan Sulton M", "Anisa Bianca", "Apriliyani", "Al Drige",
    "Diaz Azis R", "Diva Aulia S", "Fatah Sabila R", "Frisca Berliyana N",
    "Hendri Wijaya A", "Laluna Putri N", "M Agung Nugroho", "M Dimas", "M Fadly",
    "M Faqih Restu D", "M Naufal A", "M Sofyan", "Nadia Dwianna", "Nadilla Rahma T",
    "Nazhifa Resti A", "Nisrina Shifa K", "Riky Hermawan", "Sabila Wahyu L", "Sipul", 
    "Sakha Abi Manyu", "Syifa Audistiani N",
  ],
  "Kelompok 2": ["Aghni Putri Aulia S", "Agung Risqiawan", "Andika Daffa A", "Andreas Fatah Villanova",
    "Apik Bahiroh Ifannuri", "Aulia Lailata Z", "Bilqis Cynara Querida Dawud", "Chaira Aflaha Putri",
    "Delia Alya Syakila", "Dimas Ananta D","Diva Cahaya N","Fahmi Abdurofik","Ihsan Maulana","Kanaya Cilvi A",
    "Keyndra Alvian Aprilio","Kheyza Cahaya N","M Sulthon i,H","M. Hafid Assidiq","Meysun Faiha S","Nasri Rahma R",
    "Rama Radithya Erlangga","Raya Azka Fiddina","Reno Erlangga","Sabda Alferka","Sean Ratu A,Z","Sefti Dina P",
  ],
  "Kelompok 3": ["Arjuna Al Hasani","Aulia Dwi Yuliana","Bilqis Ridha Latifah","Devri Glovani","Dina Aulia",
    "Enrika Devinsky","Gita Pertiwi Fadillah","Hadwan Sanjaya Nakadena","Ikhwan Nursetiawan","Jovan Sulthan Fadillah",
    "Muhammad Nahala Rifki","Muhammad Sahel Kemal Fasha","M. Sulthon Bastian Nakadena","Naila Nurhaliza","Najwa Ulya Azizah",
    "Naufal Gustav Nakadena","Nizam Akbar Al Fariz","Ridho Zinta Maulani","Royana Malik","Syauqiya Bilqis Adlin",
    "Yasmin Berliana Putri",
  ],
  "Kelompok 4": ["Ahmad Surya Wardhani","Aldi Aulia Firdaus","Aldo Aulia Firdaus","Amelia Pratiwi",
    "Anindya Ahlam Lestari","Anjata Idufi Rizki","Annisa Nur Indah Safitri","Annisa Ramadhani","Aulia Dinda Andriani","Avina Dwi Safitri",
    "Bagus Fabregas","Danny Cullzy Zuyyin.H.A","Elvia Fadillah Azkiy.A","Fachri Ubaidillah","Fadhil Askha Ananda","Ita Nurhasanah",
    "Junita Angeli","Kanthi Larasati","Klarisa Febriana Putri","Kusna Laila","Laurel Audia","Lulu Yuniawati","M.Gilang Ramadhan.P.N","Maulana Yusuf",
    "M.Ilham Prasetyo","M.Pristian Al Aliyu","M.Sheva Yusuf","Pandu Briliant Wicaksono","Putri Sabila Zahrani","Reyhan Baskara Putra",
    "Rizki Winda Sari","Sandrina Sabriya","Satrio Aji","Sekar Sari Putri Nurjanah","Sofwan Malik","Thariza Maratun Sholeha","Vania Nurila Danni","Windy Shinsyria",
  ],

  "Kelompok 5": ["Ahmad Alfian Nugroho","Alfi Nur Khasanah","Aulia Rizki Nur.F","Berliana","Bintang Tri.O","Diki Dwi Nugroho",
    "Dina Yulianti","Ginar Putri Utami","Keita Hary Putri","Khansaa A'Uuriyah","Khoirunnisa Aulia.R","Kurnia Uswatun Khasanah",
    "Laila Fitroh. O","M. Akhyar Al Ubaidah","M.Tegar Firdaus","Mohammad Rofiq Aziz","Putriana Daif Syifa",
    "Qorina Maula Salasah","Rifqi Nurhuda","Sabrina Nurul Fauziah","Tria Aulia","Valanur Agil Utomo","Wahyu Dwi Prasetyo",
  ],
};


// klik klmpk dlu bru nama otomatis muncul/  /
selectKelompok.addEventListener('change', function() {
  const kelompok = this.value; 

  // reset dropdown
  selectNama.innerHTML = '<option value=""> Nama</option>';

  if(kelompok && dataNama[kelompok]){ 
    dataNama[kelompok].forEach(nama => {
      const opt = document.createElement('option'); 
      opt.value = nama;
      opt.textContent = nama;
      selectNama.appendChild(opt); 
    });
    selectNama.disabled = false; 
  } else {
    selectNama.innerHTML = '<option value="">  Kelompok </option>';
    selectNama.disabled = true; // disabled lgi klo klmpk di apus
  }
});

// wajib nulis ket jika iziiin
selectStatus.addEventListener('change', function(){
  if(this.value === "Izin"){
    inputKeterangan.placeholder = "wajib isi jika izin: sakit,acara,kerja, dll";
    boxKeterangan.style.borderColor = "#ff5252";
    pesan.style.color = "red";
    pesan.innerText = " keterangn wajib di isi jika izin"
  }else{
      inputKeterangan.placeholder = "keterangan (opsional)";
      boxKeterangan.style.borderColor = "#e0e0e0"
      pesan.innerText = "";
    }
  
});
//kirim absen
form.onsubmit = (e) => {
  e.preventDefault(); // supaya hal tdk reload

  // Ambil semua nilai dri form
  let nama = document.getElementById("nama").value; 
  let kelompok = selectKelompok.value;
  let jenjang = document.getElementById("jenjang").value;
  let jk = document.getElementById("jk").value;
  let status = document.getElementById("status").value;
  let keterangan = bersih(document.getElementById("keterangan").value); 

  // Validasi - cek kelengkapan
  if(!kelompok ||!nama ||!jenjang ||!jk ||!status){
    pesan.style.color="red";
    pesan.innerText="❌ Lengkapi semua";
    return; // stop kalo belum lengkap
  }
  
  if(status === "Izin"&& keterangan.length < 3){
    pesan.style.color="red";
    pesan.innerText="jika izin wajib isi keterangan"
    inputKeterangan.focus();
    return;
  }

  // data yg mau dikirim ke shet
  const dataKirim = { mode: "absen", nama, kelompok, jenjang, jk, status, keterangan };

  // Kasih feedback sukses ke user
  pesan.style.color="green";
  pesan.innerText="✅ Berhasil! Absen " + nama + " masuk!";
  form.reset(); //reset form
  selectNama.innerHTML = '<option value=""> Pilih Kelompok Dulu</option>'; // rest nama
  selectNama.disabled = true; // kunci lagi nama
  btn.disabled=true; btn.innerText="Terkirim ✅";

  
  setTimeout(()=>{
    btn.disabled=false;
    btn.innerText="Kirim Absen ";
    pesan.innerText="";
    boxKeterangan.style.borderColor = "#e0e0e0";
  }, 3000);

  // Kirim ke shet
  try{
    const blob = new Blob([JSON.stringify(dataKirim)], {type: 'text/plain'});
    if(!navigator.sendBeacon(URL_SHEET, blob)){
       fetch(URL_SHEET, { method:"POST", body: blob, mode:"no-cors", keepalive: true });
    }
  }catch(err){
    fetch(URL_SHEET, { method:"POST", body: JSON.stringify(dataKirim), mode:"no-cors", keepalive: true });
  }
};
