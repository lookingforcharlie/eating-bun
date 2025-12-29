import { homeHandler } from './home'
import { charlieHandler } from './charlie'

type RouteHandler = (req: Request) => Response | Promise<Response>

export const routes: Record<string, RouteHandler> = {
  '/': homeHandler,
  '/charlie': charlieHandler,
}
