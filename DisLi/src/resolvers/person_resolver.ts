import { Resolver, Mutation, Query, Arg } from "type-graphql";
// import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { Person, UserRole } from "../entity/person";
// import { Equal } from "typeorm";
// import { MyContext } from "src/utils/MyContext";
// import { isAuth } from "../utils/isAuth";

@Resolver()
export class person_resolver {
  @Query(() => Boolean)
  async me() {
    return true;
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  async register(
    @Arg("uni_id", () => String) uni_id: string,
    @Arg("role_id", () => String) role_id: UserRole
  ) {
    // @Arg("responder_id", () => String) responder_id: string // @Ctx() { payload }: MyContext,

    try {
      const aUser = Person.create({
        university_id: uni_id,
        email: "lol@lol.lol",
        first_name: "Alice",
        last_name: "lol",
        phone_number: "666-555-5555",
        role: role_id,
        verified: true,
      });

      await Person.insert(aUser);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
