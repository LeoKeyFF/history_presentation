// ============================================
// script.js — единый файл для всех страниц
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // ВРАЩЕНИЕ КНОПОК ПО ЭЛЛИПСУ (главная страница)
    // ============================================
    var orbitContainer = document.querySelector('.orbit-container');
    var buttons = document.querySelectorAll('.orbit-button');
    var rafId = null;
    var t = 0;                 // текущий сдвиг угла (рад)
    var speed = 0.003;         // скорость, рад/кадр

    function layoutEllipse() {
        if (!orbitContainer || buttons.length === 0) return;

        var rect = orbitContainer.getBoundingClientRect();
        var a = rect.width / 2;    // полуось по X
        var b = rect.height / 2;   // полуось по Y
        var cx = a;                // центр контейнера в его координатах
        var cy = b;

        var n = buttons.length;

        for (var i = 0; i < n; i++) {
            var theta = (i * 2 * Math.PI) / n + t;
            var x = cx + a * Math.cos(theta);
            var y = cy + b * Math.sin(theta);

            buttons[i].style.left = x + 'px';
            buttons[i].style.top = y + 'px';
        }
    }

    function animateEllipse() {
        t += speed;
        if (t >= Math.PI * 2) t -= Math.PI * 2;
        layoutEllipse();
        rafId = requestAnimationFrame(animateEllipse);
    }

    function startOrbit() {
        if (orbitContainer && buttons.length && rafId === null) {
            layoutEllipse();
            rafId = requestAnimationFrame(animateEllipse);
        }
    }

    function stopOrbit() {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    window.addEventListener('resize', function () {
        layoutEllipse();
    });

    startOrbit();

    $(window).on('pageshow', function (e) {
        if (e.originalEvent && e.originalEvent.persisted) {
            stopOrbit();
            startOrbit();
        }
    });

    $(window).on('pagehide', function () {
        stopOrbit();
    });


    // ============================================
    // АККОРДЕОН
    // ============================================
    $(document).on('click', '.accordion-toggle', function () {
        var toggle = $(this);
        var content = toggle.next('.accordion-content');

        if (content.hasClass('is-open')) {
            content.slideUp(300).removeClass('is-open');
            toggle.text('Раскрыть текст');
        } else {
            content.slideDown(300).addClass('is-open');
            toggle.text('Скрыть текст');
        }
    });


    // ============================================
    // СЛАЙДЕР
    // ============================================
    var slides = $('.slide');
    var currentSlide = 0;

    if (slides.length) {
        function showSlide(index) {
            slides.hide();
            slides.eq(index).show();
        }

        showSlide(currentSlide);

        $('.slider-next').on('click', function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        $('.slider-prev').on('click', function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

});

// ============================================
// FULLSCREEN API
// ============================================
var fsBtn = document.getElementById('fullscreenBtn');

if (fsBtn) {
    fsBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
            // Войти в полноэкранный режим
            document.documentElement.requestFullscreen().catch(function (err) {
                console.warn('Fullscreen не сработал:', err);
            });
        } else {
            // Выйти
            document.exitFullscreen();
        }
    });

    // Меняем текст кнопки при входе/выходе
    document.addEventListener('fullscreenchange', function () {
        if (document.fullscreenElement) {
            fsBtn.textContent = '✕ Выйти из полного экрана';
        } else {
            fsBtn.textContent = '⛶ На весь экран';
        }
    });
}