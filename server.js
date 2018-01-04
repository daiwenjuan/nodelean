/**
 *  Created by daiwenjuan on 2018/1/4 下午3:08.
 */
var express = require('express')
var app = express()
var fs = require('fs')

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.53:3031')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})
app.get('/listUsers', function (req, res) {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
    console.log(data)
    res.end(data)
  })
})
//添加的新用户数据
var user = {
  'user4': {
    'name': 'mohit',
    'password': 'password4',
    'profession': 'teacher',
    'id': 4
  }
}
app.get('/addUser', function (req, res) {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
    data = JSON.parse(data)
    data['user4'] = user['user4']
    console.log(data)
    res.end(JSON.stringify(data))
  })
})

app.get('/:id', function (req, res) {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
    data = JSON.parse(data)
    var user = data['user' + req.params.id]
    console.log(user)
    res.end(JSON.stringify(user))
  })
})

var id = 2
app.get('/deleteUser', function (req, res) {
  fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
    data = JSON.parse(data)
    console.log(data)
    delete data['user' + 2]
    console.log(data)
    res.end(JSON.stringify(data))
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})