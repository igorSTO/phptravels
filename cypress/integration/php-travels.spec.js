/**
 * @link npx cypress run --spec "cypress/integration/php-travels.spec.js"
 * @author Igor Stotskyy
 */

import { base } from "../support/page-objects/base"

describe('Check phptravles application', () => {

    describe('Check destination result', () => {

        it('Open phptravels application and check destination result', () => {
            cy.visit('/');
            cy.url().should('include', 'home');
            base.fillDestination({ data: 'Chicago' })

            base.clickElement({ element: base.chooseLocation })
            base.fillDatePicker({ year: 2020, month: 10, date: 1, element: base.checkin })
            base.fillDatePicker({ year: 2020, month: 10, date: 5, element: base.checkout })
            base.clickPasanger({ element: base.pasanger.adult })
            base.clickPasanger({ element: base.pasanger.children })
            base.clickElement({ element: base.submit })
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.resultText, text: text.resultText })

            });
        });

    });

    describe('Verify if checkboxes checked after clicking search btn', () => {

        it('Check Airport Transport, Guest House and High to Low checkboxes', () => {

            base.clickCheckbox({ element: base.checkbox.airportTransport, expect: 'be.checked' })
            base.clickCheckbox({ element: base.checkbox.guestHouse, expect: 'be.checked' })
            base.clickCheckbox({ element: base.radioBtn.highToLow, expect: 'be.checked' })
            base.clickElement({ element: base.filterSearch })

        });

        it('Verify if Airport Transport still checked after cliking search', () => {
            cy.get(base.checkbox.airportTransport).should('be.checked')
        });

        it('Verify if Guest House still checked after cliking search', () => {
            cy.get(base.checkbox.guestHouse).should('be.checked')
        });

        it('Verify if High to Low still checked after cliking search', () => {
            cy.get(base.radioBtn.highToLow).should('be.checked')
        });

    });

    describe('Check user credentials on the login page', () => {

        it('Click my acconut btn and check user credentials with valid and invalid data', () => {
            base.clickContainElement({ element: base.myAccount })
            base.clickElement({ element: base.login })
            cy.url().should('include', 'login');

            // Invalid Credentials
            cy.fixture("credential").then((credentials) => {
                base.fillField({ element: base.loginForm.email, data: credentials.invalidEmail })
                base.fillField({ element: base.loginForm.password, data: credentials.invalidPassword })
            });
            base.clickElement({ element: base.submit })
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.error, text: text.loginError })
            });

            // Valid Credentials
            cy.fixture("credential").then((credentials) => {
                base.fillField({ element: base.loginForm.email, data: credentials.email })
                base.fillField({ element: base.loginForm.password, data: credentials.password })
            });
            base.clickElement({ element: base.submit })
            cy.url().should('include', 'account');
            cy.fixture("text-messages").then((text) => {
                base.expectText({ element: base.grettings, text: text.grettings })
            });

        });

    });

});