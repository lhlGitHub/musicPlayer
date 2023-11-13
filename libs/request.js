const https= require('https')

module.exports = (url) => new Promise((resolve,reject)=>{
 https.get(url,(res) => {
   let data = []
    res.on('data', (d) => {
        data.push(d)
    });
    res.on('end',()=>{
        let body = ''
        body = JSON.parse(data.join(''))
    })
  
  }).on('error', (e) => {
    console.log('<== API 服务器可能挂了，稍后重试！==>')
    reject(e)
  })
})