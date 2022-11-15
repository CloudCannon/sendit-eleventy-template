$(document).ready(function () {
  "use strict";

  $(window).on("scroll", function () {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 70) {
      $("#mainnavigationBar").addClass("sticky-nav");
    } else {
      $("#mainnavigationBar").removeClass("sticky-nav");
    }
  });
  $(".navbar-toggler").on("click", function () {
    var navbar = $("#mainnavigationBar");
    navbar.toggleClass("bg-nav");
  });

  // Magnific Popup
  $(".popup-vimeo").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  //Show password
  $(".viewPassword").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
  // Scroll spy style start
  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });
  // Scroll spy
  $(document).ready(function () {
    $("body").scrollspy({
      target: "#scrol-nav",
      offset: 20,
    });

    // Navbar fade
    changeNavbar();

    $(window).scroll(function () {
      changeNavbar();
    });

    function changeNavbar() {
      var navbar = $("#scrol-nav");
      if ($(this).scrollTop() >= 20) {
        navbar.addClass("bg-light").removeClass("bg-transparent");
      } else if ($(this).scrollTop() < 20) {
        navbar.removeClass("bg-light").addClass("bg-transparent");
      }
    }
  });
  //end  Scroll spy style

  // Add active class to the current accordionExample
  var header = document.getElementById("accordionExample");
  var btns = header && header.getElementsByClassName("accordion-item");
  if (btns) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("shows");
        current[0].className = current[0].className.replace(" shows", "");
        this.className += " shows";
      });
    }
  }
});
