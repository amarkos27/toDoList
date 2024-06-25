function toggle_sidebar(sidebar) {
  const alreadyClosed = sidebar.classList.contains('sidebar-closed');
  sidebar.classList.toggle('sidebar-closed');

  if (!alreadyClosed) {
    sidebar.classList.add('toggled-off');
  } else {
    sidebar.classList.remove('toggled-off');
  }
}

function window_resize(sidebar, previousWidth) {
  const windowSmall = window.innerWidth < 1100;
  const toggledOff = sidebar.classList.contains('toggled-off');
  const sidebarClosed = sidebar.classList.contains('sidebar-closed');
  const shrinking = window.innerWidth < previousWidth;

  if (windowSmall && shrinking && !sidebarClosed) {
    sidebar.classList.add('sidebar-closed');
  } else if (!windowSmall && !toggledOff && sidebarClosed) {
    sidebar.classList.remove('sidebar-closed');
  }
}

export function display_init() {
  const sidebar_wrapper = document.querySelector('.sidebar-wrapper');
  const sidebar_btn = document.querySelector('.sidebar-btn');
  let previousWidth = window.innerWidth;

  sidebar_btn.addEventListener('click', () => {
    toggle_sidebar(sidebar_wrapper);
  });

  window.addEventListener('resize', () => {
    window_resize(sidebar_wrapper, previousWidth);
    previousWidth = window.innerWidth;
  });
}
