import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import CasinoIcon from '@mui/icons-material/CasinoRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMount, useUpdateEffect } from 'react-use'
import VerticalBar from '../component/VerticalBar'
import CardRow from '../component/CardRow'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { builderActions } from '../store/slices/builderSlice'
import { settingsActions } from '../store/slices/settingsSlice'
import { inks } from '../tools/const'
import { Card } from '../tools/types'

const DeckBuilder: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(-1)
  const builder = useAppSelector((state) => state.builder)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    if (builder.draft.length < 3 && builder.deck.length < 40) {
      generateDraft()
    }

    dispatch(settingsActions.save(builder))
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
                        background: 'black !important',
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
                          width: '100%',
                          borderRadius: 16,
                          objectFit: 'cover',
                          objectPosition: 'center',
                          clipPath: 'inset(6px 6px 6px 6px)'
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
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Paper
          sx={{
            padding: 2,
            position: 'relative',
            display: 'flex',
            mr: 2,
            flex: 1,
            justifyContent: 'center'
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
                top: 8,
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
                top: 8,
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
            justifyContent: 'center'
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
                  top: 8,
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
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`Character (${
              builder.deck.filter((card) => card.Type === 'Character').length
            })`}
          </AccordionSummary>
          <AccordionDetails>
            {builder.deck
              .filter((card) => card.Type === 'Character')
              .sort((a, b) => a.Cost - b.Cost)
              .map((card) => (
                <CardRow key={`${card.Set_Num} ${card.Card_Num}`} card={card} />
              ))}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`Item (${
              builder.deck.filter((card) => card.Type === 'Item').length
            })`}
          </AccordionSummary>
          <AccordionDetails>
            {builder.deck
              .filter((card) => card.Type === 'Item')
              .sort((a, b) => a.Cost - b.Cost)
              .map((card) => (
                <CardRow key={`${card.Set_Num} ${card.Card_Num}`} card={card} />
              ))}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`Action (${
              builder.deck.filter((card) => card.Type.includes('Action')).length
            })`}
          </AccordionSummary>
          <AccordionDetails>
            {builder.deck
              .filter((card) => card.Type.includes('Action'))
              .sort((a, b) => a.Cost - b.Cost)
              .map((card) => (
                <CardRow key={`${card.Set_Num} ${card.Card_Num}`} card={card} />
              ))}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {`Location (${
              builder.deck.filter((card) => card.Type === 'Location').length
            })`}
          </AccordionSummary>
          <AccordionDetails>
            {builder.deck
              .filter((card) => card.Type === 'Location')
              .sort((a, b) => a.Cost - b.Cost)
              .map((card) => (
                <CardRow key={`${card.Set_Num} ${card.Card_Num}`} card={card} />
              ))}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Button
        onClick={() => {
          generateDraft()
        }}
        sx={{ mb: 2 }}
      >
        Refresh draft
      </Button>
    </Box>
  )
}

export default DeckBuilder
