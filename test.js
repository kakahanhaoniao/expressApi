const fs = require('fs');
const path = require('path');
const url = require('url');

/**
path 和url 模块，用于处理路径和url的常用一些方法
**/
let fullpath = `${__dirname}/${__filename}`;
let pt = path.basename(fullpath, '.js');
let dr = path.dirname(fullpath);
let extname = path.extname(fullpath)
let parse = path.parse(fullpath);
let obj = { root: 'c://',
    dir: 'c://home//hello//world',
    base: '123.html',
    ext: '.html',
    name: '123'
 }
let format = path.format(obj);
console.log(`${__dirname}/${__filename} --  \n
    filename:${pt} \n
    dirname:${dr} \n
    extname: ${extname} \n
    parse: ${JSON.stringify(parse)} \n
    format: ${format}
`);






/**
http模块，用于发送请求，创建服务器等
**/

// http request demo
// const http = require('http');
// const config = {
//     protocol: 'http:',
//     hostname: 'api.douban.com',
//     port: '80',
//     method: 'GET',
//     path: '/v2/movie/top250'
// }
//
// let totalData = '';
// let request = http.request(config, (response) => {
//     // console.log(response)
//     response.setEncoding('utf8');
//     response.on('data', (chunk) => {
//         totalData += chunk;
//     });
//     response.on('end', () => {
//         console.log(JSON.parse(totalData).subjects.filter((item) => {
//             return item.title == '这个杀手不太冷';
//         }));
//     });
// });
//
// request.on('error', (err) => {
//     console.log(err)
// })
//
// request.end();

/**
fs 模块常用操作和对stream流的理解，stream流有开头和结尾，同时 response 和request都是流
**/

// fs pipe demo
// let fsRead = fs.createReadStream('logs/access.log');
// let fsWrite = fs.createWriteStream('logs/access.log.bak',{
//   encoding: 'utf8',
//   autoClose: true
// });
// let zlib = require('zlib');
//
// fsWrite.on('pipe', function (source) {
//     console.log(source)
// })
// fsWrite.Encodeing = 'utf8'
// fsRead.pipe(zlib.createGzip()).pipe(fsWrite);




// fs.createWriteStream demo
// let fsRead = fs.createReadStream('logs/access.log');
// let fsWrite = fs.createWriteStream('logs/access.log.bak');
// fsRead.on('data', (chunk) => {
//     fsWrite.write(chunk);
// })
// fsRead.on('end', (chunk) => {
//     fsWrite.write('写入文件完成');
//     console.log('写入文件完成')
// })
// fsRead.on('error', (err) => {
//     console.log(err);
// })



// fs createReadStream demo
// let count = 0;
// let fsRead = fs.createReadStream('logs/access.log');
//
// let totalData = '';
// fsRead.on('data', (chunk) => {
//     totalData += chunk;
// });
// fsRead.on('open', () => {
//     console.log('数据开始传输------');
// });
// fsRead.on('end', () => {
//     console.log(totalData);
//     console.log('数据结束传输----------');
// });
// fsRead.on('error', (err) => {
//     console.log(err);
// })
