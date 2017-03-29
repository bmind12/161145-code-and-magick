'use strict';

window.renderStatistics = function (ctx, names, times) {
  var topCloudPosition = 20;
  var leftCloudPosition = 100;

  drawCloudShadow(ctx, leftCloudPosition, topCloudPosition);
  drawCloud(ctx, leftCloudPosition, topCloudPosition);
  printCongrats(ctx);
  drawBarChart(ctx, names, times);
};

function drawCloudShadow(ctx, leftCloudPosition, topCloudPosition) {
  var shadowShift = 10;
  var shadowColor = 'rgba(0, 0, 0, 0.7)';

  drawCloudShape(ctx, leftCloudPosition + shadowShift, topCloudPosition + shadowShift, shadowColor);
}

function drawCloud(ctx, leftCloudPosition, topCloudPosition) {
  var cloudColor = 'rgb(255, 255, 255)';

  drawCloudShape(ctx, leftCloudPosition, topCloudPosition, cloudColor);
}

function drawCloudShape(ctx, leftCloudPosition, topCloudPosition, color) {
  var width = 420;
  var height = 270;

  ctx.fillStyle = color;
  ctx.fillRect(leftCloudPosition, topCloudPosition, width, height);
}

function printCongrats(ctx) {
  var congratsFont = '16px PT Mono';
  var congratsColor = '#000000';
  var congratsText = 'Ура, вы победили!';
  var congratsTopPosition = 40;
  var congratsLeftPosition = 140;

  ctx.font = congratsFont;
  ctx.fillStyle = congratsColor;
  ctx.fillText(congratsText, congratsLeftPosition, congratsTopPosition);
}

function drawBarChart(ctx, names, times) {
  var x = 140;
  var y = 70;
  var barWidth = 40;
  var barHeight = 150;
  var barHeightMax = 150;
  var maxTime = findMaxTime(times);
  var barHeightStep = barHeightMax / maxTime;
  var yIndent = 10;
  var xIndent = 50;

  addChartTitle(ctx, x, y);

  for (var i = 0; i < times.length; i++) {

    x = 140;
    y = 90;

    x = addPadding(x, (barWidth + xIndent) * i);
    barHeight = barHeightStep * times[i];

    y = addPadding(y, yIndent + barHeightMax - barHeight);
    addBarLabel(ctx, times[i].toFixed(), x, y);

    y = addPadding(y, yIndent);
    pickBarColor(ctx, names[i]);
    drawBar(ctx, x, y, barWidth, barHeight);

    y = addPadding(y, barHeight + yIndent * 2);
    addBarLabel(ctx, names[i], x, y);
  }
}

function addChartTitle(ctx, x, y) {
  var title = 'Список результатов:';
  ctx.fillText(title, x, y);
}

function drawBar(ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
}

function addBarLabel(ctx, text, x, y) {
  ctx.fillStyle = '#000000';
  ctx.fillText(text, x, y);
}

function addPadding(x, padding) {
  x += padding;
  return x;
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
