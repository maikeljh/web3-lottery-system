import {
    blob,
    AzleText,
    Canister,
    ic,
    Err,
    nat64,
    bool,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec,
    float64,
    int
} from 'azle';

// Interfaces used for Lottery
enum LotteryType {
    Private = "PRIVATE",
    Public = "PUBLIC",
    Group = "GROUP"
}

const User = Record({
    id: Principal,
    name: text,
    points: nat64,
    avatar: blob,
    hostedLotteries: Vec(Principal),
    participatedLotteries: Vec(Principal),
});
  
type User = typeof User.tsType;

const PrizeDAO = Record({
    id: Principal,
    name: text,
    quantity: nat64
})
type PrizeDAO = typeof PrizeDAO.tsType

const PrizePayload = Record({
    name: text,
    quantity: nat64
})
type PrizePayload = typeof PrizePayload.tsType

const LotteryDAO = Record({
    id: Principal,
    types: text,
    title: text,
    description: text,
    prizes: Vec(PrizeDAO),
    participants: Vec(Principal),
    participantsAmount: int,
    hostId: Principal,
    winners: Vec(Principal),
    createdAt: nat64,
    endedAt: nat64,
    lotteryBanner: blob,
    isCompleted: bool,
})
type LotteryDAO = typeof LotteryDAO.tsType

const LotteryPayload = Record({
    types: text,
    title: text,
    description: text,
    prizes: Vec(PrizePayload),
    hostId: Principal,
    createdAt: nat64,
    endedAt: nat64,
    lotteryBanner: blob,
})
type LotteryPayload = typeof LotteryPayload.tsType

const LotteryDetailPayload = Record({
    id: Principal,
    types: text,
    title: text,
    description: text,
    prizes: Vec(PrizeDAO),
    participants: Vec(User),
    participantsAmount: int,
    hostId: Principal,
    winners: Vec(Principal),
    createdAt: nat64,
    endedAt: nat64,
    lotteryBanner: blob,
    isCompleted: bool,
})
type LotteryDetailPayload = typeof LotteryDetailPayload.tsType

const Error = Variant({
    InvalidPayload: text,
    InvalidId: text,
    Fail: text,
    AlreadyJoined: text,
})

let users = StableBTreeMap<Principal, User>(0);
let prizes = StableBTreeMap<Principal, PrizeDAO>(1);
let lotteries = StableBTreeMap<Principal, LotteryDAO>(2);

