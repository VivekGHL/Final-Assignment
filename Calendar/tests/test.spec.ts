import { test, expect , Page, chromium } from '@playwright/test';
import { Locators } from '../Locators/locators'
import { CalendarPage } from '../page/page'

const contactBaseUrl = 'https://staging.services.leadconnectorhq.com/contacts/'
const appointmentBaseUrl = 'https://staging.services.leadconnectorhq.com/calendars/events/appointments/'
let contactId : string;
let appointmentId : string;
let locationId : string;
let calendarId : string;
const token = 'pit-282f97d3-37aa-4e3b-82b4-acf275920e5a'

let name : string;
let fname : string;
let lname : string;
let email : string;
let phone : string;
let startTime : string;
let endTime : string;
let timezone : string;

let appointmentData
let contactData
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

        const [appointmentResponseData] = await Promise.all([
            page.waitForResponse((response) =>
              response.url().includes("/appengine/appointment") && response.status() === 200 && response.request().method() === 'POST'
            ),
            await page.locator(Locators.bookAppointmentButton).click()
          ]);
        const responseBody = await appointmentResponseData.json();
        // console.log("Response Body:", responseBody);

        appointmentId = responseBody.id;
        contactId = responseBody.contact.id;
        locationId = responseBody.contact.location_id;
        fname = responseBody.contact.first_name;
        lname = responseBody.contact.last_name;
        email = responseBody.contact.email;
        phone = responseBody.contact.phone;
        timezone = responseBody.contact.timezone;
        calendarId = responseBody.contact.internal_source.id;

        startTime = responseBody.appointment.start_time;
        endTime = responseBody.appointment.end_time;


        await page.locator(Locators.confirmationText).isVisible()
        await expect(page.locator(Locators.confirmationText)).toContainText("Thank you")

        console.log("Appointment Start Time:", startTime);
        console.log("Appointment End Time:", endTime);
    });

    test("validate API response", async ({ request }) =>{
        //Fetch contact details
        const contactResponse = await request.get(contactBaseUrl+contactId,
            {
                headers: {
                    'Accept': 'application/json',
                    'Version': '2021-07-28',
                    'Authorization': 'Bearer '+token,
                  },
            }
        )
        expect(contactResponse.status()).toBe(200);
        contactData = await contactResponse.json();
        //Validate the Contact details with the filled details
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
        const appointmentResponse = await request.get(appointmentBaseUrl+appointmentId,
            {
                headers: {
                    'Accept': 'application/json',
                    'Version': '2021-07-28',
                    'Authorization': 'Bearer '+token,
                  },
            }
        )
        expect(appointmentResponse.status()).toBe(200);
        appointmentData = await appointmentResponse.json();
        //Validate the appointment details
        expect(appointmentData.appointment).toMatchObject({
        appointmentStatus: 'confirmed',
        title: fname+' '+lname,
        contactId,
        locationId,
        calendarId,
        });
    })

    //Above Appointment is already booked in different timezone
    test("Time Zone Validation", async ({ request }) =>{

        //Validate subaccount timezone
        expect(contactData.contact).toMatchObject({ 
            timezone,
        });
        
        //Varify time should be stored in IST for team member not in user's local timezone
        expect(appointmentData.appointment.startTime).toContain("+05:30");
    })

});