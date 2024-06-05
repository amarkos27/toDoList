import './style.css';
import 'normalize.css';

const button = document.querySelector('.test');
const sidebar = document.querySelector('.sidebar');
const items = document.querySelector('.items');

button.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-swipe');
  button.classList.toggle('button-pushed');
});
