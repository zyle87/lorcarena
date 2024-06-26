import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import CasinoIcon from '@mui/icons-material/CasinoRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import axios from 'axios'
import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMount, useUpdateEffect } from 'react-use'
import CardRow from '../component/CardRow'
import VerticalBar from '../component/VerticalBar'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { settingsActions } from '../store/slices/settingsSlice'
import { inks } from '../tools/const'
import { Card } from '../tools/types'

const DeckBuilder: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(-1)
  const [currentSortIndex, setCurrentSortIndex] = useState(0)
  const builder = useAppSelector((state) => state.builder)
  const saves = useAppSelector((state) => state.settings.saves)
  const navigate = useNavigate()
  let { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  const cardIsInDraftOrDeck = (setNum: number, cardNum: number) => {
    return (
      builder.deck.some(
        (card) => card.Set_Num === setNum && card.Card_Num === cardNum
      ) ||
      builder.draft.some(
        (card) => card.Set_Num === setNum && card.Card_Num === cardNum
      )
    )
  }

  const generateDraft = async () => {
    const ink = builder.inks[Math.floor(Math.random() * 2)]
    const inkIndex = inks.indexOf(ink)

    let setIndex = Math.floor(Math.random() * builder.sets.length)
    let setNum = builder.sets[setIndex]
    let cardNum = inkIndex * 34 + Math.floor(Math.random() * 34) + 1

    while (cardIsInDraftOrDeck(setNum, cardNum)) {
      setIndex = Math.floor(Math.random() * builder.sets.length)
      setNum = builder.sets[setIndex]
      cardNum = inkIndex * 34 + Math.floor(Math.random() * 34) + 1
    }

    const response = await axios.get<Card[]>(
      'https://api.lorcana-api.com/cards/fetch?search=' +
        'Set_Num=' +
        setNum +
        ';Card_Num=' +
        cardNum
    )

    dispatch(builderActions.addCardToDraft(response.data[0]))
  }

  useMount(() => {
    const save = saves.find((save) => save.id === +id!)

    if (!save) {
      navigate('/')
      return
    }

    dispatch(builderActions.parse(save))

    if (builder.draft.length < 3 && builder.deck.length < 40) {
      generateDraft()
    }
  })

  useUpdateEffect(() => {
    if (builder.draft.length < 3 && builder.deck.length < 40) {
      generateDraft()
    }

    dispatch(settingsActions.save(builder))
  }, [builder.draft])

  const getCostWithMostCards = () => {
    const costs = builder.deck.map((card) => card.Cost)
    const mostCommon = costs
      .sort(
        (a, b) =>
          costs.filter((v) => v === a).length -
          costs.filter((v) => v === b).length
      )
      .pop()

    return mostCommon
  }

  const getCardsWithMostCost = () => {
    const cost = getCostWithMostCards()
    const cards = builder.deck.filter((card) => card.Cost === cost)

    return cards
  }

  const categories = [
    {
      title: 'Characters',
      filter: (card: Card) => card.Type === 'Character'
    },
    {
      title: 'Items',
      filter: (card: Card) => card.Type === 'Item'
    },
    {
      title: 'Actions',
      filter: (card: Card) => card.Type.includes('Action')
    },
    {
      title: 'Locations',
      filter: (card: Card) => card.Type === 'Location'
    }
  ]

  const sorts = [
    {
      title: 'Cost',
      sort: (a: Card, b: Card) => a.Cost - b.Cost
    },
    {
      title: 'Set & Number',
      sort: (a: Card, b: Card) => {
        const setCompare = a.Set_Num - b.Set_Num

        if (setCompare !== 0) {
          return setCompare
        }

        return a.Card_Num - b.Card_Num
      }
    },
    {
      title: 'Color',
      sort: (a: Card, b: Card) => a.Color.localeCompare(b.Color)
    },
    {
      title: 'Rarity',
      sort: (a: Card, b: Card) => a.Rarity.localeCompare(b.Rarity)
    }
  ]

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          mt: 4,
          mb: 4,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              navigate('/#')
            }}
            sx={{ mr: 1 }}
            title="Back to home"
            aria-label="Back to home"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">{`${builder.name} (${builder.deck.length}/40)`}</Typography>
        </Box>
        {builder.withRerolls && (
          <Button
            variant="contained"
            disabled={builder.reroll === 0}
            startIcon={<CasinoIcon />}
            onClick={() => {
              dispatch(builderActions.reroll())
            }}
          >
            Reroll ({builder.reroll})
          </Button>
        )}
      </Box>
      {builder.deck.length < 40 && (
        <Paper
          sx={{
            padding: 2,
            mb: 2,
            mt: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              ml: -1,
              mr: -1
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => {
              const card = builder.draft[index]

              return (
                <Box
                  key={index}
                  sx={{ flex: '1 1 0', borderRadius: 4, ml: 1, mr: 1 }}
                >
                  {card && (
                    <Button
                      key={index}
                      onClick={() => {
                        if (builder.draft.length !== 3) {
                          return
                        }

                        dispatch(builderActions.addCardToDeck(card))
                        dispatch(builderActions.clearDraft())
                      }}
                      onMouseEnter={() => {
                        setCurrentImageIndex(index)
                      }}
                      onMouseLeave={() => {
                        setCurrentImageIndex(-1)
                      }}
                      sx={{
                        transition: 'all 0.2s',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow:
                          currentImageIndex === index
                            ? `0 0 20px 0px ${
                                card.Rarity === 'Legendary' ? 'gold' : 'black'
                              }`
                            : `0 0 0 0 black`,
                        scale: currentImageIndex === index ? '1.02' : '1',
                        zIndex: currentImageIndex === index ? 1 : 0,
                        padding: 0
                      }}
                    >
                      <img
                        src={card.Image}
                        style={{
                          width: '100%'
                        }}
                      />
                    </Button>
                  )}
                </Box>
              )
            })}
          </Box>
        </Paper>
      )}
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          padding: 2
        }}
      >
        <Box
          sx={{
            height: 360,
            width: '100%',
            position: 'relative',
            display: 'flex'
          }}
        >
          <video
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              mixBlendMode: 'darken',
              filter: 'grayscale(1) contrast(2)'
            }}
          >
            <source
              src="https://static.videezy.com/system/resources/previews/000/036/612/original/18_010_07.mp4"
              type="video/mp4"
            />
          </video>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-end',
              mx: -0.5
            }}
          >
            {Array.from({ length: 11 }).map((_, index) => {
              if (builder.deck.length === 0) {
                return (
                  <VerticalBar
                    key={index}
                    percent={0}
                    cost={index}
                    total={0}
                  ></VerticalBar>
                )
              }

              const cards = builder.deck.filter((card) => card.Cost === index)

              const percent =
                (cards.length / getCardsWithMostCost().length) * 100

              return (
                <VerticalBar
                  key={index}
                  percent={percent}
                  cost={index}
                  total={cards.length}
                ></VerticalBar>
              )
            })}
          </Box>
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', mb: 2, mx: -1 }}>
        <Paper
          sx={{
            padding: 2,
            position: 'relative',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            mx: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                position: 'absolute',
                top: 11,
                width: 48,
                height: 48,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {builder.deck.filter((card) => !card.Inkable).length}
            </Typography>
            <img
              src="https://static.dotgg.gg/lorcana/generic/icon_ink_0.svg"
              alt={'inkable'}
              style={{ height: 48, width: 48 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                position: 'absolute',
                top: 11,
                width: 48,
                height: 48,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {builder.deck.filter((card) => card.Inkable).length}
            </Typography>
            <img
              src="https://static.dotgg.gg/lorcana/generic/icon_ink_1.svg"
              alt={'inkable'}
              style={{ height: 48, width: 48 }}
            />
          </Box>
        </Paper>
        <Paper
          sx={{
            padding: 2,
            position: 'relative',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            mx: 1
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort by"
              value={currentSortIndex}
            >
              {sorts.map((sort, index) => (
                <MenuItem
                  key={index}
                  value={index}
                  onClick={() => {
                    setCurrentSortIndex(index)
                  }}
                >
                  {sort.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper
          sx={{
            padding: 2,
            position: 'relative',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            mx: 1
          }}
        >
          {builder.inks.map((ink) => (
            <Box
              key={ink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  position: 'absolute',
                  top: 11,
                  width: 48,
                  height: 48,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {builder.deck.filter((card) => card.Color === ink).length}
              </Typography>
              <img
                src={`https://lorcana.gg/wp-content/uploads/sites/11/2023/11/${ink.toLowerCase()}-symbol.png`}
                alt={ink}
                style={{ height: 48, width: 48, objectFit: 'contain' }}
              />
            </Box>
          ))}
        </Paper>
      </Box>
      <Box mb={4}>
        {categories.map((category, index) => (
          <Accordion defaultExpanded key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {`${category.title} (${
                builder.deck.filter(category.filter).length
              })`}
            </AccordionSummary>
            <AccordionDetails>
              {builder.deck
                .filter(category.filter)
                .sort(sorts[currentSortIndex].sort)
                .map((card) => (
                  <CardRow
                    key={`${card.Set_Num} ${card.Card_Num}`}
                    card={card}
                  />
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default DeckBuilder
