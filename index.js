const PaxTool = require('./PaxTool')
const PrinterTool = require("./printerTool")
const setMysql = require('./setMysql')
const express = require('express')
const app = express()
const port = 31001

app.all('*', function (err, req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Methods',
		'PUT, GET, POST, DELETE, OPTIONS'
	)
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length,Authorization,Origin,Accept,X-Requested-With'
	)
	res.setHeader('Content-type', 'application/json;charset=utf-8')
	if (err.name === 'UnauthorizedError')
		res.status(401).send('invalid token...')
	// ### next() 代表要此中间件执行完毕后执行下一个中间件, 一般在中间件里面书写, 其他地方不要用
	next()
})
//获取信息
app.get('/', async (req, res) => {
    console.log(req.query.query);
    let msg 
    if (req.query.query){
        msg = await setMysql.main(
		req.query.query
		//获取query的信息 发送给 mysql 处理
	)
    }else{
        msg = "ok"
    }
	 
	// console.log(req.query.query);
	// 这一步JSONP必备
	// console.log(req.query)
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: msg,
			//msg 赋值反馈值
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
//-----刷卡机模块-------
//设置转发ip
app.get('/setIp', async (req, res) => {
	// 这一步JSONP必备
	// console.log(req.query)
	PaxTool.getIp(req.query.ip)
	//获取url 的值
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'paxSet',
			//反馈状态
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
//开启 pax 端口转发
app.get('/startPax', async (req, res) => {
	// 这一步JSONP必备
	PaxTool.openPaxTool()
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'paxOpen',
			//状态码
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
app.get('/closePax', async (req, res) => {
	//关闭pax转发
	// 这一步JSONP必备
	PaxTool.closePaxTool()
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'paxclose',
			//状态码
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
//------刷卡机模块-------
//--------打印机模块----------
//设置转发ip
app.get('/setPrinterIp', async (req, res) => {
	// 这一步JSONP必备
	// console.log(req.query)
	PrinterTool.getIp(req.query.ip)
	//获取url 的值
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'ipSet',
			//反馈状态
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
//开启 pax 端口转发
app.get('/startPrinter', async (req, res) => {
	// 这一步JSONP必备
	PrinterTool.openprinterTool()
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'PortOpen',
			//状态码
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
app.get('/closePrinter', async (req, res) => {
	//关闭pax转发
	// 这一步JSONP必备
	PrinterTool.closeprinterTool()
	const _callback = req.query.callback
	// 服务端获取的callback就是我们定义的funapi
	const response = {
		code: 200,
		message: 'success',
		data: {
			msg: 'paxclose',
			//状态码
		},
	}
	if (_callback) {
		// 这两步设置发送也是NODE.JS发送JSONP必备
		res.type('text/javascript')
		res.send(_callback + `(${JSON.stringify(response)})`)
	} else {
		res.json(response)
	}
})
//--------打印机模块----------
app.listen(port, () => {
    //开启端口 
	console.log(`Server running on http://localhost:${port}`)
})
