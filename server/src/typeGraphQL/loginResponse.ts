import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class loginResponse {
    @Field()
    accessToken: string;
}
