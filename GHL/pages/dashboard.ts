import {test, Page , expect } from '@playwright/test';
import {Locators} from '../locators/locators';
import {Data} from '../data/data'

export class Dashboard{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async varifyText(loc : string, text : string, index : number = 0){
        await expect(this.page.locator(loc).nth(index)).toContainText(text)
    }

    async wait(time : number){
        await this.page.waitForTimeout(time);
    }

    async varifyAgencyDashboard(){
        await this.page.locator(Locators.agency.dashboardHeader).isVisible();
        await this.wait(7000)
        //Validate Agency Dashboad Headings
        await this.varifyText(Locators.agency.dashboardHeader, Data.agencyDash.header)
        await this.varifyText(Locators.agency.dashboardSubHeader, Data.agencyDash.subHeader)
        //Validate Agency Dashboard Satistics Headings
        await this.varifyText(Locators.agency.dashboardStatisticsHeader, Data.agencyDash.statisticsHeading1, 0)
        await this.varifyText(Locators.agency.dashboardStatisticsHeader, Data.agencyDash.statisticsHeading2, 1)
        await this.varifyText(Locators.agency.dashboardStatisticsHeader, Data.agencyDash.statisticsHeading3, 2)
        await this.varifyText(Locators.agency.dashboardStatisticsHeader, Data.agencyDash.statisticsHeading4, 3)
    }

    async navigateToBillingNotifications(){
        await this.page.locator(Locators.agency.dashboardHeader).isVisible();
        await this.page.locator(Locators.agency.settings).click()
        await this.page.locator(Locators.agency.billingSettings).click()
        await this.page.locator(Locators.billingDashboard.notifications).click()
    }

}