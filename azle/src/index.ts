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
  int,
} from "azle";

const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");

// Interfaces used for Lottery
enum LotteryType {
  Private = "PRIVATE",
  Public = "PUBLIC",
  Group = "GROUP",
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

const UserPayload = Record({
  name: text,
  points: nat64,
  avatar: blob,
  hostedLotteries: Vec(Principal),
  participatedLotteries: Vec(Principal),
});

type UserPayload = typeof UserPayload.tsType;

const PrizeDAO = Record({
  id: Principal,
  name: text,
  quantity: nat64,
});
type PrizeDAO = typeof PrizeDAO.tsType;

const PrizePayload = Record({
  name: text,
  quantity: nat64,
});
type PrizePayload = typeof PrizePayload.tsType;

const LotteryDAO = Record({
  id: Principal,
  types: text,
  groupId: Opt(Principal),
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
});
type LotteryDAO = typeof LotteryDAO.tsType;

const LotteryPayload = Record({
  types: text,
  groupId: Opt(Principal),
  title: text,
  description: text,
  prizes: Vec(PrizePayload),
  hostId: Principal,
  createdAt: nat64,
  endedAt: nat64,
  lotteryBanner: blob,
});
type LotteryPayload = typeof LotteryPayload.tsType;

const LotteryDetailPayload = Record({
  id: Principal,
  types: text,
  groupId: Opt(Principal),
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
});
type LotteryDetailPayload = typeof LotteryDetailPayload.tsType;

const LotteryPreviewPayload = Record({
  id: Principal,
  title: text,
  participantsAmount: int,
  endedAt: nat64,
  lotteryBanner: blob,
});
type LotteryPreviewPayload = typeof LotteryPreviewPayload.tsType;

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
});
type CompletedLotteryPayload = typeof CompletedLotteryPayload.tsType;

const NotificationDAO = Record({
  id: Principal,
  ownerId: Principal,
  description: text,
  isRead: bool,
});

type NotificationDAO = typeof NotificationDAO.tsType;

const NotificationPayload = Record({
  ownerId: Principal,
  description: text,
  isRead: bool,
});

type NotificationPayload = typeof NotificationPayload.tsType;
/* Nah gw masih ragu Roles ini perlu id unik ga tapi setelah dipikir" perlu buat stableBtreeMap nya atau kalau ga ntar
harus kaya UserRole harus bikin interface baru buat key stableBTreeMap nya groupId sm name nurut kalian gimana
*/
const Roles = Record({
  id: Principal,
  groupId: Principal,
  name: text,
  rank: int,
});
type Roles = typeof Roles.tsType;

const RolesPayload = Record({
  name: text,
  rank: int,
});
type RolesPayload = typeof RolesPayload.tsType;

const UserRole = Record({
  userId: Principal,
  groupId: Principal,
  username: text,
  userRole: text,
});
type UserRole = typeof UserRole.tsType;

/* Oke jadi intinya si UserGroup ini gua pake buat jadi key stablebtreemap userroles
nah jadi kalau misal nanti mau bikin function yang nge assign role ke user di sebuah grup
sebelum masukin ke userroles nanti bikin dulu variabel UserGroup buat jadi keynya biar bisa dimasukin
 */
const UserGroup = Record({
  userId: Principal,
  groupId: Principal,
});
type UserGroup = typeof UserGroup.tsType;

const GroupDAO = Record({
  id: Principal,
  name: text,
  groupLotteries: Vec(Principal),
  avatar: blob,
  ownerId: Principal,
  members: Vec(Principal),
  roles: Vec(Roles),
});
type GroupDAO = typeof GroupDAO.tsType;

const GroupPayload = Record({
  name: text,
  roles: Vec(RolesPayload),
  avatar: blob,
  ownerId: Principal,
});
type GroupPayload = typeof GroupPayload.tsType;

const EditGroupPayload = Record({
  id: Principal,
  name: text,
  roles: Vec(RolesPayload),
  avatar: blob,
});
type EditGroupPayload = typeof EditGroupPayload.tsType;

const DetailGroupPayload = Record({
  id: Principal,
  name: text,
  groupLotteries: Vec(LotteryPayload),
  avatar: blob,
  ownerId: Principal,
  members: Vec(UserRole),
  roles: Vec(Roles),
});
type DetailGroupPayload = typeof DetailGroupPayload.tsType;

