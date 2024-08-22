import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const StatusCell = ({ status }: { status: string }) => {
  return (
    <td className="capitalize">
      {(status === "healthy" && (
        <CheckCircleIcon className="size-5 inline align-text-top mr-2 text-green-600" />
      )) ||
        (status === "unknown" && (
          <ExclamationCircleIcon className="size-5 inline align-text-top mr-2 text-amber-600" />
        )) ||
        (status === "unhealthy" && (
          <XCircleIcon className="size-5 inline align-text-top mr-2 text-red-600" />
        ))}
      {status}
    </td>
  );
};
