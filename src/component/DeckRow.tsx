import DeleteIcon from '@mui/icons-material/DeleteRounded'
import DrawIcon from '@mui/icons-material/DrawRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingsState } from '../store/slices/settingsSlice'

type Props = {
  save: SettingsState['saves'][number]
  onPixelborn: (id: Nullable<number>) => void
  onDelete: (id: Nullable<number>) => void
}

const DeckRow: FC<Props> = ({ save, onPixelborn, onDelete }) => {
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {save.inks.map((ink, index) => (
          <img
            key={index}
            src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink.toLowerCase()}-symbol.png`}
            alt={ink}
            style={{ height: 48, marginRight: 8 }}
          />
        ))}
        <Typography variant="h6">{save.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{ mr: 1 }}
          onClick={() => {
            onPixelborn(save.id)
          }}
          disabled={save.deck.length === 0}
        >
          Pixelborn
        </Button>
        <IconButton
          onClick={() => {
            navigate(`/build/${save.id}`)
          }}
          title="Edit deck"
          aria-label="Edit deck"
        >
          <DrawIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            onDelete(save.id)
          }}
          title="Delete deck"
          aria-label="Delete deck"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default DeckRow
