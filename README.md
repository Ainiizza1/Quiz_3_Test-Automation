QUIZ 3 : Automation Test Login OrangeHRM using Cypress

✅ Positive Test
TC-002: Login dengan username huruf besar → berhasil login
TC-004: Login dengan spasi setelah username → tetap berhasil (kemungkinan sistem melakukan trim input)
TC-006: Session login berhasil dibuat → user berhasil masuk ke dashboard
TC-009: Klik tombol login berkali-kali → sistem tetap login normal

❌ Negative Test
TC-001: Login tanpa username dan password → muncul pesan "Required"
TC-003: Login dengan password huruf besar → gagal login
TC-007: Login dengan username mengandung angka → gagal login
TC-008: Login dengan username salah → gagal login

🔄 Additional Test
TC-005: Refresh halaman saat login → input kembali kosong (session tidak tersimpan sebelum submit)