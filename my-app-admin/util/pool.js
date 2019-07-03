/**
 * 
 */
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
function handleDisconnect(){
    con.connect(function (err) {
        // callback(err,result);
        if(err){
            console.log(err);
            console.log("try to connect");
            // setTimeout(handleDisconnect,2000);  //经过1秒后尝试重新连接
            return;
        }
        console.log("Success");
    });
}
handleDisconnect();

module.exports = con;