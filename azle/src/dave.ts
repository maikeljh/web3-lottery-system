import {
    blob,
    Canister,
    nat64,
    Principal,
    query,
    update,
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
});
type User = typeof User.tsType;
const UserPayload = Record({
    name: text,
    points: nat64,
})
  
type UserPayload = typeof UserPayload.tsType;
let users = StableBTreeMap<Principal, User>(0);
export default Canister({
    createUser: update([UserPayload], Result(User, text), (payload) => {
        if (!payload.name || !payload.points){
            return Err("Invalid input")
        }
        const id = generateId();
        const user: User = {
            id,
            name : payload.name,
            points: payload.points
        };
        users.insert(user.id, user);
        return Ok(user);
    }),
    getUsers: query([], Vec(User), () =>{
        return users.values();
      }),

    getLeaderboard: query([], Result(Vec(User), text), () => {
        const leaderboard = users.values();
        const sorted = leaderboard.sort((a: User, b: User) => Number(b["points"])-Number(a["points"])); // descending = b-a, ascending = a-b
        if(sorted.length > 0){
            return Ok(sorted);
        }
        return Err("User doesnt exist");
    }),
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}


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
