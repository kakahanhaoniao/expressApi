let md5 = require('md5');
let jwt = require('jsonwebtoken');

let mongoose = require('../mongoConfig');
let Admin = require('../model/rootAdmin');
let config = require('../config/secret');
let secretServ = config.secretServer;
const errorMessge = require('../config/statusCode');
const publicUtil = require('./public');
const {list,errorFn,page} = publicUtil;
class adminService {
    async getList(ctx) {
        let {username,email,pageSize = 10,pageNum = 1,sort = '-update_date'} = ctx.request.body;
        let query = {};
        let result = {};
        pageSize = parseInt(pageSize, 10);
        pageNum = parseInt(pageNum, 10);
        username ? query.username = username : '';
        email ? query.email = email : ''
        result = await list.call(publicUtil, Admin, sort, pageSize, pageNum, query);
        ctx.body = result;
    }

    async regist(ctx) {
        let {
            username,
            password,
            email
        } = ctx.request.body;
        if (!username || !password || !email) {
            ctx.error({
                statusCode: 2001003
            });
        }
        try {
            let isContainUser = await Admin.findOne({
                "$or": [{
                    username
                }, {
                    email
                }]
            });
            if (isContainUser) {
                ctx.error({
                    statusCode: 2001001
                });
            } else {
                try {
                    let creatUser = await Admin.create({
                        username,
                        password,
                        email,
                        is_delete: false
                    });
                    ctx.success({
                        statusCode: 2000000,
                        message: "注册管理员成功",
                        data: username
                    });
                } catch (error) {
                    ctx.error(errorFn(error));
                }
            }
        } catch (error) {
            ctx.error(errorFn(error));
        }
    }

    async removeUser(ctx) {

    }

    logOut(ctx) {
        ctx.session.destroy();
        ctx.success({
            statusCode: 2000000,
            message: "退出成功"
        });
    }

    async login(ctx) {
        let {
            username,
            password
        } = ctx.request.body
        try {
            let isContainUser = await Admin.findOne({
                username,
                password
            })
            if (isContainUser) {
                ctx.session.userId = md5(`${secretServ}${username}`);
                ctx.session.user = username;
                ctx.success({
                    statusCode: 2000000,
                    message: "登陆成功",
                    data: username
                });
            } else {
                ctx.error({
                    statusCode: 2001004
                });
            }

        } catch (error) {
            ctx.error(errorFn(error));
        }
    }

    checkLogin(ctx) {
        ctx.success({
            statusCode: 2000000,
            message: "登陆成功"
        });
    }

}

module.exports = new adminService;
