describe('vessels home page', function() {
    function fail() {
        expect(false).toEqual(true);
    }

    function mockList() {
        browser.addMockModule('httpBackendMock',
            function() {
                angular.module('httpBackendMock', ['commodity-vectors', 'ngMockE2E'])
                    .run(function($httpBackend) {
                        $httpBackend.whenGET('http://localhost:3000/api/vessels').respond([{
                            "_id": "5585da5c423b597f072c98ee",
                            "last_known_position": [-43.212265, -22.892467],
                            "name": "VX82",
                            "width": 30,
                            "len": 120,
                            "draft": 80,
                            "__v": 0
                        }]);

                        $httpBackend.whenGET(/views/).passThrough();
                    });
            });
    }

    it('should list vessels by cards', function() {
        mockList();
        browser.get('/');
        expect(element(by.css('md-card#vessel-5585da5c423b597f072c98ee')).isPresent()).toBeTruthy();
    });

    it('should switch view mode', function() {
        mockList();
        browser.get('/');

        element(by.css('md-select')).click();
        element(by.css('md-option:last-child')).click();
        expect(element(by.css('md-list-item#vessel-5585da5c423b597f072c98ee')).isPresent()).toBeTruthy();
    });

    describe('empty vessels', function() {
        it('should show add button', function() {
            browser.addMockModule('httpBackendMock',
                function() {
                    angular.module('httpBackendMock', ['commodity-vectors', 'ngMockE2E'])
                        .run(function($httpBackend) {
                            $httpBackend.whenGET('http://localhost:3000/api/vessels').respond([]);
                            $httpBackend.whenGET(/views/).passThrough();
                        });
                });

            browser.get('/');
            expect(element(by.css('.fa.fa-2x.fa-plus')).isPresent()).toBeTruthy();
        });
    });

    it('should view vessel', function() {
        mockList();
        browser.get('/');

        element(by.css('md-card#vessel-5585da5c423b597f072c98ee .md-actions button:last-child')).click();
        expect(element(by.css('md-dialog')).isPresent()).toBeTruthy();
        expect(element(by.css('md-dialog > md-toolbar > div > h2')).getText())
            .toContain("VX82");
    });

    describe('vessel edit', function() {
        it('should update main list', fail);
    });

    describe('vessel add', function() {
        it('should append vessel to list', fail);
    });
});
