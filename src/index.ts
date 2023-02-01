// handlers
import "./handlers/tmi";
import { majorInit as initSevenTV } from "./handlers/7tv";
initSevenTV();
//web
import "../web/server";