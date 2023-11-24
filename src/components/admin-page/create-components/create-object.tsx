// "use client";

// import { type useMutation } from "@tanstack/react-query";
// import {
//   AnyMutationProcedure,
//   BuildProcedure,
//   ProcedureType,
//   RootConfig,
// } from "@trpc/server";
// import { useRouter } from "next/navigation";
// import { api } from "~/trpc/react";

// type GenericMutation<TData> = {
//   useMutation: (options: { onSuccess: () => void }) => {
//     mutate: (input: TData) => void;
//   };
// };

// type CreateObjectButtonProps<T> = {
//   // endpoint: GenericMutation<T>;
//   model: "cardset" | "question" | "flashcard" | "category";
//   // mutationFunction: typeof useMutation<unknown, unknown, T>;
//   buttonText: string;
//   defaultObject: T;
// };

// export default function CreateObjectButton<T>(
//   props: CreateObjectButtonProps<T>,
// ) {
//   const { model, buttonText, defaultObject } = props;

//   const router = useRouter();

//   // const createCardSet = api.cardset.create.useMutation({
//   const createCardSet = api[model].create.useMutation({
//     // const createCardSet = endpoint.useMutation({
//     // const createCardSet = mutationFunction({
//     onSuccess: () => {
//       router.refresh();
//     },
//   });

//   const createDraftCardSet = () =>
//     // createCardSet.mutate({ name: "New card set" });
//     createCardSet.mutate(
//       defaultObject as unknown as Pick<
//         Parameters<createCardSet.mutate>,
//         "variables"
//       >,
//     );

//   return (
//     <button
//       onClick={createDraftCardSet}
//       className="h-12 w-full rounded-md bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
//     >
//       {/* Create a card set */}
//       {buttonText}
//     </button>
//   );
// }
