import LayersIcon from '@mui/icons-material/LayersRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { FC, useState } from 'react'
import ConfirmDeleteModal from '../component/ConfirmDeleteModal'
import DeckRow from '../component/DeckRow'
import NewDeckModal from '../component/NewDeckModal'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'

const Home: FC = () => {
  const [newDeckModalOpen, setNewDeckModalOpen] = useState(false)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const settings = useAppSelector((state) => state.settings)
  const dispatch = useAppDispatch()

  return (
    <Box>
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Box>
          {settings.saves.map((save) => (
            <Box key={save.id} mb={2}>
              <DeckRow
                save={save}
                onDelete={(id) => {
                  setDeleteId(id)
                  setConfirmDeleteModalOpen(true)
                }}
              />
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<LayersIcon />}
          onClick={() => {
            setNewDeckModalOpen(true)
            dispatch(builderActions.reset())
          }}
        >
          Build a new arena deck
        </Button>
      </Paper>
      <NewDeckModal open={newDeckModalOpen} setOpen={setNewDeckModalOpen} />
      <ConfirmDeleteModal
        open={confirmDeleteModalOpen}
        setOpen={setConfirmDeleteModalOpen}
        id={deleteId}
      />
    </Box>
  )
}

export default Home
