import {test, expect , Page, chromium } from '@playwright/test';
import {HomepageGHL} from '../pages/homepage';
import {LoginPage} from '../pages/login';
import {Dashboard} from '../pages/dashboard';
import {NotificationsPage} from '../pages/notifications';
import {Locators} from '../locators/locators';
import {Data} from '../data/data';

test.describe('GHL Platform', async () =>{

    let page : Page;
    let homepage : HomepageGHL;
    let loginPage : LoginPage;
    let dashboardPage : Dashboard;
    let notificationsPage : NotificationsPage;

    test.beforeAll(async ()=>{
        const browser = await chromium.launch({headless: false});
        page = await browser.newPage();
        homepage = new HomepageGHL(page);
        loginPage = new LoginPage(page);
        dashboardPage = new Dashboard(page);
        notificationsPage = new NotificationsPage(page);
    })

    test('Test Billing Notifications', async () =>{
        await loginPage.navigateToLogin(Data.websiteUrl);
        await loginPage.loginWithCredential(Data.LoginEmail, Data.LoginPassword);
        await loginPage.chooseAnAccount(Data.selectAccount);
        await dashboardPage.varifyAgencyDashboard();
        await dashboardPage.navigateToBillingNotifications();
        await notificationsPage.varifyNotificationsPage();
        await notificationsPage.varifyNotificationSwitchbutton();
    })

});