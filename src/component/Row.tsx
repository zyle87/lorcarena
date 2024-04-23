import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC, useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import { Card } from '../tools/types'

type Props = {
  card: Card
}

const Row: FC<Props> = ({ card }) => {
  const [showImage, setShowImage] = useState(false)
  const position = useMousePosition()

  const ink = card.Color.toLowerCase()
  const name = card.Name.split('-')[0]
  const version = card.Name.split('-')[1]
  const inkImage = card.Inkable
    ? 'https://static.dotgg.gg/lorcana/generic/icon_ink_1.svg'
    : 'https://static.dotgg.gg/lorcana/generic/icon_ink_0.svg'

  const id = card.Card_Num.toString().padStart(3, '0')

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1,
        padding: 1,
        position: 'relative'
      }}
      variant="outlined"
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
    >
      {showImage && (
        <Box
          sx={{
            position: 'absolute',
            width: 240,
            left: position.x! - 280,
            pointerEvents: 'none',
            zIndex: 1,
            bottom: -40
          }}
        >
          <img
            src={card.Image}
            style={{
              width: '100%',
              clipPath: 'inset(1px 1px 1px 1px)',
              borderRadius: 16
            }}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink}-symbol.png`}
          alt={ink}
          style={{ height: 48 }}
        />
        <Box ml={2}>
          <Typography>{name}</Typography>
          <Typography variant="caption" color="secondary">
            {version || card.Type.includes('Song') && 'Song'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mr={2} variant="overline">
          {id}/204 • {card.Set_Num}
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
          <Typography
            mr={2}
            variant="h5"
            sx={{
              position: 'absolute',
              top: 8,
              width: 48,
              height: 48,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {card.Cost}
          </Typography>
          <img
            src={inkImage}
            alt={'inkable'}
            style={{ height: 48, width: 48 }}
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default Row
