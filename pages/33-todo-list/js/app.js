;(function() {
	'use strict'

	//
	// Variables
	//
	const todo = document.querySelector('#new-todo')

	//
	// Methods
	//
	const app = new Reef('#app', {
		data: {
			todos: []
		},
		template: function({ todos }) {
			return '<ul>' + todos.map(todo => `<li>${todo}</li>`).join('') + '</ul>'
		}
	})

	const addTodo = function(todo) {
		if (!todo.value) return

		app.data.todos = [...app.data.todos, todo.value]
		todo.value = ''
		app.render()
	}

	const submitHandler = function(event) {
		event.preventDefault()

		if (event.target.matches('#add-todos')) {
			addTodo(todo)
		}
	}

	document.addEventListener('submit', submitHandler, false)

	app.render()
})()
