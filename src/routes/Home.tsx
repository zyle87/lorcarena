import ConstructionIcon from '@mui/icons-material/ConstructionRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
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
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { settingsActions } from '../store/slices/settingsSlice'
import { inks } from '../tools/const'

const Home: FC = () => {
  const [open, setOpen] = useState(false)
  const builder = useAppSelector((state) => state.builder)
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useUpdateEffect(() => {
    if (open) {
      dispatch(builderActions.reset())
    }
  }, [open])

  return (
    <main>
      {settings.saves.length > 0 && (
        <Paper sx={{ mt: 2, p: 1 }}>
          {settings.saves.map((save) => (
            <Box
              key={save.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {save.inks.map((ink, index) => (
                  <img
                    key={index}
                    src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink.toLowerCase()}-symbol.png`}
                    alt={ink}
                    style={{ height: 32, marginRight: 8 }}
                  />
                ))}
                <Typography variant="h6">{save.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  onClick={() => {
                    dispatch(builderActions.parse(save))
                    navigate('/build')
                  }}
                >
                  <DrawIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    dispatch(settingsActions.removeSave(save.id))
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      )}
      <Button
        variant="contained"
        startIcon={<ConstructionIcon />}
        onClick={() => {
          setOpen(true)
          dispatch(builderActions.reset())
        }}
        sx={{ mt: 2 }}
      >
        Build a new arena deck
      </Button>
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
              <Button
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
              >
                <img
                  src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink.toLowerCase()}-symbol.png`}
                  alt={ink}
                  style={{
                    height: 64,
                    transition: 'transform 0.2s',
                    transform: builder.inks.includes(ink)
                      ? 'scale(1.1)'
                      : 'scale(1)'
                  }}
                />
              </Button>
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
    </main>
  )
}

export default Home
