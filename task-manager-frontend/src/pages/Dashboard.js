import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Typography, Avatar, Button, TextField, Box, Alert, List, ListItem, ListItemAvatar, ListItemText, Checkbox, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import API_BASE_URL from '../api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // for GET /tasks/:id
  const [editTaskId, setEditTaskId] = useState(null); // for PATCH /tasks/:id
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [editTaskCompleted, setEditTaskCompleted] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const theme = useTheme();

  // Fetch user profile and avatar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setAvatarUrl(`${API_BASE_URL}/users/${res.data._id}/avatar?${Date.now()}`);
      } catch (err) {
        setError('Failed to fetch user profile.');
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks.');
      }
    };
    fetchTasks();
  }, [navigate]);

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE_URL}/users/me`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditMode(false);
      setSuccess('Profile updated!');
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      setError('Failed to delete account.');
    }
  };

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      await axios.post(`${API_BASE_URL}/users/me/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setAvatarUrl(`${API_BASE_URL}/users/${user._id}/avatar?${Date.now()}`);
      setSuccess('Avatar uploaded!');
      setAvatarFile(null);
      fileInputRef.current.value = '';
    } catch (err) {
      setError('Failed to upload avatar.');
    }
  };

  // Delete avatar
  const handleDeleteAvatar = async () => {
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/users/me/avatar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatarUrl(null);
      setSuccess('Avatar deleted!');
    } catch (err) {
      setError('Failed to delete avatar.');
    }
  };

  // Logout
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE_URL}/users/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    navigate('/');
  };

  // Logout all
  const handleLogoutAll = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`${API_BASE_URL}/users/logoutAll`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    navigate('/');
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/tasks`,
        { description: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      // If the deleted task was being viewed, close the view
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask(null);
      }
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  // View task details (GET /tasks/:id)
  const handleViewTask = async (id) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedTask(res.data);
    } catch (err) {
      setError('Failed to fetch task details.');
    }
  };

  // Start editing a task
  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setEditTaskDesc(task.description);
    setEditTaskCompleted(task.completed);
  };

  // Save edited task (PATCH /tasks/:id)
  const handleSaveEditTask = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE_URL}/tasks/${editTaskId}`,
        { description: editTaskDesc, completed: editTaskCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === editTaskId ? res.data : t)));
      setEditTaskId(null);
      setEditTaskDesc('');
      setEditTaskCompleted(false);
      setSuccess('Task updated!');
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  // Toggle completed (PATCH /tasks/:id)
  const handleToggleCompleted = async (task) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API_BASE_URL}/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  return (
    <Box maxWidth={700} mx="auto" p={2}>
      <Typography variant="h3" align="center" fontWeight={800} mb={4} color={theme.palette.primary.main}>
        Dashboard
      </Typography>
      {user && (
        <Card sx={{ mb: 4, boxShadow: 8, borderRadius: 4, bgcolor: theme.palette.background.paper, p: 2 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center">
              <Avatar
                src={avatarUrl}
                alt="avatar"
                sx={{ width: 90, height: 90, bgcolor: theme.palette.primary.main, fontSize: 36, border: `3px solid ${theme.palette.primary.main}` }}
              >
                {user.name?.[0]?.toUpperCase()}
              </Avatar>
              <Box flex={1}>
                {editMode ? (
                  <Box component="form" onSubmit={handleUpdateProfile}>
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                      margin="dense"
                    />
                    <Stack direction="row" spacing={2} mt={2}>
                      <Button type="submit" variant="contained" color="primary">Save</Button>
                      <Button onClick={() => setEditMode(false)} color="inherit" variant="outlined">Cancel</Button>
                    </Stack>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h6" color={theme.palette.text.primary}>{user.name}</Typography>
                    <Typography variant="body2" color={theme.palette.text.secondary}>{user.email}</Typography>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      size="small"
                      sx={{ mt: 2 }}
                      variant="outlined"
                      color="primary"
                    >Edit Profile</Button>
                  </>
                )}
                <Stack direction="row" spacing={2} mt={3}>
                  <Button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    color="secondary"
                    variant="contained"
                  >Logout</Button>
                  <Button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogoutAll}
                    color="secondary"
                    variant="outlined"
                  >Logout All</Button>
                  <Button
                    startIcon={<PersonRemoveIcon />}
                    onClick={handleDeleteAccount}
                    color="error"
                    variant="contained"
                  >Delete Account</Button>
                </Stack>
              </Box>
              <Box>
                <Box component="form" onSubmit={handleAvatarUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="avatar-upload"
                  />
                  <Stack spacing={1}>
                    <label htmlFor="avatar-upload">
                      <Button variant="outlined" component="span" fullWidth>
                        Upload Avatar
                      </Button>
                    </label>
                    <Button onClick={handleDeleteAvatar} color="error" variant="outlined" size="small" fullWidth>
                      Remove Avatar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={!avatarFile}
                      fullWidth
                    >Save</Button>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Card sx={{ mb: 4, boxShadow: 6, borderRadius: 4, bgcolor: theme.palette.background.paper, p: 2 }}>
        <CardContent>
          <Box component="form" onSubmit={handleAddTask} display="flex" alignItems="center" mb={3} gap={2}>
            <TextField
              label="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
              fullWidth
              sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
            />
            <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />} sx={{ height: 56 }}>
              Add
            </Button>
          </Box>
          <Divider sx={{ mb: 2, bgcolor: theme.palette.divider }} />
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task._id}
                sx={{ mb: 1, borderRadius: 2, bgcolor: theme.palette.background.default, boxShadow: 1, px: 2 }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      edge="end"
                      onClick={() => handleViewTask(task._id)}
                      color="primary"
                      variant="contained"
                      sx={{ color: '#fff', height: 56, width: 56 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditTask(task)}
                      color="primary"
                      variant="contained"
                      sx={{ color: '#fff', height: 56, width: 56 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTask(task._id)}
                      color="primary"
                      variant="contained"
                      sx={{ color: '#fff', height: 56, width: 56 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                {editTaskId === task._id ? (
                  <Box component="form" onSubmit={handleSaveEditTask} display="flex" alignItems="center" width="100%" gap={2}>
                    <TextField
                      value={editTaskDesc}
                      onChange={(e) => setEditTaskDesc(e.target.value)}
                      required
                      size="small"
                      sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
                    />
                    <Checkbox
                      checked={editTaskCompleted}
                      onChange={(e) => setEditTaskCompleted(e.target.checked)}
                      color="primary"
                    />
                    <Button type="submit" variant="contained" color="primary" size="small">Save</Button>
                    <Button onClick={() => setEditTaskId(null)} color="inherit" size="small" variant="outlined">Cancel</Button>
                  </Box>
                ) : (
                  <Stack direction="row" alignItems="center" spacing={2} width="100%">
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleCompleted(task)}
                      color="primary"
                    />
                    <ListItemText
                      primary={
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: theme.palette.text.primary, fontWeight: 600, fontSize: '1.1rem' }}>
                          {task.description}
                        </span>
                      }
                    />
                  </Stack>
                )}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {/* Task details dialog */}
      <Dialog open={!!selectedTask} onClose={() => setSelectedTask(null)}>
        <DialogTitle sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>Task Details</DialogTitle>
        <DialogContent sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.primary }}>
          {selectedTask && (
            <Stack spacing={1}>
              <Typography><b>ID:</b> {selectedTask._id}</Typography>
              <Typography><b>Description:</b> {selectedTask.description}</Typography>
              <Typography><b>Completed:</b> {selectedTask.completed ? 'Yes' : 'No'}</Typography>
              <Typography><b>Created:</b> {new Date(selectedTask.createdAt).toLocaleString()}</Typography>
              <Typography><b>Updated:</b> {new Date(selectedTask.updatedAt).toLocaleString()}</Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.paper }}>
          <Button onClick={() => setSelectedTask(null)} color="primary" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;