exports.mockList = function() {
    browser.addMockModule('httpBackendMock',
        function() {
            angular.module('httpBackendMock', ['commodity-vectors', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/\/api\/vessels/).respond([{
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
};

exports.mockEmpty = function() {
    browser.addMockModule('httpBackendMock',
        function() {
            angular.module('httpBackendMock', ['commodity-vectors', 'ngMockE2E'])
                .run(function($httpBackend) {
                    $httpBackend.whenGET(/\/api\/vessels/).respond([]);
                    $httpBackend.whenGET(/views/).passThrough();
                });
        });
};
