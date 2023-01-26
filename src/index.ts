// handlers
import "./handlers/tmi";
import "./handlers/afk";
import { majorInit as initSevenTV } from "./handlers/7tv";
initSevenTV();
//web
import "../web/server";