const express = require('express');
const bodyParser = require('body-parser');
const req = require('request');
const fs = require('fs');

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

serverList = { prd: 'http://192.168.79.128:8810', dev: 'http://192.168.79.128:8810'};
api_list = { getgrp: '/rest/groups'};
quick_admin_info = 'admin:00cog7@!';
username = 'admin';
password = '00cog7@!';
request_options = {
	method: 'GET',
	headers: {'Authorization': 'Basic ' + new Buffer.from(quick_admin_info).toString('base64')}
};

app.get('/', (request, response) => {
	fs.readFile('quick-useradd.html', (err, data) => {
		response.send(data.toString());
	});
});

app.post('/getgroup', jsonParser, (request, response) => {
	console.log(request.body);
	request_options.url = serverList[request.body.type] + api_list['getgrp'];
	console.log(request_options);
	
	//let value = null;
	
	req(request_options, (err, resp, body) => {
		if (err) throw new Error(err);
		//console.log(body);
		//console.log(resp);
		//value = resp.body;
		console.log(body);
		response.send(body);
	});
});

app.listen(3005, () => {
	console.log('server start');
});