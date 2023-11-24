import { ExternalLink, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function SimpleView(props: {
  name: string;
  id: string;
  baseUrl: string;
  selection?: string;
  hasChildren?: boolean;
  activeColor: string;
  inactiveColor: string;
}) {
  const {
    name,
    id,
    baseUrl,
    selection,
    hasChildren,
    activeColor,
    inactiveColor,
  } = props;

  return (
    <div
      className={`rounded-md px-4 py-2 transition ${
        selection === id ? activeColor : inactiveColor
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{name}</span>
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