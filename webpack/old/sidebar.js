window.addEventListener('load', () => {
  const navside = document.getElementById('navside');
  const menuIcon = document.getElementById("menu-icon");
  
  menuIcon.addEventListener('click', () => {
    navside.style.transform = 'translateX(0px)';
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-container")) {
      navside.style.transform = 'translateX(-250px)';
    }
  });
})
