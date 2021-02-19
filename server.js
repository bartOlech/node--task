const app = require('./app');

app.set('port', process.env.PORT || 8080);

module.exports = app.listen(app.get('port'), () => {
  console.log('istening...')
})