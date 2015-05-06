
describe('open website', function() {

  beforeEach(function() {});

  afterEach(function() {});

  it('should select a theme and CRUD a group', function() {
    browser.get('http://localhost:3000');
    browser.waitForAngular();

    element(by.model('website')).sendKeys('http://localhost:3000');
    element(by.id('searchBtn')).click();

    browser.sleep(1000);
    var templates = element.all(by.repeater('t in templates'));
    expect(templates.count()).toEqual(1);

  });
});
