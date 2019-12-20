window.onload=()=>{function e(e){let n="";for(data of e)n+=`<div class="item">\n                      <div class="header-left">\n                        <div class="content-gallery">\n                          <img class='board' src="${data.imgs.img1}" alt="Board">\n                          <div class="img-container">\n                            <div class="img-block blue-lagoon"><img src="${data.imgs.img1}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img2}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img3}" alt="Board mini image"></div>\n                            <div class="img-block"><img src="${data.imgs.img4}" alt="Board mini image"></div>\n                          </div>\n                        </div>\n                      </div>\n                      <div class="header-right">\n                          <div class="item-heading">\n                            <h4>${data.title}</h4>\n                            <div class="rating">\n                              <div class="stars">\n                                ${t(data.stars)}\n                              </div>\n                              <span class="rated">(${data.rating})</span>\n                            </div>\n                          </div>\n                          <div class="item-info">\n                            <ul class='sub-nav-ul'>\n                              <li data-obj='desc' data-id="${data.id}" class='subNav active'>DESCRIPTION</li>\n                              <li data-obj='features' data-id="${data.id}" class='subNav'>FEATURES</li>\n                              <li data-obj='dimensions' data-id="${data.id}" class='subNav'>DIMENSIONS</li>\n                            </ul>\n                            <p class='product-paragraph'>${data.desc}</p>\n                            <div class="bot-info">\n                              <h4 class='price'>${data.price}</h4>\n                              <button class='blue-button'><span>BUY NOW</span></button>\n                            </div>\n                          </div>\n                          <a href="">View all boards</a>\n                      </div>\n                    </div>`;document.querySelector(".items").innerHTML=n}function t(e){let t="";for(let n=1;n<=5;n++)t+=e<n?'<div class="no-star"></div>':'<div class="star"></div>';return t}function n(){for(element of $(this).parent().find(".img-block"))$(element).hasClass("blue-lagoon")&&$(element).removeClass("blue-lagoon");$(this).parent().parent().find(".board").attr("src",$(this).find("img").attr("src")),$(this).addClass("blue-lagoon")}function i(){$(".item").css({width:$(".header-content").width()+"px"}),$(".items").css({left:"-"+$(".header-content").width()+"px"})}document.querySelector(".hamburger").addEventListener("click",e=>{let t=document.querySelector(".navi");e.target.classList.contains("hamburger-open")?(e.target.parentNode.classList.toggle("top-header-anim"),e.target.classList.toggle("hamburger-end"),t.classList.toggle("naviAnim"),setTimeout(()=>{e.target.classList.toggle("hamburger-open"),t.style.pointerEvents="none"},300)):(t.style.pointerEvents="auto",e.target.parentNode.classList.toggle("top-header-anim"),t.classList.toggle("naviAnim"),e.target.classList.toggle("hamburger-open"),setTimeout(()=>{e.target.classList.toggle("hamburger-end")},300))}),$.ajax({url:"assets/js/shop.json",type:"GET",success:function(t){e(t),$(".item").css({width:$(".header-content").width()+"px"}),$(".items").css({left:"-"+$(".header-content").width()+"px"}),function(e,t,n,i){var s,a,l=0,o=0,r=100,c=t.getElementsByClassName("item"),d=c.length,u=t.getElementsByClassName("item")[0].offsetWidth,m=c[0],g=c[d-1],f=m.cloneNode(!0),v=g.cloneNode(!0),p=0,h=!0;function y(e){e=e||window.event,s=t.offsetLeft,"touchstart"==e.type?l=e.touches[0].clientX:(l=e.clientX,document.onmouseup=L,document.onmousemove=b)}function b(e){"touchmove"==(e=e||window.event).type?(o=l-e.touches[0].clientX,l=e.touches[0].clientX):(o=l-e.clientX,l=e.clientX),t.style.left=t.offsetLeft-o+"px"}function L(e){(a=t.offsetLeft)-s<-r?q(1,"drag"):a-s>r?q(-1,"drag"):t.style.left=s+"px",document.onmouseup=null,document.onmousemove=null}function q(e,n){t.classList.add("shifting"),h&&(n||(s=t.offsetLeft),1==e?(t.style.left=s-u+"px",p++):-1==e&&(t.style.left=s+u+"px",p--)),document.querySelector(".count").innerHTML="0"+(p+1),p==d&&(document.querySelector(".count").innerHTML="01"),-1==p&&(document.querySelector(".count").innerHTML="0"+d),h=!1}document.querySelector(".length").innerHTML="0"+d,t.appendChild(f),t.insertBefore(v,m),e.classList.add("loaded"),t.onmousedown=y,t.addEventListener("touchstart",y),t.addEventListener("touchend",L),t.addEventListener("touchmove",b),n.addEventListener("click",(function(){q(-1)})),i.addEventListener("click",(function(){q(1)})),t.addEventListener("transitionend",(function(){t.classList.remove("shifting"),-1==p&&(t.style.left=-d*u+"px",p=d-1),p==d&&(t.style.left=-1*u+"px",p=0),h=!0}))}(s,a,l,o),$(".img-block").click(n),document.querySelectorAll(".sub-nav-ul").forEach(e=>{let t=e.querySelectorAll("li");t.forEach(e=>{e.addEventListener("click",(function(e){!function(e,t){for(sub of($.ajax({url:"assets/js/shop.json",type:"GET",success:function(t){let n=t.filter(t=>t.id==e.dataset.id);$(e).parent().parent().find(".product-paragraph").text(n[0][e.dataset.obj])},error:function(e,t,n){console.log(n)}}),t))sub.classList.contains("active")&&sub.classList.remove("active");e.classList.add("active")}(e.srcElement,t)}),!1)})})},error:function(e,t,n){console.log(n)}}),i(),$(window).resize(()=>{i()});var s=document.getElementById("wrapper"),a=document.getElementById("items"),l=document.querySelector(".arrow-left-click"),o=document.querySelector(".arrow-right-click");const r=document.querySelector(".video"),c=document.querySelector(".play-container");function d(e){e.querySelector(".control").querySelector(".play-container").classList.contains("fade")?(e.querySelector(".video-file").pause(),c.classList.remove("fade")):e.querySelector(".control").querySelector(".play-container").classList.contains("fade")||(e.querySelector(".video-file").play(),c.classList.add("fade"))}r.addEventListener("click",(function(){d(this)})),r.addEventListener("dblclick",(function(){this.requestFullscreen?this.querySelector(".video-file").requestFullscreen():this.querySelector(".video-file").mozRequestFullScreen?this.querySelector(".video-file").mozRequestFullScreen():this.querySelector(".video-file").webkitRequestFullscreen?this.querySelector(".video-file").webkitRequestFullscreen():this.querySelector(".video-file").msRequestFullscreen&&this.querySelector(".video-file").msRequestFullscreen();d(this)}));let u=document.querySelector(".slider"),m=document.querySelectorAll(".member"),g=(document.querySelector(".member").offsetWidth,document.querySelector(".left-arrow-block")),f=document.querySelector(".right-arrow-block");var v=window.innerWidth>1200?280:200,p=window.innerWidth>700?3:1,h=window.innerWidth>700?1:2,y=0,b=window.innerWidth>700?360:200;window.innerWidth<450&&(v=140),f.addEventListener("click",()=>{y<2&&(m[y].style.margin="0 "+b+"px 0 0",m[p].style.margin="0 -10px 0 -10px",y>0&&(m[y-1].style.margin="0 0 0 0"),y++,h--,p++,u.style.left=v*h+"px",m[p].style.margin="0 "+b+"px 0 -10px",b=parseInt(u.style.left))}),g.addEventListener("click",()=>{0!=y&&(h++,u.style.left=v*h+"px",m[p].style.margin="0 -10px 0 -10px",y--,p--,m[y+1].style.margin="0 -10px 0 -10px",m[p].style.margin="0 400px 0 -10px",m[y].style.margin="0 -10px 0 400px",b=parseInt(u.style.left))})};