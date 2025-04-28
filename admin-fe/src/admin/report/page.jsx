import { Card, Row, Col } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function Reports() {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users',
        data: [1200, 1900, 1500, 2200, 1800, 2500],
        backgroundColor: '#2563eb',
      },
      {
        label: 'Jobs',
        data: [800, 1200, 900, 1500, 1100, 1800],
        backgroundColor: '#f59e0b',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Users and Jobs by Month', font: { size: 16 } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { borderDash: [5, 5] } },
    },
  };

  const pieData = {
    labels: ['Active', 'Pending', 'Expired'],
    datasets: [
      {
        label: 'Job Status',
        data: [300, 100, 50],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Job Status Distribution', font: { size: 16 } },
    },
  };

  return (
    <div>
      <p className="text-muted mb-4">Detailed reports for TopCV admin panel.</p>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <Card.Title>Total Reports Generated</Card.Title>
            <Card.Text className="h1 text-primary">45</Card.Text>
            <p className="text-muted mb-0">Since last month</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <Card.Title>Last Report Date</Card.Title>
            <Card.Text className="h1 text-success">Apr 26, 2025</Card.Text>
            <p className="text-muted mb-0">Generated at 10:00 AM</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </Col>
        <Col md={6} className="mb-4">
          <div className="chart-container">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;