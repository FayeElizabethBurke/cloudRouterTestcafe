//login page elements and applicable tests

import { Selector } from 'testcafe';
var creds = require('../../userCred');

module.exports = {
  //elements
  email: Selector('input').withAttribute('type', 'email'),
  password: Selector('input').withAttribute('type', 'password'),
  loginButton: Selector('button').withText('LOGIN'),
  versionNum: Selector('p').withText('Cloud Router v' + creds.version),

  //tests
  login: function() {
    fixture(`Version`).page(creds.firstPage);
    test('Correct Number', async t => {
      await t.expect(Selector(this.versionNum).innerText).eql('Cloud Router v' + creds.version);
    });

    test('Failed Login', async t => {
      await t
        .typeText(this.email, creds.fakeEmail)
        .typeText(this.password, creds.fakePass)
        .click(Selector('button').withText('LOGIN'))
        .expect(Selector('button').withText('LOGIN').innerText)
        .eql('LOGIN');
    });

    test('Passed Login', async t => {
      await t
        .typeText(this.email, creds.email)
        .typeText(this.password, creds.password)
        .click(this.loginButton)
        .expect(Selector('h2').withText('No Sites to Display').innerText)
        .eql('No Sites to Display');
    });
  }
};
