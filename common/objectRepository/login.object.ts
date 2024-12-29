export const loginPageObjects = {
    inputEmail : '//input[@id="email"]',
    inputPassword : '//input[@name="password"]',
    loginButton : '//div[@class="form-group button-holder"]//button[@type="button"]',
    chooseAnAccount : (text: string) => `//span[@class="user" and contains(text(), "${text}")]`,
}