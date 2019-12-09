window.onload = () => {

  /// PRODUCTS ///

  $.ajax({
    url : "../../assets/js/shop.json",
    success: function(data){
      console.log("Evo" + data);
    }
  })

  const itemInfo = document.querySelectorAll('.sub-nav-ul');

  function clickEvent(e,items){

    for(sub of items){
      if(sub.classList.contains('active')){
        sub.classList.remove('active');
      }
    }
    // console.log(e);
    e.classList.add('active');
  }

  itemInfo.forEach((item) => {
    let items = item.querySelectorAll('li');

    items.forEach((li)=>{
      li.addEventListener('click', function(e){

        clickEvent(e.srcElement,items);
      }, false);
    })
  })
  // const subs = document.querySelectorAll('.subNav');
  //
  //
  //
  // subs.forEach(function(item) {
  //   item.addEventListener('click', clickEvent, false);
  // })


  $('.img-block').click(blueBorder);

  function blueBorder(){
    for(element of $('.img-block')){

      if($(element).hasClass('blue-lagoon')){
        $(element).removeClass('blue-lagoon');
      }
    }

    var bg = $(this).css('background-image');
    bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "").replace('http://127.0.0.1:3000/','../../');
    $('.board').attr('src', bg);
    $(this).addClass('blue-lagoon');
  }

  $(".item").css({
  'width': ($(".header-content").width() + 'px')
  });

  $(".items").css({
  'left': '-'+($(".header-content").width() + 'px')
  });

  /// MOUSE DRAGGING SLIDER ///
  var slider = document.getElementById('wrapper'),
      sliderItems = document.getElementById('items'),
      prev = document.querySelector('.arrow-left-click'),
      next = document.querySelector('.arrow-right-click');

  slide(slider, sliderItems, prev, next);

  function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('item'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('item')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse and Touch events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart (e) {
      e = e || window.event;
      // e.preventDefault();
      posInitial = items.offsetLeft;

      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }

    function dragAction (e) {
      e = e || window.event;

      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd (e) {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        items.style.left = (posInitial) + "px";
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
      items.classList.add('shifting');

      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }

        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;
        }
      };

      allowShift = false;
    }

    function checkIndex (){
      items.classList.remove('shifting');

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
      }

      allowShift = true;
    }
  }

}
