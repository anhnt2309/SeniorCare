var ZaloSocial = require('zalo-sdk').ZaloSocial;
var request=require('request');

var zsConfig = {
	appId: '3735120630366662549',
	redirectUri: 'http://us.originally.com',
	secretkey: 'JidTKW4IXQ4yCDWaThK6',
	appSecret:'JidTKW4IXQ4yCDWaThK6'
};
var ZSClient = new ZaloSocial(zsConfig);

// var code = "https://oauth.zaloapp.com/v3/auth?app_id=3735120630366662549&redirect_uri=http://us.originally.com"

ZSClient.setAccessToken("3aLiCE7QIaKDHcuoujfFGmX2RJ3jnZmMOoGQ4zpxFmDnD7m7xgmA0L1FKdQzZp02BrPmDxIQBX8o7GiitFnE8bWa5HAmmt5iD31JOxpWFHGjPtDdW_ynKZCYQ7p2yYfQIcXqIDwQ6JT9M4D5tSeXOqCoKnFrg0ydPqHRB_QiVbbbDpWcxjTtMMHA9bBQitHFK5qwMU6pGcq9Q1TOaFPrLoGpA5cxqGOc8JLRDvV83Jvx47CFrV0T070vJ2NV_3W3Um4N9PRoEGGk41uPkyDGAcLAtAeNH-71I40");

// var loginUrl = ZSClient.getLoginUrl();
// console.log(loginUrl);
// // 

// ZSClient.getAccessTokenByOauthCode(code, function(response) {
// 	console.log(response);
//     if (response && response.access_token) {
//         ZSClient.setAccessToken(response.access_token);
//     }
// });

ZSClient.api('me', 'GET', { fields: 'id, name, birthday, gender, picture' }, function(response) {
    console.log(response);
});


//Get list of your friends with offset and limit
ZSClient.api('me/friends', {offset: 10, limit: 50}, function(response) {
    console.log(response);
});

// //Get  list of your friends who you can intvite to use your App.
// ZSClient.api('me/invitable_friends', {offset: 10, limit: 50, fields: 'id, name, picture'}, function(response) {
//     console.log(response);
// });


ZSClient.api('me/message', 'POST', {to: '6368179922687403475', message: 'Lorem ipsum dolor sit amet !', link: 'https://developers.zalo.me/'},  function(response) {
    console.log(response);
});