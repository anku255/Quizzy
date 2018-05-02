// import environment variables
require('dotenv').config({ path: 'variables.env' });

// start the app
const app = require('./app');
app.set('port', process.env.PORT || 5555);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ➡ PORT ${server.address().port} `);
});
