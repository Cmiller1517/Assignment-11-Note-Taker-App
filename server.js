const express = require('express');
const notesRoutes = require('./Routes/notesRoutes');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notesRoutes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Read the db.json file and displays all the saved notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'db/db.json'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);