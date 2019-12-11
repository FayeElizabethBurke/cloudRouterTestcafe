# Cloud Router Automated e2e Tests

Here you can find the End to End tests for Cloud Router.

## Description

These tests allow the developer to save time on testing end products and features by automating standard user practices.

## To Start
To build test environment (for member permission testing)
run builder.build()

To break down
run teardown.break()

The tests must be ran on 4 accounts. One account (main) must already be upgraded to pro while the others must remain activated free users.
User details can be edited and changed in userCreds.js.

All accounts must initially be empty (no sites or devices).

## Using the workspace

All the files reside testcafe > allTests.
They are further split into Pages (for basic UI testing) and Features. Elements like buttons and headings reside in their page and can be accessed externally.


# Fin.
