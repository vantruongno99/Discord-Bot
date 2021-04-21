require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix ='!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
  if (msg.content === '!rip') {
    const attachment = new Discord.MessageAttachment('./package.json');
    msg.channel.send(`${msg.author},`, attachment);
  }
});

client.on('message', msg => {
  if (msg.content === 'how to embed') {
    const embed = new Discord.MessageEmbed()
      .setTitle('A slick little embed')
      .setColor(0xff0000)
      .setDescription('Hello, this is a slick embed!');
      msg.channel.send(embed);
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'main');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});


client.on('message', msg => {
  if (!msg.guild) return;
  if (!msg.content.startsWith(prefix)) return;
  if (msg.content.startsWith(prefix + 'kick' )) {
    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.kick('Optional reason will dislay in the audit log')
          .then(() => {
            msg.channel.send(`Successfully kicked ${user}`);
          })
          .catch(err => {
            msg.channel.send('Not kickable');

            console.error(err);
          });
      } else {
        msg.channel.send("That user isn't in this guild!");
      }
    } else {
      msg.channel.send("You didn't mention the user to kick!");
    }
  }
  if (msg.content.startsWith(prefix + 'ban' )) {
    const user = msg.mentions.users.first()
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member.ban({ reason: 'lmao' ,})
          .then(() => {
            msg.channel.send(`${user.tag} was banned`);
          })
          .catch(err => msg.channel.send('not bannable'));
      } else {
        msg.channel.send("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      msg.channel.send("You didn't mention the user to ban!");
    }
  }
});


client.login(process.env.TOKEN);