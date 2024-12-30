import {test, Page , expect } from '@playwright/test';
import {notificationsPageObject} from '../objectRepository/notifications.object';
import {notificationsTestData} from '../../testData/notifications.data'

export class NotificationsPage{
    readonly page : Page;

    constructor(page: Page){
        this.page = page;
    }

    async isVisible(loc : string){
        await this.page.waitForSelector(loc)
        expect(this.page.locator(loc)).toBeVisible()
    }
    async click(loc : string){
        await this.page.waitForSelector(loc)
        await this.page.locator(loc).click()
        
    }
    async verifyText(loc : string, text : string, index : number = 0){
        await this.isVisible(loc)
        expect(this.page.locator(loc).nth(index)).toContainText(text)
    }

    async wait(time : number){
        await this.page.waitForTimeout(time);
    }

    async isElementPresent(locator: string){
        try {
            await this.page.waitForSelector(locator, { timeout: 5000 });
            expect(this.page.locator(locator)).toBeVisible()
            return true;
        } catch (error) {
            return false;
        }
    }

    async varifyNotificationsPage(){
        await this.verifyText(notificationsPageObject.walletHeader, notificationsTestData.header)
        await this.verifyText(notificationsPageObject.walletSubHeader, notificationsTestData.walletSubHeader)
        await this.verifyText(notificationsPageObject.walletSubSubHeader, notificationsTestData.walletSubSubHeader)
        // validate Notification Toggel Btn 
        await this.isVisible(notificationsPageObject.switchButton)
        // verify Notification Threshold Text
        await this.verifyText(notificationsPageObject.notificationThresholdText, notificationsTestData.notificationThresholdText)
        // verify Global Limit Text
        await this.verifyText(notificationsPageObject.globalLimitText, notificationsTestData.globalLimitText)
        // verify Sub Acc Text
        await this.verifyText(notificationsPageObject.subAccText, notificationsTestData.subAccText)
        // Validate Sub Acc Input
        await this.isVisible(notificationsPageObject.subAccinput)
        // verify Email Notification Text
        await this.verifyText(notificationsPageObject.emailNotificationText, notificationsTestData.emailNotificationText)
        // verify Wallet Usage Text
        await this.verifyText(notificationsPageObject.walletUsageText, notificationsTestData.walletUsageText)
        // verify wallet Amount and Time Input
        await this.isVisible(notificationsPageObject.walletUsageAmountInput)
        await this.isVisible(notificationsPageObject.walletUsageTimeDropdown)
        // verify discard and save btn
        await this.isVisible(notificationsPageObject.discardBtn)
        await this.isVisible(notificationsPageObject.saveBtn)
        //verify Notified Email section 
        // await this.verifyText(notificationsPageObject.notifiedEmailTitle, notificationsTestData.notifiedEmailTitle)
        // await this.isVisible(notificationsPageObject.notifiedEmailAddBtn)
        // verify default Notified Email and Agency Admin text written.
        await this.verifyText(notificationsPageObject.notifiedDefaultEmail, notificationsTestData.notifiedDefaultEmail)
        await this.verifyText(notificationsPageObject.AgencyOwnerText, notificationsTestData.AgencyOwnerText)
    }
    // Status of toggle button
    async switchButtonStatus(){
        const ariaChecked = await this.page.locator(notificationsPageObject.switchCheckStatus).getAttribute('aria-checked');
        if(ariaChecked == 'false'){
            return false;
        }
        return true;
    }
    // Switch On 
    async turnOnSwitchButton(){
        if(await this.switchButtonStatus() == false ){
            await this.click(notificationsPageObject.switchButton)
        }
    }
    async validateDisableNotificationsPopUp(){
        //validate Notifications Disabled pop up
        await this.verifyText(notificationsPageObject.titleDisablePopUp,notificationsTestData.titleDisablePopUp)
        await this.verifyText(notificationsPageObject.descriptionDisablePopUp,notificationsTestData.descriptionDisablePopUp)
        await this.isVisible(notificationsPageObject.cancelDisablebutton)
        await this.isVisible(notificationsPageObject.disableButton)
        await this.click(notificationsPageObject.disableButton)
        //validate Notifications Disabled Confiramtion pop up is coming
        await this.isVisible(notificationsPageObject.disableAlertPopUp)
        await this.verifyText(notificationsPageObject.disableAlertPopUpHeader, notificationsTestData.disableAlertPopUpHeader)
        await this.verifyText(notificationsPageObject.disableAlertPopUpSubHeader, notificationsTestData.disableAlertPopUpSubHeader)
    }
    //Switch Off
    async turnOffSwitchButton(){
        if(await this.switchButtonStatus() == true){
            await this.wait(2000)
            await this.click(notificationsPageObject.switchButton)
            await this.validateDisableNotificationsPopUp()
        }
    }
    async varifyDisabledElements(){
        expect(this.page.locator(notificationsPageObject.walletUsageAmountInput)).toBeDisabled()
        // expect(this.page.locator(notificationsPageObject.walletUsageTimeDropdown)).toBeDisabled()
        // expect(this.page.locator(notificationsPageObject.subAccinput)).toBeDisabled()
        expect(this.page.locator(notificationsPageObject.discardBtn)).toBeDisabled()
        expect(this.page.locator(notificationsPageObject.saveBtn)).toBeDisabled()
        // expect(this.page.locator(notificationsPageObject.notifiedEmailAddBtn)).toBeDisabled()

    }
    async varifyEnabledElements(){
        await this.page.waitForSelector(notificationsPageObject.walletUsageAmountInput)
        expect(this.page.locator(notificationsPageObject.walletUsageAmountInput)).toBeEnabled()
        // expect(this.page.locator(notificationsPageObject.walletUsageTimeDropdown)).toBeEnabled()
        // expect(this.page.locator(notificationsPageObject.subAccinput)).toBeEnabled()
        expect(this.page.locator(notificationsPageObject.discardBtn)).toBeEnabled()
        expect(this.page.locator(notificationsPageObject.saveBtn)).toBeEnabled()
        // expect(this.page.locator(notificationsPageObject.notifiedEmailAddBtn)).toBeEnabled()

    }
    async validateAmountInput(){
        //check with correct values
        for (let i of Object.values(notificationsTestData.correctAmount)){
            await this.page.locator(notificationsPageObject.walletUsageAmountInput).fill(i)
            await this.page.locator(notificationsPageObject.saveBtn).click()
            await this.page.waitForSelector(notificationsPageObject.walletUsageAmountInput)
            expect(this.page.locator(notificationsPageObject.walletUsageAmountInput)).toHaveValue(i)
        }
        // check with incorrect values
        for (let i of Object.values(notificationsTestData.incorrectAmount)){
            await this.page.locator(notificationsPageObject.walletUsageAmountInput).fill(i)
            await this.page.locator(notificationsPageObject.saveBtn).click()
            await this.page.waitForSelector(notificationsPageObject.walletUsageAmountInput)
            expect(this.page.locator(notificationsPageObject.walletUsageAmountInput)).not.toHaveValue(i)
        }
        //check with invalid values
        for (let i of Object.values(notificationsTestData.invalidAmount)){
            await this.page.locator(notificationsPageObject.walletUsageAmountInput).fill(i)
            expect(this.page.locator(notificationsPageObject.saveBtn)).toBeDisabled()
        }

    }
    async validateTimeInput(){ //select each element from dropdown
        for (let i of Object.values(notificationsTestData.timeDropdown)){
            await this.page.locator(notificationsPageObject.walletUsageAmountInput).fill('10')
            await this.page.locator(notificationsPageObject.walletUsageTimeDropdown).click()
            await this.page.locator(notificationsPageObject.timeDropdownElement(i)).click()
            await this.page.locator(notificationsPageObject.saveBtn).click()
            await this.page.waitForSelector(notificationsPageObject.walletUsageTimeDropdown)
            expect(this.page.locator(notificationsPageObject.walletUsageTimeDropdown)).toHaveText(i)
        }

    }

