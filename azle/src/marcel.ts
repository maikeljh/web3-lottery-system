import {
    blob,
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
    type: text,
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
    type: text,
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
    type: text,
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
    Fail: text
})

let users = StableBTreeMap<Principal, User>(0);
let prizes = StableBTreeMap<Principal, PrizeDAO>(1);
let lotteries = StableBTreeMap<Principal, LotteryDAO>(2);

export default Canister({
    createLottery: update([LotteryPayload], Result(LotteryDAO, Error), (payload) => {
        try {
            // Validating payload attributes
            if (!payload.type || !payload.title || !payload.description || !payload.prizes || !payload.hostId || !payload.createdAt || !payload.endedAt || !payload.lotteryBanner) {
                return Err({ InvalidPayload: `Payload is not valid!`})
            }
            
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
                type: payload.type,
                description: payload.description,
                title: payload.title,
                prizes: lotteryPrizes,
                hostId: payload.hostId,
                createdAt: payload.createdAt,
                endedAt: payload.endedAt,
                lotteryBanner: payload.lotteryBanner
            }

            lotteries.insert(lottery.id, lottery)

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
                type: lottery.type,
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
    })
})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

