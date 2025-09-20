import { useCallback, useState } from 'react'

import Choices from './components/Choices.jsx'

import './App.scss'

function App() {
  const [riddle, setRiddle] = useState('Loading a fresh riddle...')
  const [choicesKey, setChoicesKey] = useState(0)

  const callRiddle = useCallback(async (tool) => {
    if (!tool) {
      return
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY

    if (!apiKey) {
      setRiddle('Add VITE_OPENAI_API_KEY to load riddles from OpenAI.')
      return
    }

    setRiddle('Thinking up a riddle about the right tool...')

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: 'You craft short, playful riddles whose answers are everyday tools.',
            },
            {
              role: 'user',
              content: `Write a concise riddle (max 3 sentences) whose answer is the tool "${tool}". Do not say the tool name. Return only the riddle text.`,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI request failed with status ${response.status}`)
      }

      const data = await response.json()
      const generatedRiddle = data?.choices?.[0]?.message?.content?.trim()

      if (!generatedRiddle) {
        throw new Error('OpenAI response did not include riddle content')
      }

      setRiddle(generatedRiddle)
    } catch (error) {
      console.error('Failed to load riddle from OpenAI:', error)
      setRiddle('Could not load a riddle right now. Please refresh and try again.')
    }
  }, [])

  const handleCorrectChoice = useCallback(() => {
    const userConfirmed = window.confirm('Nice work! You solved the riddle. Play again?')

    if (userConfirmed) {
      setChoicesKey((value) => value + 1)
    }
  }, [])

  return (
    <div>
      <h1 className="center-text">Tool Riddle</h1>
      <div className="riddle-container">
        <span className="riddle-text">{riddle}</span>
      </div>
      <div className="lockbox-section" />
      <div className="choices-section">
        <Choices key={`choices-${choicesKey}`} onMount={callRiddle} onCorrectChoice={handleCorrectChoice} />
      </div>
    </div>
  )
}

export default App
