    window.addEvent('domready', function () {
        // с помощью Мутулз выберем первый елемент канвас на странице
        var elem = $$('canvas')[0];
        // На его основе создадим елемент LibCanvas
        var libcanvas = new LibCanvas.Canvas2D(elem);
        // Перерисовка будет осуществлятся каждый кадр, несмотря на наличие или отсутствие изменений
        libcanvas.autoUpdate = true;
        // Будем стремится к 60 fps
        libcanvas.fps        = 60;
		    libcanvas.listenMouse();

    var player = new Player().setZIndex(30);
    libcanvas.addElement(player);

        // Стартуем наше приложение
        libcanvas.start();
    });