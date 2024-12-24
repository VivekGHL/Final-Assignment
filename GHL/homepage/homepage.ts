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

    async loginWithCredential(){
        await this.page.locator(Locators.loginInputEmail).fill(Data.LoginEmail)
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.loginInputPassword).fill(Data.LoginPassword)
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.loginButton).click()
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(1000);
        await this.page.locator(Locators.chooseAnAccount).first().click()
    }

    async varifyAgencyDashboard(){
        await this.page.locator(Locators.agencyDashboardHeader).isVisible();
        await expect(this.page.locator(Locators.agencyDashboardHeader)).toContainText("Agency Dashboard")
        await expect(this.page.locator(Locators.agencyDashboardSubHeader)).toContainText("Revenue & Customers Overview")

        // const text = await this.page.locator(Locators.agencyDashboardStatisticsHeader+'nth-child(1)').textContent()
        // console.log(text)

        // await expect(this.page.locator(Locators.agencyDashboardStatisticsHeader+'nth-child(1)')).toContainText("Total Revenue Last Month")
        // await expect(this.page.locator(Locators.agencyDashboardStatisticsHeader)).toContainText("Monthly Recurring Revenue")
        // await expect(this.page.locator(Locators.agencyDashboardStatisticsHeader)).toContainText("New Customers")
        // await expect(this.page.locator(Locators.agencyDashboardStatisticsHeader)).toContainText("Total Customers")
    }

    async navigateToBillingNotifications(){
        await this.page.locator(Locators.agencyDashboardHeader).isVisible();
        await this.page.locator(Locators.agencySettings).click()
        await this.page.locator(Locators.agencyBillingSettings).click()
        await this.page.locator(Locators.billingDashboardNotifications).click()
    }

    async varifyNotificationsPage(){
        await expect(this.page.locator(Locators.billingNotificationsWalletHeader)).toContainText("Wallet")
        await expect(this.page.locator(Locators.billingNotificationsWalletHeader)).toBeInViewport()
        await expect(this.page.locator(Locators.billingNotificationsWalletSubHeader)).toContainText("Set up usage notifications to effectively manage your agency wallet spending")
    }

    async varifyNotificationSwitchbutton(){
        await this.page.waitForTimeout(3000);
        await this.page.locator(Locators.walletUsageMoneyInput).fill('50')
        await this.page.locator(Locators.billingnotificationsSwitchButton).click()
        await this.page.waitForTimeout(3000);
        await this.page.locator(Locators.notificationDisableButton).click()
        // await this.page.locator(Locators.walletUsageMoneyInput).fill('50')
    }

}