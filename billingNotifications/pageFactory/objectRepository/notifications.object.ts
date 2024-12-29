export const notificationsPageObject = {
    walletHeader : '//div[@data-name="wallet"]',
    walletSubHeader : '//div[@class="mb-2 text-gray-900 hl-text-lg-medium"]',
    walletSubSubHeader : '//div[@class="text-gray-500 hl-text-md-normal"]',
    notificationThresholdText : '//div[text()="Notification Threshold" and @class="ml-2 hl-text-md-medium"]',

    globalLimitText : '//div[text()="Global Limit" and @class="text-gray-900 hl-text-lg-medium"]',
    subAccText : '//div[text()="Sub-accounts"]',
    subAccinput : '//div[@id="select-id"]',


    walletUsageAmountInput : '//input[@class="n-input__input-el"]',
    walletUsageTimeDropdown : '//div[@id="select-id-2"]//div[@class="n-base-selection-input__content"]',
    timeDropdownElement : (text: string) =>  `//span[@class="n-ellipsis"]/span[text()="${text}"]`,

    emailNotificationText : '//div[text()="Email Notification will be sent for Above sub-accounts Wallet transactions"]',
    walletUsageText : '//div[text()="When wallet usage goes above"]',

    switchButton : '//div[@class="n-switch__rail"]',
    titleDisablePopUp : '//div[@class="title"]',
    descriptionDisablePopUp : '//div[@class="description"]',
    cancelDisablebutton : '//button[@id="modal-footer-btn-negative-action"]',
    disableButton : '//button[@id="modal-footer-btn-positive-action"]',

    discardBtn : '//button[@id="discard-btn"]',
    saveBtn : '//button[@id="save-btn"]',
    //pop up confiration alert 
    disableAlertPopUp : '//div[@class="n-notification-main"]',
    disableAlertPopUpHeader : '//div[@class="n-notification-main__header"]',
    disableAlertPopUpSubHeader : '//div[@class="n-notification-main__description"]',
    switchCheckStatus : '//div[@role="switch"]',

    //Notified Email Section
    notifiedEmailTitle : '//div[@class="n-space"]//div[text()]',
    notifiedEmailAddBtn : '//div[@class="n-space"]//button',
    notifiedDefaultEmail : '//div[@class="hl-card-header"]//div[text()="viveks+test@gohighlevel.com"]',
    AgencyOwnerText : '//div[@class="hl-card-header"]//div[text()="Agency Owner"]',

    
}