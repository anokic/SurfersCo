window.onload=()=>{function e(e){let n="";for(data of e)n+=`<div class="item">\n                      <div class="header-left">\n                        <div class="content-gallery">\n                          <img class='board' src="${data.imgs.img1}" alt="Board">\n                          <div class="img-container">\n                            <div class="img-block blue-lagoon"><img src="${data.imgs.img1}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img2}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img3}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img4}" alt="Board mini image"></div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class="header-right">\n                          <div class="item-heading">\n                            <h4>${data.title}</h4>\n                            <div class="rating">\n                              <div class="stars">\n                                ${t(data.stars)}\n                              </div>\n                              <span class="rated">(${data.rating})</span>\n                            </div>\n                          </div>\n                          <div class="item-info">\n                            <ul class='sub-nav-ul'>\n                              <li data-obj='desc' data-id="${data.id}" class='subNav active'>DESCRIPTION</li>\n                              <li data-obj='features' data-id="${data.id}" class='subNav'>FEATURES</li>\n                              <li data-obj='dimensions' data-id="${data.id}" class='subNav'>DIMENSIONS</li>\n                            </ul>\n                            <p class='product-paragraph'>${data.desc}</p>\n                            <div class="bot-info">\n                              <h4 class='price'>${data.price}</h4>\n                              <button class='blue-button'><span>BUY NOW</span></button>\n                            </div>\n                          </div>\n                          <a href="">View all boards</a>\n                      </div>\n                    </div>`;document.querySelector(".items").innerHTML=n}function t(e){let t="";for(let n=1;n<=5;n++)t+=e<n?'<div class="no-star"></div>':'<div class="star"></div>';return t}function n(){for(element of $(this).parent().find(".img-block"))$(element).hasClass("blue-lagoon")&&$(element).removeClass("blue-lagoon");$(this).parent().parent().find(".board").attr("src",$(this).find("img").attr("src")),$(this).addClass("blue-lagoon")}function s(){$(".item").css({width:$(".header-content").width()+"px"}),$(".items").css({left:"-"+$(".header-content").width()+"px"})}$.ajax({url:"assets/js/shop.json",type:"GET",success:function(t){e(t),$(".item").css({width:$(".header-content").width()+"px"}),$(".items").css({left:"-"+$(".header-content").width()+"px"}),function(e,t,n,s){var i,l,a=0,o=0,c=100,r=t.getElementsByClassName("item"),d=r.length,u=t.getElementsByClassName("item")[0].offsetWidth,m=r[0],f=r[d-1],v=m.cloneNode(!0),p=f.cloneNode(!0),g=0,y=!0;function h(e){e=e||window.event,i=t.offsetLeft,"touchstart"==e.type?a=e.touches[0].clientX:(a=e.clientX,document.onmouseup=q,document.onmousemove=b)}function b(e){"touchmove"==(e=e||window.event).type?(o=a-e.touches[0].clientX,a=e.touches[0].clientX):(o=a-e.clientX,a=e.clientX),t.style.left=t.offsetLeft-o+"px"}function q(e){(l=t.offsetLeft)-i<-c?S(1,"drag"):l-i>c?S(-1,"drag"):t.style.left=i+"px",document.onmouseup=null,document.onmousemove=null}function S(e,n){t.classList.add("shifting"),y&&(n||(i=t.offsetLeft),1==e?(t.style.left=i-u+"px",g++):-1==e&&(t.style.left=i+u+"px",g--)),document.querySelector(".count").innerHTML="0"+(g+1),g==d&&(document.querySelector(".count").innerHTML="01"),-1==g&&(document.querySelector(".count").innerHTML="0"+d),y=!1}document.querySelector(".length").innerHTML="0"+d,t.appendChild(v),t.insertBefore(p,m),e.classList.add("loaded"),t.onmousedown=h,t.addEventListener("touchstart",h),t.addEventListener("touchend",q),t.addEventListener("touchmove",b),n.addEventListener("click",(function(){S(-1)})),s.addEventListener("click",(function(){S(1)})),t.addEventListener("transitionend",(function(){t.classList.remove("shifting"),-1==g&&(t.style.left=-d*u+"px",g=d-1),g==d&&(t.style.left=-1*u+"px",g=0),y=!0}))}(i,l,a,o),$(".img-block").click(n),document.querySelectorAll(".sub-nav-ul").forEach(e=>{let t=e.querySelectorAll("li");t.forEach(e=>{e.addEventListener("click",(function(e){!function(e,t){for(sub of($.ajax({url:"assets/js/shop.json",type:"GET",success:function(t){let n=t.filter(t=>t.id==e.dataset.id);$(e).parent().parent().find(".product-paragraph").text(n[0][e.dataset.obj])},error:function(e,t,n){console.log(n)}}),t))sub.classList.contains("active")&&sub.classList.remove("active");e.classList.add("active")}(e.srcElement,t)}),!1)})})},error:function(e,t,n){console.log(n)}}),s(),$(window).resize(()=>{s()});var i=document.getElementById("wrapper"),l=document.getElementById("items"),a=document.querySelector(".arrow-left-click"),o=document.querySelector(".arrow-right-click");const c=document.querySelector(".video"),r=document.querySelector(".play-container");function d(e){e.querySelector(".control").querySelector(".play-container").classList.contains("fade")?(e.querySelector(".video-file").pause(),r.classList.remove("fade")):e.querySelector(".control").querySelector(".play-container").classList.contains("fade")||(e.querySelector(".video-file").play(),r.classList.add("fade"))}c.addEventListener("click",(function(){d(this)})),c.addEventListener("dblclick",(function(){this.requestFullscreen?this.querySelector(".video-file").requestFullscreen():this.querySelector(".video-file").mozRequestFullScreen?this.querySelector(".video-file").mozRequestFullScreen():this.querySelector(".video-file").webkitRequestFullscreen?this.querySelector(".video-file").webkitRequestFullscreen():this.querySelector(".video-file").msRequestFullscreen&&this.querySelector(".video-file").msRequestFullscreen();d(this)}));let u=document.querySelector(".slider"),m=document.querySelectorAll(".member"),f=(document.querySelector(".member").offsetWidth,document.querySelector(".left-arrow-block")),v=document.querySelector(".right-arrow-block");var p=3,g=1,y=0;console.log(u.style.left),v.addEventListener("click",()=>{y<2&&(m[y].style.margin="0 400px 0 0",m[p].style.margin="0 -10px 0 -10px",y>0&&(m[y-1].style.margin="0 0 0 0"),y++,g--,p++,u.style.left=280*g+"px",m[p].style.margin="0 400px 0 -10px",parseInt(u.style.left))}),f.addEventListener("click",()=>{0!=y&&(g++,u.style.left=280*g+"px",m[p].style.margin="0 -10px 0 -10px",y--,p--,m[y+1].style.margin="0 -10px 0 -10px",m[p].style.margin="0 400px 0 -10px",m[y].style.margin="0 -10px 0 400px",parseInt(u.style.left))})};