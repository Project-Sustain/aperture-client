// Run when page is loaded
$( document ).ready(function() {
  const element = document.querySelector('.overlay');
  const corner = document.querySelector('.overlay .box .resizer');
  const box = document.querySelector('.overlay');
  var offset = [0,0];
  var isDown = false;

  var mousePosition;

  // Minimum size so users dont completely lose the box
  const minimum_size = 20;
  corner.addEventListener('mousedown', function(e) {
    isDown = false;
      // Prevents a bug where map would think it was being highlighted
      e.preventDefault();

      let width =  parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      let height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      let yCoord = element.getBoundingClientRect().top;
      let mouseXCoord = e.pageX;
      let mouseYCoord = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);

      function resize(e) {
        let newWidth = width + (e.pageX - mouseXCoord)
        let newHeight = height - (e.pageY - mouseYCoord)
        if (newWidth > minimum_size) {
            element.style.width = newWidth + 'px'
        }
        if (newHeight > minimum_size) {
            element.style.height = newHeight + 'px'
            element.style.top = yCoord + (e.pageY - mouseYCoord) + 'px'
        }
      }

      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }

  })

  box.addEventListener('mousedown', function(e) {
      isDown = true;
      offset = [
          box.offsetLeft - e.clientX,
          box.offsetTop - e.clientY
      ];


  }, true);

  box.addEventListener('mouseup', function() {
      isDown = false;
  }, true);

  box.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) {
          mousePosition = {

              x : event.clientX,
              y : event.clientY

          };
          box.style.left = (mousePosition.x + offset[0]) + 'px';
          box.style.top  = (mousePosition.y + offset[1]) + 'px';
      }
  }, true);


});

