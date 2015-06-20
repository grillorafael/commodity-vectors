exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3001',
    specs: ['www_spec/vessels.spec.js']
};
