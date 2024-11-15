const express = require('express');
const path = require('path');
const hbs = require('handlebars');
const app = express();

// View Engine Setup
app.set('views', path.join(__dirname));
app.set('view engine', 'hbs');

// Route
app.get('/', function(req, res){ 
    res.render('Home', { 
        movies: [
            { mvname: 'Venom: Kèo Cuối', mvimg: 'venom', mvrating: '6.7', mvlimit: '16+' },
            { mvname: 'Ngày Xưa Có Một Chuyện Tình', mvimg: 'nxcmct', mvrating: '7.5', mvlimit: '13+' },
            { mvname: 'Red One: Mật Mã Đỏ', mvimg: 'ro', mvrating: '7.3', mvlimit: '16+' },
            { mvname: 'Thiên Đường Quả Báo', mvimg: 'tdqb', mvrating: '7.8', mvlimit: '13+' },
            { mvname: 'Học Viện Anh Hùng: You\'re Next', mvimg: 'hvah', mvrating: '7.2', mvlimit: '16+' },
            { mvname: 'Cười Xuyên Biên Giới', mvimg: 'cxbg', mvrating: '6.9', mvlimit: '13+' },
            { mvname: 'Đừng Buông Tay', mvimg: 'dbt', mvrating: '7.1', mvlimit: '13+' },
            { mvname: 'Ai Oán Trong Vườn Xuân', mvimg: 'aotvx', mvrating: '7.4', mvlimit: '16+' },
            { mvname: 'Đôi Bạn Học Yêu', mvimg: 'dbhy', mvrating: '7.0', mvlimit: '13+' },
            { mvname: 'Đi Karaoke Đi!', mvimg: 'dkd', mvrating: '7.6', mvlimit: '16+' },
            { mvname: 'Tình Ta Đẹp Tựa Đóa Hoa', mvimg: 'ttdtdh', mvrating: '7.7', mvlimit: '13+' },
            { mvname: 'Sand Land', mvimg: 'sl', mvrating: '7.9', mvlimit: '13+' },
            { mvname: 'Elli Và Bí Ẩn Chiếc Tàu Ma', mvimg: 'elli', mvrating: '7.0', mvlimit: '16+' },
            { mvname: 'Cô Dâu Hào Môn', mvimg: 'cdhm', mvrating: '7.4', mvlimit: '13+' },
            { mvname: 'Robot Hoang Dã', mvimg: 'rbhd', mvrating: '7.5', mvlimit: '13+' },
            { mvname: 'Tee Yod: Quỷ Ăn Tạng Phần 2', mvimg: 'ty', mvrating: '7.8', mvlimit: '16+' }
        ]
    });
});

app.listen(5500, function(error){
    if (error) throw error;
    console.log("Server created Successfully on port 5500");
});
