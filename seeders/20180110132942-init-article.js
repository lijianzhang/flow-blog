

module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert('Articles', [{
            content: ' title: ES6 中那些被忽略的优雅方法(date: 2016-11-0<!--more--><!-- more -->6 10:37:14 tags: JavaScript --- **最近重新回顾了es6一些新特性,发现了一些挺实用,在开发中却被我忽略的方法。**',
            title: 'test',
            user_id: 1,
            updatedAt: '2018-01-10T13:31:22.293Z',
            createdAt: '2018-01-10T13:31:22.293Z',
            description: '<p> title: ES6 中那些被忽略的优雅方法(date: 2016-11-0<!--more--></p>\n',
            contentHTML: '<p> title: ES6 中那些被忽略的优雅方法(date: 2016-11-0<!--more--><!-- more -->6 10:37:14 tags: JavaScript --- <strong>最近重新回顾了es6一些新特性,发现了一些挺实用,在开发中却被我忽略的方法。</strong></p>\n',
        }], {});
    },

    down(queryInterface) {
        return queryInterface.bulkDelete('Articles', null, {});
    },
};
