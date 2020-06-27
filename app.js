const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const serveStatic = require('serve-static');
const compression = require('compression');


const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('appName', 'Mi primer servidor');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Certificate
/*const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.fiorellarepre.com.pe-0001/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.fiorellarepre.com.pe-0001/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.fiorellarepre.com.pe-0001/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);*/

//Middelwares
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(serveStatic(path.join(__dirname, 'public'), { 
  dotfiles: 'allow'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/* Routes */
/*
app.use(function(req, res, next) {
  if (!req.headers.host.match(/^www/)) {
    res.redirect('https://www.' + req.headers.host + req.url);
  } else {
    next();
  }
});
*/
/*
//Requirieno rutas
app.all('*', function(req, res, next){
  if (req.secure) {
   return next();
  };
  res.redirect("https://" + req.headers.host + req.url);
 });*/

const routes = require('./routes/index');

app.use(routes);



app.use(function(req, res, next) {
  res.status(404).redirect("/");
});


//Iniciar el servidor

app.listen(app.get('port'), () => {
	console.log('server on port' + app.get('port'));
});

/*httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});*/