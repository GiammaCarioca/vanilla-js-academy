;(function() {
	'use strict'

	//
	// Variables
	//

	// The new todo input field
	const newTodo = document.querySelector('#new-todo')

	// Save the localStorage ID to a variable for easier configuration later
	const storageID = 'todos'

	//
	// Methods
	//

	/**
	 * Check for saved data in localStorage
	 */
	const loadTodos = () => JSON.parse(localStorage.getItem(storageID))

	/**
	 * Create a todo component
	 */
	const app = new Reef('#app', {
		data: {
			// Load todos into state on page load
			todos: loadTodos() || []
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
								todo.completed ? 'checked=checked' : ''
							}>${
								todo.text
							}<button data-delete-todo="${index}" aria-label="Delete ${
								todo.text
							}">🗑</button></label></li>`
					)
					.join('') +
				'</ul>'
			)
		}
	})

	const addTodo = function(todo) {
		// checks whether an element is already on the list
		const checkDuplicated = element => element.text === todo.value

		const { todos: todosList } = app.getData()

		if (todosList.some(checkDuplicated)) {
			alert(`Oops! ${todo.value} is already added to the list!`)
			todo.value = ''
			todo.focus()
			return
		}

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
	const submitHandler = function(event) {
		// Only run for #add-todos form
		if (event.target.id !== 'add-todos') return

		// Stop the form from reloading the page
		event.preventDefault()

		// If the #new-todo input has no value, do nothing
		if (newTodo.value.length < 1) return

		addTodo(newTodo)
	}

	/**
	 * Mark todo item as complete
	 * @param  {Event} event The event object
	 */
	const completeTodo = function(event) {
		// Only run on todo items
		const todoIndex = event.target.getAttribute('data-todo')
		if (!todoIndex) return

		// Get a copy of the todos
		const todos = [...app.data.todos]
		if (!todos[todoIndex]) return

		// Update the todo state
		todos[todoIndex].completed = event.target.checked

		// Render a fresh UI
		app.setData({ todos: todos })
	}

	/**
	 * Delete a todo item from the list
	 * @param  {Event} event The event object
	 */
	const deleteTodo = function(event) {
		// Only run on delete button clicks
		const todoIndex = event.target.getAttribute('data-delete-todo')
		if (!todoIndex) return

		// Get a copy of the todos
		const todos = [...app.data.todos]
		if (!todos[todoIndex]) return

		// Confirm with the user before deleting
		if (
			!window.confirm(
				'Are you sure you want to delete this todo item? This cannot be undone.'
			)
		)
			return

		// Remove the item from the todo state
		todos.splice(todoIndex, 1)

		// Render a fresh UI
		app.setData({ todos: todos })
	}

	/**
	 * Handle click events
	 * @param  {Event} event The Event object
	 */
	const clickHandler = function(event) {
		// Mark todo item as complete
		completeTodo(event)

		// Delete todo item
		deleteTodo(event)
	}

	/**
	 * Save todo items to localStorage
	 */

	const saveTodos = function() {
		const { todos: todosList } = app.getData()
		localStorage.setItem(storageID, JSON.stringify(todosList))
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
	document.addEventListener('render', saveTodos, false)
})()
