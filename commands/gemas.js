const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
    
    let user = message.author;

    let timeout = 86400000;

    let gemas = await db.fetch(`gemas_${message.guild.id}_${user.id}`);
    
    let amount = Math.floor(Math.random() * 10) + 10;
    
    if (gemas !== null && timeout - (Date.now() - gemas) > 0) {
        let time = ms(timeout - (Date.now() - gemas));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#008000")
        .setDescription(` **|** Você já Coletou Suas Gemas Hoje\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
            
        message.channel.send(`${user}`, timeEmbed);

    } else {
        let gemasEmbed = new Discord.MessageEmbed()
        .setTitle(" Gemas Diárias")
        .setColor("#008000")
        .setDescription(`Você coletou suas Gemas Diárias!\n\n  Gemas Coletadas: **\`${amount}\`**`);
        
        message.channel.send(`${user}`, gemasEmbed);
        db.add(`gemas_${message.guild.id}_${user.id}`, amount);
        db.set(`gemas_${message.guild.id}_${user.id}`, Date.now());
    }
}