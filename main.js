$(function() {
    $('#contact').click(function() {
      $('#contactForm').fadeToggle();
    })
    $(document).mouseup(function (e) {
      var container = $("#contactForm");
  
      if (!container.is(e.target)
          && container.has(e.target).length === 0)
      {
          container.fadeOut();
      }
    });
  });
  