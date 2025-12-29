import { routes } from './routes'

const server = Bun.serve({
  port: 3001,
  hostname: 'localhost',
  fetch: async (req) => {
    const url = new URL(req.url)
    // look up the route handler for the given path
    const handler = routes[url.pathname]

    if (handler) {
      return handler(req)
    }

    return new Response('This page Not Found', { status: 404 })
  },
})

console.log(`Server is running on ${server.url}`)
