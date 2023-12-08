import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";

type SimpleViewProps = {
  name: string;
  id: string;
  baseUrl: string;
  selection?: string;
  hasChildren?: boolean;
  activeColor: string;
  inactiveColor: string;
  dotColor?: string;
};

export default function SimpleView(props: SimpleViewProps) {
  const {
    name,
    id,
    baseUrl,
    selection,
    hasChildren,
    activeColor,
    inactiveColor,
    dotColor,
  } = props;

  return (
    <div
      className={`rounded-md px-4 py-2 transition ${
        selection === id ? activeColor : inactiveColor
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {dotColor && (
            <div className={`${dotColor} h-3 w-3 rounded-full`}></div>
          )}
          <span>{name}</span>
        </div>
        <div className="flex gap-2">
          {hasChildren && (
            <Link
              href={`${baseUrl}${id}`}
              className="w-6 rounded-sm transition hover:bg-black/20"
            >
              <ExternalLink className="mx-auto w-5" />
            </Link>
          )}
          <Link
            href={`${baseUrl}${id}/edit`}
            className="w-6 rounded-sm transition hover:bg-black/20"
          >
            <Pencil className="mx-auto w-5" />
          </Link>
          <Link
            href={`${baseUrl}${id}/delete`}
            className="w-6 rounded-sm transition hover:bg-red-400"
          >
            <Trash className="mx-auto w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
