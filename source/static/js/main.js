// app = {
// 	demo(wrapper, content, lateral, item){

// 		var $wrapper = $(wrapper);
// 		var $content = $(content);
// 		var $lateral = $(lateral);
// 		var $item = $(item);
// 		$(window).on('scroll', function(event) {
// 			var $window = $(window)
// 			var altoWindow = $window.height()
// 			var scTop = $(window).scrollTop()
// 			var scBottom = scrollTop + altoWindow
// 			var altoWrapper = $wrapper.outerHeight()
// 			var altoItem = $item.outerHeight()
// 			var topItem = $item.offset().top
// 			// if(scTop > ){

// 			// }
// 		});
// 	}
// }
$(function(){
	// app.demo('.fixed-wrapper', '.fixed-content', '.fixed-lateral', '.fixed-item', 'distance-top')
	fixedLateral('.fixed-wrapper', '.fixed-content', '.fixed-lateral', '.fixed-item', '.headers-height');
})


//////////////////////////////
function fixedLateral(wrapper, content, lateral, item, headerheight){
	var $wrapper = $(wrapper);
	var $content = $(content);
	var $lateral = $(lateral);
	var $item = $(item);
	var $headersHeight = $(headerheight);

	var topItem = $item.offset().top      
	
	$(window).on('scroll', function() {
		var altoWindow = $(window).height();
		var altoHeaders = $headersHeight.height();
		var scrollingTop = $(window).scrollTop();
		var scrollingBottom = scrollingTop + altoWindow;

		var altoWrapper = $wrapper.outerHeight();
		var altoLateral = $lateral.outerHeight();
		var altoItem = $item.outerHeight();

		var altoTotal = altoHeaders + altoWrapper
		var scrollingBottom = scrollingTop + altoItem + altoHeaders

		// Si el scrolling es mayor al offsetTop del item menos el alto del header
		if (scrollingTop > topItem - altoHeaders) {
				// $item.addClass('fixed')
				$item.css({
					position: 'fixed',
					top: altoHeaders + 'px',
				});

				if ((scrollingTop + altoItem + altoHeaders) > altoTotal ) {
					$item.css({
						position: 'absolute',
						top: 'inherit',
						bottom: '0'
					});

				} else {
					$item.css({
						bottom: 'inherit',
					});
				}

		} else {
			// $item.removeClass('fixed')
			$item.removeAttr('style');

		}

		console.log("altoTotal " + altoTotal)
		console.log("scrollingTop + altoItem " + (scrollingTop + altoItem))
	})
}

//////////////////////////////

	function fixerLateral(){
		var offsetItem = $('.fixed-item').offset().top;
		$(window).scroll(function() {
			var altoHeader = $('.header').outerHeight(),
				altoWrapper = $('.fixed-wrapper').outerHeight(),
				paddingWrapper = parseInt($('.fixed-wrapper').css('padding-top')),
				altoTotal = altoWrapper + altoHeader;

				altoLateral = $('.fixed-lateral').outerHeight(),
				altoItem = $('.fixed-item').outerHeight(),
				altoScrolling = $(window).scrollTop(),
				fixedBottom = altoScrolling + altoItem + altoHeader;

				if (altoScrolling > offsetItem - altoHeader) {
					$('.fixed-item').addClass('fixed');
					$('.fixed-item').css({
						top: altoHeader + 'px',
					});

					if (fixedBottom > altoTotal) {
						$('.fixed-item').addClass('absolute-bottom');
					} else if (fixedBottom < altoTotal){
						$('.fixed-item').removeClass('fixed-bottom');
					}

				} else {
					$('.fixed-item').removeAttr('style');
				}

		})
	}

	// fixerLateral()



	// if(window.width() > 1024) {
	// 	fixerLateral();
	// }



/* --- FIN BASE --- */

