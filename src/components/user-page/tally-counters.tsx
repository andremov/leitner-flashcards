"use client";

import { Tally1, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";

function TallyIcon({ count, size }: { count: number; size: number }) {
  switch (count) {
    case 1:
      return <Tally1 width={size} height={size} />;
    case 2:
      return <Tally2 width={size} height={size} />;
    case 3:
      return <Tally3 width={size} height={size} />;
    case 4:
      return <Tally4 width={size} height={size} />;
    case 5:
      return <Tally5 width={size} height={size} />;
    default:
      return <></>;
  }
}

export function TallyCounters(props: {
  size: number;
  count: number;
  reverse?: boolean;
}) {
  const { count, reverse, size } = props;
  const fullTallies = Math.floor(count / 5);
  const remTallies = count - fullTallies * 5;

  if (count === 0) return <span>0</span>;
  if (count > 10) return <span>{count}</span>;
  return (
    <span className={`flex gap-0.5 ${reverse ? "flex-row-reverse" : ""}`}>
      {[...Array(fullTallies).keys()].map((item) => (
        <TallyIcon size={size} count={5} key={item} />
      ))}
      <div style={reverse ? { transform: "rotateY(180deg)" } : {}}>
        <TallyIcon size={size} count={remTallies} />
      </div>
    </span>
  );
}
