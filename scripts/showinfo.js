document.getElementById('deploy-menu').addEventListener('click', () => {
  const menuBar = document.getElementById('menubar');
  menuBar.style.display = 'block';
});

function closeMenu() {
  const menuBar = document.getElementById('menubar');
  menuBar.style.display = 'none';
}
document.getElementById('closebutton').addEventListener('click', closeMenu);
