

import Swiper from 'swiper';
import '../node_modules/swiper/dist/css/swiper.css';

import '@fortawesome/fontawesome-free/css/all.css'
import "./sass/style.scss";


var slides = [];
for(var i=0; i<20; i++) {
	slides[i] = {
		img: "../img/img.jpg",
		text: (i+1)+"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
		user: "userName"+(i+1),
		rating: (i+1)+".0",
		count: "26"+i,
		price: (i+1)*100,
	}
}
var templateSlide = function(slide) { 
return `<div class="swiper-slide"><a class="card" href="#">
	<div class="card__img">
		<img src="${slide.img}" />
	</div>
	<div class="card_inner">
		<div class="card__text">${slide.text}</div>
		<div class="clearfix">
			<div class="card__user float-left"><i class="fas fa-circle"></i> ${slide.user}</div>
			<div class="float-right">
				<div class="card__rating">
					<i class="fas fa-star align-middle"></i><span class="align-middle">${slide.rating}</span><span class="cart__number align-middle">(${slide.count})</span>
				</div>							
			</div>
		</div>
		<div class="card__line"></div>
		<div class="clearfix">
			<i class="fas fa-heart card__fa-heart float-left"></i>
			<span class="card__price float-right">от ${slide.price}<i class="fas fa-ruble-sign align-middle"></i></span>
		</div>
	</div>					
</a></div>`
};
var isInit = false;
var sliderCards = new Swiper('.swiper-container', {
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
	slidesPerView: 5,
	spaceBetween: 30,

	breakpoints: {
		1609: {
		  slidesPerView: 4,
		  spaceBetween: 30,
		},
		1339: {
		  slidesPerView: 3,
		  spaceBetween: 30,
		},
		961: {
		  slidesPerView: 2,
		  spaceBetween: 30,
		},
		677: {
		  slidesPerView: 1,
		  spaceBetween: 30,
		}
	},

	on: {
		init: function () {
			for(var i=0; i<6; i++) {
				this.appendSlide(templateSlide(slides[i]));
			}
			slides.splice(0, 6);
			isInit = true;
		},
		reachEnd: function(e) {
			if(!isInit) return;
			if(slides.length) {
				this.appendSlide(templateSlide(slides[0]));
				slides.splice(0, 1);
			}			
		},
	}
});
