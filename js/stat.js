'use strict';

window.renderStatistics = function (ctx, names, times) {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(100, 10, 420, 270);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура, вы победили!', 140, 40);
    ctx.fillText('Список результатов:', 140, 60);

    var max = -1;

    for (var i = 0; i < times.length; i++) {
        if (times[i] > max) {
            max = times[i];
        }
    }

    var barHeight = 150;
    var barWirdth = 40;
    var indent = 50;
    var randOpacity = 1;
    var step = barHeight / max;

    for(var i = 0; i < times.length; i++) {
        if (names[i] === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        } else {
            randOpacity = Math.ceil(Math.random() * 10) / 10;
            ctx.fillStyle = 'rgba(0, 0, 255, ' + randOpacity + ')';
        }

        var barHeightAdj = step * times[i];
        ctx.fillRect(140 + (barWirdth + indent) * i, 245 - barHeightAdj, barWirdth, barHeightAdj);

        ctx.fillStyle = '#000000'
        ctx.fillText(times[i].toFixed(0), 140 + (barWirdth + indent) * i, 240 - barHeightAdj);
        ctx.fillText(names[i], 140 + (barWirdth + indent) * i, 265);
    }
}