function toggle_sidebar(sidebar) {
  sidebar.classList.toggle('sidebar-closed');
}

function window_resize(sidebar) {
  const shouldCloseSidebar = window.innerWidth < 1100;
  const sidebarClosed = sidebar.classList.contains('sidebar-closed');

  if (shouldCloseSidebar && !sidebarClosed) {
    sidebar.classList.add('sidebar-closed');
  } else if (!shouldCloseSidebar && sidebarClosed) {
    sidebar.classList.remove('sidebar-closed');
  }
}

export function display_init() {
  const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
  const sidebar_btn = document.querySelector('.sidebar-btn');
  sidebar_btn.addEventListener('click', () => {
    toggle_sidebar(sidebar_wrapper);
  });

  window.addEventListener('resize', () => {
    window_resize(sidebar_wrapper);
  });
}
