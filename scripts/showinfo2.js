const menu = document.getElementById('deploy-menu2');
menu.addEventListener('click', () => {
  const menuBar = document.getElementById('menubar2');
  menuBar.style.display = 'flex';
});

function closeMenu2() {
  const menuBar = document.getElementById('menubar2');
  menuBar.style.display = 'none';
}
document.getElementById('closebutton2').addEventListener('click', closeMenu2);
