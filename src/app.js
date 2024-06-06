import './style.css';
import 'normalize.css';

const button = document.querySelector('.sidebar-btn');
const sidebar = document.querySelector('.sidebar');
const items = document.querySelector('.items');

button.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-swipe-out');
  button.classList.toggle('button-out');
});
