import {test, Page , expect } from '@playwright/test';
import {Locators} from '../locators/locators';
import {Data} from '../data/data'

export class NotificationsPage{
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

    async varifyNotificationsPage(){
        await this.varifyText(Locators.notifications.walletHeader, Data.notifications.header)
        await this.varifyText(Locators.notifications.walletSubHeader, Data.notifications.walletSubHeader)
        await this.varifyText(Locators.notifications.walletSubSubHeader, Data.notifications.walletSubSubHeader)
    }

    async varifyNotificationSwitchbutton(){
        await this.wait(2000)
        await this.page.locator(Locators.notifications.walletUsageMoneyInput).fill('50')
        await this.page.locator(Locators.notifications.switchButton).click()
        await this.wait(2000)
        await this.page.locator(Locators.notifications.disableButton).click()
        await this.page.isVisible(Locators.notifications.disableAlertPopUp)
        //validate Notifications Disabled pop up is coming
        await this.varifyText(Locators.notifications.disableAlertPopUpHeader, Data.notifications.disableAlertPopUpHeader)
        await this.varifyText(Locators.notifications.disableAlertPopUpSubHeader, Data.notifications.disableAlertPopUpSubHeader)
        // await this.page.locator(Locators.walletUsageMoneyInput).fill('50')
    }

}