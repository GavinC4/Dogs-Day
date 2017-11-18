var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("Dogs-Day", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages

  this.timeout(30000);
  it("should send user to the front page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://dogs-day.herokuapp.com/")
      // Click the map link
      .click("a[href='#login']")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // Asset the title is as expected
      .then(function(title) {
        expect(title).to.equal("login | Dogs-Day");
        done();
      });
  });

  it("should present a link to front page after login", function(done) {
    new Nightmare({ show: true })
      .goto("https://dogs-day.herokuapp.com/")
      // Enter username.
      .type("#username", "ResilD")
      // Enter password.
      .type("#password", "dummy*password")
      // Click the login button
      .click("#user_submit")
      // Evaluate the following selector
      .evaluate(function() {
        // go to team section
        return document.querySelector("a[href='#team']");
      })
      .then(function(link) {
        expect(link).to.not.equal(undefined);
        done();
      });
  });

  it("should throw an error for fun", function() {
    throw new Error("Failed on purpose, just to make the Mocha output more interesting.");
  });
});
