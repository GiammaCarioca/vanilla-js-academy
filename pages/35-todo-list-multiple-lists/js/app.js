;(function() {
	'use strict'

	//
	// Variables
	//

	// Save the localStorage ID to a variable for easier configuration later
	const storageID = 'todosRouting'

	// Placeholders
	let app, field

	//
	// Methods
	//

	/**
	 * Get the URL parameters
	 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
	 * @param  {String} url The URL
	 * @return {Object}     The URL parameters
	 */
	const getParams = function(url) {
		const params = {}
		const parser = document.createElement('a')
		parser.href = url ? url : window.location.href
		const query = parser.search.substring(1)
		const vars = query.split('&')
		if (vars.length < 1 || vars[0].length < 1) return params
		for (let i = 0; i < vars.length; i++) {
			const pair = vars[i].split('=')
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
		}
		return params
	}

	/**
	 * Create todo lists view
	 */
	const createLists = function() {
		app = new Reef('#app', {
			data: {},
			template: function({ lists }) {
				// Create the form
				const form = `<h1>My Lists</h1>
					<form id="add-lists">
					<label for="new-list">Create a list</label>
					<input type="text" id="new-list" autofocus>
					<button>Create List</button>
					</form>`

				// If there are no lists, ask the user to create one
				if (lists.length < 1) {
					return (
						form +
						"<p>You don't have any lists yet. Create one using the form above.</p>"
					)
				}

				// Generate markup for list items
				return (
					form +
					'<ol class="lists">' +
					lists
						.map((list, index) => {
							const todoHTML = `<li>
								<a href="?list=${index}">${list.name} (${list.todos.length})</a> 
								<button data-delete-list="${index}" aria-label="Delete ${list.name}">🗑</button>
								</li>`
							return todoHTML
						})
						.join('') +
					'</ol>'
				)
			}
		})
	}

	/**
	 * Create todo items view
	 */
	const createTodos = function() {
		app = new Reef('#app', {
			data: {},
			template: function({ lists, current }) {
				// Create a link back to the lists view
				const link =
					'<a href="' +
					window.location.href.replace('?list=' + current, '') +
					'">&larr; Back to Lists</a>'

				// Get the current list
				const list = lists[current]

				// If the list doesn't exist, show a message and link back to all lists
				if (!list) {
					return link + '<h1>This list could not be found, sorry!</h1>'
				}

				// Create the form
				const form =
					link +
					'<h1>' +
					list.name +
					'</h1>' +
					'<form id="add-todos">' +
					'<label for="new-todo">What do you want to do?</label>' +
					'<input type="text" id="new-todo" autofocus>' +
					'<button>Add Todo</button>' +
					'</form>'

				// If there are no todos, ask the user to add some
				if (list.todos.length < 1) {
					return (
						form +
						"<p>You don't have any todos yet. Add some using the form above.</p>"
					)
				}

				// Generate markup for todo items
				return (
					form +
					'<ul class="todos">' +
					list.todos
						.map((todo, index) => {
							const todoHTML = `<li ${
								todo.completed ? 'class="todo-completed"' : ''
							}>
								<label for="todo-${index}">
								<input type="checkbox" id="todo-${index}" data-todo="${index}"
								${todo.completed ? 'checked=checked' : ''}>${
								todo.item
							}<button data-delete-todo="${index}" aria-label="Delete ${
								todo.item
							}">🗑</button></label></li>`
							return todoHTML
						})
						.join('') +
					'</ul>'
				)
			}
		})
	}

	/**
	 * Clear the field and return focus
	 */
	const focusField = function() {
		field.value = ''
		field.focus()
	}

	/**
	 * Check whether an element is already on the list
	 */
	const checkDuplicated = element =>
		element.name === field.value || element.item === field.value

	/**
	 * Add a new todo item to the app
	 * @param  {Event} event The Event object
	 */
	const addTodo = function(event) {
		// Only run for #add-todos form
		if (event.target.id !== 'add-todos') return

		// Stop the form from reloading the page
		event.preventDefault()

		// If the #new-todo input has no value, do nothing
		if (field.value.length < 1) return

		// Get a copy of the data and then get lists and current with destructuring
		const { lists, current } = app.getData()

		// Get the current list
		const list = lists[current]
		if (!list) return

		// Check for duplicates
		if (list.todos.some(checkDuplicated)) {
			alert(`Oops! ${field.value} is already added to the list!`)

			return focusField()
		}

		// Update data object
		list.todos.push({
			item: field.value,
			completed: false
		})

		// Render fresh UI
		app.setData({ lists: lists })

		// Clear the field and return focus
		focusField()
	}

	/**
	 * Add a new list to the app
	 * @param  {Event} event The Event object
	 */
	const addList = function(event) {
		// Only run for #add-lists form
		if (event.target.id !== 'add-lists') return

		// Stop the form from reloading the page
		event.preventDefault()

		// If the #new-list input has no value, do nothing
		if (field.value.length < 1) return

		// Get a copy of the lists from data with destructuring
		const { lists } = app.getData()

		// Check for duplicates
		if (lists.some(checkDuplicated)) {
			alert(`Oops! ${field.value} is already added to the list!`)

			return focusField()
		}

		// Add the new list
		lists.push({
			name: field.value,
			todos: []
		})

		// Render fresh UI
		app.setData({ lists: lists })

		// Clear the field and return focus
		focusField()
	}

	/**
	 * Handle form submit events
	 * @param  {Event} event The Event object
	 */
	const submitHandler = function(event) {
		addList(event)
		addTodo(event)
	}

	/**
	 * Mark todo item as complete
	 * @param  {Event} event The event object
	 */
	const completeTodo = function(event) {
		// Only run on todo items
		const todo = event.target.getAttribute('data-todo')
		if (!todo) return

		// Get a copy of the data and then get lists and current with destructuring
		const { lists, current } = app.getData()

		// Get the current list
		const list = lists[current]
		if (!list || !list.todos[todo]) return

		// Update the todo state
		list.todos[todo].completed = event.target.checked

		// Render a fresh UI
		app.setData({ lists: lists })
	}

	/**
	 * Delete a todo item from the list
	 * @param  {Event} event The event object
	 */
	const deleteTodo = function(event) {
		// Only run on delete button clicks
		const todo = event.target.getAttribute('data-delete-todo')
		if (!todo) return

		// Get a copy of the data and then get lists and current with destructuring
		const { lists, current } = app.getData()

		// Get the current list
		const list = lists[current]
		if (!list || !list.todos[todo]) return

		// Confirm with the user before deleting
		if (
			!window.confirm(
				'Are you sure you want to delete this todo item? This cannot be undone.'
			)
		)
			return

		// Remove the item from the todo state
		list.todos.splice(todo, 1)

		// Render a fresh UI
		app.setData({ lists: lists })
	}

	/**
	 * Delete a list
	 * @param  {Event} event The event object
	 */
	const deleteList = function(event) {
		// Only run on delete button clicks
		const list = event.target.getAttribute('data-delete-list')
		if (!list) return

		// Get a copy of the data and then get lists with destructuring
		const { lists } = app.getData()
		if (!lists[list]) return

		// Confirm with the user before deleting
		if (
			!window.confirm(
				`Are you sure you want to delete "${lists[list].name}"? All todo items associated with this list will also be deleted. This cannot be undone.`
			)
		)
			return

		// Remove the item from the todo state
		lists.splice(list, 1)

		// Render a fresh UI
		app.setData({ lists: lists })
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

		// Delete list
		deleteList(event)
	}

	/**
	 * Save todo items to localStorage
	 */

	const saveTodos = function() {
		localStorage.setItem(storageID, JSON.stringify(app.getData()))
	}

	/**
	 * Load todos into state on page load
	 * @param {String} list The current list index
	 */
	const loadTodos = function(list) {
		// Check for saved data in localStorage
		const saved = localStorage.getItem(storageID)
		const data = saved
			? JSON.parse(saved)
			: {
					lists: []
			  }
		data.current = list ? parseInt(list, 10) : null

		// Update the state and run an initial render
		app.setData(data)
	}

	/**
	 * Setup the UI
	 */
	const setup = function() {
		// Get the list ID from the URL if there is one
		const list = getParams().list

		// If there's a list ID, create the todos view
		// Otherwise, create the lists view
		if (list) {
			createTodos()
		} else {
			createLists()
		}

		// Render the initial UI
		loadTodos(list)

		// Define the field variable
		// This will match against EITHER #new-list OR #new-todo, whichever it finds first
		// This prevents me from having to conditionally set my selector
		field = document.querySelector('#new-list, #new-todo')
	}

	//
	// Inits & Event Listeners
	//

	// Setup the app view
	setup()

	// Listen for form submit events
	document.addEventListener('submit', submitHandler, false)

	// Listen for click events
	document.addEventListener('click', clickHandler, false)

	// On render events, save todo items
	document.addEventListener('render', saveTodos, false)
})()
