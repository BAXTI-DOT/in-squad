import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import modules from './modules'

const server = new ApolloServer({
    modules
})

server.listen(4040, console.log(4040))