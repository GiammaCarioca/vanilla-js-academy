;(function() {
	'use strict'

	// Users should be able to mark items as complete (or uncheck them if they change their mind).

	//
	// Variables
	//
	const todo = document.querySelector('#new-todo')
	const form = document.querySelector('#add-todos')

	//
	// Methods
	//
	const app = new Reef('#app', {
		data: {
			todos: ['Make coffe', 'Drink coffe', 'Listen to Koffee']
		},
		template: function({ todos }) {
			return '<ul>' + todos.map(todo => `<li>${todo}</li>`).join('') + '</ul>'
		}
	})

	const addTodo = function(todo) {
		app.data.todos = [...app.data.todos, todo]

		console.log(app.data.todos)

		app.render()
	}

	const submitHandler = function(event) {
		event.preventDefault()

		addTodo(todo.value)
	}

	form.addEventListener('submit', submitHandler, false)

	app.render()
})()
