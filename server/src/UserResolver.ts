import { Resolver, Query } from 'type-graphql'


@Resolver()
export default class UserResolver {
    @Query(() => String)
    greetings() {
        return "Greeting trevelers!";
    }
}