const Error = Variant({
  InvalidPayload: text,
  InvalidId: text,
  InvalidType: text,
  InvalidGroup: text,
  Fail: text,
  AlreadyJoined: text,
});

let users = StableBTreeMap<Principal, User>(0);
let prizes = StableBTreeMap<Principal, PrizeDAO>(1);
let lotteries = StableBTreeMap<Principal, LotteryDAO>(2);
let roles = StableBTreeMap<Principal, Roles>(3);
let groups = StableBTreeMap<Principal, GroupDAO>(4);
let userroles = StableBTreeMap<UserGroup, UserRole>(5);
let notifications = StableBTreeMap<Principal, NotificationDAO>(6);

export default Canister({
  // User
  createUser: update([UserPayload], Result(User, text), (payload) => {
    if (
      !payload.name ||
      !payload.points ||
      !payload.avatar ||
      !payload.hostedLotteries ||
      !payload.participatedLotteries
    ) {
      return Err("Invalid input");
    }
    const id = generateId();
    const user: User = {
      id,
      name: payload.name,
      points: payload.points,
      avatar: payload.avatar,
      hostedLotteries: payload.hostedLotteries,
      participatedLotteries: payload.participatedLotteries,
    };
    users.insert(user.id, user);
    return Ok(user);
  }),
  getUsers: query([], Vec(User), () => {
    return users.values();
  }),

  // Leaderboard
  getLeaderboard: query([], Result(Vec(User), text), () => {
    const leaderboard = users.values();
    const sorted = leaderboard.sort(
      (a: User, b: User) => Number(b["points"]) - Number(a["points"])
    ); // descending = b-a, ascending = a-b
    if (sorted.length > 0) {
      return Ok(sorted);
    }
    return Err("User doesnt exist");
  }),

  // Lottery
  createLottery: update(
    [LotteryPayload],
    Result(LotteryDAO, Error),
    (payload) => {
      try {
        // Validating payload attributes
        if (
          !payload.types ||
          !payload.title ||
          !payload.description ||
          !payload.prizes ||
          !payload.hostId ||
          !payload.createdAt ||
          !payload.endedAt ||
          !payload.lotteryBanner
        ) {
          return Err({ InvalidPayload: `Payload is not valid!` });
        }

        // Validating lottery type
        if (
          !(
            payload.types === LotteryType.Public ||
            payload.types === LotteryType.Private ||
            payload.types === LotteryType.Group
          )
        ) {
          return Err({ InvalidType: `Type is not valid!` });
        }

        let lotteryPrizes: PrizeDAO[] = [];

        payload.prizes.forEach((prizepayload) => {
          let prizeId = generateId();

          while (!("None" in prizes.get(prizeId))) {
            prizeId = generateId();
          }

          // Create new prize
          const prize = {
            id: prizeId,
            ...prizepayload,
          };

          prizes.insert(prize.id, prize);

          lotteryPrizes = [...lotteryPrizes, prize];
        });

        let lotteryId = generateId();

        while (!("None" in lotteries.get(lotteryId))) {
          lotteryId = generateId();
        }
        const lottery = {
          id: lotteryId,
          types: payload.types,
          groupId: payload.groupId,
          title: payload.title,
          description: payload.description,
          prizes: lotteryPrizes,
          participants: [],
          participantsAmount: 0n,
          hostId: payload.hostId,
          winners: [],
          createdAt: payload.createdAt,
          endedAt: payload.endedAt,
          lotteryBanner: payload.lotteryBanner,
          isCompleted: false,
        };

        // Checking if group exists
        if (payload.types === LotteryType.Group) {
          // Check if payload has groupId
          if (!payload.groupId) {
            return Err({ InvalidGroup: `Group is not valid!` });
          }

          // Validating groupId payload
          const id = payload.groupId.Some;
          if (!id?._isPrincipal) {
            return Err({ InvalidId: `Id is not valid` });
          }
          // Validating group existance
          const groupOpt = groups.get(id);
          if ("None" in groupOpt) {
            return Err({ InvalidGroup: `Group does not exist` });
          }

          // Validated, Adding lottery to group
          const group: GroupDAO = groupOpt.Some;
          group.groupLotteries.push(lottery.id);
          groups.insert(id, group);
        }

        lotteries.insert(lottery.id, lottery);
        return Ok(lottery);
      } catch (error: any) {
        return Err({ Fail: `Failed to add lottery: ${error}` });
      }
    }
  ),

  detailLottery: query(
    [Principal],
    Result(LotteryDetailPayload, Error),
    (lotteryId) => {
      try {
        // Check completed lottery
        checkCompletedLotteries();

        // Validating lottery id
        if (!lotteryId) {
          return Err({ InvalidPayload: `Id is not valid!` });
        }

        let lotteryParticipants: User[] = [];

        const lotteryOpt = lotteries.get(lotteryId);

        if ("None" in lotteryOpt) {
          return Err({
            InvalidId: `Lottery with that id doesn't exist`,
          });
        }

        const lottery = lotteryOpt.Some;

        lottery.participants.forEach((userId) => {
          const userOpt = users.get(userId);

          if ("None" in userOpt) {
            return Err({
              InvalidId: `User with that id doesn't exist`,
            });
          }

          let user = userOpt.Some;

          lotteryParticipants = [...lotteryParticipants, user];
        });

        const detailLottery: LotteryDetailPayload = {
          id: lottery.id,
          types: lottery.types,
          groupId: lottery.groupId,
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
        };

        return Ok(detailLottery);
      } catch (error: any) {
        return Err({
          Fail: `Failed to get lottery detail: ${error}`,
        });
      }
    }
  ),

  completedLotteryDetail: update(
    [Principal],
    Result(CompletedLotteryPayload, Error),
    (lotteryId) => {
      try {
        // Validating lottery id
        if (!lotteryId) {
          return Err({ InvalidPayload: `Lottery id is not valid!` });
        }

        let lotteryParticipants: User[] = [];

        let lotteryWinners: User[] = [];

        const lotteryOpt = lotteries.get(lotteryId);

        if ("None" in lotteryOpt) {
          return Err({
            InvalidId: `Lottery with that id doesn't exist`,
          });
        }

        const lottery = lotteryOpt.Some;

        lottery.participants.forEach((userId) => {
          const userOpt = users.get(userId);

          if ("None" in userOpt) {
            return Err({
              InvalidId: `User with that id doesn't exist`,
            });
          }

          let user = userOpt.Some;

          lotteryParticipants = [...lotteryParticipants, user];
        });

        lottery.winners.forEach((userId) => {
          const winnerOpt = users.get(userId);

          if ("None" in winnerOpt) {
            return Err({
              InvalidId: `USer with that id doesn't exist`,
            });
          }

          let winner = winnerOpt.Some;

          lotteryWinners = [...lotteryWinners, winner];
        });

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
        };

        return Ok(detailCompletedLottery);
      } catch (error: any) {
        return Err({
          Fail: `Failed to get lottery detail: ${error}`,
        });
      }
    }
  ),

  joinLottery: update(
    [Principal, Principal],
    Result(text, Error),
    (lotteryId, userId) => {
      try {
        // validating lottery
        if (!lotteryId) {
          return Err({ InvalidPayload: `Lottery Id is not valid!` });
        }

        const lotteryOpt = lotteries.get(lotteryId);
        if ("None" in lotteryOpt) {
          return Err({ InvalidId: `Lottery with that id doesn't exist` });
        }
        const lottery = lotteryOpt.Some;

        // validating user
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }
        const user = userOpt.Some;

        // validating joined user
        if (lottery.participants.includes(userId)) {
          return Err({
            AlreadyJoined: `User with that id has already joined the lottery`,
          });
        }

        // user join the lottery
        lottery.participants.push(userId);
        lottery.participantsAmount = BigInt(lottery.participants.length);
        lotteries.insert(lotteryId, lottery);

        user.participatedLotteries.push(lotteryId);
        users.insert(userId, user);

        return Ok("User joined the lottery successfully");
      } catch (error: any) {
        return Err({
          Fail: `Failed to join the lottery: ${error}`,
        });
      }
    }
  ),

  listPublicLotteries: query(
    [],
    Result(Vec(LotteryPreviewPayload), Error),
    () => {
      try {
        const publicLotteries = lotteries.values().filter((lottery) => {
          return (
            lottery.types === LotteryType.Public &&
            lottery.isCompleted === false
          );
        });

        const previewPublicLotteries: LotteryPreviewPayload[] = [];

        publicLotteries.forEach((lottery) => {
          const previewLottery: LotteryPreviewPayload = {
            id: lottery.id,
            title: lottery.title,
            participantsAmount: lottery.participantsAmount,
            endedAt: lottery.endedAt,
            lotteryBanner: lottery.lotteryBanner,
          };

          previewPublicLotteries.push(previewLottery);
        });

        return Ok(previewPublicLotteries);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display public lotteries: ${error}`,
        });
      }
    }
  ),

  hostedOngoingLotteries: query(
    [Principal],
    Result(Vec(LotteryPreviewPayload), Error),
    (userId) => {
      try {
        // validating user
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }

        const hostedOngoingLotteries = lotteries.values().filter((lottery) => {
          return lottery.hostId === userId && lottery.isCompleted === false;
        });

        const previewHostedOngoingLotteries: LotteryPreviewPayload[] = [];

        hostedOngoingLotteries.forEach((lottery) => {
          const previewLottery: LotteryPreviewPayload = {
            id: lottery.id,
            title: lottery.title,
            participantsAmount: lottery.participantsAmount,
            endedAt: lottery.endedAt,
            lotteryBanner: lottery.lotteryBanner,
          };

          previewHostedOngoingLotteries.push(previewLottery);
        });

        return Ok(previewHostedOngoingLotteries);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display ongoing hosted lotteries: ${error}`,
        });
      }
    }
  ),

  hostedCompletedLotteries: query(
    [Principal],
    Result(Vec(LotteryPreviewPayload), Error),
    (userId) => {
      try {
        // validating user
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }
        const hostedCompletedLotteries = lotteries
          .values()
          .filter((lottery) => {
            return lottery.hostId === userId && lottery.isCompleted === true;
          });

        const previewHostedCompletedLotteries: LotteryPreviewPayload[] = [];

        hostedCompletedLotteries.forEach((lottery) => {
          const previewLottery: LotteryPreviewPayload = {
            id: lottery.id,
            title: lottery.title,
            participantsAmount: lottery.participantsAmount,
            endedAt: lottery.endedAt,
            lotteryBanner: lottery.lotteryBanner,
          };

          previewHostedCompletedLotteries.push(previewLottery);
        });

        return Ok(previewHostedCompletedLotteries);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display completed hosted lotteries: ${error}`,
        });
      }
    }
  ),

  participatedOngoingLotteries: query(
    [Principal],
    Result(Vec(LotteryPreviewPayload), Error),
    (userId) => {
      try {
        // validating user
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }

        const participatedOngoingLotteries = lotteries
          .values()
          .filter((lottery) => {
            return (
              lottery.participants.includes(userId) &&
              lottery.hostId !== userId &&
              lottery.isCompleted === false
            );
          });

        const previewParticipatedOngoingLotteries: LotteryPreviewPayload[] = [];

        participatedOngoingLotteries.forEach((lottery) => {
          const previewLottery: LotteryPreviewPayload = {
            id: lottery.id,
            title: lottery.title,
            participantsAmount: lottery.participantsAmount,
            endedAt: lottery.endedAt,
            lotteryBanner: lottery.lotteryBanner,
          };

          previewParticipatedOngoingLotteries.push(previewLottery);
        });

        return Ok(previewParticipatedOngoingLotteries);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display ongoing participated lotteries: ${error}`,
        });
      }
    }
  ),

  participatedCompletedLotteries: query(
    [Principal],
    Result(Vec(LotteryPreviewPayload), Error),
    (userId) => {
      try {
        // validating user
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }

        const participatedCompletedLotteries = lotteries
          .values()
          .filter((lottery) => {
            return (
              lottery.participants.includes(userId) &&
              lottery.hostId !== userId &&
              lottery.isCompleted === true
            );
          });

        const previewParticipatedCompletedLotteries: LotteryPreviewPayload[] =
          [];

        participatedCompletedLotteries.forEach((lottery) => {
          const previewLottery: LotteryPreviewPayload = {
            id: lottery.id,
            title: lottery.title,
            participantsAmount: lottery.participantsAmount,
            endedAt: lottery.endedAt,
            lotteryBanner: lottery.lotteryBanner,
          };

          previewParticipatedCompletedLotteries.push(previewLottery);
        });

        return Ok(previewParticipatedCompletedLotteries);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display completed participated lotteries: ${error}`,
        });
      }
    }
  ),

  // Notification
  getNotificationListByUser: query(
    [Principal],
    Result(Vec(NotificationPayload), Error),
    (userId) => {
      // validating user
      try {
        if (!userId) {
          return Err({ InvalidPayload: `User Id is not valid!` });
        }
        const userOpt = users.get(userId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }

        const userNotifications = notifications
          .values()
          .filter((notification) => {
            return notification["ownerId"] === userId;
          });

        const previewUserNotifications: NotificationPayload[] = [];

        userNotifications.forEach((notification) => {
          const previewUserNotification: NotificationPayload = {
            ownerId: notification.ownerId,
            description: notification.description,
            isRead: notification.isRead,
          };
          previewUserNotifications.push(previewUserNotification);
        });

        return Ok(previewUserNotifications);
      } catch (error: any) {
        return Err({
          Fail: `Failed to display user notifications: ${error}`,
        });
      }
    }
  ),

  readNotification: update(
    [Principal],
    Result(NotificationDAO, Error),
    (notificationId) => {
      try {
        if (!notificationId) {
          return Err({ InvalidPayload: "Notification Id is not valid" });
        }
        const notificationOpt = notifications.get(notificationId);

        if ("None" in notificationOpt) {
          return Err({
            InvalidId: `Notification with that id doesn't exist`,
          });
        }
        const notification = notificationOpt.Some;

        const readNotification: NotificationDAO = {
          ...notification,
          isRead: true,
        };
        notifications.insert(notificationId, readNotification);
        return Ok(readNotification);
      } catch (error: any) {
        return Err({
          Fail: `Failed to read user notification: ${error}`,
        });
      }
    }
  ),

  // Group
  createGroup: update([GroupPayload], Result(GroupDAO, Error), (payload) => {
    try {
      if (
        !payload.avatar ||
        !payload.name ||
        !payload.roles ||
        !payload.ownerId
      ) {
        return Err({
          InvalidPayload: `Payload is not valid!`,
        });
      }

      let groupId = generateId();

      while (!("None" in groups.get(groupId))) {
        groupId = generateId();
      }

      let groupRoles: Roles[] = [];

      payload.roles.forEach((groupRole) => {
        let roleId = generateId();

        while (!("None" in groups.get(roleId))) {
          roleId = generateId();
        }
        const role = {
          id: roleId,
          groupId: groupId,
          ...groupRole,
        };

        roles.insert(role.id, role);

        groupRoles = [...groupRoles, role];
      });

      const group = {
        id: groupId,
        name: payload.name,
        groupLotteries: [],
        avatar: payload.avatar,
        ownerId: payload.ownerId,
        members: [],
        roles: groupRoles,
      };

      groups.insert(group.id, group);

      return Ok(group);
    } catch (error: any) {
      return Err({
        Fail: `Failed creatin group: ${error}`,
      });
    }
  }),

  detailGroup: query(
    [Principal],
    Result(DetailGroupPayload, Error),
    (groupId) => {
      try {
        // Validating group id
        if (!groupId) {
          return Err({ InvalidPayload: `Id is not valid!` });
        }

        let groupMembers: UserRole[] = [];

        let groupLotteries: LotteryPayload[] = [];

        const groupOpt = groups.get(groupId);

        if ("None" in groupOpt) {
          return Err({
            InvalidId: `Group with that id doesn't exist`,
          });
        }

        const group = groupOpt.Some;

        group.groupLotteries.forEach((lotteryId) => {
          const lotteryOpt = lotteries.get(lotteryId);

          if ("None" in lotteryOpt) {
            return Err({
              InvalidId: `Lottery with that id doesn't exist`,
            });
          }

          let lottery = lotteryOpt.Some;

          groupLotteries = [...groupLotteries, lottery];
        });

        group.members.forEach((userId) => {
          const userGroup: UserGroup = {
            userId: userId,
            groupId: group.id,
          };

          const userroleOpt = userroles.get(userGroup);

          if ("None" in userroleOpt) {
            return Err({
              InvalidId: `Information of user's role doesn't exist`,
            });
          }

          let userrole = userroleOpt.Some;

          groupMembers = [...groupMembers, userrole];
        });

        const detailgroup: DetailGroupPayload = {
          id: group.id,
          name: group.name,
          groupLotteries: groupLotteries,
          avatar: group.avatar,
          ownerId: group.ownerId,
          members: groupMembers,
          roles: group.roles,
        };

        return Ok(detailgroup);
      } catch (error: any) {
        return Err({
          Fail: `Failed to get group detail: ${error}`,
        });
      }
    }
  ),

  listGroups: query([], Vec(GroupPayload), () => {
    return groups.values();
  }),

  editMemberRole: update([UserRole], Result(UserRole, Error), (payload) => {
    try {
      if (
        !payload.groupId ||
        !payload.userId ||
        !payload.userRole ||
        !payload.username
      ) {
        return Err({
          InvalidPayload: `Payload is not valid!`,
        });
      }

      const dummyUG = {
        userId: payload.userId,
        groupId: payload.groupId,
      };

      const userGroupOpt = userroles.get(dummyUG);

      if ("None" in userGroupOpt) {
        return Err({
          InvalidId: `Information of user's role doesn't exist`,
        });
      }

      let userGroup = userGroupOpt.Some;

      userGroup.userRole = payload.userRole;

      return Ok(userGroup);
    } catch (error: any) {
      return Err({
        Fail: `Failed to edit user's role ${error}`,
      });
    }
  }),

  removeMember: update(
    [Principal, Principal],
    Result(GroupDAO, Error),
    (userId, groupId) => {
      try {
        if (!userId || !groupId) {
          return Err({
            InvalidPayload: `Payload is not valid!`,
          });
        }

        const userOpt = users.get(userId);

        const groupOpt = groups.get(groupId);

        if ("None" in userOpt) {
          return Err({
            InvalidId: `User with that id doesn't exist`,
          });
        }

        if ("None" in groupOpt) {
          return Err({
            InvalidId: `Group with that id doesn't exist`,
          });
        }

        let group = groupOpt.Some;

        group.members.filter(
          (memberId) => memberId.toText() !== userId.toText()
        );

        return Ok(group);
      } catch (error: any) {
        return Err({
          Fail: `Fail to remove member: ${error}`,
        });
      }
    }
  ),

  editGroup: update([EditGroupPayload], Result(GroupDAO, Error), (payload) => {
    try {
      if (!payload.avatar || !payload.id || !payload.name || !payload.roles) {
        return Err({
          InvalidPayload: `Payload is not valid!`,
        });
      }

      const groupOpt = groups.get(payload.id);

      if ("None" in groupOpt) {
        return Err({
          InvalidId: `Group with that id doesn't exist`,
        });
      }

      let group = groupOpt.Some;

      // Delete existing roles first from the group so there is no duplicate
      roles
        .values()
        .filter((role) => role.groupId.toText() !== group.id.toText());

      let groupRoles: Roles[] = [];

      payload.roles.forEach((groupRole) => {
        let roleId = generateId();

        while (!("None" in groups.get(roleId))) {
          roleId = generateId();
        }
        const role = {
          id: roleId,
          groupId: group.id,
          ...groupRole,
        };

        roles.insert(role.id, role);

        groupRoles = [...groupRoles, role];
      });

      group.name = payload.name;
      group.avatar = payload.avatar;
      group.roles = groupRoles;

      return Ok(group);
    } catch (error: any) {
      return Err({
        Fail: `Fail to edit group: ${error}`,
      });
    }
  }),
});

function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

function checkCompletedLotteries(): void {
  // Noted
  for (const lottery of lotteries.values()) {
    if (
      lottery.endedAt <= BigInt(Math.floor(performance.now())) * 1000000n &&
      !lottery.isCompleted
    ) {
      // Change to completed
      lottery.isCompleted = true;

      // Randomly select winners
      const winners = selectWinners(lottery.prizes, lottery.participants);

      winners.forEach((winner) => {
        lottery.winners.push(winner);
      });

      // Update the lottery winners
      lotteries.insert(lottery.id, lottery);
    }
  }
}

function selectWinners(
  prizes: Vec<PrizeDAO>,
  participants: Vec<Principal>
): Vec<Principal> {
  const winners: Principal[] = [];

  // Shuffle the participants
  for (let i = participants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [participants[i], participants[j]] = [participants[j], participants[i]];
  }

  for (const prize of prizes) {
    let winnerIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[winnerIndex];

    // Check if the winner already won before
    if (!winners.includes(winner)) {
      winners.push(winner);
    } else {
      // If yes, select a different winner
      while (winners.includes(participants[winnerIndex])) {
        winnerIndex = Math.floor(Math.random() * participants.length);
      }
      winners.push(participants[winnerIndex]);
    }
  }

  return winners;
}
