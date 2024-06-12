import 'normalize.css';
import './style.css';

const button = document.querySelector('.sidebar-btn');
const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
const items = document.querySelector('.items');

button.addEventListener('click', () => {
  sidebar_wrapper.classList.toggle('sidebar-swipe-out');
  button.classList.toggle('btn-out');
});
