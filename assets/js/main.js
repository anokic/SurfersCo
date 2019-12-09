window.onload = () => {

  /// PRODUCTS ///

  function products(datas) {

    let html = ``;

    for (data of datas) {

      html += `<div class="item">
                      <div class="header-left">
                        <div class="content-gallery">
                          <img class='board' src="${data.imgs.img1}" alt="Board">
                          <div class="img-container">
                            <div class="img-block blue-lagoon"><img src="${data.imgs.img1}" alt="Board mini image"></div>
                            <div class="img-block"><img src="${data.imgs.img2}" alt="Board mini image"></div>
                            <div class="img-block"><img src="${data.imgs.img3}" alt="Board mini image"></div>
                            <div class="img-block"><img src="${data.imgs.img4}" alt="Board mini image"></div>
                          </div>
                        </div>
                      </div>
                      <div class="header-right">
                          <div class="item-heading">
                            <h4>${data.title}</h4>
                            <div class="rating">
                              <div class="stars">
                                ${stars(data.stars)}
                              </div>
                              <span class="rated">(${data.rating})</span>
                            </div>
                          </div>
                          <div class="item-info">
                            <ul class='sub-nav-ul'>
                              <li data-obj='desc' data-id="${data.id}" class='subNav active'>DESCRIPTION</li>
                              <li data-obj='features' data-id="${data.id}" class='subNav'>FEATURES</li>
                              <li data-obj='dimensions' data-id="${data.id}" class='subNav'>DIMENSIONS</li>
                            </ul>
                            <p class='product-paragraph'>${data.desc}</p>
                            <div class="bot-info">
                              <h4 class='price'>${data.price}</h4>
                              <button class='blue-button'><span>BUY NOW</span></button>
                            </div>
                          </div>
                          <a href="">View all boards</a>
                      </div>
                    </div>`;
    }

    document.querySelector('.items').innerHTML = html;
  }


  function stars(star) {
    let html = ``;
    let max = 5;
    for (let i = 1; i <= max; i++) {
      if (star < i) {
        html += `<div class="no-star"></div>`
      } else {
        html += `<div class="star"></div>`
      }
    }
    return html;
  }


  $.ajax({
    url: "assets/js/shop.json",
    type: "GET",
    success: function(data) {
      products(data);

      $(".item").css({
        'width': ($(".header-content").width() + 'px')
      });

      $(".items").css({
        'left': '-' + ($(".header-content").width() + 'px')
      });

      slide(slider, sliderItems, prev, next);

      $('.img-block').click(blueBorder);
      const itemInfo = document.querySelectorAll('.sub-nav-ul');
      itemInfo.forEach((item) => {

        let items = item.querySelectorAll('li');
        items.forEach((li) => {
          li.addEventListener('click', function(e) {
            clickEvent(e.srcElement, items);
          }, false);
        })
      })

    },
    error: function(xhr, status, err) {
      console.log(err);
    }

  })



  function clickEvent(e, items) {

    console.log();

    $.ajax({
      url: "assets/js/shop.json",
      type: "GET",
      success: function(data) {
        let dataS = data.filter(p => p.id == e.dataset.id);
        $(e).parent().parent().find('.product-paragraph').text(dataS[0][e.dataset.obj]);
        console.log(dataS[0][e.dataset.obj]);
      },
      error: function(status, xhr, err) {
        console.log(err);
      }
    })

    for (sub of items) {
      if (sub.classList.contains('active')) {
        sub.classList.remove('active');
      }
    }
    // console.log(e);
    e.classList.add('active');
  }


  function blueBorder() {
    for (element of $(this).parent().find('.img-block')) {

      if ($(element).hasClass('blue-lagoon')) {
        $(element).removeClass('blue-lagoon');
      }
    }

    $(this).parent().parent().find('.board').attr('src', $(this).find('img').attr('src'));
    $(this).addClass('blue-lagoon');
  }

  $(".item").css({
    'width': ($(".header-content").width() + 'px')
  });

  $(".items").css({
    'left': '-' + ($(".header-content").width() + 'px')
  });

  /// MOUSE DRAGGING SLIDER ///
  var slider = document.getElementById('wrapper'),
    sliderItems = document.getElementById('items'),
    prev = document.querySelector('.arrow-left-click'),
    next = document.querySelector('.arrow-right-click');



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



    document.querySelector('.length').innerHTML = "0" + slidesLength;

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
    prev.addEventListener('click', function() {
      shiftSlide(-1)
    });
    next.addEventListener('click', function() {
      shiftSlide(1)
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
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

    function dragAction(e) {
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

    function dragEnd(e) {
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
        if (!action) {
          posInitial = items.offsetLeft;
        }

        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;
        }
      };

      document.querySelector('.count').innerHTML = '0' + (index + 1);

      if (index == 5) {
        document.querySelector('.count').innerHTML = '01';
      }
      if (index == -1) {
        document.querySelector('.count').innerHTML = '05';
      }

      allowShift = false;
    }

    function checkIndex() {
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
