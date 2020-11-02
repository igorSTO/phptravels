/// <reference types="cypress" />

export class Base {
    constructor() {
        this.destinationInput = '[name="HOTELS"] .hotelsearch';
        this.chooseLocation = '.select2-match';
        this.fillLocation = '#s2id_autogen16 > .select2-choice > .select2-chosen';
        this.bth = '[type="button"]';
        this.spin = '.bootstrap-touchspin';
        this.resultText = '.product-long-item-wrapper .text-center';
        this.submit = '[type="submit"]';
        this.filterSearch = '#searchform';
        this.myAccount = 'My Account';
        this.login = '[href="https://www.phptravels.net/login"]';
        this.error = '[class="alert alert-danger"]';
        this.grettings = '.text-align-left';

        this.checkin = 'input[id="checkin"]';
        this.checkout = 'input[id="checkout"]';

        this.pasanger = {
            adult: '[name="adults"]',
            children: '[name="children"]'
        }

        this.checkbox = {
            airportTransport: '[id="Airport Transport"]',
            guestHouse: '[id="Airport Transport"]'
        }

        this.radioBtn = {
            highToLow: '[id="priceOrderDes"]'
        }

        this.loginForm = {
            email: '[name="username"]',
            password: '[name="password"]'
        }
    }

    fillDestination({ index = 0, data = '' }) {
        cy.get(this.destinationInput).eq(index).type(data);
    }

    clickContainElement({ element = '', index = 0 }) {
        cy.contains(element).eq(index).click({ force: true });
    }

    clickElement({ element = '', index = 0 }) {
        cy.get(element).eq(index).click({ force: true });
    }

    fillField({ element = '', index = 0, data = '' }) {
        cy.get(element).eq(index).clear({ force: true }).type(data, { force: true });
    }

    fillDatePicker({ year = '', month = '', date = '', element = '' }) {
        const targetDate = Cypress.moment()
            .set('year', year)
            .set('month', month)
            .set('date', date)
            .format('MM/DD/YYYY')
        cy.get(element)
            .clear()
            .type(targetDate)
    }

    clickPasanger({ element = '', index = 0 }) {
        cy.get(element)
            .parent(this.spin)
            .find(this.bth)
            .eq(index)
            .click({ force: true });
    }

    expectText({ element = '', text = '' }) {
        cy.get(element).should('have.text', text)
    }

    clickCheckbox({ element = '', expect = '' }) {
        cy.get(element).check({ force: true }).should(expect)
    }

}

export const base = new Base();