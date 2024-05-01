import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import Button from '@mui/material/Button'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: Nullable<number>
}

const PixelbornModal: FC<Props> = ({ open, setOpen, id }) => {
  const save = useAppSelector((state) =>
    state.settings.saves.find((save) => save.id === id)
  )

  const base64 = save?.deck
    .map((card) => {
      return `${card.Name.replace(' - ', '_')}$1`
    })
    .join('|')

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Paper
        sx={{
          left: '50%',
          p: 2,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 480,
          maxWidth: '90%',
        }}
      >
        <TextField
          fullWidth
          multiline
          inputProps={{ readOnly: true }}
          value={btoa(base64!)}
        ></TextField>
        <Button fullWidth sx={{ mt: 2 }}>
          Copy
        </Button>
      </Paper>
    </Modal>
  )
}

export default PixelbornModal
