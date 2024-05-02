import LayersIcon from '@mui/icons-material/LayersRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { FC, useState } from 'react'
import ConfirmDeleteModal from '../component/ConfirmDeleteModal'
import DeckRow from '../component/DeckRow'
import NewDeckModal from '../component/NewDeckModal'
import PixelbornModal from '../component/PixelbornModal'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'

const Home: FC = () => {
  const [newDeckModalOpen, setNewDeckModalOpen] = useState(false)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const [pixelbornModal, setPixelbornModal] = useState(false)
  const [id, setId] = useState<number | null>(null)
  const saves = useAppSelector((state) => state.settings.saves)
  const dispatch = useAppDispatch()

  return (
    <Box>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Box>
          {saves.map((save) => (
            <Box key={save.id} mb={2}>
              <DeckRow
                save={save}
                onDelete={(id) => {
                  setId(id)
                  setConfirmDeleteModalOpen(true)
                }}
                onPixelborn={(id) => {
                  setId(id)
                  setPixelbornModal(true)
                }}
              />
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<LayersIcon />}
          variant="contained"
          onClick={() => {
            setNewDeckModalOpen(true)
            dispatch(builderActions.clear())
          }}
        >
          Build a new arena deck
        </Button>
      </Paper>
      <NewDeckModal open={newDeckModalOpen} setOpen={setNewDeckModalOpen} />
      <ConfirmDeleteModal
        open={confirmDeleteModalOpen}
        setOpen={setConfirmDeleteModalOpen}
        id={id}
      />
      <PixelbornModal
        open={pixelbornModal}
        setOpen={setPixelbornModal}
        id={id}
      />
    </Box>
  )
}

export default Home
