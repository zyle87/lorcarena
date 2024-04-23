import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

type Props = {
  percent: number
  cost: number
  length: number
}

const Column: FC<Props> = ({ percent, cost, length }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        mr: 1,
        ml: 1
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
        {length > 0 && (
          <Typography
            sx={{
              textAlign: 'center',
              position: 'absolute',
              fontWeight: 'bold',
            }}
            variant="h4"
          >
            {length}
          </Typography>
        )}
        <Box
          sx={{
            height: `${percent}%`,
            backgroundColor: '#d4b889',
            borderRadius: 1,
            mt: 2,
            width: '60%'
          }}
        ></Box>
      </Box>
      <Box sx={{ position: 'relative', mt: 1, textAlign: 'center' }}>
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
    </Paper>
  )
}

export default Column
