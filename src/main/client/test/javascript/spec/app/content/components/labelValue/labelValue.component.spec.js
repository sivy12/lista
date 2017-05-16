'use strict';

describe("Component: labelValue", function () {
    var scope, element, controller;

    beforeEach(module('employees'));
    beforeEach(module('employees.templates'));

    beforeEach(inject(function ($rootScope, $compile, $componentController) {
        scope = $rootScope.$new();
        scope.label = "Label testowy";
        scope.value = "Wartość testowa";
        controller = $componentController("labelValue", {}, {label: scope.label, value: scope.value});
        element = angular.element('<label-value label="{{label}}" value="{{value}}"></label-value>');
        $compile(element)(scope);
        $rootScope.$digest();
    }));

    it('should display component defined label', function () {
        var expected = "Label testowy";
        expect(element.find("#label").text()).toBe(expected);
    });

    it('should display controller defined label', function () {
        var expected = "Label testowy";
        expect(controller.label).toBeDefined();
        expect(controller.label).toBe(expected);
    });

    it('should display component defined value', function () {
        var expected = "Wartość testowa";
        expect(element.find("#value").text()).toBe(expected);
    });

    it('should display controller defined value', function () {
        var expected = "Wartość testowa";
        expect(controller.value).toBeDefined();
        expect(controller.value).toBe(expected);
    });
});