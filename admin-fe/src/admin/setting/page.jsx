import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function Settings() {
  const [formData, setFormData] = useState({
    adminName: 'Admin User',
    email: 'admin@topcv.com',
    emailNotifications: true,
    timezone: 'Asia/Ho_Chi_Minh'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully! (This is a demo)');
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>
      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Admin Name</Form.Label>
            <Form.Control
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="Enter admin name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Enable Email Notifications"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Timezone</Form.Label>
            <Form.Select name="timezone" value={formData.timezone} onChange={handleChange}>
              <option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh (GMT+7)</option>
              <option value="America/New_York">America/New York (GMT-4)</option>
              <option value="Europe/London">Europe/London (GMT+1)</option>
              <option value="Australia/Sydney">Australia/Sydney (GMT+10)</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Settings;