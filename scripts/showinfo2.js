function deploymenu2() {
  const menubar = document.getElementById('menubar2');
  menubar.style.display = 'flex';
}
document.getElementById('deploy-menu2').addEventListener('click', deploymenu2);

function closemenu2() {
  const menubar = document.getElementById('menubar2');
  menubar.style.display = 'none';
}
document.getElementById('closebutton2').addEventListener('click', closemenu2);