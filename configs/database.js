var database = {
    
    Mysql : {
        typeName: 'Mysql',           //数据库类型名称
        host    : '148.70.205.205',
        user: 'root',
        password: 'femsQuan@666',
        database: 'report_online'
    },

    Mariadb : {
        typeName: 'Mariadb',     //数据库类型名称
        host    : 'localhost',
        user    : 'root',
        password: '123456',
        database: 'test'
    },

    Redis : {
        typeName: 'Redis',
        port: 6379,
        host: '127.0.0.1'
    }


}

exports.database = database;