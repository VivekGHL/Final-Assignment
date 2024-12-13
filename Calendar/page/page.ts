import { test, expect , Page} from '@playwright/test';
import { Locators } from '../Locators/locators';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
function getRandomValue(): number {
    return Math.floor(Math.random() * 12);
}
// function getRandomMonth(): string {
//     const months = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];

//     const randomIndex = Math.floor(Math.random() * months.length);

//     return months[randomIndex];
// }

export class CalendarPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigatetoCalendarPage() {
        await this.page.goto('https://funnel-preview-dot-highlevel-staging.uc.r.appspot.com/widget/booking/xdiovPUmlHyxhSyGgSmx/?widget_type=classic', { waitUntil: 'domcontentloaded' });
    }

    public async navigatetoNextYear() {
        await this.page.waitForTimeout(3000);
        await this.page.locator(Locators.nextMonthButton).click()
        // await expect(this.page.locator(Locators.CalendarYearText).last()).toContainText('2025')
    }

    public async navigatetoNextmonth() {
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('load');
        await this.page.locator(Locators.nextMonthButton).click()
        await this.page.waitForTimeout(1000);
    }

    public async bookAppointment(){
        await this.page.locator(Locators.firstNameInput).fill('Viv')
        await this.page.locator(Locators.lastNameInput).fill('Viv')
        const date = await this.page.locator('//span[@class="ml-2 text-capitalize"]').textContent()
        // console.log(date)
        await this.page.locator(Locators.phoneInput).pressSequentially('9876543210')
        await this.page.locator(Locators.emailInput).fill('Viv@viv.com')
        await this.page.locator(Locators.checkboxInput).click()
        await this.page.waitForTimeout(3000);

        await this.page.locator(Locators.bookAppointmentButton).click()
        await this.page.locator(Locators.confirmationText).isVisible()
        await expect(this.page.locator(Locators.confirmationText)).toContainText("Thank you")
    }

    public async addAppointmentDate() {
        // const randMonth = getRandomMonth();
        // console.log(randMonth)
        
        // let count = 1
        // while(true){
        //     if(count > 12) break;
        //     count = count+1;
        //     const text = await this.page.locator(Locators.CalendarMonthText).textContent();
        //     console.log(text)
        //     if(text && text.includes(randMonth)){
        //         break;
        //     }
        //     this.navigatetoNextmonth();
        // }

        let randMonthValue = getRandomValue();
        // console.log(randMonthValue);
        while(randMonthValue){
            randMonthValue = randMonthValue - 1;
            this.navigatetoNextmonth();
        }

        await this.page.locator(Locators.firstSlot).click()
        await this.page.locator(Locators.submitButton).click()
    }

}
