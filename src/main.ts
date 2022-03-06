import './style.css';

import { randomFinancial, randomSkipWeekends } from '@d3fc/d3fc-random-data';
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

const generator = randomFinancial()
    .startDate(new Date(2016, 0, 1))
    .startPrice(100)
    .filter(randomSkipWeekends);

const data = generator(100).map((d, i) => ({...d, bar: i}));
const [xMin, xMax] = extent(data.map(d => d.bar));
const [yMin, yMax] = extent(data.map(d => d.close));

const app = document.querySelector<HTMLDivElement>('#app');

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>('#canvas');
const context = canvas.getContext('2d');

const xScale = scaleLinear()
  .domain([xMin, xMax])
  .range([0, 400]);
const yScale = scaleLinear()
  .domain([yMin, yMax])
  .range([0, 400]);

if (context) {

}
function drawLine(context: CanvasRenderingContext2D, data: any) {
  context.moveTo(0,0);
  context.beginPath();
  for (const point of data) {
    context.lineTo(xScale(point.bar), yScale(point.close));
  }
  context.closePath();
  context.stroke();
}

