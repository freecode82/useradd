const express = require('express');
const bodyParser = require('body-parser');
const req = require('request');
const fs = require('fs');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

serverList = { prd: 'http://192.168.79.128:8810', dev: 'http://192.168.79.128:8810'};
api_list = { 
	getgrp: '/rest/groups', 
	getmembership: '/rest/memberships?user_id=', 
	getuserid: '/rest/ids?user_name=', 
	getgroupid: '/rest/ids?group_name=',
	createmembership: '/rest/memberships',
	createuser: '/rest/users'
};


quick_admin_info = 'admin:00cog7@!';

request_options = {
	method: 'GET',
	headers: {'Authorization': 'Basic ' + new Buffer.from(quick_admin_info).toString('base64')}
};

request_options_post = {
	method: 'POST',
	headers: {'Authorization': 'Basic ' + new Buffer.from(quick_admin_info).toString('base64')}
}




/*
function creteUser(userInfo) {
	let xmlParser = new DOMParser();
	let xmlDoc = xmlParser.parseFromString(creteuserxml, "text/xml");
	
}


function getUserIdNumber(type, id) {
	//let res = null;
	
	request_options.url = serverList[type] + api_list['getuserid'] + id;
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		
		//console.log(resp);
		console.log(resp.body);
		console.log(body);
		
		return body;
	});
}

 function getGroupIdNumber(type, groups) {
	request_options.url = serverList[type] + api_list['getgroupid'] + id;
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		console.log(body);
	});
}

 function createMembership(type, id, grpIds) {
	let xmlParser = new DOMParser();
	let xmlDoc = xmlParser.parseFromString(createmembership, "text/xml");
	
	request_options.url = serverList[type] + api_list['createmembership'] + id;
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		console.log(body);
	});
} */

function checkMembership(type, id, grpIds) {
	request_options.url = serverList[type] + api_list['getmembership'] + id;
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		console.log(body);
	});
}



app.get('/', (request, response) => {
	fs.readFile('quick-useradd.html', (err, data) => {
		response.send(data.toString());
	});
});

app.post('/getgroup', jsonParser, (request, response) => {
	console.log(request.body);
	request_options.url = serverList[request.body.type] + api_list['getgrp'];
	console.log(request_options);
	
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		//console.log(body);
		//console.log(resp);
		//value = resp.body;
		console.log(body);
		let parser = new xml2js.Parser();
		groupInfo = {};
		parser.parseString(body, function (err, result) {
			console.log(result);
			result['list']['com.pmease.quickbuild.model.Group'].forEach( i => {
				groupInfo[i.name] = i.id;
			})
			console.log(groupInfo);
		});
		response.send(body);
	});
});


app.post('/adduser', jsonParser, (request, response) => {
	//console.log(request.body);
	//response.send(request.body);
	allUserInfo = request.body; //서버 타임과 유저 정보
	console.log(allUserInfo);
	type = allUserInfo[0]['type']; //서버 타입
	console.log(type);
	rightlist = allUserInfo[1]['rightlist'];
	console.log(rightlist);
	users = allUserInfo.slice(2,allUserInfo.length); //유저 정보만 추출
	console.log(users);
	
	try {
		console.log("groupinfo:", groupInfo);
	} catch(err) {
		response.send("Error: 서버 내부에서 그룹 정보를 가져 올 수 없습니다. 서버와 권한을 다시 선택하십시요.")
		return;
	}
	
	users.forEach( (user) => { //사용자 하나 하나에 대한 작업 진행
		//사용자 존재 여부 확인
		request_options.url = serverList[type] + api_list['getuserid'] + user.id;
		console.log(request_options);
		req(request_options, (err, resp, body) => {
			if (err) {
				console.log(err);
				response.send(err);
				return;
				//throw new Error(err);
			}
			
			console.log(body);
			if ( body == '') { //사용자가 존재하지 않으면
				console.log('id not exist');
				newuser = {
  					'com.pmease.quickbuild.model.User': {
    					favoriteDashboardIds: {
							long: ['1']
						},
    					name: [ user.id ],
    					fullName: [ user.name ],
    					email: [ user.email ],
    					password: [ user.password ],
    					pluginSettingDOMs: [ '' ],
  					}
				};
				
				//const 
				//const 
  				data = builder.buildObject(newuser); //사용자 정보 객체를 xml 형태로 만듬
				console.log(data);
				//사용자 생성하기
				request_options_post.url = serverList[type] + api_list['createuser'];
				request_options_post.body = data;
				req(request_options_post, (err, resp, body) => {
					if (err) {
						console.log(err);
						response.send("사용자 생성 중 에러: ", err);
						return;
						//throw new Error(err);
					}
					//생성이 성공하면 user id를 리턴, 문제가 생기면 숫자가 아닌 다른 것을 리턴한다.
					console.log(body);
					if (isNaN(body)) { // 사용자를 만드는데 문제가 생김
						response.send(body);
						return;
					} else { //사용자가 올바르게 만들어져서 아이디 넘버를 리턴
						console.log("그룹에 넣기")
						request_options_post.url = serverList[type] + api_list['createmembership'];
						
						//그룹정보 불러오기
						/* tmp_request_options = {
							method: 'POST',
							headers: {'Content-Type':'application/json'},
							body: JSON.stringify({type: type}),
							url: serverList[type]+'/getgroup'
						};
						
						console.log(tmp_request_options);
					
						req(tmp_request_options, (err, resp, body) => {
							if (err) {
								console.log(err);
								response.send(err);
								return;
								//throw new Error(err);
							}
							console.log("second grpinfo: ", resp);
							//console.log("groupinfo:", groupInfo);
						});
						*/
						
						rightlist.forEach( r => {
							createmembership = {
								'com.pmease.quickbuild.model.Membership': {
									user: body,
									group: groupInfo[r]
								}
							};
							data = builder.buildObject(createmembership);
							console.log(data);
							request_options_post.body = data;
							console.log(request_options_post);
							req(request_options_post, (err, resp, body) => {
								if (err) {
									console.log(err);
									response.send(err);
									return;
								}
								console.log(body); //멤버쉽이 잘 생성 되면 멤버쉽의 아이디를 리턴한다.
								if (isNaN(body)) { // 사용자를 만드는데 문제가 생김
									response.send(body);
									return;
								} else {
									response.send(user + "success crete and asign group");
								}
							});
						});
					}
				});
			} else { // 사용자가 존재하면
				console.log('id already exist');
			}
		});
	});
});


app.post('/createmembership', jsonParser, (request, response) => {
	console.log('createmembership');
})

app.post('/getgroupnumber', jsonParser, (request, response) => {
	console.log('getgroupnumber');
})

app.listen(3005, () => {
	console.log('server start');
});