$(function () {
    $("html").click(function (e) {
        var x = e.pageX,
            y = e.pageY;
        // var lumos = $("<img class='lumos' src='https://static.igem.wiki/teams/4249/wiki/global/lumos.png'/>");
        var halation = $("<img class='halation' src='https://static.igem.wiki/teams/4249/wiki/global/halation.png' alt=''/>");
        // lumos.css({
        //     "top": y,
        //     "left": x
        // });
        halation.css({
            "top": y,
            "left": x
        })
        $("body").append(halation);
        // $("body").append(lumos);
        halation.animate({
                "width": "200px",
                "opacity": 0
            },
            500,
            function () {
                halation.remove();
            });
        // lumos.animate({
        //         "opacity": 0.8
        //     },
        //     750,
        //     function () {
        //         lumos.animate({
        //                 "top": y + 100,
        //                 "opacity": 0
        //             },
        //             1500,
        //             function () {
        //                 lumos.remove();
        //             });
        //     });
    });

    // toTop
    let top = document.querySelector('.top-img');
    window.onscroll = function () {
        let high = document.documentElement.scrollTop || document.body.scrollTop;
        if (high >= 400) {
            top.style.display = 'block';
        } else {
            top.style.display = 'none';
        }
    };
    top.addEventListener('click', () => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
    });

    // description
    const descriptionTitles = $('.description-title');
    const descriptionContent = $('.description-content');
    for (let i = 0; i < 4; i++) {
        const title = descriptionTitles[i];
        const content = descriptionContent[i];
        $(title).click(function () {
            $('html, body').animate({
                scrollTop: $(content).offset().top - 60
            }, 200)
        })
    }

    // index
    $('#scene').parallax();
    const indexLower = $('.index-lower-container');
    const indexUpper = $('.index-upper-container');
    $(window).scroll(function () {
        console.log($(indexUpper).offset().top)
        console.log($(indexUpper).css('top'))
        console.log($(window).scrollTop())
        $(indexUpper).css({
            top: $(window).scrollTop() + 'px'
        })
    })
    luxy.init({
        wrapper: '#luxy',
        targets: '.luxy-el',
        wrapperSpeed: 0.08
    });
    // education


    // collaborations
    let collaborationsTitles = $('.collaborations-title');
    let collaborationsContent = $('.collaborations-content');
    for (let i = 0; i < collaborationsTitles.length; i++) {
        let title = collaborationsTitles[i];
        let content = collaborationsContent[i];
        $(title).children('span').click(function () {
            for (let i = 0; i < collaborationsTitles.length; i++) {
                $(collaborationsTitles[i]).children('span').siblings('.collaborations-title-mark').animate({
                    width: 0
                }, 200)
            }
            $('html, body').animate({
                scrollTop: $(content).offset().top - 60,
            }, 200);
            $(this).siblings('.collaborations-title-mark').css({
                maxWidth: $(this).width()
            })
            $(this).siblings('.collaborations-title-mark').animate({
                width: '100%'
            }, 300)
        })
    }
    $('.collaborations-title > span').click(function () {
        $(this).siblings('ul').slideToggle()
    })

    // communication
    let communicationTitles = $('.communication-title');
    let communicationContent = $('.communication-content');
    for (let i = 0; i < communicationTitles.length; i++) {
        let title = communicationTitles[i];
        let content = communicationContent[i];
        $(title).children('span').click(function () {
            for (let i = 0; i < communicationTitles.length; i++) {
                $(communicationTitles[i]).children('span').siblings('.communication-title-mark').animate({
                    width: 0
                }, 200)
            }
            $('html, body').animate({
                scrollTop: $(content).offset().top - 60,
            }, 200);
            $(this).siblings('.communication-title-mark').css({
                maxWidth: $(this).width()
            })
            $(this).siblings('.communication-title-mark').animate({
                width: '100%'
            }, 300)
        })
    }
})
