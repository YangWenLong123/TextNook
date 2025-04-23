# Cookie

`Cookie` 是服务器委托浏览器存储的一些数据，它让服务器有了“记忆能力”，它会在浏览器下次向服务器再 **发起请求时被携带** 并发送到服务器上。

## Cookie 的工作过程

会用到两个字段：响应头字段 `Set-Cookie` 和请求头字段 `Cookie`。

- 响应报文使用 `Set-Cookie` 字段发送“`key=value`”形式的 `Cookie` 值
- 请求报文里用 `Cookie` 字段发送多个 `Cookie` 值

## Cookie 的属性

**`Cookie` 的生存周期**：可以使用 `Expires` 和 `Max-Age` 两个属性来设置

- `Expires`即过期时间，用的是绝对时间点，可以理解为“截止日期”（`deadline`）。
- `Max-Age`用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 `Max-Age`，就可以得到失效的绝对时间。
- `Expires` 和 `Max-Age` 可以同时出现，浏览器会优先采用 `Max-Age` 计算失效期。

**`Cookie` 的作用域**：让浏览器仅发送给特定的服务器和 `URI`，避免被其他网站盗用。

- `Domain` 和 `Path` 指定了 `Cookie` 所属的域名和路径，浏览器在发送 `Cookie` 前会从 `URI` 中提取出 `host` 和 `path` 部分，对比 `Cookie` 的属性。
- 如果不满足条件，就不会在请求头里发送 `Cookie`。

**`Cookie` 的安全性**：尽量不要让服务器以外的人看到。

- `HttpOnly`：`Cookie` 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，比如不能通过 JS 访问 `Cookie`，减少 XSS 攻击；
- `SameSite`：`SameSite` 可以防范 XSRF（跨站请求伪造）攻击，设置成 `SameSite=Strict` 可以严格限定 `Cookie` 不能随着跳转链接跨站发送，而 `SameSite=Lax` 则略宽松一点，允许 `GET`/`HEAD` 等安全方法，但禁止 `POST` 跨站发送
- `Secure`：表示这个 `Cookie` 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送。

## Cookie 的应用

- **身份识别**：`Cookie` 最基本的一个用途就是身份识别，保存用户的登录信息，实现会话事务
- **广告跟踪**：广告商网站（例如 Google），它会“偷偷地”给你贴上 `Cookie` 小纸条，这样你上其他的网站，别的广告就能用 `Cookie` 读出你的身份，然后做行为分析，再推给你广告。

## Cookie 的特点

- **数据生命周期**：一般由服务器生成，可以设置过期时间
- **数据存储大小**：`Cookie` 的大小受限，一般为 `4 KB`
- **与服务端通信**：每次发起同域下的 HTTP 请求时，在 `header` 中都会携带当前域名下的 `Cookie` ，会影响请求的性能

## Cookie 使用示例

```js

// 读取网站下所有的 cookie 信息，获取的结果是一个以分号`;`作为分割的一个字符串
let allCookies = document.cookie;

// 往原来的已经存在的 cookie 中加入新的 cookie
document.cookie ="name=vincent";

// 还可以在后面加上可选择的选项键值对，如 domain、path、expires
document.cookie="name=vincent;domain=.test.com"

// 删除cookie，就是让这个 cookie 的 expires 过期，即设置这个 expires 的值为 0
document.cookie="name=vincent;domain=.test.com;expires=0");
```

# localStorage

这是一种 **持久化** 的存储方式，即说如果不手动清除，数据就永远不会过期。它是采用 **键值对** 的方式存储数据，按域名将数据分别保存到对应数据库文件里。相比 `Cookie` 来说，它能保存更大的数据。

## localStorage 的特点

- **数据生命周期**：除非被清理，否则会一直存在
- **数据存储大小**：5M
- **与服务端通信**：不与服务端进行通信

## localStorage 使用示例

```js
// setItem() 设置属性
localStorage.setItem('name', 'vincent');

// getItem() 获取数据
let name = localStorage.getItem('name');

// removeItem() 移除某个属性
localStorage.removeItem('name');

// clear() 移除所有数据项
localStorage.clear();
```

## 模拟实现一个 localStorage

```js
class myLocalStorage {
  constructor() {
    this.store = {};
  }
  setItem(key, val) {
    this.store[key] = val;
  }
  getItem(key) {
    return this.store[key] || null;
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}
```

## 实现过期时间功能

