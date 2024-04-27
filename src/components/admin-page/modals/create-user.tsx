"use client";

import { useRouter } from "next/navigation";
import { UserPlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";

const colors = [
  { bg: "bg-red-500", name: "red", soft: "bg-red-300" },
  { bg: "bg-orange-500", name: "orange", soft: "bg-orange-300" },
  { bg: "bg-amber-500", name: "amber", soft: "bg-amber-300" },
  { bg: "bg-yellow-500", name: "yellow", soft: "bg-yellow-300" },
  { bg: "bg-lime-500", name: "lime", soft: "bg-lime-300" },
  { bg: "bg-green-500", name: "green", soft: "bg-green-300" },
  { bg: "bg-emerald-500", name: "emerald", soft: "bg-emerald-300" },
  { bg: "bg-teal-500", name: "teal", soft: "bg-teal-300" },
  { bg: "bg-cyan-500", name: "cyan", soft: "bg-cyan-300" },
  { bg: "bg-sky-500", name: "sky", soft: "bg-sky-300" },
  { bg: "bg-blue-500", name: "blue", soft: "bg-blue-300" },
  { bg: "bg-indigo-500", name: "indigo", soft: "bg-indigo-300" },
  { bg: "bg-violet-500", name: "violet", soft: "bg-violet-300" },
  { bg: "bg-purple-500", name: "purple", soft: "bg-purple-300" },
  { bg: "bg-fuchsia-500", name: "fuchsia", soft: "bg-fuchsia-300" },
  { bg: "bg-pink-500", name: "pink", soft: "bg-pink-300" },
  { bg: "bg-rose-500", name: "rose", soft: "bg-rose-300" },
  { bg: "bg-slate-500", name: "slate", soft: "bg-slate-300" },
];

export function CreateUserModal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [color, setColor] = useState("slate");
  const { setActiveModal } = useAdminStore();

  function handleNameChange(newValue: string) {
    setName(newValue.slice(0, 1).toLocaleUpperCase() + newValue.slice(1));
  }

  function handleColorChange(newValue: string) {
    setColor(newValue);
  }

  function closeModal() {
    setActiveModal(AdminModal.NONE);
  }

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser.mutate({
          name,
          color,
        });
      }}
      className={`flex w-80 flex-col gap-4 rounded-lg bg-white p-4 shadow-2xl`}
    >
      <div className="flex gap-4 border-b-2 py-1">
        <UserPlusIcon width={25} height={25} />
        <span className="text-xl">New user</span>
      </div>

      <div className="flex flex-col">
        <label className="px-2 text-sm text-slate-600">User Name</label>
        <input
          className="border-1 rounded-md border px-2 py-1 outline-none focus:border-blue-400"
          value={name}
          placeholder="Andres"
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-2 text-sm text-slate-600">User Color</label>
        <div className="mx-auto flex w-72 flex-wrap justify-center gap-1">
          {colors.map((color) => (
            <input
              key={color.name}
              type="button"
              onClick={() => handleColorChange(color.name)}
              className={`h-7 w-7 cursor-pointer rounded-md border-2 border-black/40 ${color.bg}`}
            />
          ))}
        </div>
        <div
          className={`h-8 w-full rounded-md border-2 border-black/40 bg-${color}-500`}
        />
      </div>

      <div className="mt-2 flex w-full content-center items-center gap-2">
        <button
          type="submit"
          className="h-12 flex-1 rounded-lg bg-green-400 font-semibold text-white transition hover:bg-green-500 active:bg-green-600 disabled:bg-slate-500"
          disabled={createUser.isLoading}
        >
          {createUser.isLoading ? "Creating..." : "Create"}
        </button>

        <button
          type="button"
          className="h-12 w-12 rounded-lg bg-red-400 font-semibold text-white transition hover:bg-red-500 active:bg-red-600 disabled:bg-slate-500"
          disabled={createUser.isLoading}
          onClick={closeModal}
        >
          <XIcon className="mx-auto" />
        </button>
      </div>
    </form>
  );
}
