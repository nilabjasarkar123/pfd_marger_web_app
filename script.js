// npm init -y : make package.json ==> folder initialize as Node.js project
// install express : npm i express   
// npm i -g nodemon : dynamically show changes in server

const express = require('express')
const  path  = require('path')
const multer  = require('multer')
const app = express()
const {merge_pdfs}  = require('./mergePdf')

app.use('/static', express.static('public'))
const upload = multer({ dest: 'uploads/' })


const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})



// install npm i multer : help to upload file in node js
app.post('/merge', upload.array('pdfs', 2), async(req, res, next) =>{
    console.log(req.file)
    let d = await merge_pdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data: req.files})
    // req.files is array of `pdf` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})