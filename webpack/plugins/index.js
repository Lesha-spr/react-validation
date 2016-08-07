'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = [
    require('./define')
];

if (NODE_ENV === 'production') {
    module.exports.push(require('./uglify'));
}