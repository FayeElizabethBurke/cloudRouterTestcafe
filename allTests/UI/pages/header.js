import { Selector } from 'testcafe';
var loginPage = require('./loginPage'),
  creds = require('../../userCred'),
  dashboard = require('./dashboard');

module.exports = {
  //elements
  settingsTab: Selector('a').withAttribute('href', '/settings'),
  dashboard: Selector('a'),
  logTab: Selector('a').withText('LOGS'),
  graphTab: Selector('a > div').withText('GRAPHING'),
  myAccount: Selector('a > div').withText('MY ACCOUNT'),
  logoutTab: Selector('div > div > div').nth(2),
  logoutButton: Selector('button').withText('LOGOUT'),

  //tests

  headerBar: function() {
    fixture(`TABs`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          //   .resizeWindow(1900, 900)
          .typeText(loginPage.email, creds.email)
          .typeText(loginPage.password, creds.password)
          .click(loginPage.loginButton);
      });

    test('check tabs', async t => {
      await t
        .wait(1000)
        .click(this.dashboard)
        .click(this.logTab)
        .wait(3000)
        .expect(Selector('div > h1').withText('No Logs Found...').innerText)
        .eql('No Logs Found...')
        .click(this.graphTab)
        .expect(Selector('div > button').withText('RESET').innerText)
        .eql('RESET')
        .click(this.myAccount)
        .expect(Selector('div > h1').withText('Subscription').innerText)
        .eql('Subscription');
    });

    test('logout', async t => {
      await t
        .wait(3000)
        .click(this.logoutTab)
        .click(this.logoutButton)
        .expect(Selector('a > div').withText('LOGIN').innerText)
        .eql('LOGIN')
        .wait(3000);
    });
  }
};
