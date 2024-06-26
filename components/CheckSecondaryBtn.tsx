"use client";
import { Tooltip } from "@nextui-org/react";
export default function CheckSecondaryBtn({
  label,
  onClick,
  loading,
  active,
  tooltip,
}: {
  label: string;
  onClick: (...args: any[]) => void;
  loading?: boolean;
  active: boolean;
  tooltip?: string;
}) {
  return (
    <>
      {tooltip ? (
        <Tooltip
          content={tooltip}
          placement="bottom"
          classNames={{ content: "text-gray-500" }}
        >
          <button
            onClick={onClick}
            className={
              "bg-transparent py-0.5   hover:text-blue-i transiation-all duration-300 bg-clip-text  w-fit buttonBg relative after:block after:w-0 after:h-0.5 after:absolute after:top-full hover:after:w-full after:transition-all after:bg-blue-i after:duration-300 " +
              (active ? "text-blue-i after:w-full" : "text-gray-700 ")
            }
          >
            <span className="px-1">{label}</span>
          </button>
        </Tooltip>
      ) : (
        <button
          onClick={onClick}
          className={
            "bg-transparent py-0.5   hover:text-blue-i transiation-all duration-300 bg-clip-text  w-fit buttonBg relative after:block after:w-0 after:h-0.5 after:absolute after:top-full hover:after:w-full after:transition-all after:bg-blue-i after:duration-300 " +
            (active ? "text-blue-i after:w-full" : "text-gray-700 ")
          }
        >
          <span className="px-1">{label}</span>
        </button>
      )}
    </>
  );
}
