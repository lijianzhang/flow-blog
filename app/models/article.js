/*
 * @Author: lijianzhang
 * @Date: 2018-01-07 21:18:50
 * @Last Modified by: lijianzhang
 * @Last Modified time: 2018-01-10 21:21:11
 */

import Sequelize from 'sequelize';
import marked from 'marked';
import hljs from 'highlight.js';
import BaseDBModel, { Attr } from '../lib/base-db-model';

marked.setOptions({
    langPrefix: 'hljs ',
    highlight(code) {
        return hljs.highlightAuto(code).value;
    },
});

export default class Article extends BaseDBModel {
    @Attr({
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Attr({
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    userId: number;

    @Attr({
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [0, 50],
        },
    })
    title: string;

    @Attr({
        type: Sequelize.TEXT,
    })
    description: string;

    @Attr({
        type: Sequelize.TEXT,
        allowNull: false,
    })
    content: string;

    @Attr({
        type: Sequelize.TEXT,
    })
    contentHTML: string;
}

Article.init();


Article.hook('beforeSave', (article: Article) => {
    const descriptionIndex = article.content.indexOf('<!-- more -->');
    article.description = marked(article.content.slice(0, descriptionIndex));
    article.contentHTML = marked(article.content);
});
