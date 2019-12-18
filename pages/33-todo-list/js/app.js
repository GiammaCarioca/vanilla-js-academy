;(function() {
	'use strict'

	//
	// Variables
	//

	// The new todo input field
	const newTodo = document.querySelector('#new-todo')

	//
	// Methods
	//

	/**
	 * Create a todo component
	 */
	const app = new Reef('#app', {
		data: {
			todos: []
		},
		template: function({ todos }) {
			// If there are no todos, ask the user to add some
			if (todos.length < 1) {
				return "<p>You don't have any todos yet. Add some using the form above.</p>"
			}

			// Generate markup for todo items
			return (
				'<ul class="todos">' +
				todos
					.map(
						(todo, index) =>
							`<li ${
								todo.completed ? 'class="todo-completed"' : ''
							}><label for='${index}'><input type="checkbox" id="todo-${index}" data-todo="${index}" ${
								todo.completed ? 'checked' : ''
							}>${todo.text}</label></li>`
					)
					.join('') +
				'</ul>'
			)
		}
	})

	const addTodo = function(todo) {
		// Get a copy of the todos and update data object
		const todos = [...app.data.todos, { text: todo.value, completed: false }]

		// Render fresh UI
		app.setData({ todos: todos })

		// Clear the field and return focus
		todo.value = ''
		todo.focus()
	}

	/**
	 * Handle form submit events
	 * @param  {Event} event The Event object
	 */
	const submitHandler = function(e) {
		// Only run for #add-todos form
		if (e.target.id !== 'add-todos') return

		// Stop the form from reloading the page
		e.preventDefault()

		// If the #new-todo input has no value, do nothing
		if (newTodo.value.length < 1) return

		addTodo(newTodo)
	}

	/**
	 * Handle click events
	 * @param  {Event} event The Event object
	 */
	const clickHandler = function(e) {
		// Only run on todo items
		const todo = event.target.getAttribute('data-todo')
		if (!todo) return

		// Get a copy of the todos
		const todos = [...app.data.todos]
		if (!todos[todo]) return

		// Update the todo state
		todos[todo].completed = e.target.checked

		console.log(todos[todo])

		// Render fresh UI
		app.render()
	}

	//
	// Inits & Event Listeners
	//

	// Render the initial UI
	app.render()

	// Listen for form submit events
	document.addEventListener('submit', submitHandler, false)

	// Listen for click events
	document.addEventListener('click', clickHandler, false)
})()
