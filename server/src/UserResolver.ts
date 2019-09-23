import { Resolver, Query, mutations, Arg, Mutation } from 'type-graphql'


@Resolver()
export default class UserResolver {
    @Query(() => String)
    greetings() {
        return "Greeting trevelers!";
    }

    @Mutation()
    register(
        @Arg('email') email:string,
        @Arg('password') password:string,
    )
}
