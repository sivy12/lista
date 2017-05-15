'use strict';

describe("Component: errors", function () {
    var controller, ErrorService;

    beforeEach(module('employees'));
    beforeEach(module('employees.templates'));

    beforeEach(inject(function ($rootScope, $compile, $componentController, _ErrorService_) {
        ErrorService = _ErrorService_;
        spyOn(ErrorService, 'getErrorsForField').and.returnValue([]);
        controller = $componentController("errors", {$scope: {}, ErrorService: ErrorService}, {
            field: 'gender'
        });
    }));

    it('should have id after initialization', function () {
        controller.$onInit();
        expect(ErrorService.getErrorsForField).toHaveBeenCalledWith('gender');
        expect(controller.id).toBeDefined();
        expect(controller.id).toBe("gender-error");
    });

    it('should have message after call onError', function () {
        controller.onError("required");
        expect(controller.message).toBe("required");
    });
});