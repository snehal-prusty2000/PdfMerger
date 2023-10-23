const express = require('express')
const path = require('path')
const multer  = require('multer')
const {mergePdfs}  = require('./merge')//this is file name
const upload = multer({ dest: 'uploads/' })
const app = express()
/*To create a virtual path prefix (where the path does not actually exist in the file system) for 
files that are served by the express.static function, specify a mount path for the static directory, as shown below:*/

app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('pdfs', 3), async function (req, res, next) {
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
    console.log(req.files)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
   // res.send({data: req.files})//that means req.files present under data show in text
  }) 
  
app.listen(port, () => {
  console.log(`Example app listening on port htttp://localhost:${port}`)
})