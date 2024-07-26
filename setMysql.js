const mysql = require('mysql')

// 创建连接池————改*获取ip
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'N0mur@4$99!',
	database: 'kpos',
	port: 22108,
})

// 执行同步查询
function queryDatabase(query, values) {
	return new Promise((resolve, reject) => {
		pool.query(query, values, (error, results, fields) => {
			if (error) {
				return reject(error)
			}
			resolve(results)
		})
	})
}

// 使用示例
async function main(query) {
	try {
		const results = await queryDatabase(query)
		// console.log(results);
		return results
	} catch (error) {
		console.error('Query error', error)
	}
}

const closeQurey = () => {
	pool.end()
	//关闭连接
}
module.exports = {
	main,
	closeQurey,
	//导出模块
}
