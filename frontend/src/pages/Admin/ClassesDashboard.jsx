import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const ClassesDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', section: '' });

  // Fetch classes from backend (replace URL with your actual API endpoint)
  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewClass({ name: '', section: '' });
  };

  const handleAddClass = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/classes', newClass);
      setClasses(prev => [...prev, response.data]);
      handleClose();
    } catch (error) {
      console.error('Failed to add class:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="shadow-md">
        <CardContent className="flex justify-between items-center">
          <Typography variant="h5">Manage Classes</Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            + Add Class
          </Button>
        </CardContent>
      </Card>

      <Paper className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls, index) => (
              <TableRow key={cls._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.section}</TableCell>
                <TableCell>
                  <IconButton color="primary"><Edit /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {classes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No classes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Class Name"
            fullWidth
            value={newClass.name}
            onChange={e => setNewClass({ ...newClass, name: e.target.value })}
          />
          <TextField
            label="Section"
            fullWidth
            value={newClass.section}
            onChange={e => setNewClass({ ...newClass, section: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddClass} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassesDashboard;
