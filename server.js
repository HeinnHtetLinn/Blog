const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const methodOverride = require("method-override")
const moongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require("./models/articles")

mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser:true, useUnifiedTopology:true
})
app.set('view engine', 'ejs')


app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get("/", async (req,res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles});
})
app.use('/articles',articleRouter)
app.listen(5000)