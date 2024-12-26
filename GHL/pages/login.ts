import {test, Page , expect } from '@playwright/test';
import {Locators} from '../locators/locators';
import {Data} from '../data/data'

export class LoginPage{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToLogin(url : string){
        await this.page.goto(url);
    }

    async wait(time : number){
        await this.page.waitForTimeout(time);
    }

    async loginWithCredential(email : string, password : string){
        await this.page.locator(Locators.login.inputEmail).fill(email)
        await this.wait(1000);
        await this.page.locator(Locators.login.inputPassword).fill(password)
        await this.wait(1000);
        await this.page.locator(Locators.login.loginButton).click()
        await this.page.waitForLoadState('load');
    }

    async chooseAnAccount(accName : string){
        await this.wait(1000);
        await this.page.locator(Locators.login.chooseAnAccount(accName)).first().click()
    }

}