"use client";

import { TallyCounters } from "./tally-counters";

export function Card(props: { count?: number; width?: number }) {
  const { count, width = 4 } = props;
  const fullTallies = Math.floor(count / 5);
  const remTallies = count - fullTallies * 5;

  console.log({ fullTallies, remTallies });

  return (
    <div className="rounded-lg bg-white p-1 shadow-lg">
      <div className="box-border flex h-64 w-96 flex-col items-center gap-2 rounded-md bg-emerald-300 p-4 text-center text-slate-800">
        <h2 className="text-xl font-semibold">Test Card</h2>
        <div className="flex flex-1 flex-col justify-center">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum nemo
            sed mollitia esse quam labore perferendis tempora obcaecati
            voluptatem ipsa fugiat quos totam, dicta, dignissimos natus. Dolorum
            est fugiat esse!
          </p>
        </div>
        <div>
          <TallyCounters count={13} />
        </div>
      </div>
    </div>
  );
}
