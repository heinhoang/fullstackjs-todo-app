var express = require('express');
var router = express.Router();

var Todo = require('../../models/todos');

router.route('/')
// READ
.get(function(req, res, next) {
    Todo.findAsync({})
    .then(function(todos) {
        res.json(todos);
    })
    .catch(next)
    .error(console.error);
})
// CREATE
.post(function(req, res, next) {
    var todo = new Todo();
    todo.text = req.body.text;
    todo.saveAsync()
    .then(function(savedToto) {
        console.log('success');
        res.json({'status': 'success', 'todo': savedToto});
    })
    .catch(function(e) {
        console.log('fail');
        res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
});

router.route('/:id')
// READ endpoint 
.get(function(req, res, next) {
    Todo.findOneAsync({_id: req.params.id}, {text: 1, done: 1})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(next)
    .error(console.error);
})
// UPDATE endpoint 
.put(function(req, res, next) {
    var todo = {};
    var prop;
    for(prop in req.body) {
        todo[prop] = req.body[prop];
    }

    Todo.updateAsync({_id: req.params.id}, todo)
    .then(function(updatedTodo) {
        return res.json({'status': 'success', 'todo': updatedTodo});
    })
    .catch(function(e) {
        return res.status(400).json({'status': 'error', 'error': e});
    });
})
// DELETE entry point
.delete(function(req, res, next) {
    Todo.findByIdAndRemoveAsync({_id: req.params.id})
    .then(function(removedTodo) {
        res.json({'status': 'success', 'todo': removedTodo});
    })
    .catch(function(e) {
        res.status(400).json({'status': 'fail', 'error': e});
    });
});


module.exports = router;