```js
(function () {
  let getItem = localStorage.getItem.bind(localStorage);
  let setItem = localStorage.setItem.bind(localStorage);
  let removeItem = localStorage.removeItem.bind(localStorage);
  localStorage.getItem = function (keyName) {
    let expires = getItem(keyName + '_expires');
    if (expires && new Date() > new Date(Number(expires))) {
      removeItem(keyName);
      removeItem(keyName + '_expires');
    }
    return getItem(keyName);
  };
  localStorage.setItem = function (keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      let expiresDate = new Date(expires).valueOf();
      setItem(keyName + '_expires', expiresDate);
    }
    return setItem(keyName, keyValue);
  };
})();
```

# sessionStorage

`sessionStorage` 是一种 **会话级别的缓存**，关闭浏览器时数据会被清除。

需要注意的是 `sessionStorage` 的作用域是 **窗口级别** 的，也就是说不同窗口之间保存的 `sessionStorage` 数据是不能共享的。

## sessionStorage 的特点

- **数据生命周期**：数据在页面刷新后依然存在，但是关闭浏览器标签页之后数据就会被清除
- **数据存储大小**：5M
- **与服务端通信**：不与服务端进行通信

## sessionStorage 使用示例

`sessionStorage` 与 `localStorage` 拥有统一的 API 接口：

```js
// setItem() 设置属性
sessionStorage.setItem('name', 'vincent');

// getItem() 获取数据
let name = sessionStorage.getItem('name');

// removeItem() 移除某个属性
sessionStorage.removeItem('name');

// clear() 移除所有数据项
sessionStorage.clear();
```

# indexedDB

`indexedDB` 是 NoSQL 数据库，是一种支持事务的浏览器数据库，用于客户端存储大量结构化数据，包括文件、二进制大型对象。

## indexedDB 的特点

- **数据生命周期**：除非被清理，否则会一直存在
- **数据存储大小**：无限制
- **与服务端通信**：不与服务端进行通信

## indexedDB 使用示例

```js
// 使用 indexedDB.open() 方法创建或打开数据库
var request = window.indexedDB.open(dbName, version); // 数据库名 版本号
// error 事件表示打开数据库失败
request.onerror = function (event) {
  console.log('创建或打开数据库失败');
};
// success 事件表示成功打开数据库
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('创建或打开数据库成功');
};
```

下面是我之前一个项目用到的 `indexDB` 的一些代码：

