

const { Telegraf } = require('telegraf')
const bot = new Telegraf('7995394349:AAGZClkcEm5fAgigKxEfvh2P6R1fFiMN0cU') // вставь свой токен

bot.start((ctx) => ctx.reply('Привет! Я бот для пополнения PS store в России.Нажми на кнопку ниже чтобы открыть PS STORE', {
reply_markup: {
inline_keyboard:[[{text:'Открыть', url:'http://t.me/bestgamestoreps_bot/psstore'}, {text:'Связаться', url:'https://t.me/notlyrisc'}]]}}))
bot.help((ctx) => ctx.reply('Напиши /start, чтобы увидеть приветствие'))


bot.launch()



