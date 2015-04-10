$(window).on('load', function () 
{
	$('.selectpicker').selectpicker({});
});

// var x = 0;
// function addElement() {
// 	x += 1;
// 	var item_count = document.getElementById("item_count1");
// 	item_count.innerHTML = x;
// 	if (x>0) {
// 		document.getElementById("item_count1").style.display = "block";
// 		document.getElementById("reduce_count1").style.display = "block";
// 	}
// 	return x;
// 	}

// function removeElement() {
// 	x -= 1;
// 	var item_count = document.getElementById("item_count1");
// 	item_count.innerHTML = x;
// 	if (x<=0) {
// 		document.getElementById("item_count1").style.display = "none";
// 		document.getElementById("reduce_count1").style.display = "none";
// 	}
// 	return x;
// 	}

// for (i=0; i<3; i++) {
// 	$('#reduce_count' + i).click(function(){
// 	  alert(i);
// 	});
// }

// $('.product').each(function () {
// 	$('#increase_count').click(function () {
// 		// $(this '#item_count').show();
// 		// console.log(this.id);
// 		// $("#item_count", this).show();
// 		console.log(this.parent( ".product" ).id);
// 	});
	
// });

var count = 0;
var totalCost = 0;
var newItem = '000';
	// console.log(count);
	$('.increase_count').click(function () {
		
		count ++;
		$(this).closest('div').children('.reduce_count').css( "display", "block" );
		$(this).closest('.product').children('.item_count').css( "display", "block" );
		$(this).closest('.product').children('.item_count').html(function(i, val) { 
			value = val*1 +1;
			return value; 
		});

		// console.log($(this).closest('.product').children('img')[0].outerHTML);
		newItem = (
					'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
						'<td class="image">'+ $(this).closest('.product').children('img')[0].outerHTML + '</td>' +
						'<td class="name">'+$(this).closest('.product').find('.product-name').html()+'</td>' +
						'<td class="price">'+parseFloat($(this).closest('.product').find('.product-price').html())+' &#8381;</td>' +
						'<td class="quantity"> x '+value+'</td>' +
						'<td class="total"> = '+ parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(value)+' &#8381; </td>'+
					'</tr>');
		// console.log(newItem);
		// 	// console.log($(this).closest('.product').children('img')[0]);
		// 	var $this = $(this);
  //  			// $this.prev().append( $this.html() );
		// 	console.log($this.closest('.product').children('img')[0] );
		// 	console.log($(".name > p").html());
		
		$('#cart-number').css( "display", "block" );
		$('#cart-number').html(count);
		var itemId = $(this).closest('.product');
		// alert("#cart-"+ itemId.attr('id'));
		if (value > 1) {
			$("#cart-"+ itemId.attr('id')).remove();
		}

		$("#ordered-items").prepend(newItem);

		totalCost = totalCost + parseFloat($(this).closest('.product').find('.product-price').html())


		$('#cart-price').html(totalCost);

		// $( "iframe" ).attr({
		//   src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
		// });

		// $(".checkout").empty();
		// $(".checkout").append('<iframe id="yiframe" frameborder="0" allowtransparency="true" scrolling="no" src="https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum='+ totalCost +'&successURL=" width="196" height="54"></iframe>');

		return newItem;
	});
	// console.log(count);


	$('.reduce_count').click(function () {
		console.log(newItem);

		count --;
		$(this).closest('.product').children('.item_count').html(function(i, val) { 
			value = val*1 -1;
			return value; 
		});

		newItem = (
					'<tr class="ordered-item" id="cart-'+$(this).closest('.product').attr('id')+'"> '+
						'<td class="image">'+ $(this).closest('.product').children('img')[0].outerHTML + '</td>' +
						'<td class="name">'+$(this).closest('.product').find('.product-name').html()+'</td>' +
						'<td class="price">'+parseFloat($(this).closest('.product').find('.product-price').html())+' &#8381;</td>' +
						'<td class="quantity"> x '+value+'</td>' +
						'<td class="total"> = '+ parseFloat($(this).closest('.product').find('.product-price').html())*parseFloat(value)+'</td>'+
					'</tr>');
		var itemId = $(this).closest('.product');

		$("#cart-"+ itemId.attr('id')).remove();


		if (value <= 0) {
			$(this).closest('div').children('.reduce_count').css( "display", "none" );
			$(this).closest('.product').children('.item_count').css( "display", "none" );
		}
		else {
			$("#ordered-items").prepend(newItem);
		}

		$('#cart-number').html(count);
		if (count <= 0) {
			$('#cart-number').css( "display", "none" );
		}

		totalCost = totalCost - parseFloat($(this).closest('.product').find('.product-price').html());

		$('#cart-price').html(totalCost);

		// $( "iframe" ).attr({
		//   src: "https://money.yandex.ru/embed/small.xml?account=410013034873931&quickpay=small&any-card-payment-type=on&button-text=02&button-size=l&button-color=orange&targets=expfood&default-sum="+totalCost+"&successURL=",
		// });


		return newItem;
	});


	$('.dropdown').click(function () {
		$('.dropdown-menu').css( "display", "block" );
		$('.dropdown-menu').css( "width", "350px" );
	});
// // function displayTracking() {
// // 	document.getElementById("tracking").style.display = block;
// // }
// $('#denchik').click(function () {
// 	$( "#denchik" ).toggle(function() {
// 	 alert( "First handler for .toggle() called." );
// 	}, function() {
// 	 alert( "second handler for .toggle() called." );
// 	});
// });

// $(document).ready(function () {
//     $(".dropdown").click(function () {
//         $('.dropdown-menu').not($(".dropdown-menu").toggle()).css( "display", "none" );
        
//     });
// });

// $( ".dropdown" ).click(function() {
//   $( "#denchik" ).toggle(function() {
//   	$("#denchik")
//   });
// });

