const app = require('./app')
const { port } = require('./config/config.env')

app.listen(port, () => {
    console.log(`listening on ${port}`)
})