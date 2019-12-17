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
			return (
				'<ul>' +
				todos
					.map(
						(todo, index) =>
							`<li>${todo.text} <input id=${index} type="checkbox"></li>`
					)
					.join('') +
				'</ul>'
			)
		}
	})

	const changeHandler = function(e) {
		if (e.target.matches('[type="checkbox"]')) {
			const { id, checked } = e.target
			;(app.data.todos = [...app.data.todos]),
				(app.data.todos[id].completed = checked)
			console.log(app.data.todos[id])
		}
		app.render()
	}

	const addTodo = function(todo) {
		if (!todo.value) return

		app.data.todos = [...app.data.todos, { text: todo.value, completed: false }]
		todo.value = ''
		app.render()
	}

	const submitHandler = function(e) {
		if (e.target.matches('#add-todos')) {
			e.preventDefault()

			addTodo(todo)
		}
	}

	document.addEventListener('submit', submitHandler, false)
	document.addEventListener('change', changeHandler, false)

	app.render()
})()
