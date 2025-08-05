import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const SubjectsDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });

  const fetchSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewSubject({ name: '', code: '' });
  };

  const handleAddSubject = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/subjects', newSubject);
      setSubjects(prev => [...prev, res.data]);
      handleClose();
    } catch (err) {
      console.error('Error adding subject:', err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="shadow-md">
        <CardContent className="flex justify-between items-center">
          <Typography variant="h5">Manage Subjects</Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            + Add Subject
          </Button>
        </CardContent>
      </Card>

      <Paper className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subj, index) => (
              <TableRow key={subj.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{subj.name}</TableCell>
                <TableCell>{subj.code}</TableCell>
                <TableCell>
                  <IconButton color="primary"><Edit /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {subjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">No subjects found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Subject Name"
            fullWidth
            value={newSubject.name}
            onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
          />
          <TextField
            label="Subject Code"
            fullWidth
            value={newSubject.code}
            onChange={e => setNewSubject({ ...newSubject, code: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSubject} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubjectsDashboard;
