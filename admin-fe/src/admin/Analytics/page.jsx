import { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [entityType, setEntityType] = useState('job');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/analyticss`);
        setAnalytics(response.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };
    fetchAnalytics();
  }, [entityType]);

  return (
    <div>
      <h2>Analytics</h2>
      <Form.Group className="mb-3">
        <Form.Label>Entity Type</Form.Label>
        <Form.Select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
          <option value="job">Job</option>
          <option value="article">Article</option>
          <option value="ad">Ad</option>
          <option value="event">Event</option>
        </Form.Select>
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Entity ID</th>
            <th>Metric Type</th>
            <th>Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map(item => (
            <tr key={item.analytic_id}>
              <td>{item.analytic_id}</td>
              <td>{item.entity_id}</td>
              <td>{item.metric_type}</td>
              <td>{item.value}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Analytics;