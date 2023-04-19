const notesRoutes = require ("express").Router()
const fs = require('fs');


// -- ASK ABOUT THIS ONE TO DRU--//
let notesContent = require("../db/db");

// Gets all the notes in "/notes"
notesRoutes.get("/notes", (req, res) => {
    let data = notesContent;
    res.json(data);

});



// Submits the notes to "/notes"--
notesRoutes.post("/notes", (req, res) => {
    req.body.id = notesContent.length + 1;
    notesContent.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notesContent), (err)=>{
        if(err)throw err
        res.sendStatus(200)
    } )
    
});

// DELETE route for erasing previous notes
notesRoutes.delete("/notes/:id", async (req, res) => {
    const { id } = req.params
    notesContent = await deleteNote(id, notesContent);
    res.json(notesContent);

});

module.exports = notesRoutes;