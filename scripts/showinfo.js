function deployMenu() {
  const menuBar = document.getElementById('menubar');
  menuBar.style.display = 'flex';
}
document.getElementById('deploy-menu').addEventListener('click', deployMenu);

function closeMenu() {
  const menuBar = document.getElementById('menubar');
  menuBar.style.display = 'none';
}
document.getElementById('closebutton').addEventListener('click', closeMenu);
