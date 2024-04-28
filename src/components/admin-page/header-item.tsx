import clsx from "clsx";

type HeaderItemProps = {
  children: string;
  isActive?: boolean;
  onClick: () => void;
};

export function HeaderItem(props: HeaderItemProps) {
  const { children: label, isActive, onClick } = props;

  return (
    <div
      className={clsx([
        "flex-1 cursor-pointer rounded-md bg-slate-200 p-2 transition hover:bg-slate-300",
        {
          "bg-slate-600 text-white hover:bg-slate-700": isActive,
        },
      ])}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
