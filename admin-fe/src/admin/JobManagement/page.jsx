import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobss');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/jobss/${id}`);
      setJobs(jobs.map(job => job.job_id === id ? { ...job, status: 'active' } : job));
    } catch (err) {
      console.error('Error approving job:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/jobss/${id}`);
      setJobs(jobs.filter(job => job.job_id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div>
      <h2>Job Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên công việc</th>
            <th>Công ty</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.job_id}>
              <td>{job.job_id}</td>
              <td>{job.title}</td>
              <td>{job.company_id}</td>
              <td>{job.status}</td>
              <td>
                {job.status === 'pending' && (
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleApprove(job.job_id)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(job.job_id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JobManagement;