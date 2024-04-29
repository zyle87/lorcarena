import ConstructionIcon from '@mui/icons-material/ConstructionRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewDeckModal from '../component/NewDeckModal'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { settingsActions } from '../store/slices/settingsSlice'

const Home: FC = () => {
  const [newDeckModalOpen, setNewDeckModalOpen] = useState(false)
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Box>
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
          setNewDeckModalOpen(true)
          dispatch(builderActions.reset())
        }}
        sx={{ mt: 2 }}
      >
        Build a new arena deck
      </Button>
      <NewDeckModal open={newDeckModalOpen} setOpen={setNewDeckModalOpen} />
    </Box>
  )
}

export default Home
