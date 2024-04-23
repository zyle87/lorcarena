import ConstructionIcon from '@mui/icons-material/ConstructionRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  return (
    <main>
      <Paper sx={{ mt: 2, mb: 2, p: 1 }}>
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
              <Typography variant="h6">{save.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <IconButton
                key={save.id}
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
      <Button
        variant="contained"
        startIcon={<ConstructionIcon />}
        onClick={() => {
          setOpen(true)
          dispatch(builderActions.reset())
        }}
        sx={{ mb: 2 }}
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
          <Button
            disabled={builder.inks.length !== 2}
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
