import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, icon: 'fas fa-user-plus', color: 'bg-primary', title: 'New User Registered', desc: 'User Nguyễn Văn A joined at 12:30 PM', time: '2 mins ago', unread: true },
    { id: 2, icon: 'fas fa-check-circle', color: 'bg-success', title: 'Job Approved', desc: 'Lập trình viên Python approved', time: '1 hour ago', unread: true },
    { id: 3, icon: 'fas fa-exclamation-circle', color: 'bg-warning', title: 'High View Count', desc: 'Job Kỹ sư AI reached 120 views', time: '3 hours ago', unread: false },
    { id: 4, icon: 'fas fa-users', color: 'bg-info', title: 'Team Meeting Scheduled', desc: 'Meeting set for Apr 30, 2025', time: '1 day ago', unread: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Notifications</h2>
        <div>
          <Button variant="outline-primary" size="sm" className="me-2" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
          <Button variant="outline-danger" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>
      <Card className="p-3">
        {notifications.length === 0 ? (
          <p className="text-muted text-center">No notifications available.</p>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className="timeline-item" style={{ background: notif.unread ? '#eff6ff' : 'transparent' }}>
              <div className={`icon ${notif.color}`}>
                <i className={notif.icon}></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-1">{notif.title} {notif.unread && <span className="badge bg-danger ms-2">UNREAD</span>}</h6>
                <p className="text-muted mb-0">{notif.desc}</p>
                <small className="text-muted">{notif.time}</small>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

export default Notifications;