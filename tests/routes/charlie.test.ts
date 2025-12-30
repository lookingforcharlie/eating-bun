import { test, expect, describe } from 'bun:test'
import { charlieHandler } from '../../src/routes/charlie'

describe('charlie route', () => {
  test('returns 200 status', () => {
    const req = new Request('http://localhost:3001/charlie')
    const res = charlieHandler(req)

    expect(res.status).toBe(200)
  })

  test('returns greeting message', async () => {
    const req = new Request('http://localhost:3001/charlie')
    const res = charlieHandler(req)
    const text = await res.text()

    expect(text).toBe('Hello, Charlie!')
  })
})
