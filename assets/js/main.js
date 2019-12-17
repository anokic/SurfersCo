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
    $.ajax({
      url: "assets/js/shop.json",
      type: "GET",
      success: function(data) {
        let dataS = data.filter(p => p.id == e.dataset.id);
        $(e).parent().parent().find('.product-paragraph').text(dataS[0][e.dataset.obj]);
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
    e.classList.add('active');
  }

  /// PRODUCT IMAGE SHOW IMAGE // BLUE BORDER FOR SELECTED IMAGE

  function blueBorder() {
    for (element of $(this).parent().find('.img-block')) {

      if ($(element).hasClass('blue-lagoon')) {
        $(element).removeClass('blue-lagoon');
      }
    }

    $(this).parent().parent().find('.board').attr('src', $(this).find('img').attr('src'));
    $(this).addClass('blue-lagoon');
  }

  // END

  // styling with jquery

  function stylingProductWidth(){
    $(".item").css({
      'width': ($(".header-content").width() + 'px')
    });

    $(".items").css({
      'left': '-' + ($(".header-content").width() + 'px')
    });
  }

  stylingProductWidth();

  // Apply style while resizing the window
  $(window).resize(()=> {
    stylingProductWidth();
  })

  /// SLIDER SHOP START

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
      if (index == slidesLength) {
        document.querySelector('.count').innerHTML = '01';
      }
      if (index == -1) {
        document.querySelector('.count').innerHTML = '0' + slidesLength;
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

  ////// SLIDER END //////


  ///// VIDEO CONTROLS //////

  const video = document.querySelector('.video');
  const controls = document.querySelector('.play-container');

  /// EVENTS ///

  video.addEventListener('click', play);
  video.addEventListener('dblclick', openFullscreen);

  function playOrPause(that){
    if(that.querySelector('.control').querySelector('.play-container').classList.contains('fade')){
      that.querySelector('.video-file').pause();
      controls.classList.remove('fade');
    } else if(!that.querySelector('.control').querySelector('.play-container').classList.contains('fade')) {
      that.querySelector('.video-file').play();
      controls.classList.add('fade');
    }
  }

    function play(){
            playOrPause(this);
    }

  function openFullscreen() {
    if (this.requestFullscreen) {
      this.querySelector('.video-file').requestFullscreen();
    } else if (this.querySelector('.video-file').mozRequestFullScreen) { /* Firefox */
      this.querySelector('.video-file').mozRequestFullScreen();
    } else if (this.querySelector('.video-file').webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      this.querySelector('.video-file').webkitRequestFullscreen();
    } else if (this.querySelector('.video-file').msRequestFullscreen) { /* IE/Edge */
      this.querySelector('.video-file').msRequestFullscreen();
    }

    playOrPause(this);
  }

    ///// VIDEO ENDING //////

    /// TEAM SLIDER ///

    let slider_team = document.querySelector('.slider');
    let member = document.querySelectorAll('.member');
    let memeberWidth = document.querySelector('.member').offsetWidth;
    let left = document.querySelector('.left-arrow-block');
    let right = document.querySelector('.right-arrow-block');
    var jump_treshold = 280;
    var elem_count = 3;
    var counter = 1;
    var place = 0;
    var left_distance = 360;

    console.log(slider_team.style.left);

    right.addEventListener('click', ()=>{

        if(place < 2){
          member[place].style.margin = '0 400px 0 0';
          member[elem_count].style.margin = '0 -10px 0 -10px';
          if(place > 0){
            member[place - 1].style.margin = '0 0 0 0';
          }
          place++; counter--; elem_count++;
          slider_team.style.left = (jump_treshold * counter) + 'px';
          member[elem_count].style.margin = '0 400px 0 -10px';

          left_distance = parseInt(slider_team.style.left);
        }
    })



    left.addEventListener('click', ()=>{

        if(place != 0){
          counter++;
          slider_team.style.left = (jump_treshold * counter) + 'px';
          member[elem_count].style.margin = '0 -10px 0 -10px';
          place--;  elem_count--;
          member[place + 1].style.margin = '0 -10px 0 -10px';
          member[elem_count].style.margin = '0 400px 0 -10px';
          member[place].style.margin = '0 -10px 0 400px';
          left_distance = parseInt(slider_team.style.left);
        }
    })



}
