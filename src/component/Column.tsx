import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type Props = {
  percent: number
  cost: number
  total: number
}

const Column: FC<Props> = ({ percent, cost, total }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: 'white',
        height: percent + '%',
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        ml: 0.25,
        mr: 0.25
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          position: 'relative',
          alignItems: 'center'
        }}
      >
        <Box sx={{ position: 'absolute' }}>
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              top: 8,
              width: '100%',
              height: 48,
              textAlign: 'center',
              fontWeight: 800,
              mixBlendMode: 'difference'
            }}
          >
            {cost}
          </Typography>
          <img
            src="https://static.dotgg.gg/lorcana/generic/icon_ink_0.svg"
            alt={'inkable'}
            style={{ height: 48, width: 48, mixBlendMode: 'lighten' }}
          />
        </Box>
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          position: 'absolute',
          fontWeight: 'bold',
          mixBlendMode: 'difference',
          top: 0,
          opacity: total === 0 ? 0.25 : 1
        }}
        variant="h5"
      >
        {total ?? 0}
      </Typography>
    </Box>
  )
}

export default Column
