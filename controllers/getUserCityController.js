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

module.exports.get = (req, res) => {
  // get cities from database
  connection.query(`SELECT name FROM city INNER JOIN cityUsers ON city.id = cityUsers.cityId AND ${req.query.id} = cityUsers.userId`, function (error, results, fields) {
    if (error) {
      throw error;
    } 
    console.log(results)
    res.json({ cities: results })

  });
}