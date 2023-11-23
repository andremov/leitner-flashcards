import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { TallyCounters } from "./_components/tally-counters";
import { Card } from "./_components/card";
import ListCards from "./_components/list-components/list-cardsets";

export default async function Home() {
  // const hello = await api.question.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-slate-950">
      <div className="container flex min-h-screen flex-col items-center justify-between gap-12 px-4 py-4 ">
        <div className="container flex h-28 items-center justify-center rounded-lg bg-slate-900 p-4 text-white">
          {/* <div></div> */}
          <h1 className="text-5xl font-extrabold ">Tarjetas</h1>
          {/* <button className="box-border rounded-lg bg-white p-1 pb-3 text-4xl text-white transition-all hover:pb-2 active:pb-1">
            <div className="h-12 w-12 rounded-md  bg-emerald-600">+</div>
          </button> */}
        </div>

        <Card />

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div> */}
        <ListCards />
        {/* <CrudShowcase /> */}
        <div></div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.category.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
