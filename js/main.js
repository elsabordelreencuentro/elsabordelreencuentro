
//start functions on page ready/change

$(document).on("ready page:change", function() {

	ribbon(); // set margin auto for FIRST CLASS image on top - initialized two times for safety reasons ( IE )
	//backstretch_image() // responsive image plugin
	set_valign() // align verticaly
	validate_contact_form() // validation for contact form
	validate_forms() // validation for submit form
	remote_modal()
	owl() // owl carousel plugin

});

//second title dynamicaly written
function typed_txt(){
	$(".element").typed({
		strings: ["Desde que primero probaste una Quilmes hasta que nos dejaste por otra bebida, nosotros siempre estuvimos ahí esperando que vuelvas"],
	    typeSpeed: 10,
		backSpeed: 0,
		loop: true,
		backDelay: 1500,
		showCursor: false,





	});
}


// LOADER START/STOP - function for loader image. When page is fully load i hide loader image in html div <div class='loader'>
$(window).load(function() {
	$(".loader_container").fadeOut(1000).hide(); // fadeOut for loading animation ( preloader )
	$('html').css('overflow','visible'); // change form hidden because when preloader is visible we do not want to scroll page
	$(".loader_container").css('z-index','-1');
	$('body').css('position','relative');
	flat_shadow();
	ribbon(); // set margin auto for FIRST CLASS image on top - initialized two times for safety reasons ( IE )
	nav();
	typed_txt();
	performance()
	nice_scrollbar() // nicescrollbar plugin
})

// function that init scrollReveal plugin https://github.com/julianlloyd/scrollReveal.js/tree/master
function performance(){
	window.sr = new scrollReveal({
		reset: true,
		vFactor:  0.20,
	});
}


/// colorbox for images in modal box  https://github.com/jackmoore/colorbox
function colorbox_images(){
	$('.colorbox').colorbox({
		maxWidth:'95%',
		maxHeight:'95%',
		closeButton:false,
		fixed:true,
	});
}


// remote load modal content - IMPORTANT - it do not work on every browsers on local - please test it online on server.
function remote_modal(){


		//////////////////////////////////////////////////////////////////////////////////
		//////////// MODAL OPEN FOR THEMES ITEMS /////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////


		$('.button-modal-app').on('click',function(e){
			e.preventDefault();
			var sc = $(window).scrollTop()
			var cont = $(this).attr('href')

			// option for remote load content from href tag
			var options = {"remote" : cont, 'show': true}

			// fadeOut nav-top fixed if modal is opened
			$('.navbar-fixed-top').fadeOut(500)


			/////////////// BUTTON CLOSE BECAUSE OF IE - because for ie9, ie10 modal callbacks does not work as they should, button for close modal is setted like that///////////////
			var fix_ie = setInterval(function(){

				if ( $('.modal-check').length ){
						modal_close(sc)
						colorbox_images() //init colorbox for images
						clearInterval(fix_ie);
				}
				}, 100);

			// function when show modal is fired
			$('#myModal').one('show.bs.modal', function (e) {
				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				$('body').css('position','fixed'); //fix for scrolling background of body when modal is open
				$('body').css('margin-top',-sc + 'px')
				$(window).scrollTop(sc)
			});

			// callbacks for vertival align for bootstrap modal - see bootstrap documentation for more informations - shown.bs.modal is fired after modal is fully showed
			$('#myModal').one('shown.bs.modal', function (e) {
				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				nice_scrollbar_modals()

				owl_carousel_buy_stop_start(0)
				$('body').css('position','fixed');
				$(window).scrollTop(sc);
			});

			// back behaviors after close modal was fired
			$('#myModal').one('hide.bs.modal', function (e) {
			    $('.navbar-fixed-top').fadeIn(1000)
				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				owl_carousel_buy_stop_start(1)
				$('body').css('position','relative');
				$(window).scrollTop(sc);
			});
			$('#myModal').one('hidden.bs.modal', function (e) {
			    $('body').css('position','relative');
				$(window).scrollTop(sc);
				$(e.target).removeData("bs.modal").find(".modal-content").empty();
			});


			//init modal
			$('#myModal').modal(options);


		});



		//////////////////////////////////////////////////////////////////////////////////
		//////////// MODAL OPEN FOR BLOGS ITEMS /////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////

		$('.button-modal-blog').on('click',function(e){
			e.preventDefault();
			var sc = $(window).scrollTop()
			var cont = $(this).attr('href')

			// option for remote load content from href tag
			var options = {"remote" : cont, 'show': true}

			// fadeOut nav-top fixed if modal is opened
			$('.navbar-fixed-top').fadeOut(500)


			/////////////// BUTTON CLOSE BECAUSE OF IE - because for ie9, ie10 modal callbacks does not work as they should, button for close modal is setted like that///////////////
			var fix_ie = setInterval(function(){

				if ( $('.modal-check').length ){
						modal_close(sc)
						colorbox_images() //init colorbox for images
						clearInterval(fix_ie);
				}
				}, 100);

			// function when show modal is fired
			$('#myModalBlog').one('show.bs.modal', function (e) {
				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				$('body').css('position','fixed'); //fix for scrolling background of body when modal is open
				$('body').css('margin-top',-sc + 'px')
				$(window).scrollTop(sc)
			});

			// callbacks for vertival align for bootstrap modal - see bootstrap documentation for more informations - shown.bs.modal is fired after modal is fully showed
			$('#myModalBlog').one('shown.bs.modal', function (e) {

				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				nice_scrollbar_modals()

				$('body').css('position','fixed');
				$(window).scrollTop(sc)

			});

			// back behaviors after close modal was fired
			$('#myModalBlog').one('hide.bs.modal', function (e) {
			    $('.navbar-fixed-top').fadeIn(1000)
				var t = $(this)
				var dialog = $(this).find('.modal-dialog').data('dialog')
				set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
				$('body').css('position','relative');


			});
			//clear modal after close
			$('#myModalBlog').one('hidden.bs.modal', function (e) {
				$(e.target).removeData("bs.modal").find(".modal-content").empty();
			});

			//init modal
			$('#myModalBlog').modal(options);

		});

}

