import axios from 'axios'
import config from '../../config'

let twitch:any = {}

twitch.whisper = async (userId:string, message:string) => {
    await axios({
        method: 'POST',
        url: `https://api.twitch.tv/helix/whispers?from_user_id=${config.botID}&to_user_id=${userId}`,
        headers: {
            "Authorization": `Bearer ${config.helix.auth}`,
            "Client-Id": config.helix.clientID,
            "Content-Type": "application/json"
        },
        data: {
            "message": message
        }
    })

}

export default twitch