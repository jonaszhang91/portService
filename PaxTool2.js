const net = require('net')

//获取ip
let PaxIp ="10.1.10.202"
const getIp = (ip) => {
	PaxIp = ip
	//获取ip地址
	// console.log(PaxIp);
}

// 创建TCP服务器
const server = net.createServer((socket) => {
	// 连接到目标IP和端口

	const target = net.createConnection({ host: PaxIp, port: 10009 }, () => {
		console.log('Connected to the target server')
	})

	// 转发数据
	socket.on('data', (data) => {
		target.write(data)
	})

	// 转发目标服务器的响应数据
	target.on('data', (data) => {
		socket.write(data)
	})

	// 错误处理
	socket.on('error', (err) => {
		console.error('Socket error:', err)
		target.end()
	})
	target.on('error', (err) => {
		console.error('Target error:', err)
		socket.end()
	})

	// 转发结束时关闭连接
	socket.on('end', () => {
		console.log('Socket connection ended')
		target.end()
	})
	target.on('end', () => {
		console.log('Target connection ended')
		socket.end()
	})
})

const openPaxTool = () => {
	// 监听端口
	server.listen(10009, () => {
		console.log(`Server is listening on port 10009 to ${PaxIp}`)
	})
}

const closePaxTool = () => {
	//关闭监听
	server.close(() => {
		console.log('PaxTool Port Listen is closed')
	})
}
openPaxTool()
// module.exports = {
// 	getIp,
// 	openPaxTool,
// 	closePaxTool,
// 	//导出模块
// }
