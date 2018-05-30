const express = require('express');
const router = express.Router();

// Require in out Mongoose Model
const Book = require('../Modules/models/book.schema');


router.get('/', (req, res) => {
    Book.find()
        .then( (data) =>{
// We got stuff back from the database (no errr)
            console.log(`back from the mongoDB: ${data}`);
            res.send( data );
        })
        .catch( (error) => {
            console.log(`error from mongo: ${error}`);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    let bookData = req.body;
    console.log(`book data from ${bookData}`);
    let newBook = new Book(bookData);
    console.log(`the new book is ${newBook}`);
    newBook.save()     // bookData - getting this from req.body
        .then( () => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`error add book: ${error}`);
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    // Delete doesnt use data, so we'll use params instead
    // data is req.body vs params is req.query
    let bookId = req.query._id;
    console.log(`book iD requested is ${bookId}`);
    Book.findByIdAndRemove( bookId )
        .then( () => {
            console.log(`removed book ${bookId}`);
            // good servers always respond, say OK ---- sendStatus(200) = ok
            res.sendStatus(200);
        }) 
        .catch( (error) => {
            console.log(`Error removing book: ${error}`);
            res.sendStatus(500);
        });
});

router.put('/', ( req, res ) => {  //put can send DATA
    let bookData = req.body;
    // put can send data, so getting id from req.body
    Book.findByIdAndUpdate(req.body._id,bookData)
    .then( () => {
        console.log(`update book wtih id ${bookData._id}`);
        res.sendStatus(200);
    })
    .catch( ( error ) => {
        console.log(`error book wtih id ${bookData._id}: ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;


// put - updates
// delete - delete