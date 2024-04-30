import CasinoIcon from '@mui/icons-material/CasinoRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
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
      sx={{ overflowY: 'auto' }}
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
        <Paper
          sx={{
            p: 2,
            mb: 2,
            position: 'relative'
          }}
          variant="outlined"
        >
          <IconButton
            onClick={() => {
              dispatch(builderActions.randomizeInks())
            }}
            sx={{ ml: 2, position: 'absolute', top: 8, right: 8 }}
            title="Randomize inks"
            aria-label="Randomize inks"
          >
            <CasinoIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center' }}
            color={builder.inks.length !== 2 ? 'error' : 'inherit'}
          >
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
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', mb: 2 }}
            color={builder.sets.length === 0 ? 'error' : 'inherit'}
          >
            Sets
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {['1TFC.png', '2ROF.png', '3INK.png'].map((set, index) => (
              <Button
                key={set}
                fullWidth
                onClick={() => {
                  if (builder.sets.includes(1)) {
                    dispatch(builderActions.toggleSet(index + 1))
                  } else {
                    dispatch(builderActions.toggleSet(index + 1))
                  }
                }}
                aria-label={`Set ${index + 1} (${set})`}
              >
                <img
                  src={`/assets/${set}`}
                  alt={`Set ${index + 1} (${set})`}
                  style={{
                    height: 64,
                    width: 128,
                    objectFit: 'contain',
                    transition: 'transform 0.2s',
                    transform: builder.sets.includes(index + 1)
                      ? 'scale(1.1)'
                      : 'scale(1)',
                    opacity: builder.sets.includes(index + 1) ? 1 : 0.25
                  }}
                />
              </Button>
            ))}
          </Box>
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
          variant="contained"
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
