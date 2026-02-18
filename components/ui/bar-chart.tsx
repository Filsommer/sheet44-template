import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";

const dataExample = [
  { key: "Jan 2020", values: [11.1, 9.5] },
  { key: "Feb 2020", values: [18.3, 16.7] },
  { key: "Mar 2020", values: [25.1, 19.5] },
  { key: "Apr 2020", values: [35.5, 24.9] },
  { key: "May 2020", values: [31.7, 28.1] },
  { key: "Jun 2020", values: [25.8, 20.2] },
  { key: "Jul 2020", values: [15.8, 10.2] },
  { key: "Aug 2020", values: [24.8, 17.2] },
  { key: "Sep 2020", values: [32.5, 23.9] },
  { key: "Oct 2020", values: [36.7, 27.1] },
  { key: "Nov 2020", values: [34.7, 28.1] },
  { key: "Dec 2020", values: [42.7, 33.1] },
  { key: "Jan 2021", values: [39.7, 36.1] },
];

const PX_BETWEEN_BARS = 5;

export function BarChartMultiVertical() {
  const data = dataExample;
  const numBars = data[0].values.length; // Get the number of bars

  // Upkey scales
  const xScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.4);

  const yScale = scaleLinear()
    .domain([0, max(data.flatMap((d) => d.values)) ?? 0])
    .range([100, 0]);

  // Generate an array of colors for the bars
  const colors = ["bg-[#0EB12E]", "bg-lime-300 dark:bg-lime-900 border border-primary/20"];

  return (
    <div
      className="relative h-32 w-full grid"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "25px",
          "--marginBottom": "55px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <div className="relative w-full h-full">
          {/* Bars */}
          {data.map((d, index) => (
            <div
              key={index}
              className="absolute top-0"
              style={{
                left: `${xScale(d.key)}%`,
                width: `${xScale.bandwidth()}%`,
                height: "100%",
              }}
            >
              {d.values.map((value, barIndex) => {
                const barHeight = 100 - yScale(value);
                const barWidth = (100 - PX_BETWEEN_BARS * (numBars - 1)) / numBars;
                const barXPosition = barIndex * (barWidth + PX_BETWEEN_BARS);

                return (
                  <div
                    key={barIndex}
                    className={`absolute bottom-0 rounded-t ${colors[barIndex % colors.length]}`}
                    style={
                      {
                        left: `${barXPosition}%`,
                        width: `${barWidth}%`,
                        height: `${barHeight}%`,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
