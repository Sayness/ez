const Discord = require('discord.js'); //Initiation de discord.js
const bot = new Discord.Client();
var fs = require("fs")
var prefix = ("!") //Prefix

bot.on('message', function(message) {      //Détection de message
    
    if (message.author.equals(bot.user)) return
    if (message.guild === null) return
    if (!message.content.startsWith(prefix)) return
    var args = message.content.substring(prefix.length).split(" ")
    
    switch (args[0].toLowerCase()) { //Ont regarde tout les message començant par le préfix
        case "help": //Première commande
            message.delete() //Pour supprimer le message de l'envoyant
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("`!(Commande Disponible Que par les créateurs)` : Code a rajouter (ex : 123)\n\n`!pin` : Envoie un code pour CKLogs")
                .setFooter("Made By Sayness, 2018")
            message.channel.sendEmbed(embed)
        break;
        case "new-pin": //Commande
            message.delete()
            if(message.content === prefix + "new-pin") {message.reply("Merci de mettre un code valide"); return;}
            fs.readFile("code.txt", function(err, data){
                fs.writeFile("code.txt", data + "|" + args.slice(1).join(" "))
            })
            message.reply("Vous avez ajouter un code !") //Réponds au message
        break;
        case "pin":
            message.delete()
            var text = fs.readFileSync("code.txt", "utf8");
            var words = text.split('|')
            words = words.map(function (word) { return word.trim() });
            words = words.filter(function (word) { return word.length > 0 })
            var render = words[Math.floor(Math.random() * words.length)]
            console.log(render)
            if (render === undefined) {
                fs.writeFile("code.txt", "")
                message.reply("Aucun PIN Disponible Envoyer un message au Administrateurs !")
                break;
            }
            message.author.send(render)
            fs.readFile("code.txt", function(err, data){
                var sd = text.replace(render, '');
                fs.writeFile("code.txt", sd)
            })
            message.reply("Votre Code a était envoyer en mp !")
        break;
}
})

bot.login(`NDI3MDc5MTgwODM2OTI5NTM3.DZgZpQ.kShivnuDZ-lVcnGRuHo_rSCWu1U`)
