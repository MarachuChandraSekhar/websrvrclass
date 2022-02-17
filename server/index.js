const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const port = 3000


app
.get('/',(req,res) =>{
   res.send('Welcome');
})
   .get('/about', (req, res) => {
  res.send('Hello chandra sekhar');
  })
  
    .get('/contact', (req, res) => {
      res.send({
          email: 'marachuc1@newpaltz.edu',
          phone: '845-845-1234',
          twitter: '@MarachuChandraSekhar',
          instagram: '@MarachuChandraSekhar'
      });
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})