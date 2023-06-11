const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database');

//Test database
db.authenticate()
    .then(() => {
        console.log("Database connected.\n");
    })
    .catch(err => {
        console.log("Error: " + err);
    });

db.sync()
    .then(() => {
        console.log("\nDatabase and tables created...");
    })
    .catch(err => {
        console.log("Error: " + err);
    });

const app = express();

// Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', { layout: 'landing' });
})

// Gig routes
app.use('/gigs', require('./routes/gigs'));


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
