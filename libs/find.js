const Request = require('./request')

module.exports = async (song,findName) => {
  const  url = 'https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=' + song.id
  const {data:res} = await Request(url)
  return {song,res,findName}
}