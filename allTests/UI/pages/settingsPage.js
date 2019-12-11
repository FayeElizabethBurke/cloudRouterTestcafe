import { Selector } from 'testcafe';
var loginPage = require('./loginPage'),
  header = require('./header'),
  creds = require('../../userCred'),
  dashboard = require('./dashboard');

module.exports = {
  //elements
  plusDevice: Selector('button').withAttribute('title', 'Add Device'),
  deviceName: Selector('input').withAttribute('placeholder', 'name'),
  deviceAddr: Selector('input').withAttribute('placeholder', 'address'),
  deviceSelect: Selector('select'),
  deviceTwo: Selector('div > h3').withText('Z14'),
  dashboardTab: Selector('a'),
  configDevice: Selector('button').withAttribute('title', 'Configure Device'),
  checkbox: Selector('div >  div > div > svg').withAttribute('height', '20px'),
  submit: Selector('div > button').withText('SUBMIT'),
  configSite: Selector('button').withAttribute('title', 'Configure Site'),
  selectBox: Selector('div > select'),
  timeChange: Selector('option').nth(5),
  deleteDevice: Selector('button').withAttribute('title', 'Remove Device'),
  confirm: Selector('button').withText('CONFIRM'),
  deleteSite: Selector('button').withAttribute('title', 'Remove Site'),
  addSite: Selector('a').withText('add a site'),
  siteName: Selector('input').withAttribute('placeholder', 'name'),
  addButton: Selector('button').withText('ADD'),
  addDevice: Selector('p').find('color', 'rgb(229, 57, 53'),
  noSiteTitle: Selector('H2').withText('No Sites to Display'),
  armDeviceInitial: Selector('span').withText('Return Voltage +'),
  arm: Selector('button').withText('ZONE 1 ARM'),
  cannotArmMsg: Selector('div > div > p').withText('Device: Jane- Device # 2 failed to get to state: Armed High'),

  //tests
  settings: function () {
    fixture(`Settings`)
      .page(creds.firstPage)
      //logs in on each load
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          //   .resizeWindow(1900, 900)
          .typeText(loginPage.email, creds.email)
          .typeText(loginPage.password, creds.password)
          .click(loginPage.loginButton);
      });
      test('Site added', async t => {
        await t
          .wait(4000) //do not remove this
          .click(this.addSite)
          .typeText(this.siteName, "Jane's Site")
          .click(this.addButton)
          .expect(Selector('p').innerText)
          .eql('No Devices to Display');
      });
    let deviceCount = 1;
    test('add Device', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.plusDevice)
        .typeText(this.deviceName, creds.firstName + '- Device # ' + deviceCount)
        .typeText(this.deviceAddr, deviceCount + '16522/' + deviceCount + '16522')
        .click(this.deviceSelect)
        .click(Selector('option').withText('Wifi Gateway (PTE0253)'))
        .click(Selector('button').withText('ADD'))
        .wait(2000)
    });

    test('add another device', async t => {
      await t
        .wait(4000)
        .click(header.settingsTab)
        .wait(1500)
        .click(this.plusDevice)
        .typeText(this.deviceName, creds.firstName + '- Device # ' + (deviceCount + 1))
        .typeText(this.deviceAddr, deviceCount + 1 + '26522/' + (deviceCount + 1) + '26522')
        .click(this.deviceSelect)
        .click(Selector('option').withText('Z14'))
        .click(Selector('button').withText('ADD'))
        .wait(2000)
    });

    test('move devices', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .dragToElement(this.deviceTwo, this.dashboardTab)
        .expect(Selector('div > h3').withText(creds.firstName + '- Device # 1').innerText)
        .eql(creds.firstName + '- Device # 1');
    });

    test('hide devices', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configDevice)
        .click(this.checkbox)
        .click(this.submit)
        .click(header.dashboard)
        .expect(Selector('div > span').withText('Jane- Device # 1').innerText)
        .eql('Jane- Device # ' + deviceCount);
    });

    test('change devices', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configDevice)
        .click(this.checkbox)
        .click(this.deviceName)
        .pressKey('ctrl+a delete')
        .typeText(this.deviceName, 'Device Changed')
        .click(this.submit)
        .expect(Selector('div > h3').innerText)
        .eql('Device Changed');
    });

    test('change site', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configSite)
        .typeText(this.siteName, ' - Changed')
        .click(this.selectBox)
        .click(this.timeChange)
        .click(this.checkbox)
        .click(this.submit)
        .expect(Selector('h2').innerText)
        .eql(creds.firstName + "'s Site - Changed (owner)");
    });

    test('breakdown', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.deleteDevice)
        .click(this.confirm)
        .expect(Selector('div > h3').innerText)
        .eql(creds.firstName + '- Device # ' + deviceCount)
        .wait(3000)
        .click(header.settingsTab)
        .click(this.deleteSite)
        .click(this.confirm)
        .wait(3000)
        .expect(Selector(header.myAccount).innerText)
        .eql('MY ACCOUNT');
    });
  }
};
