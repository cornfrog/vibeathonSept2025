import { useEffect, useMemo } from 'react'

import Choice from './Choice.jsx'
import toolsList from '../tools.jsx'

import './Choices.scss'

const CHOICE_COUNT = 3

const pickRandomUniqueTools = (tools, count) => {
  if (!Array.isArray(tools) || tools.length < count) {
    return []
  }

  const pool = [...tools]

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, count)
}

function Choices({ onMount, onCorrectChoice, onIncorrectChoice }) {
  const selectedTools = useMemo(() => pickRandomUniqueTools(toolsList, CHOICE_COUNT), [])
  const [correctTool] = selectedTools

  useEffect(() => {
    if (typeof onMount === 'function' && correctTool) {
      onMount(correctTool)
    }
  }, [onMount, correctTool])

  return (
    <div className="choices">
      {selectedTools.map((tool) => (
        <Choice
          key={tool}
          tool={tool}
          onClick={(event, chosenTool) => {
            if (chosenTool === correctTool) {
              if (typeof onCorrectChoice === 'function') {
                onCorrectChoice(chosenTool, event)
              }
            } else if (typeof onIncorrectChoice === 'function') {
              onIncorrectChoice(chosenTool, event)
            }
          }}
        />
      ))}
    </div>
  )
}

export default Choices
