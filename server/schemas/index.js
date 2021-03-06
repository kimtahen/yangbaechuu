const mongoose = require('mongoose')

module.exports = (dbPort) => {
    const connect = () => {
        mongoose.set('debug', true)
        mongoose.connect(`mongodb://root@localhost:${dbPort}`, {
            dbName: 'yangbaechuu'
        }, (error) => {
            if (error) {
                console.log('MongoDB 연결 에러', error)
            } else {
                console.log('MongoDB 연결 성공')
            }
        })
    }

    connect()

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB 연결 에러', error)
    });
    mongoose.connection.on('disconnected', () => {
        console.error('MongoDB 연결이 끊겼습니다. 연결을 재시도합니다.')
        connect();
    });
}