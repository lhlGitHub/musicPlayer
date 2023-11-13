const EventEmitter = require('events').EventEmitter
class Emitter extends EventEmitter{}
const emitter = new Emitter()
const names = require('./libs/name')

;['search','choose','find','download'].forEach(hook => {
  const fn = require('./libs/'+hook)
   emitter.on(hook,async (...arg)=>{
   const res = await fn(...arg) 
   console.log('res',res)
   this.emit('handler',hook,res,...arg) 
   })
});

emitter.on('afterSearch',function(data,q){
  if(!data || !data.result|| !data.result.songs){
    console.log('没有搜到'+q+'d=的相关结果')
    return process.exit(1)
  }
  const songs = data.result.songs
  this.emit('choose',songs)
})
emitter.on('afterChoose',function(answers,songs){
  const arr = songs.filter((songs,i)=>{
    names(songs,i) === answers.songs
  })
  if(arr[0] && arr[0].id){
    this.emit('find',arr[0],answers.songs)
  }
})
emitter.on('afterFind',function({ song, res, findName }){
 
  if(res[0] && res[0].url){
    this.emit('download',{ song, res:res[0], findName })
  }
})
emitter.on('downloadEnd',function(){
  console.log('下载结束')
  process.exit()
})


emitter.on('handler',function(hook,res,...args){
  switch(hook){
    case 'search':
      return this.emit('afterSearch',res, args[0])
    case  'choose':
      return this.emit('afterChoose',res, args[0])
    case 'find':
        return this.emit('afterFind', res)
    case 'download':
       return this.emit('downloadEnd', res)
  }
})

module.exports = emitter