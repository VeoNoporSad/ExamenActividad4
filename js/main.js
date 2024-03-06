const calcularButton = document.getElementById('calcularButton');

calcularButton.addEventListener('click', function(event) {
  event.preventDefault();

  const radios = document.getElementsByName('radio');
  let selectedRadio = '';

  for (const radio of radios) {
	if (radio.checked) {
	  selectedRadio = radio.nextElementSibling.textContent;
	  break;
	}
  }

  const inputNumber = document.querySelector('.input').value;

  if (selectedRadio === 'Suma de múltiplos 3 y 5') {
	const n = parseInt(inputNumber, 10);

	if (isNaN(n) || n <= 0) {
	  Swal.fire({
		icon: 'error',
		title: 'Error',
		text: 'Ingrese un número mayor a 0'
	  });
	  return;
	}
  
	let suma = 0;
  
	for (let i = 1; i < n; i++) {
	  if (i % 3 === 0 || i % 5 === 0) {
		suma += i;
	  }
	}
  
	Swal.fire({
		title: 'Resultado',
		text: `La suma de números múltiplos de 3 y 5 menores a ${n} es: ${suma}`,
		width: 600,
		padding: '3em',
		color: '#716add',
		background: '#fff url(/images/trees.png)',
		backdrop: `
		  rgba(0,0,123,0.4)
		  url("/images/nyan-cat.gif")
		  left top
		  no-repeat
		`
	  })

  } else if (selectedRadio === 'Mínimo común divisor') {
	const n = parseInt(inputNumber, 10);

	if (isNaN(n) || n <= 0) {
	  Swal.fire({
		icon: 'error',
		title: 'Error',
		text: 'Por favor, ingrese un número válido mayor que cero.'
	  });
	  return;
	}

	const lcmResult = calculateLCM(n);

	Swal.fire({
		title: 'Resultado',
	  	text: `El MCM del conjunto del 1 al ${n} es: ${lcmResult}`,
		width: 600,
		padding: '3em',
		color: '#716add',
		background: '#fff url(/images/trees.png)',
		backdrop: `
		  rgba(0,0,123,0.4)
		  url("/images/nyan-cat.gif")
		  left top
		  no-repeat
		`
	  });
  }
	const inputElement = document.getElementById('inputNumber');
	inputElement.value = ''; // Esto vacía el contenido del input

});

/***********************************************************************************************************/
var distance_li = -1;
var distance_id = -1;
var id_default = 8;
var li_default = 15;
var current = -1;

$(document).ready(function(){
	distance_li = $(".list-item").eq(1).offset().top - $(".list-item").eq(0).offset().top;
	distance_id = $(".id-list-item").eq(0).offset().top - $(".id-list-item").eq(1).offset().top;
	//distance_id = $(".id-list-item").eq(1).offset().top - $(".id-list-item").eq(0).offset().top;
});

$(".reset").click(function(){
	moveIndicator('-60px');
	moveIdItems(51);
	moveIndicatorCirc(35);
	moveTitle(0);
	moveCircFill('30px');
	$(".title").removeClass("title-on");
	$(".indicator-circle").removeClass("ind-circ-off");
	$(".indicator").removeClass("on")
	current=-1;
})

$(".list-item").click(function(){
	if(current==-1){
		$(".indicator-circle").addClass("ind-circ-off");
		$(".title").addClass("title-on");
		$(".indicator").addClass("on");
		moveTitle(20);
		moveCircFill(0);
	}
	if(current != getIndex($(this).index())){
		current = getIndex($(this).index());
		moveIndicator(calcTopList(current));
		moveIndicatorCirc(calcTopCirc(current));
		moveIdItems(calcTopId(current));
	}
})

function moveTitle(t){
	anime({
		targets: '#title-1',
		top: t,
		duration: 200,
		easing: 'easeInOutSine',
	})
}

function moveCircFill(t){
	anime({
		targets: '.circ-fill',
		top: t,
		duration: 400,
		easing: 'easeInOutSine',
	})
}

function moveIdItems(t, d=800){
	anime({
		targets: '.id-selector',
		top: t,
		duration: d,
		easing: 'spring(0.5, 80, 12, 0)',
	})
}

function moveIndicatorCirc(t, d=800){
	anime({
		targets: '.indicator-circle',
		top: t,
		duration: d,
		easing: 'spring(1, 80, 12, 0)',
		//cubicBezier(.5,0,.17,1.03)
	})
}

function moveIndicator(t, d=800){
	anime({
		targets: '.indicator',
		top: t,
		duration: d,
		easing: 'spring(1, 80, 12, 0)',
		//cubicBezier(.5,0,.17,1.03)
	})
}

function calcTopCirc(i){
	if(i==0){
		return 108;
	}
	else{
		return (distance_li*i)+108;
	}
}

function calcTopList(i){
	if(i==0){
		return li_default;
	}
	else{
		return (distance_li*i)+li_default;
	}
}

function calcTopId(i){
	if(i==0){
		return id_default;
	}
	else{
		return (distance_id*i)+id_default;
	}
}

function getIndex(i){
	return i = ((i+1)/2)-1;
}

(function ($) {
    "use strict";


     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);