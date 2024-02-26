# Backend Developer Interview Test

Proyek ini adalah bagian dari uji tes untuk perekrutan *Backend Developer*. Proyek ini merupakan implementasi REST API menggunakan Node.js dan Express.js.

## Instalasi

1. Pastikan Anda sudah menginstal Node.js dan MySQL di sistem Anda.
2. Clone repositori ini ke dalam direktori lokal Anda:

    ```bash
    git clone https://github.com/husainrizaldy/be-dev-rest-api.git
    ```

3. Masuk ke dalam direktori proyek:

    ```bash
    cd be-dev-rest-api
    ```

4. Install dependensi menggunakan npm:

    ```bash
    npm install
    ```

5. Buat file `.env` berdasarkan contoh `.env.example` dan atur koneksi database MySQL Anda.

## Penggunaan

### Menjalankan Server

Jalankan server menggunakan perintah:

    npm start
    
atau

    npm run dev

### Endpoint

Berikut adalah daftar endpoint yang tersedia dalam proyek ini:

1. **Create New Employee**
    ```http
    POST /api/v1/Employee
    ```
    Endpoint ini digunakan untuk membuat karyawan baru.

2. **Update Employee Position**
    ```http
    PUT /api/v1/Employee/updatePosition/:id
    ```
    Endpoint ini digunakan untuk memperbarui posisi jabatan karyawan berdasarkan ID.

3. **Get All Employees**
    ```http
    GET /api/v1/Employee
    ```
    Endpoint ini digunakan untuk mendapatkan semua data karyawan.

4. **Get Employees Without User**
    ```http
    GET /api/v1/Employee/withoutuser
    ```
    Endpoint ini digunakan untuk mendapatkan data karyawan yang belum terdaftar sebagai pengguna (user).

5. **Get Logged In Employees**
    ```http
    GET /api/v1/Employee/loggedin
    ```
    Endpoint ini digunakan untuk mendapatkan data karyawan yang sedang dalam status login.

6. **Get Employee By ID**
    ```http
    GET /api/v1/Employee/:id
    ```
    Endpoint ini digunakan untuk mendapatkan data karyawan berdasarkan ID.

7. **Delete Employee**
    ```http
    DELETE /api/v1/Employee/:id
    ```
    Endpoint ini digunakan untuk menghapus data karyawan berdasarkan ID.

## Dokumentasi Postman

Dokumen API ini telah diatur dalam koleksi Postman yang dapat diakses untuk pengujian. Untuk melihat dan mengunduh koleksi tersebut, silakan buka tautan berikut:

[![Postman Collection](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/33200646/2sA2rDxLyZ)

## Cara Membangun Proyek Ini

Proyek ini dibangun menggunakan Node.js, Express.js, dan MySQL. Berikut adalah langkah-langkah teknis yang diambil selama pembangunan proyek ini:

### 1. Persiapan Awal

1. **Inisialisasi Proyek**: Proyek dimulai dengan inisialisasi menggunakan `npm init` untuk membuat `package.json`. Selanjutnya, instalasi Express.js dan dotenv dilakukan menggunakan perintah `npm install express dotenv`.

2. **Database Setup**: Database MySQL diatur melalui file `config/db.js` menggunakan modul `mysql`. Koneksi ke database diinisialisasi saat aplikasi dimulai.

3. **Struktur Proyek**: Proyek dibagi ke dalam direktori seperti `controllers`, `models`, `routes`, dan `utils`. Masing-masing memiliki tugas masing-masing sesuai dengan konsep MVC (Model-View-Controller).

### 2. Pembuatan Endpoint

1. **Routes**: Endpoints diatur dalam file `routes/v1/karyawanRoutes.js`. Pengelompokan endpoint berdasarkan versi API mempermudah penataan.

2. **Controllers**: Logika pengendali untuk masing-masing endpoint ditempatkan dalam file `controllers/karyawanController.js`. Pemanggilan model dan manipulasi data dilakukan di sini.

3. **Models**: Interaksi langsung dengan database MySQL terjadi di dalam file `models/karyawanModel.js`. Model berisi fungsi-fungsi yang menyediakan akses ke data.

### 3. Middleware

1. **Middleware untuk JSON Parsing**: Middleware untuk mengurai body JSON diatur di `app.js` menggunakan `express.json()`.

2. **Middleware untuk CORS**: Middleware untuk CORS bisa ditambahkan di `app.js` untuk memungkinkan akses lintas domain

### 4. Error Handling

1. **Response Handling Utilities**: File `utils/responseHandler.js` berisi fungsi-fungsi untuk menangani respon API, termasuk respons sukses, not found, dan error.

2. **Try-Catch di Controllers dan Models**: Kesalahan ditangani dengan menggunakan blok try-catch di dalam file `controllers/employeeController.js` dan `models/employeeModel.js`.

### 5. Validasi Input

1. **Middleware untuk Validasi Input**: Middleware validasi dapat ditambahkan di `routes/v1/employeeRoutes.js` untuk memeriksa masukan sebelum mencapai kontroler.

2. **Validator Utility Functions**: Validasi spesifik seperti validasi integer atau tidak boleh kosong dapat diimplementasikan di dalam file `utils/validator.js`.

### 6. Pengembangan Query

1. **Pengembangan Query**: Query yang kompleks dan melibatkan join dapat diatur di dalam model sesuai dengan kebutuhan, seperti dalam file `models/employeeModel.js`.

2. **Penanganan Error**: Untuk setiap operasi di dalam model yang melibatkan query database, penanganan kesalahan dilakukan dan dipropagasi ke kontroler.

### 7. Pengujian

1. **Pengujian dengan Postman**: Pengujian dilakukan menggunakan Postman atau alat pengujian API lainnya untuk memastikan setiap endpoint berfungsi seperti yang diharapkan.

2. **Dokumentasi Postman**: Dokumentasi Postman dibuat dan dibagikan melalui link sehingga pengguna lain dapat dengan mudah mencoba dan memahami cara menggunakan API.

### 8. Update Endpoint

1. **Menambahkan Endpoint Baru**: Untuk menambahkan endpoint baru, buka file `routes/v1/employeeRoutes.js` dan tambahkan rute baru sesuai kebutuhan. Kemudian, buka `controllers/employeeController.js` untuk menambahkan logika pengendali untuk endpoint tersebut.

2. **Dokumentasi**: Jangan lupa untuk mencatat endpoint baru di dalam [Dokumentasi Endpoint](#endpoint) dan [Dokumentasi Postman](https://documenter.getpostman.com/view/33200646/2sA2rDxLyZ).