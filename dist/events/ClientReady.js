"use strict";
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(cl) {
        console.log(`Logged as ${cl.user.tag}`);
        cl.user.setActivity("...");
    }
};
