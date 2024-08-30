const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const { title } = require('process')
const app = express()

const url = 'https://monicajorgedev.github.io/project-break-dashboard/'

app.get('/', (req,res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            
            const pageTitle = $('title').text()
            
            const links = []
            const imgs = []

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index,element)=> {
                const img = $(element).attr('src')
                imgs.push(img)
            })
            
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</li>`).join('')}
                </ul>
                <h2>Imagenes</h2>
                <ul>
                    ${imgs.map(img => `<li><a href="${url}${img}">${img}</li>`).join('')}
                </ul>
                `)
        }
    })
})

app.listen(3000, () => {
    console.log('express esta escuchando en el puerto http://localhost:3000')
})