var ZaloOA = require('zalo-sdk').ZaloOA;

var zaConfig = {
    oaid: '1174538082064985852',
    secretkey: 'XJC21pc17Fw37UH0C0QW'
}
var ZOAClient = new ZaloOA(zaConfig);
exports.ZOAClient = ZOAClient;

//get follower info
var userId = '841634053773';
ZOAClient.api('getprofile', { uid: userId }, function(response) {
    console.log(response);
})

var userId2 = '1308185292842528559';
// ZOAClient.api('sendmessage/text', 'POST', { uid: userId2, message: 'Zalo SDK Nodejs Test Message'}, function(response) {
//     console.log(response);
// })

// //link message
// var params = {
//     uid: userId2,
//     links: [{
//         link: 'https://developers.zalo.me/',
//         linktitle: 'Zalo For Developers',
//         linkdes: 'Document For Developers',
//         linkthumb: 'https://developers.zalo.me/web/static/images/bg.jpg'
//     }]
// }
// ZOAClient.api('sendmessage/links', 'POST', params, function(response) {
//     console.log(response);
// })

//interact message
// var params = {
//     uid: userId2,
//     actionlist: [{
//         action: 'oa.open.phone',
//         title: 'Send interactive messages',
//         description: 'This is a test for API send interactive messages',
//         thumb: 'https://developers.zalo.me/web/static/images/bg.jpg',
//         href: 'https://developers.zalo.me',
//         data: {phoneCode:'*101#'},
//         popup: {
//             title: 'Open Website Zalo For Developers',
//             desc: 'Click ok to visit Zalo For Developers and read more Document',
//             ok: 'ok',
//             cancel: 'cancel'
//         }
//     }]
// }
// ZOAClient.api('sendmessage/actionlist', 'POST', params, function(response) {
//     console.log(response);
// })


//send sms message -> not working
// var params = {
//     uid: userId2,
//     templateid: 'cccsa',
//     templatedata: {}
// }
// ZOAClient.api('sendmessage/cs', 'POST', params, function(response) {
//     console.log(response);
// })