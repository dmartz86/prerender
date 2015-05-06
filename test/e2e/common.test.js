
describe('open website', function() {

  beforeEach(function() {});

  afterEach(function() {});

  it('should select a website and return a template', function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();

    element(by.model('website')).sendKeys('http://localhost:3000');
    element(by.id('searchBtn')).click();

    browser.sleep(1000);
    var templates = element.all(by.repeater('t in templates'));
    expect(templates.count()).toEqual(1);
  });

  it('message on failure', function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();

    element(by.model('website')).sendKeys('http://www.google.com');
    element(by.id('searchBtn')).click();

    browser.sleep(1000);
    expect(element(by.binding('message')).getInnerHtml()).toEqual('"Server respond 302"');
  });

  it('online users', function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();

    expect(element(by.binding('numUsers')).getInnerHtml()).toEqual('1');
  });

});
