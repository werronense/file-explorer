export default function Home() {
  return (
    <main className="max-w-3xl mx-auto mt-4">
      <div className="flex justify-between">
        <h1>Pipelines</h1>
        <button type="button">Create Pipeline</button>
      </div>
      <table className="text-left mt-4">
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
            <td>Healthy</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Task Management</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">Capture Notes</th>
            <td>Unknown</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">Task Enrichment</th>
            <td>Unhealthy</td>
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
