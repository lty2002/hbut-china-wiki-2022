$(function () {
    $("html").click(function (e) {
        var x = e.pageX, y = e.pageY;
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

    // index
    $('#scene').parallax();
})
