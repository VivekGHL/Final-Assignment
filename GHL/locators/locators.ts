export const Locators = {
    login : {
        inputEmail : '//input[@id="email"]',
        inputPassword : '//input[@name="password"]',
        loginButton : '//div[@class="form-group button-holder"]//button[@type="button"]',
        chooseAnAccount : (text: string) => `//span[@class="user" and contains(text(), "${text}")]`,
    },

    agency : {
        dashboardHeader : '//div[@class="agencyDashboardHeader"]',
        dashboardSubHeader : '//div[@class="mb-4 flex justify-between"]/div[@class="hl-text-lg-medium"]',
        dashboardStatisticsHeader : '//div[@class="title hl-text-sm-medium"]',
        settings : '//a[@id="sb_agency-settings"]',
        billingSettings : '//a[@id="sb_agency-billing-settings"]',
    },

    billingDashboard : {
        notifications : '//div[@data-name="notifications"]',
        
    },

    notifications : {
        walletHeader : '//div[@data-name="wallet"]',
        walletSubHeader : '//div[@class="mb-2 text-gray-900 hl-text-lg-medium"]',
        walletSubSubHeader : '//div[@class="text-gray-500 hl-text-md-normal"]',
        switchButton : '//div[@class="n-switch__rail"]',
        disableButton : '//button[@id="modal-footer-btn-positive-action"]',
        walletUsageMoneyInput : '//input[@class="n-input__input-el"]',
        walletUsageTimeDropdown : '//div[@class="n-base-selection-input__content"]',
        discardBtn : '//button[@id="discard-btn"]',
        saveBtn : '//button[@id="save-btn"]',
        disableAlertPopUp : '//div[@class="n-notification-main"]',
        disableAlertPopUpHeader : '//div[@class="n-notification-main__header"]',
        disableAlertPopUpSubHeader : '//div[@class="n-notification-main__description"]',
        switchCheckStatus : '//div[@role="switch"]',

    }


}