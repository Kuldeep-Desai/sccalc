var vmModule = require("./main-view-model");
var viewModule = require("ui/core/view");
var listPickerModule = require("ui/list-picker");
var observableModule = require("data/observable");
var pageData = new observableModule.Observable();
var amount;
var cardCharge=0;
var serviceCharge=0;
var total =0;
var dialogs = require("ui/dialogs");
var isCreditCard = true;

function pageLoaded(args) {
    var page = args.object;
    
    pageData.set("serviceCharge", serviceCharge);
    pageData.set("cardCharge", cardCharge);
    pageData.set("total",total);
    pageData.set("isCreditCard", isCreditCard);
    page.bindingContext = pageData;
    amount = viewModule.getViewById(page, "amt");
    
    console.log(amount);
 
}
exports.pageLoaded = pageLoaded;
exports.Calculate = function () {
    isCreditCard = pageData.get("isCreditCard");
    var charge = 0;
    if (isCreditCard)
        charge = 1.4;
    else
        charge = 1;
    var amt = amount.text;
    amt = parseFloat(amt);
    if (isNaN(amt)) {
        dialogs.alert("Please enter valid amount");
        return;
    }
    console.log(amt);
    cardCharge=(amt * charge) / 100;
    console.log(cardCharge);
    serviceCharge=(cardCharge * 14.5) / 100;
    console.log(serviceCharge);
    total=amt + cardCharge + serviceCharge;
    console.log(total);
    pageData.set("serviceCharge", serviceCharge);
    pageData.set("cardCharge", cardCharge);
    pageData.set("total", total);
};
