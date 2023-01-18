import { Events, Message } from "discord.js";
export = {
    name: Events.MessageCreate,
    execute(msg: Message) {
        msg.react("🕵️‍♂️")
    }
}