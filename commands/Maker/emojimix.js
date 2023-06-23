'use strict';

export default {
    views: ['emojimix < text >'], // view for message in  menu
    command: /^(emojimix|mix)$/i, //another command.
    description: 'Create Emoji Mix',
    usage: '%cmd% 😘👩',
    query: true,
    execute: async ({ xcoders, m, x, apikeys, emojiRegex, query, waitingMessage, errorMessage, host, getJson, addHitCommand }) => {
        try {
            const regex = emojiRegex();
            const matchedEmoji = [...query.matchAll(regex)];
            if (matchedEmoji.length > 2 || matchedEmoji.length < 2) return errorMessage(m.chat, `Emoji tidak boleh lebih dari ${matchedEmoji.length}`);
            const emoji = matchedEmoji.map(match => match[0]);
            const data = await getJson(`${host}/api/maker/emoji-mix?emoji=${emoji[0]}&emoji2=${emoji[1]}&result_type=json&apikey=${apikeys}`);
            const result = Buffer.from(data, 'buffer');
            await waitingMessage(m.chat);
            addHitCommand('Emoji Mix', true);
            return xcoders.sendMessage(m.chat, { image: result, caption: response.success }, { quoted: x });
        } catch (error) {
            return errorMessage(m.chat, error, 'Emoji Mix');
        }
    }
};