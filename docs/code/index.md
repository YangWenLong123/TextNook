# 封装一个常用的 api 请求方法

```js
//需要返回的数据
let obj = {
    name: 'along'
}

//类型判断
let Types = {
	isFunction: function(obj) {
		var type = Object.prototype.toString.call(obj)
		return type == '[object Function]'
	},
	isObject: function(obj) {
		var type = Object.prototype.toString.call(obj)
		return type == '[object Object]'
	},
	isString: function(obj) {
		var type = Object.prototype.toString.call(obj)
		return type == '[object String]'
	}
}

//封装代码
let getData = function (options) {
    let emptyFun = function() {}
	let config = {//参数更具需求自行配置
		data: null,
		event: null,
		success: emptyFun,
		fail: emptyFun,
		complete: emptyFun
	}

    if (options && Types.isObject(options)) {
		config = Object.assign({}, config, options)
	}

    let success = config.success || emptyFun
	let fail = config.fail || emptyFun
	let complete = config.complete || emptyFun

    if (JSON.stringify(obj) !== '{}') {
		success && Types.isFunction(success) && success({
			data: obj
		})
	} else {
		fail && Types.isFunction(fail) && fail({
			data: null
		})
	}
	complete && Types.isFunction(complete) && complete({//成功失败都会调用
        data: obj
    })
}

//调用
getData({
    data: '',
    success: resp => {
        console.log(resp, 'resp')
    },
    fail: error => {
        console.log(error, 'error');
    },
    complete: complete => {
        console.log(complete, 'complete');
    }
})

-------------------------------打印-------------------------------
{ data: { name: 'along' } } resp
{ data: { name: 'along' } } complete
```
