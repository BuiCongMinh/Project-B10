const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/ProjectB10')
.then(data=>{ console.log('connect success !')})
.catch(er=>{ console.log('connect fail !')})


module.exports = mongoose