//close button in modal box - because of IE bugs with modal callbacks
function modal_close(sc){

	$('.modal-b-close').on('click', function(e){

		e.preventDefault();
		$('body').css('position','relative');
		$('body').scrollTop(sc)
		$('body').css('margin-top','0px')
		$(window).scrollTop(sc);
		var t = $(this)
		setTimeout(function() {
			  var modal = t.data('type')
		      $('#'+ modal).modal('hide');
		}, 400);
	})
}

// IMAGE BACKGROUND PLUGIN - for responsive behavior https://github.com/srobbin/jquery-backstretch
function backstretch_image(){

	//not setted because this plugin do not accept position fixed for image. If You want slider and no fixed position, You can uncomment it.

	//$(".s1").backstretch([
	 //   "img/wallpapers/wallpaper1.jpg", //you can put more images if you want to make slider for background images
		//"img/wallpapers/wallpaper2.jpg" // for example
	 // ], {duration: 4000, fade: 1000});

	//$(".s7").backstretch([
	   // "img/wallpapers/wallpaper3.jpg" //you can put more images if you want to make slider for background images
		//"img/wallpapers/wallpaper2.jpg" // for example
	  //], {duration: 4000, fade: 1000});

}

// small plugin for vertical align in middle
$.fn.vAlignDiv = function(div) {
  return this.each(function(i){
  var ah = $(this).height();
  var ph = $(div).height();
  var mh = (ph - ah) / 2;
  if(mh>0) {
    $(this).css('margin-top', mh);
  } else {
    $(this).css('margin-top', 0);
  }
})
}

// set vertical aligment on middle for some site elements
function set_valign(){
	ribbon(); // set ribbon FIRST CLASS IMAGE always on middle
	$(window).resize(function(){
		ribbon(); // set ribbon FIRST CLASS IMAGE always on middle even after page resize manualy
	})
}

// set modals contenten always verticaly aligned on middle
function set_valign_modal(t,dialog){
	var d = t.find('.modal-container')
	$(d).vAlignDiv($('.'+dialog))
}


//flat shadow plugin - used only for buttons  https://github.com/peachananr/flat-shadow
function flat_shadow(){

	$(".btn-ff6353a").flatshadow({
	  color: "#f11f5c", // Background color of elements inside. (Color will be random if left unassigned)
	  angle: "SE", // Shadows direction. Available options: N, NE, E, SE, S, SW, W and NW. (Angle will be random if left unassigned)
	  fade: false, // Gradient shadow effect
	  boxShadow: "" // Color of the Container's shadow
	});
	$(".btn-53bc96").flatshadow({
	  color: "#53bc96", // Background color of elements inside. (Color will be random if left unassigned)
	  angle: "SE", // Shadows direction. Available options: N, NE, E, SE, S, SW, W and NW. (Angle will be random if left unassigned)
	  fade: false, // Gradient shadow effect
	  boxShadow: "" // Color of the Container's shadow
	});
	$(".btn-fac51f").flatshadow({
	  color: "#fac51f", // Background color of elements inside. (Color will be random if left unassigned)
	  angle: "SE", // Shadows direction. Available options: N, NE, E, SE, S, SW, W and NW. (Angle will be random if left unassigned)
	  fade: false, // Gradient shadow effect
	  boxShadow: "" // Color of the Container's shadow
	});

	$(".btn-submit").flatshadow({
	  color: "#fac51f", // Background color of elements inside. (Color will be random if left unassigned)
	  angle: "SE", // Shadows direction. Available options: N, NE, E, SE, S, SW, W and NW. (Angle will be random if left unassigned)
	  fade: false, // Gradient shadow effect
	  boxShadow: "" // Color of the Container's shadow
	});
}


