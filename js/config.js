window.APEX_CONFIG = {
    siteUrl: 'https://apexsphere.ru',
    productionHosts: ['apexsphere.ru', 'www.apexsphere.ru', 'apexsphere.github.io'],
    servers: {
        vanilla: {
            name: 'Vanilla 26.1.2',
            publicIp: 'play.apexsphere.ru',
            statusEndpoint: 'https://api.mcstatus.io/v2/status/java/play.apexsphere.ru:25565'
        },
        anarchy: {
            name: 'Anarchy 1.16.5+',
            publicIp: 'anarchy.apexsphere.ru',
            available: false
        }
    },
    social: {
        discordInvite: 'https://discord.gg/6tgcvpuRXX',
        supportInvite: 'https://discord.gg/QeWAYQmsEK',
        discordApiInvite: 'https://discord.com/api/v9/invites/QeWAYQmsEK?with_counts=true',
        telegramChannel: 'https://t.me/ApexSphereMine',
        telegramChat: 'https://t.me/ApexSphereChat',
        ownerTelegram: 'https://t.me/tukpb',
        coOwnerTelegram: 'https://t.me/fx_moli'
    },
    products: {
        vanilla: [
            { id: 'vip', name: 'VIP Статус', price: 150, funpay: 'https://funpay.com/lots/offer?id=72651450' },
            { id: 'premium', name: 'Premium', price: 350, funpay: 'https://funpay.com/lots/offer?id=72651375' },
            { id: 'fly-day', name: 'Режим Полёта', price: 25, funpay: 'https://funpay.com/lots/offer?id=72679394' },
            { id: 'unban', name: 'Разбан', price: 100, funpay: 'https://funpay.com/lots/offer?id=72651561' },
            { id: 'unmute', name: 'Размут', price: 50, funpay: 'https://funpay.com/lots/offer?id=72632098' }
        ],
        anarchy: [
            { id: 'case', name: 'Донат-Кейс', price: 39 },
            { id: 'titan', name: 'Титан', price: 790 },
            { id: 'unban', name: 'Разбан', price: 100 },
            { id: 'unmute', name: 'Размут', price: 50 }
        ]
    }
};
