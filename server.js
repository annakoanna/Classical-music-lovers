require("dotenv").config(); 
const express = require("express"); 
const app = require("liquid-express-views")(express())
const methodOverride = require("method-override")
const morgan = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require('body-parser')
const { initDatabase } = require('./controllers/composers');
const userRoutes = require('./routes/users'); 
const composerRoutes = require('./routes/composers'); 
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlists');
const { set } = require("express/lib/application");

var rowdy = require('rowdy-logger')
var rowdyResults = rowdy.begin(app)

app.use(session({ secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
    saveUninitialized: true,
    resave: false,}))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(morgan("tiny"));
app.use('/users', userRoutes); 
app.use('/composers', composerRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);
app.get('/', function(req, res, next) {
    res.render("./index.liquid");
  });

// initialize data
//initDatabase();
const listener = app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
    console.log('Your app is listening on port ' + listener.address().port)

})
