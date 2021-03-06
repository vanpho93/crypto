var crypto = require('./crypto.js');
var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  database: 'dangky',
  port: 5432,
  max: 1000
}
var pool = new pg.Pool(config);

function queryDB(sql, onError, onSuccess){
  pool.connect(function(err, client, done){
    if(err){
      onError(err);
      done();
    }else{
      client.query(sql, function(err, result){
        done();
        if(err){
          onError(err);
        }else{
          onSuccess(result);
        }
      });
    }
  });
}

function checkSignIn(username, password, onError, onSuccessQuery){
  var sql = 'SELECT * FROM "user" WHERE "username" = '
            + "'" + username  + "'"
  queryDB(sql, onError, onSuccessQuery);
}

function insertUser(username, password, email, cbCheckInsert){
  var sql = 'INSERT INTO "user"("username", "password", "email") VALUES('
            + "'" + username  + "',"
            + "'" + crypto.encrypt(password)  + "',"
            + "'" + email  + "')";
  queryDB(sql, function(){}, cbCheckInsert);
}

module.exports.checkSignIn = checkSignIn;
module.exports.insertUser = insertUser;

// checkSignIn("vanpho93", "123456", function(){}, function(result){
//   if(result.rowCount < 1){
//     console.log('Dang nhap that bai');
//   }else{
//     console.log('Dang nhap thanh cong');
//   }
// });
