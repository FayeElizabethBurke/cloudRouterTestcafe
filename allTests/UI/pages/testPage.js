var builder = require('../../build'),
breaker = require('../../teardown'),
settingsPage = require('./settingsPage');
breaker.break();
settingsPage.settings();
