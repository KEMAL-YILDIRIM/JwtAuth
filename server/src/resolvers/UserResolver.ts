import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IExpressContext } from '../interfaces/IExpressContext';
import { LoginResponse } from '../typeGraphQL/LoginResponse';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
    @Query(() => String)
    Greetings() {
        return "Greeting trevelers!";
    }

    @Query(() => [User])
    GetAllUsers() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: IExpressContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user)
            throw new Error('User not exist.');

        const valid = await compare(password, user.password);
        if (!valid)
            throw new Error('Incorrect password.');

        console.log(res);

        res.cookie('jwtAuthCookie',
            sign({ userId: user.id }, 'secretJwtAuthenticationCookie', { expiresIn: '3d' }),
            { httpOnly: true });

        return {
            accessToken: sign({ userId: user.id }, 'secretJwtAuthentication', { expiresIn: '20m' })
        };
    }

    @Mutation(() => Boolean)
    async register(@Arg('email') email: string, @Arg('password') password: string, ) {
        const hashedPassword = await hash(password, 8);

        try {

            await User.insert({ email, password: hashedPassword });

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
