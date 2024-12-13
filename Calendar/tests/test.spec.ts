import { test, expect , Page, chromium } from '@playwright/test';
import { Locators } from '../Locators/locators'
import { CalendarPage } from '../page/page'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const contactBaseUrl = 'https://staging.services.leadconnectorhq.com/contacts/'
const appointmentBaseUrl = 'https://staging.services.leadconnectorhq.com/calendars/events/appointments/'
const contactId = 'NOfAnh71iRVxLKTOeVmY'
const appointmentId = 'j5hq9ItcBRmEryNYf9rf'
const locationId = 'wxEtgp2qOjg8T21Bs0JB'

test.describe("T1", async () =>{

    let page: Page;
    let calPage : CalendarPage;

    test.beforeAll(async() => {
        const browser = await chromium.launch({headless: false});
        page = await browser.newPage();
        calPage = new CalendarPage(page);
    })
    test("Book an appointment", async({request})=>{
        await calPage.navigatetoCalendarPage();

        await calPage.navigatetoNextYear();

        await calPage.addAppointmentDate();
        
        await calPage.bookAppointment();
    });

    test("validate API response", async ({ request }) =>{
        
        const name = "Viv Viv";
        const fname = "Viv";
        const lname = "Viv";
        const email = "viv@viv.com";
        const phone = "+919876543210";

        const contactResponse = await request.get(contactBaseUrl+contactId)
        expect(contactResponse.status()).toBe(200);
        const contactData = await contactResponse.json();
        expect(contactData.contact).toMatchObject({ 
            id : contactId,
            firstName: fname, 
            lastName : lname,
            email, 
            emailLowerCase : email.toLowerCase(),
            phone,
            locationId 
        });

        // Fetch appointment details
        const appointmentResponse = await request.get(appointmentBaseUrl+appointmentId)
        expect(appointmentResponse.status()).toBe(200);
        const appointmentData = await appointmentResponse.json();
        expect(appointmentData.appointment).toMatchObject({
        appointmentStatus: 'confirmed',
        title: name,
        contactId: contactId,
        locationId,
        // startTime: timeSlot,
        });
    })

});