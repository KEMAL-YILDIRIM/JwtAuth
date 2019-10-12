import { compare, hash } from 'bcryptjs';
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { setRefreshToken } from '../helpers/CookieManager';
import { createAccessToken, createRefreshToken } from '../helpers/TokenProvider';
import { IExpressContext } from '../interfaces/IExpressContext';
import { IsAuthenticated } from '../Middlewares/IsAuthenticated';
import { LoginResponse } from '../typeGraphQL/LoginResponse';
import { verify } from 'jsonwebtoken';

@Resolver()
export class UserResolver {
    @Query(() => String)
    Greetings() {
        return "Greeting trevelers!";
    }

    @Query(() => String)
    @UseMiddleware(IsAuthenticated)
    Authenticate(@Ctx() { payload }: IExpressContext) {
        return `Your user number is : ${payload!.userId}`;
    }

    @Query(() => [User])
    GetAllUsers() {
        return User.find();
    }

    @Query(() => User, { nullable: true })
    Me(
        @Ctx() context: IExpressContext
    ) {
        const authorization = context.req.headers['authorization'];

        if (!authorization) {
            return null;
        }

        try {

            const token = authorization.split(' ')[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            context.payload = payload as any;
            return User.findOne(payload.userId)
        } catch (error) {
            console.error(error);
            throw new Error('Me Failed!');
        }
    }

    @Mutation(() => LoginResponse)
    async Login(
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

        setRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    @Mutation(() => Boolean)
    async Logout(@Ctx() {res}: IExpressContext) {

        setRefreshToken(res,"");
        return true;
    }

    @Mutation(() => Boolean)
    async ForgotPassword(
        @Arg('userId', () => Int) userId: number) {

        // revoke refresh token
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => Boolean)
    async Register(@Arg('email') email: string, @Arg('password') password: string, ) {
        const hashedPassword = await hash(password, 8);

        try {

            await User.insert({ email, password: hashedPassword });

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
