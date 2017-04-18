let md5 = require('md5')
let jwt = require('jsonwebtoken')

let mongoose = require('../mongoConfig')
let Admin = mongoose.model('RootUser')
let config = require('../config/secret')
let secretServ = config.secretServer
const errorMessge =  require('../config/statusCode')
const publicUtil = require('./public')
const {list, errorFn, page} = publicUtil
class adminService {
  async getList (req, res) {
    let {username, email, pageSize = 10, pageNum = 1,sort = '-update_date'} = req.body
    let query = {}
    let result = {}
    pageSize = parseInt(pageSize, 10)
    pageNum = parseInt(pageNum, 10)
    username ? query.username = username : ''
    email ?  query.email = email : ''
    result = await list.call(publicUtil, Admin, sort, pageSize, pageNum, query)
    res.json(result)
  }

  async regist (req, res) {
    let {username, password, email} = req.body
    if (!username || !password || !email) {
      res.json({
        statusCode: 2001003,
        message: errorMessge['2001003']
      })
    }
    try {
      let isContainUser = await Admin.findOne({"$or": [{username}, {email}]})
      if (isContainUser) {
        res.json({
          statusCode: 2001001,
          message: errorMessge['2001001']
        })
      } else {
        try {
          let creatUser = await Admin.create({
            username,
            password,
            email,
            is_delete: false
          })
          res.json({
            statusCode: 2000000,
            message: "注册管理员成功",
            data: username
          })
        } catch (error) {
          res.json(errorFn(error))
        }
      }
    } catch (error) {
      res.json(errorFn(error))
    }
  }

  async removeUser (req, res) {

  }

  logOut (req, res) {
    req.session.destroy();
    res.send({
      statusCode: 2000000,
      message: "退出成功"
    })
  }

  async login (req, res) {
    let {username, password} = req.body
    try {
      let isContainUser = await Admin.findOne({username,password})
      if (isContainUser) {
        req.session.userId = md5(`${secretServ}${username}`)
        req.session.user = username
        res.send({
          statusCode: 2000000,
          message: "登陆成功",
          data: username
        })
      } else {
        res.send({
          statusCode: 2001004,
          message: errorMessge['2001004']
        })
      }

    } catch (error) {
      res.json(errorFn(error))
    }
  }

  checkLogin (req, res) {
      res.send({
        statusCode: 2000000,
        message: "登陆成功"
      })
  }

}

module.exports = new adminService