```js
/**
1、数据库名（mydb）
2、版本号（1.0）
3、描述（Test DB）
4、数据库大小（2*1024*1024）
*/
var sqliteDB = function (db_name, size) {
  var _db = openDatabase(db_name, '1.0.0', '', size); // 生成或打开数据库
  var currSql = null;
  return {
    /**
     * 执行sql，回调返回影响条数
     */
    execute: function (sql, param, callback) {
      currSql = sql;
      // 参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      this.query(sql, param, function (result) {
        if (typeof callback == 'function') {
          callback(result.rowsAffected);
        }
      });
    },

    /**
     * 执行sql，回调返回sql查询对象
     * 查询时，有数据返回数组，无数据返回0
     * 增删改时：返回int，影响条数
     * void query( string[, function])
     * void query( string[, array[, function]])
     */
    query: function (sql, param, callback) {
      currSql = sql;
      // 参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      var self = this;
      // 只有一个参数
      _db.transaction(function (tx) {
        // 4个参数：sql，替换sql中问号的数组，成功回调，出错回调
        tx.executeSql(
          sql,
          param,
          function (tx, result) {
            if (typeof callback == 'function') {
              callback(result);
            }
          },
          self.onfail
        );
      }, self.onTransactionFail);
    },

    executeSql: function (sql, param, callback) {
      currSql = sql;
      // _db.transaction(fn, success, error);
      //参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      var self = this;
      // 只有一个参数
      _db.transaction(function (tx) {
        // 4个参数：sql，替换sql中问号的数组，成功回调，出错回调
        tx.executeSql(
          sql,
          param,
          function (tx, result) {
            if (typeof callback == 'function') {
              callback(result);
            }
          },
          self.onfail
        );
      }, self.onTransactionFail);
      // console.log(sql);
    },
    /**
     * 插入，回调返回last id
     * void insert( string, object[, function])
     */
    insert: function (table, data, callback) {
      if (typeof data != 'object' && typeof callback == 'function') {
        callback(0);
      }
      var k = [];
      var v = [];
      var param = [];
      for (var i in data) {
        k.push(i);
        v.push('?');
        param.push(data[i]);
      }
      var sql = 'INSERT INTO ' + table + '(' + k.join(',') + ') VALUES(' + v.join(',') + ')';
      currSql = sql;
      this.query(sql, param, function (result) {
        if (typeof callback == 'function') {
          callback(result.insertId);
        }
      });
    },
    /**
     * 修改，回调返回影响条数
     * void update( string, object[, string[, function]])
     * void update( string, object[, string[, array[, function]]])
     */
    update: function (table, data, where, param, callback) {
      // 参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      var set_info = this.mkWhere(data);
      for (var i = set_info.param.length - 1; i >= 0; i--) {
        param.unshift(set_info.param[i]);
      }
      var sql = 'UPDATE ' + table + ' SET ' + set_info.sql;
      if (where) {
        sql += ' WHERE ' + where;
      }
      currSql = sql;
      this.query(sql, param, function (result) {
        if (typeof callback == 'function') {
          callback(result.rowsAffected);
        }
      });
    },

    /**
     * 删除
     * void toDelete( string, string[, function]])
     * void toDelete( string, string[, array[, function]])
     */
    del: function (table, where, param, callback) {
      // 参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      var sql = 'DELETE FROM ' + table + ' WHERE ' + where;
      currSql = sql;
      this.query(sql, param, function (result) {
        if (typeof callback == 'function') {
          callback(result.rowsAffected);
        }
      });
    },
    /***
     * 事务
     */
    transaction: function (fn, success, error) {
      var hookError = function (tx, e) {
        console.log(tx.message);
        if (error) error(tx, e);
      };
      _db.transaction(fn, hookError, success);
      //_db.transaction(fn, error,success);
    },
    /**
     * 查询，回调返回结果集数组
     * void fetch_all( string[, function] )
     * void fetch_all( string[, param[, function]] )
     */
    fetchAll: function (sql, param, callback) {
      currSql = sql;
      // 参数处理
      if (!param) {
        param = [];
      } else if (typeof param == 'function') {
        callback = param;
        param = [];
      }

      this.query(sql, param, function (result) {
        if (typeof callback == 'function') {
          var out = [];
          if (result.rows.length) {
            for (var i = 0; i < result.rows.length; i++) {
              out.push(result.rows.item(i));
            }
          }
          callback(out);
        }
      });
    },

    /**
     * 查询表的信息
     * table_name: 表名称，支持 % *，
     */
    showTables: function (table_name, callback) {
      this.fetchAll(
        "select * from sqlite_master where type='table' and name like ?",
        [table_name],
        callback
      );
    },
    /**
     * 组装查询条件
     */
    mkWhere: function (data) {
      var arr = [];
      var param = [];
      if (typeof data === 'object') {
        for (var i in data) {
          arr.push(i + '=?');
          param.push(data[i]);
          //console.log('data.i:'+i);
        }
      }
      return {
        sql: arr.join(' , '),
        param: param,
      };
    },
    onTransactionFail: function (tx, e) {
      showSqliteError(tx);
    },
    /**
     * 错误处理
     */
    onfail: function (tx, e) {
      console.log('sql error: ' + e.message);
      console.log('执行sql:' + currSql);
    },
  };
};
// 调用 initDataBase() 生成或打开数据库
function initDataBase() {
  fgDB = new sqliteDB(dbName, 1024 * 1024 * 2);
  initFGdb();
}
// 数据库表的内容
function initFGdb() {
  fgDB.transaction(
    function (tx) {
      // 用户表
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS [user] (id VARCHAR2(32) PRIMARY KEY NOT NULL, name VARCHAR2(32), password VARCHAR2(32),phone VARCHAR2(32),  remark VARCHAR2(32), define VARCHAR2(32))'
      );
    },
    function () {
      console.log('创建数据库成功!');
    },
    function (err) {
      console.log('创建数据库失败!');
      console.log(err);
    }
  );
}
```

# 总结

- `Cookie` 可以设置过期时间；存储大小一般为 `4KB`；会被携带在 `header` 上与服务端通信
- `localStorage` 需要主动清理，否则会一直存在；存储大小为 `5M`；不参与服务端通信
- `sessionStorage` 和 `localStorage` 类似，区别在于存储在页面关闭之后就清除
- `indexedDB` 需要主动清理，否则会一直存在；存储大小没有限制；不参与服务端通信

**存储的使用**：现在已经不建议使用 `Cookie` 来存储数据，当没有大量数据存储需求可以用 `localStorage` 和 `sessionStorage`，不怎么改变的数据用 `localStorage`，否则的话用 `sessionStorage`；而当有大量数据存储需求时可以使用 `indexedDB`。
