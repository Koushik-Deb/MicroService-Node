const express = require('express')

const app = express()

app.use(express.json())

const posts = {}

app.get('/posts', (req, res)=>{
})

app.post('/posts', (req, res)=>{
})

app.listen(4000, ()=>{
    console.log('Listening on 4000')
})
