import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { inks } from '../tools/const'
import IconButton from '@mui/material/IconButton'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const NewDeckModal: FC<Props> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()
  const builder = useAppSelector((state) => state.builder)
  const navigate = useNavigate()

  useUpdateEffect(() => {
    if (open) {
      dispatch(builderActions.reset())
    }
  }, [open])

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
        <TextField
          required
          error={builder.name.trim() === ''}
          label="Name"
          defaultValue="New arena deck"
          fullWidth
          onChange={(event) => {
            dispatch(builderActions.updateName(event.target.value))
          }}
          sx={{ mb: 2 }}
        />
        <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Inks
          </Typography>
          {inks.map((ink, index) => (
            <IconButton
              disabled={
                builder.inks.length === 2 && !builder.inks.includes(ink)
              }
              key={index}
              onClick={() => {
                if (builder.inks.includes(ink)) {
                  dispatch(builderActions.removeInk(ink))
                } else {
                  builder.inks.length < 2 &&
                    dispatch(builderActions.addInk(ink))
                }
              }}
              sx={{
                opacity: builder.inks.includes(ink) ? 1 : 0.25
              }}
              title={
                builder.inks.includes(ink) ? `Remove ${ink}` : `Add ${ink}`
              }
              aria-label={
                builder.inks.includes(ink) ? `Remove ${ink}` : `Add ${ink}`
              }
            >
              <img
                src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink.toLowerCase()}-symbol.png`}
                alt={ink}
                style={{
                  height: 64,
                  width: 64,
                  objectFit: 'contain',
                  transition: 'transform 0.2s',
                  transform: builder.inks.includes(ink)
                    ? 'scale(1.1)'
                    : 'scale(1)'
                }}
              />
            </IconButton>
          ))}
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Sets
          </Typography>
          <FormGroup>
            {[
              'The First Chapter',
              'Rise of the Floodborn',
              'Into the Inklands'
            ].map((set, index) => (
              <FormControlLabel
                key={set}
                control={
                  <Checkbox
                    checked={builder.sets.includes(index + 1)}
                    onChange={(_) => {
                      dispatch(builderActions.toggleSet(index + 1))
                    }}
                  />
                }
                label={set}
              />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }} variant="outlined">
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Extra
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={builder.withRerolls}
                  onChange={(_) => {
                    dispatch(builderActions.toggleRerolls())
                  }}
                />
              }
              label="Allow rerolls (3)"
            />
          </FormGroup>
        </Paper>
        <Button
          disabled={
            builder.name.trim() === '' ||
            builder.inks.length !== 2 ||
            builder.sets.length === 0
          }
          sx={{ display: 'block', mt: 2 }}
          fullWidth
          onClick={() => {
            dispatch(builderActions.generateId())
            navigate('/build')
          }}
        >
          Confirm
        </Button>
      </Paper>
    </Modal>
  )
}

export default NewDeckModal
