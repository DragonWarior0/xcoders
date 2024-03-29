'use strict';

export default {
    views: ['xnxx < url >'], // view for message in  menu
    command: /^(xnxxdl|xnxx)$/i, //another command.
    description: 'Download Files from Xnxx Url',
    query: true,
    url: true,
    usage: '%cmd% url Xnxx',
    execute: async ({ xcoders, x, m, query, styleMessage, invalidUrlMessage, errorMessage, waitingMessage, apikeys, regex, host, getMessage, parseResult, getJson, addHitCommand }) => {
        try {
            if (!regex.media(query)) return invalidUrlMessage(m.chat);
            const data = await getJson(`${host}/api/download/xnxx?url=${query}&apikey=${apikeys}`);
            if (!data.status) return errorMessage(m.chat, getMessage(data), 'Xnxx Downloader');
            await waitingMessage(m.chat);
            const result = parseResult(data.result);
            const caption = styleMessage('Xnxx Downloader', result);
            addHitCommand('Xnxx Downloader', true);
            return xcoders.sendFileFromUrl(m.chat, data.result.url, caption, x, { thumbnail: null });
        } catch (error) {
            return errorMessage(m.chat, error, 'Xnxx Downloader');
        }
    }
};