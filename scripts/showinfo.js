function deploymenu() {
  const menubar = document.getElementById('menubar');
  menubar.style.display = 'flex';
}
document.getElementById('deploy-menu').addEventListener('click', deploymenu);

function closemenu() {
  const menubar = document.getElementById('menubar');
  menubar.style.display = 'none';
}
document.getElementById('closebutton').addEventListener('click', closemenu);

/* About Page */
