import { hash } from 'bcryptjs';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';


@Resolver()
export default class UserResolver {
    @Query(() => String)
    greetings() {
        return "Greeting trevelers!";
    }

    @Mutation(() => boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const hashedPassword = await hash(password, 23);

        try {

            await User.insert({
                email,
                password: hashedPassword
            });

            return true;


        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
