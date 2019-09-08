var menu = document.querySelector(".menu");
function showMenu(x, y) {
  app.menuParagraph = app.paragraph;
  console.log("2");
  menu.style.left = x + "px";
  menu.style.top = y + "px";
  menu.classList.add("show-menu");
}
function hideMenu() {
  menu.classList.remove("show-menu");
}
function onContextMenu(e) {
  e.preventDefault();

  showMenu(e.pageX, e.pageY);
  document.addEventListener("mousedown", onMouseDown, false);
}
function onMouseDown(e) {
  hideMenu();
  document.removeEventListener("mousedown", onMouseDown);
}
document.addEventListener("contextmenu", onContextMenu, false);
