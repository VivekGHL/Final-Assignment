import {test, Page , expect } from '@playwright/test';
import {loginPageObjects} from '../objectRepository/login.object';

export class CommonPage{
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
        await this.page.locator(loginPageObjects.inputEmail).fill(email)
        await this.wait(1000);
        await this.page.locator(loginPageObjects.inputPassword).fill(password)
        await this.wait(1000);
        await this.page.locator(loginPageObjects.loginButton).click()
        await this.page.waitForLoadState('load');
    }

    async chooseAnAccount(accName : string){
        await this.wait(2000);
        expect(this.page.locator(loginPageObjects.chooseAnAccount(accName))).toBeVisible()
        await this.page.locator(loginPageObjects.chooseAnAccount(accName)).first().click()
    }

}