import React from 'react';
import {
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

export default function TodoView({
  handleCloseDialog,
  openDialog,
  handleUpdate,
  value,
  handleChange,
  formState,
}) {
  return (
    <Dialog
      onClose={handleCloseDialog}
      open={openDialog}
      maxWidth='sm'
      fullWidth
    >
      <form onSubmit={(e) => handleUpdate(e, formState)}>
        <DialogTitle>{formState === 'edit' ? 'Edit' : 'Add'} Todo</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label='Title'
              id='title-id'
              placeholder='Enter a title'
              size='small'
              fullWidth
              autoFocus
              name='title'
              value={value.title}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button size='small' variant='contained' fullWidth type='submit'>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}