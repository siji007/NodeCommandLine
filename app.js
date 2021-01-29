//The main aim of the project is to connect to treehouse's API to a get a user's badge count and get their points
//Connect to the API url(https://teamtreehouse.com/chalkers.json)
/*Error status Code{
200 - ok
500 - internal Server Error
301 - Moved Permanently or been updated
404- Not Found or api removed completely
}*/

// {
//     "name": "Andrew Chalkley",
//     "profile_name": "chalkers",
//     "profile_url": "https://teamtreehouse.com/chalkers",
//     "gravatar_url": "https://uploads.teamtreehouse.com/production/profile-photos/26170/avatar_TeacherShoot-Andrew.jpg",
//     "gravatar_hash": "18de767dcd097f040c73b105163a6f1a",
//     "badges":
//     {
//         "id": 3,
//         "name": "Introduction",
//         "url": "https://teamtreehouse.com/library/css-foundations-version-1/introduction",
//         "icon_url": "https://achievement-images.teamtreehouse.com/CSS_Introduction.png",
//         "earned_date": "2012-07-23T22:30:21.000Z",
//         "courses": [{ "title": "CSS Foundations - Version 1", "url": "https://teamtreehouse.com/library/css-foundations-version-1", "badge_count": 1 },
//             { "title": "Introduction", "url": "https://teamtreehouse.com/library/css-foundations-version-1/introduction", "badge_count": 1 }
//         ]
//     },
//     {
//         "id": 13,
//         "name": "Selectors",
//         "url": "https://teamtreehouse.com/library/css-foundations-version-1/selectors",
//         "icon_url": "https://achievement-images.teamtreehouse.com/badges_DD_CSS_Stage2.png",
//         "earned_date": "2012-07-23T22:32:12.000Z",
//         "courses": [{ "title": "CSS Foundations - Version 1", "url": "https://teamtreehouse.com/library/css-foundations-version-1", "badge_count": 1 },
//             { "title": "Selectors", "url": "https://teamtreehouse.com/library/css-foundations-version-1/selectors", "badge_count": 1 }
//         ]
//     }
// }
const https = require('https');
// const axios = require('axios');
const username = "chalkers";

function printMessage(username, badgeCount, point, totalPoint) {
    const message = `${username} has ${badgeCount} total badge(s) and ${point} points in javascript and a total point of ${totalPoint}`;
    console.log(message);
}

// const check = axios.get(`https://teamtreehouse.com/${username}.json`, response => {
//     console.dir(response);
// });
function getProfile(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";
                //Read the data
                response.on('data', data => {
                    body += data.toString(); //This will convert the buffers to string format
                });

                response.on('end', () => {
                    try {
                        //Parse the data
                        const profile = JSON.parse(body);
                        // console.log(profile);
                        printMessage(username, profile.badges.length, profile.points.JavaScript, profile.points.total);
                    } catch (error) {
                        console.log('Username Error:' + error.message);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${ username } (${response.statusCode})`;
                const statusCodeError = new Error(message);
                console.log(statusCodeError);
            }
        });
    } catch (error) {
        console.log('Error:' + error.message);
    }
}

// console.log(process.argv);
let users = ["alenaholligan", "chalkers"]
users.forEach(getProfile);
// const users = process.argv.slice(1);
// users.forEach(getProfile);