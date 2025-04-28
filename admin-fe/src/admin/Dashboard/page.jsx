import { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    activeUsers: 0,
    jobs: 0,
    pendingJobs: 0,
    views: 0,
    applications: 0,
    viewsTrend: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, jobsRes, analyticsRes] = await Promise.all([
          axios.get('http://localhost:3000/userss'),
          axios.get('http://localhost:3000/jobss'),
          axios.get('http://localhost:3000/analyticss')
        ]);

        // Giả lập dữ liệu nếu API không có các trường cụ thể
        const activeUsers = usersRes.data.filter(user => user.is_active).length || Math.floor(usersRes.data.length * 0.8);
        const pendingJobs = jobsRes.data.filter(job => job.status === 'pending').length || Math.floor(jobsRes.data.length * 0.3);
        const applications = analyticsRes.data.filter(item => item.metric_type === 'apply').reduce((sum, item) => sum + item.value, 0) || 150;
        
        // Giả lập dữ liệu xu hướng views nếu API không trả về dữ liệu thời gian
        const viewsTrend = analyticsRes.data.some(item => item.timestamp)
          ? analyticsRes.data
              .filter(item => item.metric_type === 'view')
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map(item => item.value)
          : [50, 60, 80, 100, 90, 120]; // Dữ liệu giả lập

        setStats({
          users: usersRes.data.length,
          activeUsers,
          jobs: jobsRes.data.length,
          pendingJobs,
          views: analyticsRes.data.reduce((sum, item) => sum + item.value, 0),
          applications,
          viewsTrend
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        // Dữ liệu giả lập nếu API lỗi
        setStats({
          users: 1700000,
          activeUsers: 1360000,
          jobs: 400000,
          pendingJobs: 2700000,
          views: 1250000,
          applications: 250000,
          viewsTrend: [50000, 75000, 60000, 100000, 36291, 82000]
        });
      }
    };
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Giả lập nhãn thời gian
    datasets: [
      {
        label: 'Views Trend',
        data: stats.viewsTrend,
        fill: false,
        borderColor: '#22c55e',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Views Trend', font: { size: 16 } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { borderDash: [5, 5] } },
    },
  };

  const timeline = [
    { icon: 'fas fa-users', color: 'bg-primary', title: 'Người dùng mới', desc: 'Người dùng Nguyễn Văn A tham gia vào 12:30 PM', status: 'new' },
    { icon: 'fas fa-briefcase', color: 'bg-success', title: 'Công việc đã được duyệt', desc: 'Lập trình viên Python đã được duyệt', status: 'new' },
    { icon: 'fas fa-eye', color: 'bg-info', title: 'Lượt xem cao', desc: 'Công việc Kỹ sư AI đạt 120 views', status: '' },
    { icon: 'fas fa-users', color: 'bg-primary', title: 'Team Meeting', desc: 'Được hẹn tuần sau', status: '' },
  ];

  return (
    <div>
      <p className="text-muted mb-4">Bảng thông tin tổng quan.</p>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Người dùng</Card.Title>
            <Card.Text className="h1 text-primary">{stats.users.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">Tổng số người dùng đăng kí</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Người dùng hoạt động</Card.Title>
            <Card.Text className="h1 text-success">{stats.activeUsers.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">{Math.round((stats.activeUsers / stats.users) * 100)}% người dùng hoạt động</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Công việc</Card.Title>
            <Card.Text className="h1 text-danger">{stats.jobs.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">Tổng số công việc được đăng lên</p>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Công việc đang chờ</Card.Title>
            <Card.Text className="h1 text-warning">{stats.pendingJobs.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">Đang chờ phê duyệt</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Tổng lượt xem</Card.Title>
            <Card.Text className="h1 text-info">{stats.views.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">Trên tất cả các công việc</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <Card.Title>Tổng số đơn đăng ký</Card.Title>
            <Card.Text className="h1 text-primary">{stats.applications.toLocaleString()}</Card.Text>
            <p className="text-muted mb-0">Được nộp bởi ứng viên</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <Card.Title>Recent Activities</Card.Title>
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className={`icon ${item.color}`}>
                  <i className={item.icon}></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.title} {item.status === 'new' && <span className="badge bg-danger ms-2">NEW</span>}</h6>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
            <Button variant="outline-primary" size="sm" className="mt-3">View All</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;