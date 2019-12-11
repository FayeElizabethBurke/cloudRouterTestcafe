import { Selector } from 'testcafe';
var loginPage = require('./UI/pages/loginPage.js'),
  header = require('./UI/pages/header'),
  creds = require('./userCred'),
  settings = require('./UI/pages/settingsPage');

module.exports = {
    break: function (){
            fixture(`Break Environment`)
            .page(creds.firstPage)
        test('Removed', async t => {
            await t
            .maximizeWindow()
            .typeText(loginPage.email, creds.email)
            .typeText(loginPage.password, creds.password)
            .click(loginPage.loginButton)
              .wait(3000)
              .click(header.settingsTab)
              .click(settings.deleteDevice)
              .click(settings.confirm)
              .expect(Selector('div > h3').innerText)
              .eql(creds.firstName + '- Device # ' + 1)
              .wait(3000)
              .click(header.settingsTab)
              .wait(3000)
              .click(settings.deleteSite)
              .click(settings.confirm)
              .wait(3000)
              .expect(Selector(header.myAccount).innerText)
              .eql('MY ACCOUNT');
          });
    }
}