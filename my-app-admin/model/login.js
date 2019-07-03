/**
 * Created by Administrator on 2015/1/18.
 */
var con = require('../util/pool');
// var conf = require('../util/config');

/***
 * 登录接口
 * 
 ****/
exports.login = (options,callBack)=>{
    con.query('select * from user',function(err,rows){
        if(err){
            console.log(err);
        }else{
            console.log(rows)
            callBack&&callBack(rows);
        }
    });
}

exports.register = (option,callBack)=>{
    console.log(option.phone,option.password)
    con.query('insert into user(phone,password) values(?,?)',[option.phone,option.password],function(err,rows){
        if(err){
            console.log(err);
        }else{
            console.log(rows)
            callBack&&callBack(rows);
        }
    });
}

exports.isRegister = (option,callBack)=>{
    con.query('select * from user where phone=?',[option.phone],function(err,rows){
        if(err){
            console.log(err);
        }else{
            console.log(rows)
            callBack&&callBack(rows);
        }
    });
}

// function getUserBlogByPageNum(option,callBack){
//     pool.query('select * from blog where uid=? order by createTime desc limit ?,?',[option.uid,(option.pageNum-1)*conf.pageSize,conf.pageSize],function(err,rows){
//         if(err){
//             console.log(err);
//         }else{
//             callBack(null,rows);
//         }
//     });
// }
// function getBlogByPageNum(pageNum,callBack){
//     pool.query('select * from blog order by createTime desc limit ?,?',[(pageNum-1)*conf.pageSize,conf.pageSize],function(err,rows){
//         if(err){
//             console.log(err);
//         }else{
//             callBack(null,rows);
//         }
//     });
// }
// function addBlog(option,callBack){
//     pool.query('insert into blog(title,content,uid,uname,createTime) values(?,?,?,?,?)',[option.title,option.content,option.uid,option.uname,option.createTime],function(err,rows){
//         if(err){
//             console.log(err);
//         }else{
//             callBack(null,rows);
//         }
//     });
// }

