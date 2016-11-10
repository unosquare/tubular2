import { browser, element, by } from '../../node_modules/protractor/built';

describe('tubular data service', () =>{
    let userNameInput,
        passwordInput,
        loginBtn

    beforeAll(()=>{
        browser.get('/');
        userNameInput = element(by.tagName('login')).$('div').$$('.form-group').first().$('input');
        passwordInput = element(by.tagName('login')).$('div').$$('.form-group').get(1).$('input');
        loginBtn = element(by.tagName('login')).$('div').$$('.form-group').last().$('button');
    });

    describe('authenticate services test', () => {
        beforeEach(()=>{
            browser.get('/');
            element(by.tagName('nav')).$('ul').$$('li').get(2).click();
        });

        it('should authenticate', () => {
            userNameInput.sendKeys('admin');
            passwordInput.sendKeys('pass.word');
            element(by.tagName('login')).$('div').$$('.form-group').last().$('button').click();
            expect(element(by.tagName('my-tbgrid')).$('h1').getText()).toMatch('Tubular2');
        });

        it('should not authenticate aith bad credentials', () => {
            userNameInput.sendKeys('admin');
            passwordInput.sendKeys('pass.');
            element(by.tagName('login')).$('div').$$('.form-group').last().$('button').click();
            expect(element(by.tagName('my-tbgrid')).$('h1').isPresent()).toBe(false);
        });
    });
    
});