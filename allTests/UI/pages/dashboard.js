import { Selector } from 'testcafe';
var loginPage = require('./loginPage'),
  header = require('./header'),
  creds = require('../../userCred');

module.exports = {
  //elements
  authentication: Selector('div > span').withText('authenticated'),


  //tests
  dashGroup: function() {
    fixture(`Dashboard`)
      .page(creds.firstPage)
      .beforeEach(async t => {
        await t
          .maximizeWindow()
          //   .resizeWindow(1900, 900)
          .typeText(loginPage.email, creds.email)
          .typeText(loginPage.password, creds.password)
          .click(loginPage.loginButton);
      });

    test('Authenticated', async t => {
      await t.expect(Selector(this.authentication).getStyleProperty('color')).eql('rgb(0, 128, 0)');
    });
  }
};
