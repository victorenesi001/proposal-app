import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'

dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json({ limit: '50kb' }))
app.use(express.static(join(__dirname, 'dist')))

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

app.post('/api/generate', async (req, res) => {
  const { jobDesc, service, systemPrompt } = req.body

  if (!jobDesc?.trim()) {
    return res.status(400).json({ error: 'Job description is required.' })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server.' })
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1100,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Client job description:\n\n${jobDesc}${service ? `\n\nHinted service type: ${service}` : ''}\n\nDetect the service, diagnose client intent, select the right hook from the library, and write the full proposal.`
      }]
    })

    const text = message.content?.[0]?.text
    if (!text) return res.status(500).json({ error: 'No response from AI — please try again.' })

    res.json({ text })
  } catch (err) {
    console.error('Anthropic error:', err.message)
    res.status(500).json({ error: 'Failed to generate proposal — please try again.' })
  }
})

app.get('*', (_req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
