import { Events, Client } from "discord.js";

export = {
    name: Events.ClientReady,
    once: true,
    execute(cl: Client<true>) {
        console.log(`Logged as ${cl.user.tag}`)
    }
}