//set auto margin for top logo/menu-button
function ribbon(){
	$('.ribbon').css('margin-left',$(window).width()/2 - $('.ribbon').width()/2)
	$('.s5-image').css('margin-left',$(window).width()/2 - $('.s5-image').width()/2)
}


/* NOTY notifications plugin settings */
// generate function that can be used when user click on button or submit something http://ned.im/noty/  WHOLE options can (jQ and CSS) be changed in default.js
function generate_1(type,text) {
  	var n = noty({
  		text: text,
  		type: type,
		timeout : 3000,
        dismissQueue: true,
		maxVisible: 5,
  		layout: 'center',
  		theme: 'defaultTheme'
  	});
}


// validator for submit newsletter https://github.com/chriso/validator.js
function validate_forms(){

	//validation for email submit on first page
	$('.validate').submit(function(event){

		if ( validator.isEmail( $('.input-submit').val()  ) ){
			alert('Success.Set Your send email function')
		}else{
			generate_1('information', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}
	});
}


//validation for contact form https://github.com/chriso/validator.js
function validate_contact_form(){


	$('.validate-contact').submit(function(event){
			var email_ = jQuery('.contact-email').val();
			var sender_ = jQuery('.contact-sender').val();
			var content_ = jQuery('.contact-content').val();
		//validate email in contact form
		if ( validator.isEmail( $('.contact-email').val()  ) ){

		}else{
			generate_1('error', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}

		//validate name in contact form
		if (validator.isAlphanumeric( $('.contact-sender').val()  ) ){

		}else{
			generate_1('error', 'Name can only contain letters and numbers');
			event.preventDefault();
		}


		//if everything is valid, run Your sending email function
		if ( validator.isAlphanumeric( $('.contact-sender').val() ) && validator.isEmail( $('.contact-email').val() ) &&  $('.contact-content').val() !=''  ){
			generate_1('success', 'Email was successfull sended. Thank You.');
			jQuery.ajax({
			       url: "mails.php",
			       type: "post", //can be post or get
			       data: {email:email_ , name:sender_ , message:content_},
			       success: function(){
						//console.log('success ajax')
						jQuery('.contact-email').val('') ;
						jQuery('.contact-sender').val('') ;
						jQuery('.contact-content').val('');
			       }
			});
			event.preventDefault();
		}
	});
}



//NAVIGATION WITH SLIDE SCROLL PLUGIN - for more information check http://github.com/davist11/jQuery-One-Page-Nav
function nav(){
	$('.nav').onePageNav({
	    currentClass: 'current',
	    changeHash: false,
	    scrollSpeed: 750,
	    scrollThreshold: 0.5,
	    filter: '',
	    easing: 'swing',
	    begin: function() {
	        //I get fired when the animation is starting
	    },
	    end: function() {
	        //I get fired when the animation is ending
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	    }
	});
}


// CUSTOM SCROLL BAR PLUGIN - this plugin put custom right scroll for browsers. If You want change behavior,
// look at https://github.com/inuyaksa/jquery.nicescroll and in file jquery.nicescroll.js
function nice_scrollbar(){
	$("body").niceScroll({cursorcolor:"#ff6353"});

}
//scrollbars only for modals
function nice_scrollbar_modals(){

	$("#myModal").niceScroll({cursorcolor:"#F62459"}); // scroll for modal 1
	$("#myModalBlog").niceScroll({cursorcolor:"#F62459"}); // scroll for modal 2

}


// PORTFOLIO SLIDER OWL PLUGIN - plugin for carousel in section "last added products" and "yes, people talk about us" - http://owlgraphic.com/owlcarousel/
function owl(){
	$(".owl-carousel").owlCarousel({

	      autoPlay: 2000, //Set AutoPlay to 3 seconds
		  pagination:true,
		  stopOnHover:true,

		  //how many items display for browser width >= X
	      itemsCustom : [
		        [0, 1],
		        [450, 1],
		        [600, 2],
		        [700, 2],
		        [1000, 3],
				[1060, 4],
		        [1200, 4],
		        [1400, 4],
		        [1600, 5],
				[1800, 6]
		      ],
	  });
}


//stop owl carousels when modal is open - fix for performance
function owl_carousel_buy_stop_start(s){

	if (s == 0){

		var owl = $(".owl-carousel");
		owl.trigger('owl.stop');
	}else{

		var owl = $(".owl-carousel");
		owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
	}
}
