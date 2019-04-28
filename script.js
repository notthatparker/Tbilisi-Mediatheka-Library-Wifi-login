var user, pass;

//Muesta o oculta el Div de informacion
function divshow(text, showOrHide) {
  $('.update').html(text + "<button type='button' class='close' onclick='divshow(\" \",false);'>×</button>");
  if(!$('.update').is(":visible")){
    $('.update').toggle("slow","swing");
	}
  if(!showOrHide){
    $('.update').toggle("slow","swing");
  }
}

//funcion para validar y iniciar Sesion
function iniciarSesion() {
    
    user = $('input:text').val();
    pass = $('input:password').val();
 
    if (user.length > 0 && pass.length > 0) {
       event.preventDefault();
       divshow('ok', true);
     
     }
}
var Index = {
    gradient: {
        colors: new Array(
                [0, 242, 254],
                [79, 172, 255],
                [56, 249, 215],
                [67, 233, 123],
                [48, 79, 254],
                [33, 212, 253],
                [183, 33, 255],
          [255, 23, 68],
        [233, 30, 99]),
        gradientSpeed: 0.002,
        intervalId: null,
        start: function () {
            var colors = this.colors;
            var gradientSpeed = this.gradientSpeed;
            var colorIndexes = [0, 1, 2, 3];
            var step = 0;
            if (!this.intervalId) {
                this.intervalId = setInterval(function () {
                    if ($ === undefined) {
                        return;
                    }
                    var c0_0 = colors[colorIndexes[0]];
                    var c0_1 = colors[colorIndexes[1]];
                    var c1_0 = colors[colorIndexes[2]];
                    var c1_1 = colors[colorIndexes[3]];
                    var istep = 1 - step;
                    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                    var color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
                    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                    var color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
                    $('body').css({
                        background: '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))'
                    }).css({
                        background: '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'
                    });
                    step += gradientSpeed;
                    if (step >= 1) {
                        step %= 1;
                        colorIndexes[0] = colorIndexes[1];
                        colorIndexes[2] = colorIndexes[3];
                        colorIndexes[1] = (colorIndexes[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                        colorIndexes[3] = (colorIndexes[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                    }
                    //clearInterval(Index.gradient.intervalId);
                }, 10);
            }
        }
    },
    demandWordTranslation: function (word, successCallback, errorCallback) {
        var sendInfo = {word: word};
        $.ajax({
            type: 'POST',
            url: website + '/notification/insert',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(sendInfo),
            success: function (response) {
                if (response.status == 'ok') {
                    successCallback();
                } else {
                    errorCallback();
                }
            },
            error: function () {
                errorCallback();
            }
        });
    }
};
$(document).ready(function () {
    $.ajaxPrefilter(function (options) {
        options.beforeSend = function (xhr) {
            
        };
    });
    Index.gradient.start();
    $('#switcher-checkbox').change(function () {
        var checked = $(this).get(0).checked;
        var form = $(this).parents('form');
        var action = form.attr('action');
        var searchResult = form.find('.translate-result');
        var searchInput = form.find('.translate-input input');
        if (checked) {
            action = action.replace('en', 'ge');
            searchInput.attr('placeholder', 'ჩაწერეთ სიტყვა...');
        } else {
            action = action.replace('ge', 'en');
            searchInput.attr('placeholder', 'Type a word...');
        }
        searchResult.empty();
        searchInput.val('').focus();
        form.attr('action', action);
    });
    $('#translate-no-result button').click(function () {
        var searchInput = $('.translate-input input');
        var searchInputVal = searchInput.val().trim();
        if (searchInputVal) {
            var button = $(this);
            var buttonIcon = button.find('i');
            var infoText = button.prev('p');
            buttonIcon.removeClass('fa-share-square-o')
                    .addClass('fa-spinner');
            Index.demandWordTranslation(searchInputVal, function () {
                button.remove();
                infoText.html('<i class="fa fa-check" aria-hidden="true" style="color: green;"></i>  მოთხოვნა გაიგზავნა');
                window.setTimeout(function () {
                    infoText.slideUp(function () {
                        $(this).remove();
                        searchInput.val('').focus();
                    });
                }, 1000);
            }, function () {
                buttonIcon.removeClass('fa-spinner')
                        .addClass('fa-share-square-o');
                infoText.text('მოთხოვნის გაგზავნა ვერ მოხერხდა');
            });
        }
    });
});

