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
    createdAt: nat64,
    endedAt: nat64,
    lotteryBanner: blob,
    isCompleted: bool,
})
type LotteryDetailPayload = typeof LotteryDetailPayload.tsType

const CompletedLotteryPayload = Record({
    id: Principal,
    types: text,
    title: text,
    description: text,
    prizes: Vec(PrizeDAO),
    participants: Vec(User),
    participantsAmount: int,
    winners: Vec(User),
    hostId: Principal,
    createdAt: nat64,
    endedAt: nat64,
    lotteryBanner: blob,
    isCompleted: bool,
})
type CompletedLotteryPayload = typeof CompletedLotteryPayload.tsType


/* Nah gw masih ragu Roles ini perlu id unik ga tapi setelah dipikir" perlu buat stableBtreeMap nya atau kalau ga ntar
harus kaya UserRole harus bikin interface baru buat key stableBTreeMap nya groupId sm name nurut kalian gimana
*/
const Roles = Record({
    id: Principal, 
    groupId: Principal,
    name: text,
    rank: int
})
type Roles = typeof Roles.tsType

const RolesPayload = Record({
    name: text,
    rank: int
})
type RolesPayload = typeof RolesPayload.tsType

const UserRole = Record({
    userId: Principal,
    groupId: Principal,
    username: text,
    userRole: text
})
type UserRole = typeof UserRole.tsType


/* Oke jadi intinya si UserGroup ini gua pake buat jadi key stablebtreemap userroles
nah jadi kalau misal nanti mau bikin function yang nge assign role ke user di sebuah grup
sebelum masukin ke userroles nanti bikin dulu variabel UserGroup buat jadi keynya biar bisa dimasukin
 */
const UserGroup = Record({
    userId: Principal,
    groupId: Principal,
})
type UserGroup = typeof UserGroup.tsType

const GroupDAO = Record({
    id: Principal,
    name: text,
    groupLotteries: Vec(Principal),
    avatar: blob,
    ownerId: Principal,
    members: Vec(Principal),
    roles: Vec(Roles)
})
type GroupDAO = typeof GroupDAO.tsType

const GroupPayload = Record({
    name: text,
    roles: Vec(RolesPayload),
    avatar: blob,
    ownerId: Principal
})
type GroupPayload = typeof GroupPayload.tsType

const EditGroupPayload = Record({
    id: Principal,
    name: text,
    roles: Vec(RolesPayload),
    avatar: blob
})
type EditGroupPayload = typeof EditGroupPayload.tsType

const DetailGroupPayload = Record({
    id: Principal,
    name: text,
    groupLotteries: Vec(LotteryPayload),
    avatar: blob,
    ownerId: Principal,
    members: Vec(UserRole),
    roles: Vec(Roles)
})
type DetailGroupPayload = typeof DetailGroupPayload.tsType

const Error = Variant({
    InvalidPayload: text,
    InvalidId: text,
    Fail: text
})

let users = StableBTreeMap<Principal, User>(0);
let prizes = StableBTreeMap<Principal, PrizeDAO>(1);
let lotteries = StableBTreeMap<Principal, LotteryDAO>(2);
let roles = StableBTreeMap<Principal, Roles>(3);
let groups = StableBTreeMap<Principal, GroupDAO>(4);
let userroles = StableBTreeMap<UserGroup, UserRole>(5);

