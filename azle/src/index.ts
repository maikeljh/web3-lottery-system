import {
  Canister,
  nat32,
  update,
  Principal,
  Record,
  text,
  nat64,
  blob,
} from "azle";

/**
 * This type represents a user
 */
const User = Record({
  id: Principal,
  name: text,
  points: nat64,
  avatar: blob,
});

type User = typeof User.tsType;

export default Canister({
  randomNumber: update([], nat32, () => {
    return parseInt(String(Math.random() * 10 ** 8));
  }),
});
