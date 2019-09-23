import { hash } from 'bcryptjs';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';


@Resolver()
export default class UserResolver {
    @Query(() => String)
    Greetings() {
        return "Greeting trevelers!";
    }

    @Query(() => [User])
    GetAllUsers() {
        return User.find();
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const hashedPassword = await hash(password, 8);

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
