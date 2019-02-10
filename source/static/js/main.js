
$(window).on('load', function(){
	fixedLateral('.fixed-wrapper', '.fixed-content', '.fixed-item', '.fixed-height');
})

//////////////////////////////
function fixedLateral(wrapper, content, item, fixedHeight){
	var $wrapper = $(wrapper);
	var $content = $(content);
	var $item = $(item);
	var $fixedHeight = $(fixedHeight);
	

	// Almacenando en Array todos los offsetTop de cada item.
	var array_tops = []
	for(var i = 0 ; i < $item.length; i++){
		array_tops.push($item.eq(i).offset().top)
	}

	// Sumar alto total de todos los elementos header fixeados.
	var totalfixedHeight = 0;
	if ($fixedHeight.length > 0) {
		for (var i = 0; i < $fixedHeight.length; i++) {
			var currentfixedHeight = $fixedHeight.eq(i).outerHeight();;
			totalfixedHeight = totalfixedHeight + currentfixedHeight;
		}
	} else {
		totalfixedHeight = $fixedHeight.outerHeight();
	}

	console.log("contador de headers " + totalfixedHeight)

	$(window).on('scroll', function() {

		for (var iw = 0; iw < $wrapper.length; iw++) {
			var altoWrapper = $wrapper.eq(iw).outerHeight();
			var altoItem = $item.eq(iw).outerHeight();
			var altoContent = $content.eq(iw).outerHeight();
			var currentItem = $item.eq(iw);
			var topItem = array_tops[iw]  // Array contiene offset de cada items.
			var topWrapper = $wrapper.eq(iw).offset().top
			var scrollingTop = $(window).scrollTop();
			var scrollingBottomWrap = topWrapper + altoWrapper - altoItem

			console.log("scrollingTop " + scrollingTop);
			console.log("scrollingBottomWrap " + scrollingBottomWrap)

			// Si el scrolling es mayor al offsetTop del item menos el alto del header.
			if (scrollingTop > topItem - totalfixedHeight) {
				currentItem.css({
					position: 'fixed',
					top: totalfixedHeight + 'px',
				});


				// Si el scrolling es mayor al offsetTop del wrapper + alto contenido - alto del item
				if (scrollingTop > scrollingBottomWrap - 70) {
					currentItem.css({
						position: 'absolute',
						top: 'inherit',
						bottom: '0'
					});

				} else {
					currentItem.css({
						bottom: 'inherit',
					});
				}

			} else {
			currentItem.removeAttr('style');
			}
		}
		// console.log("scrollingTop " + scrollingTop)
		// console.log("scrollingBottomWrap " + scrollingBottomWrap)
	})




		
		
	



	/**********************************************************/
	
	// $(window).on('scroll', function() {
	// 	var scrollingTop = $(window).scrollTop();

	// 	var altoWrapper = $wrapper.outerHeight();
	// 	var altoLateral = $lateral.outerHeight();
	// 	var altoItem = $item.outerHeight();

	// 	var altoTotal = totalfixedHeight + altoWrapper
	// 	var scrollingBottom = scrollingTop + altoItem + totalfixedHeight


	// 	// Si el scrolling es mayor al offsetTop del item menos el alto del header
	// 	if (scrollingTop > topItem - totalfixedHeight) {
	// 			// $item.addClass('fixed')
	// 			$item.css({
	// 				position: 'fixed',
	// 				top: totalfixedHeight + 'px',
	// 			});

	// 			if (scrollingBottom > altoTotal) {
	// 				$item.css({
	// 					position: 'absolute',
	// 					top: 'inherit',
	// 					bottom: '0'
	// 				});

	// 			} else {
	// 				$item.css({
	// 					bottom: 'inherit',
	// 				});
	// 			}

	// 	} else {
	// 		// $item.removeClass('fixed')
	// 		$item.removeAttr('style');

	// 	}
	// })
}




	// if(window.width() > 1024) {
	// 	fixerLateral();
	// }



/* --- FIN BASE --- */

