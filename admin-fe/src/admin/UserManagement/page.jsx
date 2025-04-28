import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userss', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdate = async (id, updatedUser) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => user.user_id === id ? { ...user, ...updatedUser } : user));
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.user_id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Quyền</th>
            <th>Role</th>
            <th>Hoat động</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdate(user.user_id, { is_active: !user.is_active })}
                >
                  Khóa tài khoản
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.user_id)}
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

export default UserManagement;