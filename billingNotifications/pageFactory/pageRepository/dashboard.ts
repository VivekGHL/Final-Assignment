import {test, Page , expect } from '@playwright/test';
import {agencyPageObject} from '../objectRepository/agency.object';
import {billingDashboardPageObject} from '../objectRepository/billingDashboard.object';
import {agencyDashTestData} from '../../testData/agencyDash.data'

export class Dashboard{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async verifyText(loc : string, text : string, index : number = 0){
        await expect(this.page.locator(loc).nth(index)).toContainText(text)
    }

    async wait(time : number){
        await this.page.waitForTimeout(time);
    }

    async varifyAgencyDashboard(){
        await this.page.locator(agencyPageObject.dashboardHeader).isVisible();
        await this.wait(12000)
        //Validate Agency Dashboad Headings
        await this.verifyText(agencyPageObject.dashboardHeader, agencyDashTestData.header)
        await this.verifyText(agencyPageObject.dashboardSubHeader, agencyDashTestData.subHeader)
        //Validate Agency Dashboard Satistics Headings
        await this.verifyText(agencyPageObject.dashboardStatisticsHeader, agencyDashTestData.statisticsHeading1, 0)
        await this.verifyText(agencyPageObject.dashboardStatisticsHeader, agencyDashTestData.statisticsHeading2, 1)
        await this.verifyText(agencyPageObject.dashboardStatisticsHeader, agencyDashTestData.statisticsHeading3, 2)
        await this.verifyText(agencyPageObject.dashboardStatisticsHeader, agencyDashTestData.statisticsHeading4, 3)
    }

    async navigateToBillingNotifications(){
        await this.page.locator(agencyPageObject.dashboardHeader).isVisible();
        await this.page.locator(agencyPageObject.settings).click()
        await this.page.locator(agencyPageObject.billingSettings).click()
        await this.page.locator(billingDashboardPageObject.notifications).click()
    }

}