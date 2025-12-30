import { test, expect, describe, beforeAll, afterAll } from 'bun:test'

describe('server integration', () => {
  let server: ReturnType<typeof Bun.serve>
  const baseUrl = 'http://localhost:3002'

  beforeAll(async () => {
    const { routes } = await import('../src/routes')
    server = Bun.serve({
      port: 3002,
      fetch: async (req) => {
        const url = new URL(req.url)
        const handler = routes[url.pathname]
        if (handler) {
          return handler(req)
        }
        return new Response('Not Found', { status: 404 })
      },
    })
  })

  afterAll(() => {
    server.stop()
  })

  test('GET / returns home page', async () => {
    const res = await fetch(`${baseUrl}/`)

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/html')
  })

  test('GET /charlie returns greeting', async () => {
    const res = await fetch(`${baseUrl}/charlie`)
    const text = await res.text()

    expect(res.status).toBe(200)
    expect(text).toBe('Hello, Charlie!')
  })

  test('GET /unknown returns 404', async () => {
    const res = await fetch(`${baseUrl}/unknown`)

    expect(res.status).toBe(404)
  })
})
