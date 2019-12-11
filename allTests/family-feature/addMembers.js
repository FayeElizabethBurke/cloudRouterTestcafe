import { Selector } from 'testcafe';
var loginPage = require('../UI/pages/loginPage.js'),
  header = require('../UI/pages/header'),
  creds = require('../userCred'),
  settings = require('../UI/pages/settingsPage'),
  accountPage = require('../UI/Pages/accountPage'),
builder = require('../build'),
tearDown = require('../teardown');

module.exports = {
  //elements
  configUsers: Selector('button').withAttribute('title', 'Configure Site Users'),
  addUser: Selector('button').withAttribute('title', 'Add User'),
  modalAddUser: Selector('div > button').withText('ADD USER'),
  userEmail: Selector('input').withAttribute('placeholder', 'email'),
  superOption: Selector('option').withAttribute('value', '200'),
  adminOption: Selector('option').withAttribute('value', '100'),
  refresh: Selector('button').withAttribute('title', 'Refresh Device State'),
  upgrade: Selector('button').withText('UPGRADE'),
  removeUser: Selector('button').withAttribute('title', 'Remove User'),
  //tests
  familyFunc: function() {
    builder.build();
    fixture(`Family Function`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          .typeText(loginPage.email, creds.email)
          .typeText(loginPage.password, creds.password)
          .click(loginPage.loginButton);
      });
    test('Add User', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configUsers)
        .click(this.addUser)
        .typeText(this.userEmail, creds.userAcc[0])
        .click(settings.checkbox)
        .click(this.modalAddUser);
    });

    test('Add Supervisor', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configUsers)
        .click(this.addUser)
        .typeText(this.userEmail, creds.superAcc[0])
        .click(settings.selectBox)
        .click(this.superOption)
        .click(settings.checkbox)
        .click(this.modalAddUser);
    });

    test('Add Admin', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configUsers)
        .click(this.addUser)
        .typeText(this.userEmail, creds.adminAcc[0])
        .click(settings.selectBox)
        .click(this.adminOption)
        .click(settings.checkbox)
        .click(this.modalAddUser);
    });
  },

userPermissions: function(){
    fixture(`Free User`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          .typeText(loginPage.email, creds.userAcc[0])
          .typeText(loginPage.password, creds.userAcc[1])
          .click(loginPage.loginButton);
      });

      test('View Site as Free User', async t => {
        await t
          .wait(3000)
          .expect(Selector('div > span').withText(creds.firstName + "'s Site (user)").innerText)
          .eql(creds.firstName + "'s Site (user)");
      });
  
      test('View Devices as Free User', async t => {
        await t
          .wait(3000)
          .click(header.settingsTab)
          .expect(settings.deviceTwo.innerText)
          .eql('Z14: 226522/226522');
      });
  
      test('Free User cannot edit devices', async t => {
        await t.expect(this.refresh.exists).ok();
      });
  
      test('Free User cannot add devices, configure sites or configure users', async t => {
        await t
          .expect(settings.plusDevice.exists)
          .notOk()
          .expect(settings.configSite.exists)
          .notOk()
          .expect(this.configUsers.exists)
          .notOk();
      });
  
      test('Free User cannot access logs', async t => {
        await t.expect(header.logTab.exists).notOk();
      });
  
      accountPage.notificationCheck(creds.userAcc[0], creds.userAcc[1]);
},

  superPermissions: function () {
    fixture(`Free Super`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          .typeText(loginPage.email, creds.superAcc[0])
          .typeText(loginPage.password, creds.superAcc[1])
          .click(loginPage.loginButton);
      });

    test('View Site as Free Super', async t => {
      await t
        .wait(3000)
        .expect(Selector('div > span').withText(creds.firstName + "'s Site (supervisor)").innerText)
        .eql(creds.firstName + "'s Site (supervisor)");
    });

    test('View Devices as Free Super', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .expect(settings.deviceTwo.innerText)
        .eql('Z14: 226522/226522');
    });

    test('Free Super cannot edit devices', async t => {
      await t.expect(this.refresh.exists).ok();
    });

    test('Free Super cannot add devices, configure sites or configure users', async t => {
      await t
        .expect(settings.plusDevice.exists)
        .notOk()
        .expect(settings.configSite.exists)
        .notOk()
        .expect(this.configUsers.exists)
        .notOk();
    });

    test('Free Super CAN control devices', async t => {
      await t
        .click(settings.armDeviceInitial)
        .click(settings.arm)
        .wait(25000)
        .expect(settings.cannotArmMsg.exists)
        .ok();
    });

    test('Supervisor can access logs', async t => {
      await t
        .click(header.logTab)
        .expect(Selector('div').withText('Armed High').exists)
        .ok();
    });

    accountPage.notificationCheck(creds.superAcc[0], creds.superAcc[1]);
  },

  //admin permissions

  adminPermissions: function () {
    fixture(`Free Admin`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          .typeText(loginPage.email, creds.adminAcc[0])
          .typeText(loginPage.password, creds.adminAcc[1])
          .click(loginPage.loginButton);
      });

    test('View Site as Free Admin', async t => {
      await t
        .wait(3000)
        .expect(Selector('div > span').withText(creds.firstName + "'s Site (admin)").innerText)
        .eql(creds.firstName + "'s Site (admin)");
    });

    test('View Devices as Free Admin', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .expect(settings.deviceTwo.innerText)
        .eql('Z14: 226522/226522');
    });

    test('Free Admin can edit devices', async t => {
      await t.expect(this.refresh.exists).ok();
    });

    test('Free Admin can control devices', async t => {
      await t
        .click(settings.armDeviceInitial)
        .click(settings.arm)
        .wait(25000)
        .expect(settings.cannotArmMsg.exists)
        .ok();
    });

    test('Admin can access logs', async t => {
      await t
        .click(header.logTab)
        .expect(Selector('div').withText('Armed High').exists)
        .ok();
    });

    accountPage.notificationCheck(creds.adminAcc[0], creds.adminAcc[1]);

    test('Free admin can edit sites and devices', async t => {
      await t
        .wait(2000)
        .click(header.settingsTab)
        .wait(1000)
        .expect(settings.configSite.exists)
        .ok()
        .expect(settings.deleteDevice.exists)
        .ok()
        .expect(settings.plusDevice.exists)
        .ok();
    });

    test('Free admin can add/delete Users/Supers', async t => {
      await t
        .wait(3000)
        .click(header.settingsTab)
        .click(this.configUsers)
        .click(this.removeUser)
        .click(settings.confirm)
        .click(this.addUser)
        .typeText(this.userEmail, creds.userAcc[0])
        .click(this.modalAddUser)
        .expect(Selector('*').withText(creds.userAcc[0]).exists)
        .ok();
    });
    tearDown.break();
  }
};
