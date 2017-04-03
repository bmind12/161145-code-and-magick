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
  var chartLeftMargin = 140;
  var chartTopMargin = 105;
  var barWidth = 40;
  var barHeight = 150;
  var maxTime = findMaxTime(times);
  var step = barHeight / maxTime;
  var indent = 50;

  addChartTitle(ctx, chartLeftMargin, chartTopMargin);

  for (var i = 0; i < times.length; i++) {

    var barColor = pickBarColor(ctx, names[i]);
    var currentBarHeight = (step * times[i]);
    var x = (barWidth + indent) * i;
    var y = barHeight - currentBarHeight;

    drawBar(ctx, x, y, chartLeftMargin, chartTopMargin, barWidth, currentBarHeight, barColor);
    addBarLabels(ctx, x, y, chartLeftMargin, chartTopMargin, currentBarHeight, names[i], times[i].toFixed());
  }
}

function addChartTitle(ctx, leftMargin, topMargin) {
  var title = 'Список результатов:';
  var topPadding = -40;

  ctx.fillText(title, leftMargin, topMargin + topPadding);
}

function drawBar(ctx, x, y, leftMargin, topMargin, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x + leftMargin, y + topMargin, width, height);
}

function addBarLabels(ctx, x, y, leftMargin, topMargin, gap, name, time) {
  var timeLabelPadding = -7;
  var nameLabelPadding = 20;

  ctx.fillStyle = '#000000';
  ctx.fillText(time, x + leftMargin, y + timeLabelPadding + topMargin);
  ctx.fillText(name, x + leftMargin, y + gap + nameLabelPadding + topMargin);
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
  var color;

  if (name === 'Вы') {
    color = 'rgba(255, 0, 0, 1)';
  } else {
    randOpacity = Math.ceil(Math.random() * 10) / 10;
    color = 'rgba(0, 0, 255, ' + randOpacity + ')';
  }

  return color;
}
