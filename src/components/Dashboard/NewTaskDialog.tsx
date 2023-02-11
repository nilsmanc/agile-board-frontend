import { useCallback, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material'

import useStore from '../../hooks/useStore'
import { TaskState } from '../../types'

export default function NewTaskDialog({ open, sectionId, handleClose }) {
  const [taskState, setTaskState] = useState<TaskState>()
  const { users, boards } = useStore()

  const updateTaskState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setTaskState((prevTaskState) => ({
      ...prevTaskState,
      [name]: value,
    }))
  }

  const createTask = useCallback(
    (event) => {
      event.preventDefault()

      boards.active.addTask(sectionId, taskState)

      handleClose()
    },
    [taskState, boards, handleClose, sectionId],
  )

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>Creating A New Task:</DialogTitle>
      <form onSubmit={createTask}>
        <DialogContent style={{ minWidth: 500 }}>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type='text'
              name='title'
              label='Title'
              onChange={updateTaskState}
              value={taskState?.title || ''}
            />
          </Box>
          <Box p={1}>
            <TextField
              required
              fullWidth
              type='text'
              multiline
              name='description'
              label='Description'
              onChange={updateTaskState}
              //@ts-ignore
              rowsMax={Infinity}
              value={taskState?.description || ''}
            />
          </Box>
          <Box p={1}>
            <FormControl fullWidth>
              <InputLabel size='normal'>Assignee</InputLabel>
              <Select
                required
                style={{
                  width: '100%',
                }}
                native
                name='assignee'
                value={taskState?.assignee || ''}
                onChange={updateTaskState}>
                <option value={''} disabled></option>
                {users?.users?.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button type='submit' color='primary'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
