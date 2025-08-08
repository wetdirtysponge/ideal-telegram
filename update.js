// Подключаем библиотеки
const { Telegraf } = require('telegraf');
const fs = require('fs');

// 🔹 ТВОЙ ТОКЕН — вставь свой!
const bot = new Telegraf('8277984582:AAEukchFHOd5ByCtxBNODblta7qw8vdtV6I');
// 📂 Путь к JSON с играми (лежит рядом с updates.js)
const GAMES_FILE = './games.json';

// Загружаем список игр
function loadGames() {
    if (!fs.existsSync(GAMES_FILE)) {
        fs.writeFileSync(GAMES_FILE, '[]', 'utf8'); // Если файла нет — создаём пустой список
    }
    return JSON.parse(fs.readFileSync(GAMES_FILE, 'utf8'));
}

// Сохраняем список игр
function saveGames(games) {
    fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2), 'utf8');
}

// Команда при старте
bot.start((ctx) => {
    ctx.reply("Привет! Команды:\n/list — список игр\n/setprice ID цена — изменить цену\n/addgame название цена картинка — добавить игру");
});

// 📜 Показать список игр
bot.command('list', (ctx) => {
    const games = loadGames();
    if (games.length === 0) return ctx.reply("📂 Список игр пуст");

    let message = "📜 Список игр:\n";
    games.forEach(game => {
        message += 'ID: ${game.id} — ${game.name} — ${game.price} ₽\n';
    });
    message += '\nВсего игр в списке: ${games.length}';
    ctx.reply(message);
});

// 💰 Изменить цену
bot.command('setprice', (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length !== 3) {
        return ctx.reply("❌ Используй: /setprice ID_игры новая_цена");
    }

    const id = parseInt(args[1]);
    const newPrice = parseInt(args[2]);

    let games = loadGames();
    const game = games.find(g => g.id === id);

    if (!game) return ctx.reply("❌ Игра с таким ID не найдена");

    game.price = newPrice;
    saveGames(games);

    ctx.reply('✅ Цена для "${game.name}" обновлена на ${newPrice} ₽');
});

// ➕ Добавить новую игру
bot.command('addgame', (ctx) => {
    const args = ctx.message.text.split(' ');

    if (args.length < 4) {
        return ctx.reply("❌ Используй: /addgame название цена ссылка_на_картинку");
    }

    const price = parseInt(args[args.length - 2]);
    const image = args[args.length - 1];
    const name = args.slice(1, args.length - 2).join(' '); // Название из нескольких слов

    let games = loadGames();

    // Автоматический ID
    const id = games.length > 0 ? games[games.length - 1].id + 1 : 1;

    games.push({ id, name, price, image });
    saveGames(games);

    ctx.reply('✅ Игра "${name}" добавлена с ID ${id}! Теперь в списке ${games.length} игр.');
});

// 🚀 Запуск бота
bot.launch();
console.log("✅ Бот запущен!");
