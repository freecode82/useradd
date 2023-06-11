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


app.get('/', (request, response) => {
	fs.readFile('login.html', (err, data) => {
		response.send(data.toString());
	});
});

app.post('/selection', jsonParser, (request, response) => {
	console.log(request.body.userName);
	
	fs.readFile('selection.html', (err, data) => {
		response.send(data.toString());
	});
});

app.get('/quickbuild', (request, response) => {
	fs.readFile('quick-useradd.html', (err, data) => {
		response.send(data.toString());
	});
});

app.get('/jenkins', (request, response) => {
	fs.readFile('jenkins-useradd.html', (err, data) => {
		response.send(data.toString());
	});
});

app.post('/getgroup', jsonParser, (request, response) => {
	console.log(request.body);
	request_options.url = serverList[request.body.type] + api_list['getgrp'];
	console.log(request_options);
	
	req(request_options, (err, resp, body) => {
		if (err) {
			console.log("그룹 정보 가져오는 중 에러 발생: ", err)
			return response.send("\nError: 그룹 정보 가져오는 중 에러 발생: " + err);
			//throw new Error(err);
		}
		
		console.log(body);
		
		//그룹 정보를 서버에 저장해 둔다. 사용자 그룹 추가 또는 확인용
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
	
	if (users.length == 0) {
		response.send("\nError: 사용자 정보가 전달 되지 못하였습니다.\n사용자 정보를 확인해주세요");
		return;
	}
	
	try {
		console.log("groupinfo:", groupInfo);
	} catch(err) {
		response.send("\nError: 서버 내부에서 그룹 정보를 가져 올 수 없습니다.\n서버와 권한을 다시 선택하십시요.");
		return;
	}
	
	users.forEach( (user) => { //사용자 하나 하나에 대한 작업 진행
		//꼭 필요한 정보에 빈값이 있는지 확인
		if ( user.id == '' || user.password == '') {
			console.log("아이디나 암호가 없는 사용자가 있습니다.");
			response.send("\n사용자 중 아이디 또는 암호가 없는 사용자가 있습니다.\n계정 생성의 최소 필요 정보는 아이디/암호 입니다.");
			return;
		}
		
		//사용자 존재 여부 확인
		request_options.url = serverList[type] + api_list['getuserid'] + user.id;
		console.log(request_options);
		req(request_options, (err, resp, body) => {
			if (err) {
				console.log(err);
				response.send("\n사용자 정보 확인 중 발생: " + err);
				return;
				//throw new Error(err);
			}
			
			console.log(body);
			if ( body == '') { //사용자가 존재하지 않으면
				console.log(user.id + ' id not exist');

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
				
  				data = builder.buildObject(newuser); //사용자 정보 객체를 xml 형태로 만듬
				console.log(data);
				//사용자 생성하기
				request_options_post.url = serverList[type] + api_list['createuser'];
				request_options_post.body = data;
				req(request_options_post, (err, resp, body) => {
					if (err) {
						console.log(err);
						response.send("\n사용자 생성 중 에러: " + err);
						return;
						//throw new Error(err);
					}
					//생성이 성공하면 user id를 리턴, 문제가 생기면 숫자가 아닌 다른 것을 리턴한다.
					console.log(body);
					if (isNaN(body)) { // 사용자를 만드는데 문제가 생김, critical에러는 아님, 서버가 안죽음
						response.send(body);
						return;
					} else { //사용자가 올바르게 만들어져서 아이디 넘버를 리턴
						console.log(user.id + "success create account");
						console.log(user.id + "asign group start");
						request_options_post.url = serverList[type] + api_list['createmembership'];
						
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
									response.send("\n멤버쉽 할당 중 에러 발생: " + err);
									return;
								}
								console.log(body); //멤버쉽이 잘 생성 되면 멤버쉽의 아이디를 리턴한다.
								if (isNaN(body)) { // 멤버쉽 만드는데 문제가 생김, critical에러는 아님, 서버가 안죽음
									response.send(body);
									return;
								} 
							});
						});
					}
				});
			} else { // 사용자가 존재하면
				console.log(user.id + ' already exist');
				let userNumber = body;
				//해당 사용자의 멤버쉽을 조사한다.
				request_options.url = serverList[type] + api_list['getmembership'] + userNumber;
				console.log(request_options);
				req(request_options, (err, resp, body) => {
					if (err) {
						console.log(err);
						response.send("\n사용자 멤버쉽 조회 중 발생: " + err);
						return;
						//throw new Error(err);
					}
					
					let parser = new xml2js.Parser();
					
					parser.parseString(body, function (err, result) {
						console.log(result);
	
						rightlist.map(r => Number(groupInfo[r])).forEach( r => {
							console.log(r)
						//	console.log(result['list']['com.pmease.quickbuild.model.Membership'].map( i => i.group )[1]);
							if (result['list']['com.pmease.quickbuild.model.Membership'].map(i => Number(i.group)).indexOf(r) < 0) {
								console.log(r + " 없음");
								//권한 추가 
								request_options_post.url = serverList[type] + api_list['createmembership'];
								createmembership = {
									'com.pmease.quickbuild.model.Membership': {
										user: userNumber,
										group: r
									}					
								};
								data = builder.buildObject(createmembership);
								console.log(data);
								request_options_post.body = data;
								console.log(request_options_post);
								req(request_options_post, (err, resp, body) => {
									if (err) {
										console.log(err);
										response.send("\n멤버쉽 할당 중 에러 발생: " + err);
										return;
									}
									console.log(body); //멤버쉽이 잘 생성 되면 멤버쉽의 아이디를 리턴한다.
									if (isNaN(body)) { // 멤버쉽 만드는데 문제가 생김, critical에러는 아님, 서버가 안죽음
										response.send(body);
										return;
									} 
								});
							} else {
								console.log( r + "있음");
							}
						});
					}); 
				});
			}
		});
	});
});


app.listen(3005, () => {
	console.log('server start');
});