const inquirer = require('inquirer')
const name = require('./name')

module.exports = (songs) => inquirer.prompt([{
    type:'list',
    name:'song',
    message:`共有${songs.length}个结果，按下回车键下载`,
    choices:songs.map((song,index)=>name(song,index))
}])