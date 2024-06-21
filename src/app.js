import 'normalize.css';
import './style.css';
import { toggle_sidebar } from './display.js';

function init() {
  const sidebar_btn = document.querySelector('.sidebar-btn');
  sidebar_btn.addEventListener('click', toggle_sidebar);
}

init();
