var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var todoSchema = new Schema({
    text: {type: 'String', required: true},
    done: {type: 'Boolean'}
});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;