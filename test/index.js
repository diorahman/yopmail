const test = require('tape');
const yopmail = require('../');

test('mails', t => {
    t.plan(1);
    yopmail('dio')
        .then(({mails}) => {
            t.equal(mails.length > 0, true);
        })
        .catch((err) => {
            // break!
        });
});

test('found', t => {
    t.plan(1);
    yopmail('dio', 'bit')
        .then(({found}) => {
            t.equal(found, true);
        })
        .catch((err) => {
            // break!
        });
});
