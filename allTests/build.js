import { Selector } from 'testcafe';
var loginPage = require('./UI/pages/loginPage.js'),
  header = require('./UI/pages/header'),
  creds = require('./userCred'),
  settings = require('./UI/pages/settingsPage');

module.exports = {
    build: function(){
        fixture(`Build Environment`)
        .page(creds.firstPage)
        test('Build Environment', async t => {
            await t
            .maximizeWindow()
            .typeText(loginPage.email, creds.email)
            .typeText(loginPage.password, creds.password)
            .click(loginPage.loginButton)
              .wait(4000) //do not remove this
              .click(settings.addSite)
              .typeText(settings.siteName, "Jane's Site")
              .click(settings.addButton)
              .expect(Selector('p').innerText)
              .eql('No Devices to Display')
              .wait(3000)
              .click(header.settingsTab)
              .click(settings.plusDevice)
              .typeText(settings.deviceName, creds.firstName + '- Device # ' + 1)
              .typeText(settings.deviceAddr, 1 + '16522/' + 1 + '16522')
              .click(settings.deviceSelect)
              .click(Selector('option').withText('Wifi Gateway (PTE0253)'))
              .click(Selector('button').withText('ADD'))
              .wait(2000)
              .click(header.settingsTab)
              .wait(1500)
              .click(settings.plusDevice)
              .typeText(settings.deviceName, creds.firstName + '- Device # ' + (1 + 1))
              .typeText(settings.deviceAddr, 1 + 1 + '26522/' + (1 + 1) + '26522')
              .click(settings.deviceSelect)
              .click(Selector('option').withText('Z14'))
              .click(Selector('button').withText('ADD'))
              .wait(2000)
        });
    }
}

