// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// In memory storage
const commentsByPostId = {};

// Route: GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // Return comments associated with post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Route: POST /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id for comment
  const commentId = randomBytes(4).toString('hex');

  // Get post id from url
  const { id } = req.params;

  // Get comment from request body
  const { content } = req.body;

  // Get comments associated with post id
  const comments = commentsByPostId[id] || [];

  // Add new comment to comments
  comments.push({ id: commentId, content });

  // Store comments in memory
  commentsByPostId[id] = comments;

  // Return comments
  res.status(201).send(comments);
});

// Listen for incoming requests on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});