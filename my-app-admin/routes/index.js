'use strict';

import login from './login';

exports.router = app => {
	app.use('/', login);
}
