var database = {
    
    Mysql : {
        typeName: 'Mysql',           //数据库类型名称
        host    : '192.168.1.193',
        //host    : '127.0.0.1',
        user: 'www',
        //user    : 'root',
        password: '123456',
        //password: 'root',
        database: 'ranyun_shop'
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