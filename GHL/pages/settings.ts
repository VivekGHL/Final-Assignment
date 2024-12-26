import {test, Page , expect } from '@playwright/test';
import {Locators} from '../locators/locators';
import {Data} from '../data/data'

export class SettingsPage{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToBillingNotifications(){
        await this.page.locator(Locators.agency.dashboardHeader).isVisible();
        await this.page.locator(Locators.agency.settings).click()
        await this.page.locator(Locators.agency.billingSettings).click()
        await this.page.locator(Locators.billingDashboard.notifications).click()
    }


}