export default function Home() {
  return (
    <main>
      <div>
        <h1>Pipelines</h1>
        <button type="button">Create Pipeline</button>
      </div>
      <table>
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
            <th scope="row">Capture Notes</th>
            <td>Unknown</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Task Enrichment</th>
            <td>Unhealthy</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Utilities</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Task Lookup</th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
