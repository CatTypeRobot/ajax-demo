const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.argv[2];

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathWithQuery = request.url;
    let queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = request.method;

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        const page1 = fs.readFileSync('db/page1.json').toString()
        const array = JSON.parse(page1)
        const result = array.map(item => `<li>${item.id}</li>`).join('')
        string = string.replace('{{page1}}', `<ul id="p1">${result}</ul>`)
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=uft-8')
        const js = fs.readFileSync('public/main.js')
        response.write(js)
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        const style = fs.readFileSync('public/style.css')
        response.write(style)
        response.end()
    } else if (path === '/getJS.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        const newJS = fs.readFileSync('public/getJS.js')
        response.write(newJS)
        response.end()
    } else if (path === '/newHTML.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        const string = fs.readFileSync('public/newHTML.html')
        response.write(string)
        response.end()
    } else if (path === '/a.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        const xml = fs.readFileSync('public/a.xml')
        response.write(xml)
        response.end()
    } else if (path === '/b.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        const json = fs.readFileSync('public/b.json')
        response.write(json)
        response.end()
    } else if (path === '/page2') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        const page = fs.readFileSync('db/page2.json')
        response.write(page)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
});

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

