import { Selector } from 'testcafe';
var loginPage = require('./loginPage'),
  header = require('./header'),
  creds = require('../../userCred'),
  dashboard = require('./dashboard'),
  settingsPage = require('./settingsPage'),
  addMembers = require('../../family-feature/addMembers');

module.exports = {
  //elements

  upgradeButton: Selector('button').withText('UPGRADE'),
  upgradeSelect: Selector('option').nth(1),
  firstField: Selector('input').withAttribute('placeholder', 'first name'),
  lastField: Selector('input').withAttribute('placeholder', 'last name'),
  companyField: Selector('input').withAttribute('placeholder', 'company'),
  cardNum: Selector('#number').nth(0),
  cvv: Selector('#cvv'),
  expiration: Selector('#expiration'),
  postCode: Selector('#postalCode'),
  notificationEmail: Selector('input').withAttribute('placeholder', 'Email address used for Notifications/Alarms'),
  emailTest: Selector('button').withText('SEND TEST EMAIL'),

  //tests
  notificationCheck: function (email, password) {
    fixture(`Notifications`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          //   .resizeWindow(1900, 900)
          .typeText(loginPage.email, email)
          .typeText(loginPage.password, password)
          .click(loginPage.loginButton)
          .wait(3000);
      });

    test('Receive test notification', async t => {
      await t
        .click(header.myAccount)
        .click(this.notificationEmail)
        .pressKey('ctrl+a delete')
        .typeText(this.notificationEmail, email)
        .click(this.emailTest)
        .click(settingsPage.submit)
        .navigateTo('https://gmail.com')
        .wait(5000)
        .click(loginPage.email)
        .typeText(loginPage.email, email)
        .pressKey('enter')
        .typeText(loginPage.password, password)
        .pressKey('enter')
        .wait(5000)
        .expect(Selector('*').withText('Cloud Router - Test Email').exists)
        .ok();
    });
  }
};
