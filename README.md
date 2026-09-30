# Maruko Birthday Surprise

Website ulang tahun statis dengan HTML, CSS, dan JavaScript vanilla. Desainnya terinspirasi dari struktur scroll-based pada repository Happy-Birthday milik Harmann60, lalu dibuat ulang dengan gaya chibi, warna pink, sticker, kartu memo, animasi confetti ulang tahun, modal, video placeholder, audio backsound, dan countdown.

## File
- `index.html` — struktur halaman & teks yang bisa kamu personalisasi.
- `style.css` — seluruh tampilan, animasi confetti, video card, dan responsive mobile.
- `script.js` — countdown, scroll reveal, modal alasan, confetti terus-menerus + burst, video placeholder, backsound, dan tombol kembali ke atas.
- `assets/maruko-pattern.jpg` — gambar yang kamu unggah, dipakai sebagai pattern/background visual.

## Ganti backsound
Masukkan lagu kamu dengan nama:
- `assets/birthday-song.mp3`

Atau ubah atribut `src` pada `<audio id="bgMusic" ...>` di `index.html`.
Halaman akan mencoba autoplay saat dibuka. Browser modern dapat memblokir autoplay yang bersuara; pada kondisi itu backsound akan mulai saat interaksi pertama atau saat tombol **Backsound** ditekan.

## Ganti video
Masukkan video kamu dengan nama:
- `assets/birthday-video.mp4`

Atau ubah `<source src="...">` di section video pada `index.html`.
Placeholder otomatis hilang saat file video tersedia.

## Personalisasi lain
1. Ganti `[Nama]` dan `[Nama Pengirim]` di `index.html`.
2. Ubah tanggal ulang tahun pada `targetDate` di `script.js`.
3. Ubah teks cerita dan alasan sesuai penerima.
4. Untuk gallery foto sendiri, kamu bisa mengganti elemen `.photo-placeholder` dengan `<img>` lokal.

Tidak ada framework atau build step.
