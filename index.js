const request = require('request-promise');
const cheerio = require('cheerio');

const YP = 'HAQVlAQD2AmZ3AQR0AwL1Zt';
const YJ = 'HZGV0ZwD5ZmV5AmtjZwN0Zt';
const SPAM = 'false';
const V = '2.6';

const contains = (a, b) => {
    return a.toLowerCase().indexOf(b) >= 0;
}

const inbox = (id, phrase, p = 1) => {
    return request.get(`http://m.yopmail.com/en/inbox.php?login=${id}&p=${p}&d=&ctrl=&scrl=&spam=${SPAM}&yf=005&yp=${YP}&yj=${YJ}&v=${V}&r_c=&id=`)
        .then((result) => {
            const $ = cheerio.load(result);
            const mails = [];
            let found = false;

            $('.lm_m').each((index, element) => {
                const el = $(element);
                const mail = ({
                    index,
                    when: el.find('.lmh').text(),
                    from: el.find('.lmf').text(),
                    subject: el.find('.lms_m').text(),
                    href: 'http://m.yopmail.com/en/' + el.attr('href'),
                    html: el.html()
                });

                if (phrase && !found) {
                    console.log('PHRASE', phrase, mail.from, mail.subject);
                    found = contains(mail.from, phrase) ||
                        contains(mail.subject, phrase);
                }

                mails.push(mail);
            });

            return {found, mails};
        });
}

module.exports = inbox;
