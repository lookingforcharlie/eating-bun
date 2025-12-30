import { test, expect, describe } from 'bun:test'
import { homeHandler } from '../../src/routes/home'

describe('home route', () => {
  test('returns 200 status', async () => {
    const req = new Request('http://localhost:3001/')
    const res = await homeHandler(req)

    expect(res.status).toBe(200)
  })

  test('returns HTML content type', async () => {
    const req = new Request('http://localhost:3001/')
    const res = await homeHandler(req)

    expect(res.headers.get('Content-Type')).toBe('text/html')
  })

  test('contains server time in response', async () => {
    const req = new Request('http://localhost:3001/')
    const res = await homeHandler(req)
    const html = await res.text()

    expect(html).toContain('Server time:')
  })

  test('contains expected HTML structure', async () => {
    const req = new Request('http://localhost:3001/')
    const res = await homeHandler(req)
    const html = await res.text()

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<h1>Hello from Bun SSR!</h1>')
  })
})
