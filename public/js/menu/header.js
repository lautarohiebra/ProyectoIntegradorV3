const menuToggle = document.querySelector("#menu-toggle-img")
const navBar = document.querySelector("#nav-bar")
const navList = document.querySelector("#nav-bar__nav-list")
//console.log(menuToggle);
//console.log(navBar);
//console.log(navList);

menuToggle.addEventListener("click", function () {
    if (navBar.style.display === "block") {
      navBar.style.display = "none"
    } else {
      navBar.style.display = "block"
    }
  }
)
