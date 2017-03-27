'use strict';

window.renderStatistics = function (ctx, names, times) {
    drawCloudShadow(ctx);
    drawCloud(ctx);
    printCongrats(ctx);
    drawBarChart(ctx, names, times);
};

function drawCloudShadow(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
}

function drawCloud(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(100, 10, 420, 270);
}

function printCongrats(ctx) {
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура, вы победили!', 140, 40);
}

function drawBarChart(ctx, names, times) {
    var barHeightMax = 150;
    var barHeight = 150;
    var barWirdth = 40;
    var indent = 50;
    var maxTime = findMaxTime(times);
    var step = barHeightMax / maxTime;

    //Add chart's title
    ctx.fillText('Список результатов:', 140, 60);

    //Add chart's bars
    for(var i = 0; i < times.length; i++) {

        //Draw a bar
        pickBarColor(ctx, names[i]);
        barHeight = step * times[i];
        ctx.fillRect(140 + (barWirdth + indent) * i, 245 - barHeight, barWirdth, barHeight);

        //Add bar labels
        ctx.fillStyle = '#000000';
        ctx.fillText(times[i].toFixed(0), 140 + (barWirdth + indent) * i, 240 - barHeight);
        ctx.fillText(names[i], 140 + (barWirdth + indent) * i, 265);
    }
}

function findMaxTime(times) {
    var max = -1;

    for (var i = 0; i < times.length; i++) {
        if (times[i] > max) {
            max = times[i];
        }
    }

    return max;
}

function pickBarColor(ctx, name) {
    var randOpacity = 1;

    if (name === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
        randOpacity = Math.ceil(Math.random() * 10) / 10;
        ctx.fillStyle = 'rgba(0, 0, 255, ' + randOpacity + ')';
    }
}