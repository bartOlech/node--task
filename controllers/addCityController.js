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

const appendCityUser = (cityId, userId) => {
  connection.query(`INSERT INTO cityUsers (id, cityId, userId) VALUES (NULL, "${cityId}", "${userId}")`, function (error, results, fields) {
    if (error) {
      throw error;
    } 
  });
}

module.exports.add = (req, res) => {

  // check does city exists
  connection.query(`SELECT name, id FROM city WHERE name="${req.query.value}"`, function (error, results, fields) {
    if (error) {
      throw error;
    } 

    //city doesnt exist, add to the city table
    if (results.length === 0) {
      connection.query(`INSERT INTO city (id, name) VALUES (NULL, "${req.query.value}")`, function (error, results, fields) {
        if (error) {
          throw error;
        } 
        // append to the cityUsers table
        appendCityUser(results.insertId, req.query.userId)
        res.json({ status: 'Miasto zostało dodane' })
      });
    } else {
        // check does have such a row
        connection.query(`SELECT * FROM cityUsers WHERE cityId="${results[0].id}" AND userId="${req.query.userId}"`, function (error, cityUserResults, fields) {
          if (error) {
            throw error;
          }
          if (cityUserResults.length === 0) {
            // append to the cityUsers table
            appendCityUser(results[0].id, req.query.userId)
            res.json({ status: 'Miasto zostało dodane' })
          }
          res.json({ status: 'Miasto posiada juz polaczenie z tym uzytkownikiem' })
        })
    }


  });



}