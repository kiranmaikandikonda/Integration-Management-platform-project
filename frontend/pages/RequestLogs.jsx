import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import "./RequestLogs.css";

function RequestLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/request-logs")
      .then((res) => {
        const data = res.data.data || res.data;
        setLogs(Array.isArray(data) ? data : data.logs || []);
      })
      .catch((err) => console.error("Request logs error:", err));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Request Logs"
        description="View API requests and their responses." />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Status</th>
              <th>Response Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr key={log._id || index}>
                <td>{log.method}</td>
                <td>{log.endpoint}</td>
                <td>{log.statusCode}</td>
                <td>{log.responseTime} ms</td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && <p>No request logs available.</p>}
      </div>
    </div>
  );
}

export default RequestLogs;