export default Canister({
    createLottery: update([LotteryPayload], Result(LotteryDAO, Error), (payload) => {
        try {
            // Validating payload attributes
            if (!payload.types || !payload.title || !payload.description || !payload.prizes || !payload.hostId || !payload.createdAt || !payload.endedAt || !payload.lotteryBanner) {
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
                        InvalidId: `User with that id doesn't exist`
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

    completedLotteryDetail: update([Principal], Result(CompletedLotteryPayload, Error), (lotteryId) => {
        try {
            // Validating lottery id
            if (!lotteryId) {
                return Err({ InvalidPayload: `Lottery id is not valid!` });
            }

            let lotteryParticipants: User[] = []

            let lotteryWinners: User[] = []

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
                        InvalidId: `User with that id doesn't exist`
                    })
                }

                let user = userOpt.Some

                lotteryParticipants = [...lotteryParticipants, user]
            })

            lottery.winners.forEach((userId) => {
                const winnerOpt = users.get(userId)

                if ("None" in winnerOpt) {
                    return Err({
                        InvalidId: `USer with that id doesn't exist`
                    })
                }

                let winner = winnerOpt.Some

                lotteryWinners = [...lotteryWinners, winner]
            })

            const detailCompletedLottery: CompletedLotteryPayload = {
                id: lottery.id,
                types: lottery.types,
                title: lottery.title,
                description: lottery.description,
                prizes: lottery.prizes,
                participants: lotteryParticipants,
                participantsAmount: BigInt(lotteryParticipants.length),
                winners: lotteryWinners,
                hostId: lottery.id,
                createdAt: lottery.createdAt,
                endedAt: lottery.endedAt,
                lotteryBanner: lottery.lotteryBanner,
                isCompleted: lottery.isCompleted,
            }

            return Ok(detailCompletedLottery);
        } catch (error:any) {
            return Err({
                Fail : `Failed to get lottery detail: ${error}`
            })
        }
    }),

    createGroup: update([GroupPayload], Result(GroupDAO, Error), (payload) => {
        try {
            if (!payload.avatar || !payload.name || !payload.roles || !payload.ownerId) {
                return Err({
                    InvalidPayload: `Payload is not valid!`
                })
            }

            let groupId = generateId()

            while(!("None" in groups.get(groupId))) {
                groupId = generateId()
            }

            let groupRoles: Roles[] = []

            payload.roles.forEach((groupRole) => {
                let roleId = generateId()

                while(!("None" in groups.get(roleId))) {
                    roleId = generateId()
                }
                const role = {
                    id: roleId,
                    groupId: groupId,
                    ...groupRole
                }

                roles.insert(role.id, role)

                groupRoles = [...groupRoles, role]
            })

            const group = {
                id: groupId,
                name: payload.name,
                groupLotteries: [],
                avatar: payload.avatar,
                ownerId: payload.ownerId,
                members: [],
                roles: groupRoles
            }

            groups.insert(group.id, group)

            return Ok(group);
        } catch(error: any) {
            return Err({
                Fail: `Failed creatin group: ${error}`
            })
        }
    }),

    detailGroup: query([Principal], Result(DetailGroupPayload, Error), (groupId) => {
        try {
            // Validating group id
            if (!groupId) {
                return Err({ InvalidPayload: `Id is not valid!` });
            }

            let groupMembers: UserRole[] = [];

            let groupLotteries: LotteryPayload[] = [];

            const groupOpt = groups.get(groupId)

            if ("None" in groupOpt) {
                return Err({
                    InvalidId: `Group with that id doesn't exist`
                })
            }

            const group = groupOpt.Some

            group.groupLotteries.forEach((lotteryId) => {
                const lotteryOpt = lotteries.get(lotteryId)

                if ("None" in lotteryOpt) {
                    return Err({
                        InvalidId: `Lottery with that id doesn't exist`
                    })
                }

                let lottery = lotteryOpt.Some

                groupLotteries = [...groupLotteries, lottery]
            })

            group.members.forEach((userId) => {
                const userGroup: UserGroup = {
                    userId: userId,
                    groupId: group.id
                }

                const userroleOpt = userroles.get(userGroup)

                if ("None" in userroleOpt) {
                    return Err({
                        InvalidId: `Information of user's role doesn't exist`
                    })
                }

                let userrole = userroleOpt.Some

                groupMembers = [...groupMembers, userrole]
            })

            const detailgroup: DetailGroupPayload = {
                id: group.id,
                name: group.name,
                groupLotteries: groupLotteries,
                avatar: group.avatar,
                ownerId: group.ownerId,
                members: groupMembers,
                roles: group.roles
            }

            return Ok(detailgroup);
        } catch (error:any) {
            return Err({
                Fail : `Failed to get group detail: ${error}`
            })
        }
    }),

    listGroups: query([], Vec(GroupPayload), () => {
        return groups.values()
    }),

    editMemberRole: update([UserRole], Result(UserRole, Error), (payload) => {
        try {
            if (!payload.groupId || !payload.userId || !payload.userRole || !payload.username) {
                return Err({
                    InvalidPayload: `Payload is not valid!`
                })
            }

            const dummyUG = {
                userId: payload.userId,
                groupId: payload.groupId
            }

            const userGroupOpt = userroles.get(dummyUG)

            if ("None" in userGroupOpt) {
                return Err({
                    InvalidId: `Information of user's role doesn't exist`
                })
            }

            let userGroup = userGroupOpt.Some

            userGroup.userRole = payload.userRole

            return Ok(userGroup);
        } catch (error: any) {
            return Err({
                Fail: `Failed to edit user's role ${error}`
            })
        }
    }),

    removeMember: update([Principal, Principal], Result(GroupDAO, Error), (userId, groupId) => {
        try {
            if (!userId || !groupId) {
                return Err({
                    InvalidPayload: `Payload is not valid!`
                })
            }

            const userOpt = users.get(userId)

            const groupOpt = groups.get(groupId)

            if ("None" in userOpt) {
                return Err({
                    InvalidId: `User with that id doesn't exist`
                })
            }

            if ("None" in groupOpt) {
                return Err({
                    InvalidId: `Group with that id doesn't exist`
                })
            }

            let group = groupOpt.Some

            group.members.filter((memberId) => 
                memberId.toText() !== userId.toText()
            )

            return Ok(group);
        } catch (error: any) {
            return Err({
                Fail: `Fail to remove member: ${error}`
            })
        }
    }),

    editGroup: update([EditGroupPayload], Result(GroupDAO, Error), (payload) => {
        try {
            if (!payload.avatar || !payload.id || !payload.name || !payload.roles) {
                return Err({
                    InvalidPayload: `Payload is not valid!`
                })
            }

            const groupOpt = groups.get(payload.id);

            if ("None" in groupOpt) {
                return Err({
                    InvalidId: `Group with that id doesn't exist`
                })
            }

            let group = groupOpt.Some

            // Delete existing roles first from the group so there is no duplicate
            roles.values().filter((role) => 
                role.groupId.toText() !== group.id.toText()
            )

            let groupRoles: Roles[] = []

            payload.roles.forEach((groupRole) => {
                let roleId = generateId()

                while(!("None" in groups.get(roleId))) {
                    roleId = generateId()
                }
                const role = {
                    id: roleId,
                    groupId: group.id,
                    ...groupRole
                }

                roles.insert(role.id, role)

                groupRoles = [...groupRoles, role]
            })

            group.name = payload.name
            group.avatar = payload.avatar
            group.roles = groupRoles

            return Ok(group);
        } catch (error: any) {
            return Err({
                Fail: `Fail to edit group: ${error}`
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

