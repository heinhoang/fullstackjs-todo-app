var $ = require('jquery'); 
var todoTemplate = require("../views/partials/todo.hbs");

$(function() {
    // add todo
    var addTodo = function() {
    var text = $('#add-todo-text').val();
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      data: {
        text: text
      },
      dataType: 'json',
      success: function(data) {
        var todo = data.todo;
        var newLiHtml = todoTemplate(todo);
       $('form + ul').append(newLiHtml);
       $('#add-todo-text').val('');
      }
    });
  }
  $(':button').on('click', addTodo);
  $(':text').on('keypress', function(e) {
    var key = e.keyCode;
    if(key == 13 || key == 169) {
      addTodo();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // update todo (checked or unchecked)
  updateTodo = function(id, data, cb) {
    $.ajax({
      url: '/api/todos/' + id,
      type: 'PUT',
      data: data,
      dataType: 'json',
      success: function(data) {
        cb();
      }
    });
  }
  $('ul').on('change', 'li :checkbox', function() {
    var $this = $(this),
    id = $this.parent().attr('id');
    checked = $this.checked,
    data = {done: checked};
    updateTodo(id, data, function(d) {
      $this.next().toggleClass('checked');
    });
  });
});

// Update the todo text
$('ul').on('keydown', 'li span', function(e) {
  var $this = $(this),
  id = $this.parent().attr('id'),
  key = e.keyCode,
  data = {text: $this[0].innerHTML},
  target = e.target;
  if(key === 27) { //escape key
    $this.removeClass('editing');
    document.execCommand('undo');
    target.blur();
  } else if(key === 13) { //enter key
    updateTodo(id, data, function() {
      $this.removeClass('editing');
      target.blur();
    });
    e.preventDefault();
  }
});

// Delete a todo
var deleteTodo = function(id, cb) {
  $.ajax({
    url: '/api/todos/' + id,
    type: 'DELETE',
    data: id,
    dataType: 'json',
    success: function(data) {
      cb();
    }
  });
}
var deleteTodoLi = function($li) {
  $li.remove();
};

$('ul').on('click', 'li a', function() {
  var $this = $(this),
  $li = $this.parent(),
  id = $li.attr('id');
  deleteTodo(id, function(e) {
    deleteTodoLi($li);
  });
});