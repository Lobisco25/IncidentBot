// services
import "./services/tmi.ts"
// handlers
import "./handlers/tmi.ts"
import "./handlers/afk.ts"
import { majorInit as initSevenTV } from "./handlers/7tv"
initSevenTV()