export default Canister({
    createLottery: update([LotteryPayload], Result(LotteryDAO, Error), (payload) => {
        try {
            // Validating payload attributes
            if (!payload.types || !payload.title || !payload.description || !payload.prizes || !payload.hostId || !payload.createdAt || !payload.endedAt || !payload.lotteryBanner) {
                return Err({ InvalidPayload: `Payload is not valid!`})
            }

            const userOpt = users.get(payload.hostId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }
            const user = userOpt.Some
            
            let lotteryPrizes: PrizeDAO[] = []

            payload.prizes.forEach((prizepayload) => {
                let prizeId = generateId()

                while(!("None" in prizes.get(prizeId))) {
                    prizeId = generateId()
                }

                // Create new prize
                const prize = {
                    id: prizeId,
                    ...prizepayload
                }

                prizes.insert(prize.id, prize)

                lotteryPrizes = [...lotteryPrizes, prize   ]
            })
            
            let lotteryId = generateId()

            while(!("None" in lotteries.get(lotteryId))) {
                lotteryId = generateId()
            }

            const lottery = {
                id: lotteryId,
                participants: [],
                participantsAmount: 0n,
                winners: [],
                isCompleted: false,
                types: payload.types,
                description: payload.description,
                title: payload.title,
                prizes: lotteryPrizes,
                hostId: payload.hostId,
                createdAt: payload.createdAt,
                endedAt: payload.endedAt,
                lotteryBanner: payload.lotteryBanner
            }

            lotteries.insert(lottery.id, lottery)

            user.participatedLotteries.push(lotteryId)
            users.insert(payload.hostId, user)

            return Ok(lottery);
        } catch (error: any) {
            return Err({Fail : `Failed to add project: ${error}`})
        }
    }),

    detailLottery: query([Principal], Result(LotteryDetailPayload, Error), (lotteryId) => {
        try {
            // Validating lottery id
            if (!lotteryId) {
                return Err({ InvalidPayload: `Id is not valid!` });
            }

            let lotteryParticipants: User[] = []

            const lotteryOpt = lotteries.get(lotteryId)

            if ("None" in lotteryOpt) {
                return Err({
                    InvalidId: `Lottery with that id doesn't exist`
                })
            }

            const lottery = lotteryOpt.Some

            lottery.participants.forEach((userId) => {
                const userOpt = users.get(userId)
                
                if ("None" in userOpt) {
                    return Err({
                        InvalidId: `Lottery with that id doesn't exist`
                    })
                }

                let user = userOpt.Some

                lotteryParticipants = [...lotteryParticipants, user]
            })

            const detailLottery: LotteryDetailPayload = {
                id: lottery.id,
                types: lottery.types,
                title: lottery.title,
                description: lottery.description,
                prizes: lottery.prizes,
                participants: lotteryParticipants,
                participantsAmount: BigInt(lotteryParticipants.length),
                hostId: lottery.id,
                winners: lottery.winners,
                createdAt: lottery.createdAt,
                endedAt: lottery.endedAt,
                lotteryBanner: lottery.lotteryBanner,
                isCompleted: lottery.isCompleted,
            }

            return Ok(detailLottery);
        } catch (error:any) {
            return Err({
                Fail : `Failed to get lottery detail: ${error}`
            })
        }
    }),

    joinLottery: update([Principal, Principal], Result(text, Error), (lotteryId, userId)=>
    {
        try {

            // validating lottery
            if (!lotteryId) {
                return Err({ InvalidPayload: `Lottery Id is not valid!` });
            }

            const lotteryOpt = lotteries.get(lotteryId);
            if ("None" in lotteryOpt) {
                return Err({ InvalidId: `Lottery with that id doesn't exist` });
            }
            const lottery = lotteryOpt.Some

            // validating user
            if (!userId) {
                return Err({ InvalidPayload: `User Id is not valid!` });
            }
            const userOpt = users.get(userId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }
            const user = userOpt.Some

            // validating joined user
            if (lottery.participants.includes(userId)) {
                return Err({ AlreadyJoined: `User with that id has already joined the lottery` });
            }

            // user join the lottery
            lottery.participants.push(userId)
            lottery.participantsAmount = BigInt(lottery.participants.length)
            lotteries.insert(lotteryId, lottery)

            user.participatedLotteries.push(lotteryId)
            users.insert(userId, user)

            return Ok("User joined the lottery successfully")

        } catch (error:any){
            return Err({
                Fail: `Failed to join the lottery: ${error}`
            })
        }
    }),
    listPublicLotteries: query([], Result(Vec(LotteryDAO), Error), () => {
        try {
            const publicLotteries = lotteries.values().filter((lottery) => {
                return lottery.types === LotteryType.Public && lottery.isCompleted === false;
            });
        
            return Ok(publicLotteries);
        } catch (error:any){
            return Err({
                Fail: `Failed to display public lotteries: ${error}`
            })
        }
    }),
    hostedOngoingLotteries: query([Principal], Result(Vec(LotteryDAO), Error), (userId) => {
        try {

            // validating user
            if (!userId) {
                return Err({ InvalidPayload: `User Id is not valid!` });
            }
            const userOpt = users.get(userId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }

            const hostedOngoingLotteries = lotteries.values().filter((lottery) => {
                return lottery.hostId === userId && lottery.isCompleted === false;
            });
        
            return Ok(hostedOngoingLotteries);
        } catch (error:any){
            return Err({
                Fail: `Failed to display ongoing hosted lotteries: ${error}`
            })
        }
    }),
    hostedCompletedLotteries: query([Principal], Result(Vec(LotteryDAO), Error), (userId) => {
        try {

            // validating user
            if (!userId) {
                return Err({ InvalidPayload: `User Id is not valid!` });
            }
            const userOpt = users.get(userId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }

            const hostedCompletedLotteries = lotteries.values().filter((lottery) => {
                return lottery.hostId === userId && lottery.isCompleted === true;
            });
        
            return Ok(hostedCompletedLotteries);
        } catch (error:any){
            return Err({
                Fail: `Failed to display completed hosted lotteries: ${error}`
            })
        }
    }),
    participatedOngoingLotteries: query([Principal], Result(Vec(LotteryDAO), Error), (userId) => {
        try {

            // validating user
            if (!userId) {
                return Err({ InvalidPayload: `User Id is not valid!` });
            }
            const userOpt = users.get(userId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }

            const participatedOngoingLotteries = lotteries.values().filter((lottery) => {
                return lottery.participants.includes(userId) && lottery.hostId !== userId && lottery.isCompleted === false;
            });
        
            return Ok(participatedOngoingLotteries);
        } catch (error:any){
            return Err({
                Fail: `Failed to display ongoing participated lotteries: ${error}`
            })
        }
    }),
    participatedCompletedLotteries: query([Principal], Result(Vec(LotteryDAO), Error), (userId) => {
        try {

            // validating user
            if (!userId) {
                return Err({ InvalidPayload: `User Id is not valid!` });
            }
            const userOpt = users.get(userId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }

            const participatedCompletedLotteries = lotteries.values().filter((lottery) => {
                return lottery.participants.includes(userId) && lottery.hostId !== userId && lottery.isCompleted === true;
            });
        
            return Ok(participatedCompletedLotteries);
        } catch (error:any){
            return Err({
                Fail: `Failed to display completed participated lotteries: ${error}`
            })
        }
    }),
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

