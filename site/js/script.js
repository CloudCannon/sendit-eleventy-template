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
  $('.nav-item.dropdown > .dropdown-link').on('click', function(e) {
    if($(window).width() < 991.98) {
      e.preventDefault();
      var dropdownOpened = $(this).parent().hasClass('show');
      $('.dropdown').removeClass('show');
      $('.dropdown-menu').removeClass('show');
      
      if (!dropdownOpened) {
        $(this).next('.dropdown-menu').addClass('show');
        $(this).parent('.dropdown').addClass('show');
      }
    }
  });
});
