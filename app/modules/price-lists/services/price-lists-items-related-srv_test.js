describe('RelatedItems service', function onDescribe() {
    'use strict';
    var RelatedItems;

    beforeEach(module('app'));
    /*---------------
     ---MOCKS HERE---
     ---------------*/

    var mockRelatedItems = [{
        id: '1',
        name: 'List1'
    }];

    /*----------------
    ---BEFORE EACH---
    ----------------*/

    beforeEach(inject(function injectionFn(_RelatedItems_) { //jshint ignore:line
        RelatedItems = _RelatedItems_;
    }));

    describe('Check if is valid factory', function onDescribe() {

        it('Should contain a valid Product factory', function it() {
            expect(RelatedItems).not.toBeNull();
            expect(RelatedItems).toBeDefined();
        });
    });

    describe('get RelatedItems', function test() {
        it('Should return an array of lists', function getItems() {
            spyOn(RelatedItems, 'query').and.callFake(function fake() {
                return mockRelatedItems;
            });
            var lists = RelatedItems.query({id: 'A1', count: 5 });
            expect(RelatedItems.query).toHaveBeenCalledWith({ id: 'A1', count: 5 });
            expect(lists instanceof Array).toBeTruthy();
            expect(lists[0] instanceof Object).toBeTruthy();
            expect(lists[0].name).toEqual('List1');
        });
    });
});