document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitButton = document.getElementById('submitButton');
  const todoInput = document.getElementById('todoInput');
  const addTodoButton = document.getElementById('addTodoButton');
  const todoList = document.getElementById('todoList');

  // Form Validation
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitButton.disabled = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields.';
      formMessage.style.color = '#d32f2f';
      submitButton.disabled = false;
      return;
    }

    if (!emailRegex.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.style.color = '#d32f2f';
      submitButton.disabled = false;
      return;
    }

    formMessage.textContent = 'Form submitted successfully!';
    formMessage.style.color = '#1a73e8';
    contactForm.reset();
    submitButton.disabled = false;
  });

  // To-Do List Functionality
  addTodoButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span>${todoText}</span>
      <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);
    todoInput.value = '';

    // Add delete functionality to the new button
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
    });
  });

  // Allow adding tasks with Enter key
  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodoButton.click();
    }
  });
});