import { test, expect , Page, chromium } from '@playwright/test';
import { Locators } from '../locators/locators'
import { CalendarPage } from '../page/page'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

test.describe("T1", async () =>{

    let page: Page;
    let calPage : CalendarPage;

    test.beforeAll(async() => {
        const browser = await chromium.launch({headless: false});
        page = await browser.newPage();
        calPage = new CalendarPage(page);
    })
    test("Book an appointment", async()=>{
        await calPage.navigatetoCalendarPage();

        await calPage.navigatetoNextYear();

        await calPage.addAppointmentDate();
        
        await calPage.bookAppointment();
    });
});