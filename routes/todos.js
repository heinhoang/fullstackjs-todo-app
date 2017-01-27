var express = require('express');
var router = express.Router();
var todos = require('../models/todos');

router.get('/', function(req, res) {
    res.render('todos', {
        title: 'todos',
        todos: todos
    })
});

module.exports = router;