import {test, expect , Page, chromium } from '@playwright/test';
import {CommonPage} from '../../common/pageRepository/commonPage';
import {Dashboard} from '../pageFactory/pageRepository/dashboard';
import {NotificationsPage} from '../pageFactory/pageRepository/notifications';
import {loginTestData} from '../testData/login.data';

test.describe('GHL Platform', async () =>{

    let page : Page;
    let commonPage : CommonPage;
    let dashboardPage : Dashboard;
    let notificationsPage : NotificationsPage;

    test.beforeAll(async ()=>{
        const browser = await chromium.launch({headless: false});
        page = await browser.newPage();
        commonPage = new CommonPage(page);
        dashboardPage = new Dashboard(page);
        notificationsPage = new NotificationsPage(page);
    })

    test('Login to application', async () =>{
        await commonPage.navigateToLogin(loginTestData.websiteUrl);
        await commonPage.loginWithCredential(loginTestData.LoginEmail, loginTestData.LoginPassword);
        await commonPage.chooseAnAccount(loginTestData.selectAccount);
    })
    test('Test Agency Dashboard Page', async() => {
        await dashboardPage.varifyAgencyDashboard();
    })

    test('Navigate to Billing Notifications Page', async() => {
        await dashboardPage.navigateToBillingNotifications();
    })

    test('Verify Notification Page', async() => {
        await notificationsPage.varifyNotificationsPage();
    })
    test('Validate Notification Switch Button', async() => {
        await notificationsPage.varifyNotificationSwitchbutton();
    })
    test('verify add Emails section', async() => {
        await notificationsPage.validateEmailSection();
    })

});