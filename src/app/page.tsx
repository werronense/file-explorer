import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto mt-4">
      <div className="flex justify-between">
        <h1>Pipelines</h1>
        <button type="button">Create Pipeline</button>
      </div>
      <table className="text-left mt-4 w-full">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Meeting Transcriptions</th>
            <td><CheckCircleIcon className="size-5 inline align-text-top mr-2 text-green-600" />Healthy</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Task Management</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">Capture Notes</th>
            <td><ExclamationCircleIcon className="size-5 inline align-text-top mr-2 text-amber-600" />Unknown</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">Task Enrichment</th>
            <td><XCircleIcon className="size-5 inline align-text-top mr-2 text-red-600" />Unhealthy</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">Utilities</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-8">Task Lookup</th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
