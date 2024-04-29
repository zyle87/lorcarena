import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { builderActions } from '../store/slices/builderSlice'
import { SettingsState, settingsActions } from '../store/slices/settingsSlice'
import Paper from '@mui/material/Paper'

type Props = {
  save: SettingsState['saves'][number]
}

const DeckRow: FC<Props> = ({ save }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Paper
      key={save.id}
      variant='outlined'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        '&:not(:last-child)': {
          mb: 1
        }
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
    </Paper>
  )
}

export default DeckRow
