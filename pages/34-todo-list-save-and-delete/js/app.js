;(function() {
	'use strict'

	// Add the ability to delete specific todo items from the list.
	// Automatically save the todo items whenever the user makes a change to their list.
	// Automatically load the list into the UI when the user revisits the app.

	//
	// Variables
	//

	// The new todo input field
	const newTodo = document.querySelector('#new-todo')

	// Save the localStorage ID to a variable for easier configuration later
	// var storageID = 'todos'

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
							}>${
								todo.text
							}</label><button data-delete-list="${index}" aria-label="Delete ${
								todo.text
							}">🗑</button></li>`
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

	const deleteTodo = function(todo) {
		if (!todo) return

		// Get a copy of the todos
		const todos = [...app.data.todos]

		const index = todo.getAttribute('data-delete-list')

		todos.splice(index, 1)

		// Render fresh UI
		app.setData({ todos: todos })
	}

	const checkTodo = function(todo) {
		if (!todo) return
		console.log(todo)

		// Get a copy of the todos
		const todos = [...app.data.todos]

		const index = todo.getAttribute('data-todo')

		if (!todos[index]) return

		// Update the todo state
		todos[index].completed = todo.checked

		// Render fresh UI
		app.setData({ todos: todos })
		console.log(todo)
	}

	/**
	 * Handle click events
	 * @param  {Event} event The Event object
	 */
	const clickHandler = function(e) {
		if (e.target.matches("input[type='checkbox']")) {
			checkTodo(e.target)
		}

		if (e.target.matches('[data-delete-list]')) {
			deleteTodo(e.target)
		}
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

	// On render events, save todo items
	// document.addEventListener('render', saveTodos, false)
})()
