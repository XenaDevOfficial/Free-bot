const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "help",
    description: "Permet de connaître toutes les commandes du bot",
    utilisation: "",
    alias: ["help", "h", "aide"],
    permission: "Aucune",
    category: "Information",
    cooldown: 2,

    async run(bot, message, args, db) {

        const command = message.user ? bot.alias.get(args._hoistedOptions.length !== 0 ? args._hoistedOptions[0].value : "") : bot.alias.get(args[0])
        
        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guildId}`, async (err, req) => {

            if(!command) {
            
                const categories = [];
                const commands = bot.commands;
        
                commands.forEach((command) => {
                    if(!categories.includes(command.category)) {
                        categories.push(command.category);
                    }
                });
    
                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle(`Every Xéna Commands`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription("Here All The Commands Of Xéna")
                .setTimestamp()
                .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))
    
                categories.sort().forEach((cat, i) => {
                    const tCommands = commands.filter((cmd) => cmd.category === cat);
                    Embed.addField(cat, tCommands.map((cmd) => "> `" + req[0].Prefix + cmd.name + "` ➔ " + cmd.description).join("\n"));
                });
    
                message.reply({embeds: [Embed]})

            }

            if(command) {

                let Embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle(`Every Xéna Commands`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Command Name : \`${message.user ? args._hoistedOptions[0].value : args[0]}\`\nCommand Description : \`${command.description}\`\Utility Of The Command : \`${message.user ? args._hoistedOptions[0].value : args[0]} ${command.utilisation}\`\nAliases Of The Command : ${command.alias.filter(a => a !== (message.user ? args._hoistedOptions[0].value : args[0])).map(a => `\`${a}\``).join(" ")}\Category Of The Command : \`${command.category}\`\nPerms Of The Command : \`${new Discord.Permissions(command.permission).toArray(false)}\``)
                .setTimestamp()
                .setFooter(`${message.user ? message.user.username : message.author.username}`, message.user ? message.user.displayAvatarURL({dynamic: true}) : message.author.displayAvatarURL({dynamic: true}))

                message.reply({embeds: [Embed]})
            }
        })
    }
})