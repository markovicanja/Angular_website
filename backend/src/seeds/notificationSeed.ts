import mongoose, { connect } from 'mongoose';
import Notification from '../model/notification';

const notifications = [
    {
        title: "Poziv broj 1",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo.",
        type: "Pozivi za studentska takmicenja",
        dateCreation: Date.parse('04 Sep 2020 00:12:00 GMT')
    },
    {
        title: "Poziv broj 2",
        type: "Pozivi za studentska takmicenja",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 3",
        type: "Pozivi za studentska takmicenja",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 4",
        type: "Obavestenja o konferencijama",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 5",
        type: "Obavestenja o konferencijama",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 6",
        type: "Ponude za prakse",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 7",
        type: "Ponude za prakse",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    },
    {
        title: "Poziv broj 8",
        type: "Ponude za posao",
        content: "Ovo ovde je poziv i obavezno se odazovi jer pozivamo."
    }
]

function seedNotifications(): void {
    for (let n of notifications) {
        let notification = new Notification(n);
        notification.save().then(u => {
            // status ok
        }).catch(err => {
            console.log("Error, couldn't save a notification in db.")
        })
    }
}

function seedAllNotifications(): void {
    const db = mongoose.connect('mongodb://localhost:27017/RTI_katedra');
    const connection = mongoose.connection;

    connection.db.dropCollection('notifications', function (err, result) { });

    new Promise(resolve => {
        seedNotifications();
    }).then(async u => {
        (await db).disconnect();
    });
}

export { seedAllNotifications };