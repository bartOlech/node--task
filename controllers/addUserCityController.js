const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'bartt',
  password : '123',
  database : 'test',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
  if (err) throw err
});

module.exports.add = (req, res) => {
  // get users from database
  connection.query('SELECT * from users', function (error, results, fields) {
    if (error) {
      throw error;
    } 

    res.render('addCity', {
      users: JSON.stringify(results)
    })
   
  });
  

 
}