const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Cấu hình view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng thư mục public cho file CSS
app.use(express.static(path.join(__dirname, 'public')));

// Route chính để hiển thị 1 ảnh mèo
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        const catImage = response.data[0].url; // Lấy URL ảnh
        res.render('index', { catImage, catImages: null });
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra khi lấy dữ liệu từ API.');
    }
});

// Route để hiển thị 10 ảnh mèo
app.get('/ten-cats', async (req, res) => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        const catImages = response.data.map(cat => cat.url); // Lấy URL của 10 ảnh
        res.render('index', { catImage: null, catImages });
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra khi lấy dữ liệu từ API.');
    }
});

// Lắng nghe trên cổng
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
