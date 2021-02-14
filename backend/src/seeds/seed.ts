import {seedAllUsers} from './userSeed'
import {seedAllNotifications} from './notificationSeed'

function seed(): void {
    seedAllUsers();
    seedAllNotifications();
}

export default seed;