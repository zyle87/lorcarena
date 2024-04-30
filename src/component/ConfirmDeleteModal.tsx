import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { settingsActions } from '../store/slices/settingsSlice'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number | null
}

const ConfirmDeleteModal: FC<Props> = ({ open, setOpen, id }) => {
  const dispatch = useAppDispatch()
  const saves = useAppSelector((state) => state.settings.saves)

  useUpdateEffect(() => {
    if (open) {
      dispatch(builderActions.reset())
    }
  }, [open])

  const deck = saves.find((save) => save.id === id)

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <Paper
        sx={{
          left: '50%',
          p: 2,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Typography variant="body1">
          Are you sure you want to delete <strong>{deck?.name}</strong>?
        </Typography>
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button
            sx={{ mr: 1 }}
            onClick={() => {
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              dispatch(settingsActions.removeSave(id!))
              setOpen(false)
            }}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ConfirmDeleteModal
