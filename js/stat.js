'use strict';

window.renderStatistics = function (ctx, names, times) {
  var top = 20;
  var left = 100;

  drawCloudShadow(ctx, left, top);
  drawCloud(ctx, left, top);
  printCongrats(ctx);
  drawBarChart(ctx, names, times);
};

function drawCloudShadow(ctx, left, top) {
  var shadowShift = 10;
  drawCloudShape(ctx, left + shadowShift, top + shadowShift, 'rgba(0, 0, 0, 0.7)');
}

function drawCloud(ctx, left, top) {
  drawCloudShape(ctx, left, top, 'rgb(255, 255, 255)');
}

function drawCloudShape(ctx, left, top, color) {
  var width = 420;
  var height = 270;
  ctx.fillStyle = color;
  ctx.fillRect(left, top, width, height);
}

function printCongrats(ctx) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура, вы победили!', 140, 40);
}

function drawBarChart(ctx, names, times) {
  var left = 140;
  var barTop = 245;
  var timeTop = 240;
  var labelNameTop = 265;
  var barHeightMax = 150;
  var barHeight = 150;
  var barWirdth = 40;
  var indent = 50;
  var maxTime = findMaxTime(times);
  var step = barHeightMax / maxTime;

  // Add chart's title
  ctx.fillText('Список результатов:', left, 60);

  // Add chart's bars
  for (var i = 0; i < times.length; i++) {

    // Draw a bar
    pickBarColor(ctx, names[i]);
    barHeight = step * times[i];
    ctx.fillRect(left + (barWirdth + indent) * i, barTop - barHeight, barWirdth, barHeight);

    // Add bar labels
    ctx.fillStyle = '#000000';
    ctx.fillText(times[i].toFixed(0), left + (barWirdth + indent) * i, timeTop - barHeight);
    ctx.fillText(names[i], left + (barWirdth + indent) * i, labelNameTop);
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
