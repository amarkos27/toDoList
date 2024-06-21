export function toggle_sidebar() {
  const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
  sidebar_wrapper.classList.toggle('sidebar-swipe-out');
  this.classList.toggle('btn-out');
}
