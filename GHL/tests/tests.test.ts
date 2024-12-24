import {test, expect , Page, chromium } from '@playwright/test';
import {HomepageGHL} from '../homepage/homepage';
import {Locators} from '../locators/locators';

test.describe('GHL', async () =>{

    let page : Page;
    let Homepage : HomepageGHL;

    test.beforeAll(async ()=>{
        const browser = await chromium.launch({headless: false});
        page = await browser.newPage();
        Homepage = new HomepageGHL(page);
    })

    test('page', async () =>{
        await Homepage.navigateToLogin();
        await Homepage.loginWithCredential();
        // await Homepage.varifyAgencyDashboard();
        await Homepage.navigateToBillingNotifications();
        await Homepage.varifyNotificationsPage();
        await Homepage.varifyNotificationSwitchbutton();
    })

});