import {test, Page , expect } from '@playwright/test';
import {Locators} from '../locators/locators';
import {Data} from '../data/data'

export class HomepageGHL{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToLogin(){
        await this.page.goto('https://staging.gohighlevel.com/');
    }

    async loginWithCredential(email : string, password : string){
        await this.page.locator(Locators.login.inputEmail).fill(email)
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.login.inputPassword).fill(password)
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.login.loginButton).click()
        await this.page.waitForLoadState('load');
    }

    async chooseAccount(accName : string){
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.login.chooseAnAccount(accName)).first().click()
    }

    async varifyAgencyDashboard(){
        await this.page.locator(Locators.agency.dashboardHeader).isVisible();
        await this.page.waitForTimeout(10000);
        //Validate Agency Dashboad Headings
        await expect(this.page.locator(Locators.agency.dashboardHeader)).toContainText("Agency Dashboard")
        await expect(this.page.locator(Locators.agency.dashboardSubHeader)).toContainText("Revenue & Customers Overview")
        //Validate Agency Dashboard Satistics Headings
        await expect(this.page.locator(Locators.agency.dashboardStatisticsHeader).nth(0)).toContainText(Data.agencyDash.statisticsHeading1)
        await expect(this.page.locator(Locators.agency.dashboardStatisticsHeader).nth(1)).toContainText(Data.agencyDash.statisticsHeading2)
        await expect(this.page.locator(Locators.agency.dashboardStatisticsHeader).nth(2)).toContainText(Data.agencyDash.statisticsHeading3)
        await expect(this.page.locator(Locators.agency.dashboardStatisticsHeader).nth(3)).toContainText(Data.agencyDash.statisticsHeading4)
    }

    async navigateToBillingNotifications(){
        await this.page.locator(Locators.agency.dashboardHeader).isVisible();
        await this.page.locator(Locators.agency.settings).click()
        await this.page.locator(Locators.agency.billingSettings).click()
        await this.page.locator(Locators.billingDashboard.notifications).click()
    }

    async varifyNotificationsPage(){
        await expect(this.page.locator(Locators.notifications.walletHeader)).toContainText("Wallet")
        await expect(this.page.locator(Locators.notifications.walletSubHeader)).toContainText("Set up usage notifications to effectively manage your agency wallet spending")
    }

    async varifyNotificationSwitchbutton(){
        await this.page.waitForTimeout(3000);
        await this.page.locator(Locators.notifications.walletUsageMoneyInput).fill('50')
        await this.page.locator(Locators.notifications.switchButton).click()
        await this.page.waitForTimeout(3000);
        await this.page.locator(Locators.notifications.disableButton).click()
        // await this.page.locator(Locators.walletUsageMoneyInput).fill('50')
    }

}