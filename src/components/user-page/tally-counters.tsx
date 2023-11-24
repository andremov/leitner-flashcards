"use client";

import Image from "next/image";

export function TallyCounters(props: { count: number }) {
  const { count } = props;
  const fullTallies = Math.floor(count / 5);
  const remTallies = count - fullTallies * 5;

  const width = 2;
  if (count === 0) return <span>0</span>;
  return (
    <span className="flex gap-2 opacity-40">
      {[...Array(fullTallies).keys()].map((item) => (
        <Image
          key={item}
          src={"./tally5.svg"}
          alt={"5"}
          width={width * 10}
          height={0}
        />
      ))}
      <span className="flex gap-0.5">
        {[...Array(remTallies).keys()].map((item) => (
          <Image
            key={item}
            src={"./tally1.svg"}
            alt={"5"}
            width={width}
            height={0}
          />
        ))}
      </span>
    </span>
  );
}
