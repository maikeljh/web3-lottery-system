import { Nat64 } from '@dfinity/candid/lib/cjs/idl';
import {
    blob,
    Canister,
    nat64,
    Principal,
    query,
    Record,
    StableBTreeMap,
    text,
    Vec,
    Result,
    Opt,
    Err,
    Ok
} from 'azle';

const User = Record({
    id: Principal,
    name: text,
    points: nat64,
    avatar: blob,
});
  
type User = typeof User.tsType;
let users = StableBTreeMap<Principal, User>(0);
export default Canister({
    getUsers: query([], Vec(User), () =>{
        return users.values();
      }),
    getLeaderboard: query([], Vec(User), () =>{
        return users.values();
    }),

    sort: query([Vec(User), text], Result(Vec(User), text), (leaderboard, status) => {
        const sorted = leaderboard.sort(); // PR: ascending descending, points focused
        if(sorted){
            return Ok(sorted);
        }
        return Err("User doesnt exist");
    }),
})


// function mergeSort(arra: Vec(User)): Vec(User) {
//     if (arra.length <= 1) {
//         return arr;
//     }

//     const middle = Math.floor(arr.length / 2);
//     const left = arr.slice(0, middle);
//     const right = arr.slice(middle);

//     return merge(mergeSort(left), mergeSort(right));

// function merge(left, right) {
//     let result = [];
//     let leftIndex = 0;
//     let rightIndex = 0;

//     while (leftIndex < left.length && rightIndex < right.length) {
//         if (left[leftIndex].points > right[rightIndex].points) {
//             result.push(left[leftIndex]);
//             leftIndex++;
//         } else {
//             result.push(right[rightIndex]);
//             rightIndex++;
//         }
//     }

//     return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
// }
// }
