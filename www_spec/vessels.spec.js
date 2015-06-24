var VesselsMock = require('./fixtures/vessels');

describe('vessels home page', function() {
    function fail() {
        expect(false).toEqual(true);
    }

    afterEach(function() {
        browser.executeScript('window.localStorage.clear();');
    });

    it('should list vessels by cards', function() {
        VesselsMock.mockList();
        browser.get('/');
        expect(element(by.css('md-card#vessel-5585da5c423b597f072c98ee')).isPresent()).toBeTruthy();
    });

    it('should switch view mode', function() {
        VesselsMock.mockList();
        browser.get('/');

        element(by.css('md-select')).click();
        element(by.css('md-option:last-child')).click();
        expect(element(by.css('md-list-item#vessel-5585da5c423b597f072c98ee')).isPresent()).toBeTruthy();
    });

    describe('empty vessels', function() {
        it('should show add button', function() {
            VesselsMock.mockEmpty();
            browser.get('/');
            expect(element(by.css('.fa.fa-2x.fa-plus')).isPresent()).toBeTruthy();
        });
    });

    it('should view vessel', function() {
        VesselsMock.mockList();
        browser.get('/');

        element(by.css('md-card#vessel-5585da5c423b597f072c98ee .md-actions button:last-child')).click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        expect(element(by.css('md-dialog > md-toolbar > div > h2')).getText())
            .toContain("VX82");
    });

    it('should save last view mode', fail);

    describe('vessel edit', function() {
        it('should update main list', fail);
    });

    describe('vessel add', function() {
        it('should append vessel to list', fail);
    });
});
