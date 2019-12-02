const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs')

const Movie = require('../models/movie');

router.get('/',(req,res,next) => {
    Movie.find()
    .exec()
    .then(docs => {
        // console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/',(req,res,next) => {
    const movie = new Movie({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    movie
        .save()
        .then(result => {
            // console.log(result);
            res.status(201).json({
                message : 'handling POST request to /products',
                createdMovie: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:movieId',(req,res,next) => {
    const id = req.params.movieId;
    Movie.findById(id)
    .exec()
    .then(doc => {
        // console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found in the database'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:movieId',(req,res,next) => {
    const id = req.params.movieId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Movie.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:movieId',(req,res,next) => {
    const id = req.params.movieId;
    Movie.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;