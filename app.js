(function() {
    'use strict';

    

    var puchasedList = [];

    angular.module('CheckOffListAssignment', [])
    .controller('CheckOffListController', CheckOffListController)
    .controller('PurchasedListController', PurchasedListController)
    .provider('CheckOffService', CheckOffServiceProvider)
    .config(Config);

    Config.$inject = ['CheckOffServiceProvider'];
    function Config(CheckOffServiceProvider) {
        CheckOffServiceProvider.config.listItems = [
            {
                name: "Milk",
                quantity: "2"
            },
            {
                name: "Donuts",
                quantity: "200"
            },
            {
                name: "Cookies",
                quantity: "300"
            },
            {
                name: "Chocolate",
                quantity: "5"
            }
            ];
    }

    CheckOffListController.$inject = ['CheckOffService'];
    function CheckOffListController(CheckOffService) {
        var checkList = this;
        checkList.items = CheckOffService.getCheckItems();

        checkList.buyItem = function(){
            CheckOffService.removeItem();
        }
    }

    PurchasedListController.$inject = ['CheckOffService'];    
    function PurchasedListController(CheckOffService){
        var purchaseList = this;
        purchaseList.items = CheckOffService.getPurchaseItems();
        purchaseList.printList = function(){
            console.log("purchaseList.items: " , purchaseList.items);
        }
    }

    function CheckOffService(shoppingList){
        var service = this;

        var checkItems = shoppingList;
        var purchaseItems = [];

        service.getCheckItems = function(){
            return checkItems;
        }

        service.getPurchaseItems = function(){
            return purchaseItems;
        }

        service.removeItem = function(index){
            var removedItem = checkItems.splice(index, 1);
            purchaseItems.push(removedItem[0]);
        }
    }

    // Service Provider 
    function CheckOffServiceProvider() {
        var provider = this;
        provider.config = {
            listItems: []
        };

        provider.$get = function(){
            var service = new CheckOffService(provider.config.listItems);
            return service;
        }
    }
})();