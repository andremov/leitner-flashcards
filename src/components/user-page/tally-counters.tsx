"use client";

import { Tally1, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";

function TallyIcon({
  count,
  width,
  height,
}: {
  count: number;
  width?: number;
  height?: number;
}) {
  switch (count) {
    case 1:
      return <Tally1 width={width} height={height} />;
    case 2:
      return <Tally2 width={width} height={height} />;
    case 3:
      return <Tally3 width={width} height={height} />;
    case 4:
      return <Tally4 width={width} height={height} />;
    case 5:
      return <Tally5 width={width} height={height} />;
    default:
      return <></>;
  }
}

export function TallyCounters(props: {
  height?: number;
  width?: number;
  count: number;
  reverse?: boolean;
}) {
  const { count, reverse, width, height } = props;
  const fullTallies = Math.floor(count / 5);
  const remTallies = count - fullTallies * 5;

  if (count === 0) return <span>0</span>;
  return (
    <span className={`flex gap-0.5 ${reverse ? "flex-row-reverse" : ""}`}>
      {[...Array(fullTallies).keys()].map((item) => (
        <TallyIcon width={width} height={height} count={5} key={item} />
      ))}
      <div style={reverse ? { transform: "rotateY(180deg)" } : {}}>
        <TallyIcon width={width} height={height} count={remTallies} />
      </div>
    </span>
  );
}
