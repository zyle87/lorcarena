import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type Props = {
  percent: number
  cost: number
  length: number
}

const Column: FC<Props> = ({ percent, cost, length }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: percent + '%',
        background: '#ffe4b8',
        borderRadius: 1,
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
              fontWeight: 800
            }}
          >
            {cost}
          </Typography>
          <img
            src="https://static.dotgg.gg/lorcana/generic/icon_ink_0.svg"
            alt={'inkable'}
            style={{ height: 48, width: 48 }}
          />
        </Box>
        <Typography
          sx={{
            textAlign: 'center',
            position: 'absolute',
            fontWeight: 'bold',
            bottom: 64
          }}
          variant="h5"
        >
          {length ?? 0}
        </Typography>
        <Box
          sx={{
            height: `${percent}%`,
            width: '100%'
          }}
        ></Box>
      </Box>
    </Box>
  )
}

export default Column
