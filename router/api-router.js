// bringing in express
const express = require('express');
// creating an instance of 'Router'
const router = express.Router();
// pulling in posts from the database
let posts = require('../data/db');

// first 'get' - working!
router.get('/posts', (req, res) => {
  posts
    .find()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err.message);
    });
});

// second 'get' - working!
router.get('/:id', (req, res) => {
  posts
    .findById(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// post - it's working!!!
router.post('/', (req, res) => {
  if (req.body.title && req.body.contents) {
    const newPost = {
      title: req.body.title,
      contents: req.body.contents
    };
    posts.insert(newPost);
    res.status(201).json(newPost);
  } else if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

// working!
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  if (updatedPost.title && updatePost.contents) {
    db.findById(id).then(() => {
      db.update(id, updatePost)
        .then(num => {
          res.status(200).json({ message: 'post updated', post: updatePost });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: 'something went wrong' });
        });
    });
  }
});

// the delete - done
router.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  posts
    .remove(id)
    .then(deletedPost => {
      console.log(deletedPost);
      if (!deletedPost) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(deletedPost);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

module.exports = router;
