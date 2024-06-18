import 'normalize.css';
import './style.css';

const button = document.querySelector('.sidebar-btn');
const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
const task_display = document.querySelector('.task-display');

button.addEventListener('click', () => {
  sidebar_wrapper.classList.toggle('sidebar-swipe-out');
  task_display.classList.toggle('full-screen');
  button.classList.toggle('btn-out');
});
