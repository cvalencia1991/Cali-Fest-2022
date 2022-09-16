function deployMenu2() {
  const menuBar = document.getElementById('menubar2');
  menuBar.style.display = 'flex';
}
document.getElementById('deploy-menu2').addEventListener('click', deployMenu2);

function closeMenu2() {
  const menuBar = document.getElementById('menubar2');
  menuBar.style.display = 'none';
}
document.getElementById('closebutton2').addEventListener('click', closeMenu2);