    async varifyNotificationSwitchbutton(){
        if(await this.switchButtonStatus() == false){
            await this.turnOnSwitchButton()
        }
        await this.turnOffSwitchButton() // Turn off notifications switch button
        await this.varifyDisabledElements() // check disabled elements after turning off switch
        await this.turnOnSwitchButton() // Turn on notification switch button
        await this.varifyEnabledElements() // check Enabled elements after turning on switch
        await this.validateAmountInput() // Check Input amount with number, string and special characters
        await this.validateTimeInput()

    }

    async validateAddEmails(){
        await this.click(notificationsPageObject.addEmailBtn)
        await this.click(notificationsPageObject.addEmailBox)
        await this.page.locator(notificationsPageObject.addEmailInput).fill('automation@mail.com')
        await this.wait(2000)
        await this.click(notificationsPageObject.emailDropDown)
        await this.click(notificationsPageObject.saveMailButton)
        for (let i of Object.values(notificationsTestData.emails)){
            await this.wait(1000)
            await this.click(notificationsPageObject.notifiedEmailAddBtn)
            await this.click(notificationsPageObject.addEmailBox)
            await this.page.locator(notificationsPageObject.addEmailInput).fill(i)
            await this.wait(2000)
            await this.click(notificationsPageObject.emailDropDown)
            await this.click(notificationsPageObject.saveMailButton)
        }
        //check if save btn disable after 5 mails
        await this.click(notificationsPageObject.notifiedEmailAddBtn)
        await this.click(notificationsPageObject.addEmailBox)
        await this.page.locator(notificationsPageObject.addEmailInput).fill('revextest+11@mailsac.com')
        await this.wait(2000)
        await this.click(notificationsPageObject.emailDropDown)
        await this.wait(2000)
        expect(this.page.locator(notificationsPageObject.saveMailButton)).toBeDisabled()
    }

    async removeAllMails(): Promise<void> {
        
        const crossbtn = await this.page.locator(notificationsPageObject.removeEmailCross);
    
        const count = await crossbtn.count();
        console.log(count)
        for (let i = 0; i < count; i++) {
            console.log(i)
            await crossbtn.nth(0).click();
        }
        await this.click(notificationsPageObject.saveMailButton)
    }

    async varifyAddEmailPopUp(){
        const isPresent = await this.isElementPresent(notificationsPageObject.notifiedEmailAddBtn)
        console.log(isPresent)
        if(isPresent){
            await this.click(notificationsPageObject.notifiedEmailAddBtn)
        }
        else{
            await this.click(notificationsPageObject.addEmailBtn)
        }
        
        // Varify all texts in the popup
        await this.verifyText(notificationsPageObject.titleEmailPopUp, notificationsTestData.titleEmailPopUp)
        await this.verifyText(notificationsPageObject.descriptionEmailPopUp, notificationsTestData.descriptionEmailPopUp)
        await this.verifyText(notificationsPageObject.addUserText, notificationsTestData.addUserText)

        if(isPresent){
            await this.removeAllMails() //Remove all previous mails
        }
        else{
            await this.click(notificationsPageObject.saveMailButton)
        }

    }

    async validateEmailSection(){
        
        await this.varifyAddEmailPopUp() //varify Add Email Pop Up
        await this.validateAddEmails() //validate adding add Emails
        

    }

}