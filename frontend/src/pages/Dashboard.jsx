import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'todo' });
  const [editingId, setEditingId] = useState(null);
  const [filterUser, setFilterUser] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    if (user?.role === 'admin') {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get('/stats'),
          api.get('/auth/users')
        ]);
        setStats(statsRes.data.data);
        setAllUsers(usersRes.data.data);
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'admin') fetchAdminData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, currentTask);
      } else {
        await api.post('/tasks', currentTask);
      }
      fetchTasks();
      if (user?.role === 'admin') fetchAdminData();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
        if (user?.role === 'admin') fetchAdminData();
      } catch (err) {
        alert('Could not delete');
      }
    }
  };

  const openModal = (task = { title: '', description: '', status: 'todo' }) => {
    setCurrentTask(task);
    setEditingId(task._id || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({ title: '', description: '', status: 'todo' });
    setEditingId(null);
  };

  const filteredTasks = filterUser === 'all' 
    ? tasks 
    : tasks.filter(task => (task.user?._id || task.user) === filterUser);

  return (
    <div className="dashboard-wrapper">
      <header className="main-header">
        <div className="container header-content">
          <div className="brand">
            <h1>TaskBridge</h1>
            {user?.role === 'admin' && <span className="admin-tag">Admin</span>}
          </div>
          <div className="user-nav">
            <span className="user-email">{user?.email}</span>
            <button onClick={logout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="section-header">
          <h2>Your Tasks</h2>
          <div className="actions">
            {user?.role === 'admin' && (
              <select className="filter-select" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
                <option value="all">Every User</option>
                {allUsers.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
            )}
            <button className="btn-primary" onClick={() => openModal()}>Add New Task</button>
          </div>
        </div>

        {user?.role === 'admin' && stats && (
          <div className="stats-grid">
            <div className="stat-card"><label>Users</label><strong>{stats.totalUsers}</strong></div>
            <div className="stat-card"><label>Tasks</label><strong>{stats.totalTasks}</strong></div>
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <span className={`status-dot ${task.status}`}></span>
                  <span className="status-text">{task.status.toUpperCase()}</span>
                  <div className="task-actions">
                    <button onClick={() => openModal(task)}>Edit</button>
                    <button onClick={() => handleDelete(task._id)} className="delete">Delete</button>
                  </div>
                </div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                {user?.role === 'admin' && <div className="task-owner">Owner: {task.user?.name || 'Unknown'}</div>}
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingId ? 'Update Task' : 'New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input className="form-control" type="text" value={currentTask.title} onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows="3" value={currentTask.description} onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})} required></textarea>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={currentTask.status} onChange={(e) => setCurrentTask({...currentTask, status: e.target.value})}>
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="modal-btns">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
