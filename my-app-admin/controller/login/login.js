'use strict';
import crypto from 'crypto';
import modelLogin from '../../model/login.js';

class Admin  {
	constructor(){
		this.login = this.login.bind(this)
		this.register = this.register.bind(this)
		this.encryption = this.encryption.bind(this)
		this.decryption = this.decryption.bind(this)
		
	}
	login(req, res, next){
        let options = {};
        try{
			modelLogin.login(options,rows =>{
				console.log(rows)
				res.send({
					status: 1,
					success: '登陆成功!',
					data:JSON.stringify(rows)
				})
			});
			
        }catch(err){
			console.log(err)
            throw new Error('用户名错误')
        }
	}
	register(req, res, next){
		let params = {
			phone:req.body.phone,
			password:this.encryption(req.body.password,'password')
		}
		modelLogin.isRegister(params,rows =>{
			let len = rows.length;
			console.log(len)
			if(len>0) {
				res.send({
					status: 0,
					type: 'REGISTER_ADMIN_FAILED',
					message: '注册失败',
				})
			} else {
				try{
					// console.log(this.decryption('0b565b1b28ff9a8b2d721462510c612e','password'))
					modelLogin.register(params,rows =>{
						res.json({
							status: 1,
							success: '注册成功!'
						});
					});
				}catch(err){
					res.json({
						status: 0,
						type: 'REGISTER_ADMIN_FAILED',
						message: '注册失败',
					})
				}
			}
		});
        
	}
	decryption(encrypted, key) {
		const decipher = crypto.createDecipher('aes192', key);
		var decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	}
	encryption(password,key){

		// function aesEncrypt(data, key) {
			const cipher = crypto.createCipher('aes192', key);
			var crypted = cipher.update(password, 'utf8', 'hex');
			crypted += cipher.final('hex');
			return crypted;
		// }
		 
		
		 
		// var data = 'Hello, this is a secret message!';
		// var key = 'Password!';
		// var encrypted = aesEncrypt(data, key);
		
		// const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		// return newpassword
	}
	// async singout(req, res, next){
	// 	try{
	// 		// delete req.session.admin_id;
	// 		res.send({
	// 			status: 1,
	// 			success: '退出成功'
	// 		})
	// 	}catch(err){
	// 		console.log('退出失败', err)
	// 		res.send({
	// 			status: 0,
	// 			message: '退出失败'
	// 		})
	// 	}
	// }
}

export default new Admin()