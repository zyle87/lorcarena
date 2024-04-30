import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { builderActions } from '../store/slices/builderSlice'
import { SettingsState } from '../store/slices/settingsSlice'

type Props = {
  save: SettingsState['saves'][number]
  onDelete: (id: Nullable<number>) => void
}

const DeckRow: FC<Props> = ({ save, onDelete }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <Paper
      key={save.id}
      variant="outlined"
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
          title='Edit deck'
          aria-label='Edit deck'
        >
          <DrawIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            onDelete(save.id)
          }}
          title='Delete deck'
          aria-label='Delete deck'
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default DeckRow
