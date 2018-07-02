var wlObj = {};

wlObj.stepForward = function() {
    $(".js-btn-submit").on("click", function() {
        // console.log("btn submit");
        $(this).parents(".buildPizzaStep").removeClass("active");
        $(this).parents("section").next().find(".buildPizzaStep").addClass("active");
        // $(jsonObj).each(function() {
        //     console.log(this);

        pizzaMaker(selectedStep);
        // })
        if ($(this).hasClass("js-summary")) {
            totAmt = parseInt(pizzaCost) + parseInt(prodSizeCharge) + parseInt(prodCrustCharge) + parseInt(prodToppCharge);
            $(".listing-group .pizzaamt .cost").text(parseInt(totAmt));
            $(".listing-group .delivery .cost").text(parseInt(deliChar));
            $(".listing-group .tot .cost").text(parseInt(totAmt + deliChar));
            selectedStep.totalCost = parseInt(totAmt + deliChar);
        }
        if ($(this).hasClass("confirm")) {
            console.log("confirm");
            $.post({
                url: "http://pizzapi.getsandbox.com/orders",
                success: function(result) {
                    console.log(result.status);
                    $("#buildPizzaStep7 .msg").html(result.status);
                }
            });
        }
    })
    $(".js-btn-submit1").on("click", function() {
        $(this).parents(".buildPizzaStep").removeClass("active");
        $(this).parents("section").next().find(".buildPizzaStep").addClass("active");
        $("#buildPizzaStep2 .pizza-list").html("");
        $(jsonObj).each(function() {
            pizzaMaker(this);
        })
    })
}

wlObj.stepBack = function() {
    $(".js-btn-back").on("click", function() {
        // console.log("btn back");
        $(this).parents(".buildPizzaStep").removeClass("active");
        $(this).parents("section").prev().find(".buildPizzaStep").addClass("active");
        pizzaMaker(selectedStep);
    })
}

wlObj.exportJson = function() {


    var fs = require("fs");
    // var sampleObject = { a: 1, b: 2, c: { x: 11, y: 22 } };
    fs.writeFile("./object.json", JSON.stringify(selectedStep), (err) => {
        if (err) { console.error(err); return; };
        console.log("File has been created");
    });

    // var jsonFile = "assets/js/result.json"; //Relative text file path

    // var file = new File(jsonFile, "write"); //Text file name

    // var str = JSON.stringify(selectedStep);

    // // log("opening file...");

    // file.open();

    // // log("writing file..");

    // file.writeline(str);

    // file.close();
}

var jsonObj;
var selectedStep;
var totAmt;
var pizzaCost = 0;
var prodSizeCharge = 0;
var prodCrustCharge = 0;
var prodToppCharge = 0;
var deliChar = 100;
var init = 0;

$(function() {
    // console.log("load submit");

    $.ajax({
        url: "http://pizzapi.getsandbox.com/pizzas",
        success: function(result) {
            jsonObj = result;
        }
    });

    $(".pizza-list").on("change", "input[type=radio]", function() {
        // console.log("change")
        var id = $(this).attr("id");
        // console.log(id);
        selectedStep = jsonObj[id];

        $(this).parents(".buildPizzaStep").removeClass("active");
        $(this).parents("section").next().find(".buildPizzaStep").addClass("active");
        pizzaMaker(selectedStep);

        totAmt = selectedStep.price;
    })

    $(".pizzaSize input[type=radio]").on("change", function() {
        // console.log("change")
        var ipVal = $(this).attr("value");
        selectedStep.size = ipVal;
        prodSizeCharge = $(this).next().next().find(".amt").text();
        // console.log(ipVal, selectedStep);
        if (ipVal <= 8) {
            $(".pizzacontainer.typ-single").addClass("xs").removeClass("md lg");
        } else if (ipVal > 8 && ipVal <= 10) {
            $(".pizzacontainer.typ-single").addClass("md").removeClass("xs lg")
        } else if (ipVal > 10) {
            $(".pizzacontainer.typ-single").addClass("lg").removeClass("md xs")
        }
    })

    $(".pizzaCrust input[type=radio]").on("change", function() {
        // console.log("change")
        var crustVal = $(this).attr("value");
        selectedStep.crust = crustVal;
        prodCrustCharge = $(this).next().next().find(".amt").text();
        console.log(prodCrustCharge, "prodCrustCharge");
        if (crustVal == "Normal") {
            $(".pizzacontainer.typ-single").addClass("crust-nm").removeClass("crust-ch crust-ch-tn crust-tn")
        } else if (crustVal == "Cheese Crust") {
            $(".pizzacontainer.typ-single").addClass("crust-ch").removeClass("crust-nm crust-ch-tn crust-tn")
        } else if (crustVal == "Cheese Thin Crust") {
            $(".pizzacontainer.typ-single").addClass("crust-ch-tn").removeClass("crust-ch crust-nm crust-tn")
        } else if (crustVal == "Thin Crust") {
            $(".pizzacontainer.typ-single").addClass("crust-tn").removeClass("crust-ch crust-ch-tn crust-nm")
        }
    })

    $(".pizzaExtToppings input[type=checkbox]").on("change", function() {
        console.log("change")
        selectedStep.extraToppings = [];
        prodToppCharge = 0;
        var extTopCont = "";
        var extIngre = "";
        var toppingsCapsicum = '<div class="capsicum-holder"> <div class="capsicum cm1"></div><div class="capsicum cm2"></div><div class="capsicum cm3"></div><div class="capsicum cm4"></div><div class="capsicum cm5"></div><div class="capsicum cm6"></div><div class="capsicum cm7"></div></div>';
        var toppingsCaroot = '<div class="carrot-holder"> <div class="carrot ca1"></div><div class="carrot ca2"></div><div class="carrot ca3"></div><div class="carrot ca4"></div><div class="carrot ca5"></div><div class="carrot ca6"></div><div class="carrot ca7"></div><div class="carrot ca8"></div><div class="carrot ca9"></div><div class="carrot ca10"></div></div>';
        var toppingsPaneer = '<div class="paneer-holder"> <div class="paneer pr1"></div><div class="paneer pr2"></div><div class="paneer pr3"></div><div class="paneer pr4"></div><div class="paneer pr5"></div><div class="paneer pr6"></div><div class="paneer pr7"></div></div>';
        var toppingsCorn = '<div class="corn-holder"> <div class="corn cr1"></div><div class="corn cr2"></div><div class="corn cr3"></div><div class="corn cr4"></div><div class="corn cr5"></div><div class="corn cr6"></div><div class="corn cr7"></div><div class="corn cr8"></div><div class="corn cr9"></div><div class="corn cr10"></div><div class="corn cr11"></div></div>';
        $(".pizzaExtToppings input[type=checkbox]").each(function() {
            if ($(this).prop("checked") == true) {
                var extTopVal = $(this).attr("value");
                selectedStep.extraToppings.push(extTopVal);
                prodToppCharge = parseInt(prodToppCharge) + parseInt($(this).next().next().find(".amt").text());
                if (extTopVal == "Capsicum") {
                    extIngre = extIngre + " " + extTopVal + ",";
                    extTopCont = extTopCont + toppingsCapsicum;
                    console.log(extTopVal);
                } else if (extTopVal == "Caroot") {
                    extIngre = extIngre + " " + extTopVal + ",";
                    extTopCont = extTopCont + toppingsCaroot;
                    console.log(extTopVal);
                } else if (extTopVal == "Paneer") {
                    extIngre = extIngre + " " + extTopVal + ",";
                    extTopCont = extTopCont + toppingsPaneer;
                    console.log(extTopVal);
                } else if (extTopVal == "Corn") {
                    extIngre = extIngre + " " + extTopVal + ",";
                    extTopCont = extTopCont + toppingsCorn;
                    console.log(extTopVal);
                }
            }
        })
        console.log(prodToppCharge, "prodToppCharge", extTopCont);
        $(this).parents(".buildPizzaStep").find(".cheese").append(extTopCont);
    })

    // if ($(".js-btn-submit").length != 0) {
    //     wlObj.stepForward();
    // }
    if ($(".js-btn-submit1").length != 0) {
        wlObj.stepForward();
    }

    if ($(".js-btn-back").length != 0) {
        wlObj.stepBack();
    }

})

function pizzaMaker(obj) {
    var toppingsPepperoni = '<div class="pepperoni-holder"> <div class="pepperoni p1"></div><div class="pepperoni p2"></div><div class="pepperoni p3"></div><div class="pepperoni p4"></div><div class="pepperoni p5"></div><div class="pepperoni p6"></div><div class="pepperoni p7"></div></div>';
    var toppingsSausage = '<div class="sausage-holder"> <div class="sausage s1"></div><div class="sausage s2"></div><div class="sausage s3"></div><div class="sausage s4"></div><div class="sausage s5"></div><div class="sausage s6"></div><div class="sausage s7"></div><div class="sausage s8"></div><div class="sausage s9"></div><div class="sausage s10"></div></div>';
    var toppingsMushroom = '<div class="mushroom-holder"> <div class="mushroom m1"></div><div class="mushroom m2"></div><div class="mushroom m3"></div><div class="mushroom m4"></div><div class="mushroom m5"></div><div class="mushroom m6"></div><div class="mushroom m7"></div><div class="mushroom m8"></div><div class="mushroom m9"></div><div class="mushroom m10"></div></div>';
    var toppingsOlive = '<div class="olive-holder"> <div class="olive o1"></div><div class="olive o2"></div><div class="olive o3"></div><div class="olive o4"></div><div class="olive o5"></div><div class="olive o6"></div><div class="olive o7"></div><div class="olive o8"></div><div class="olive o9"></div><div class="olive o10"></div><div class="olive o11"></div></div>';
    var toppingsPepper = '<div class="pepper-holder"> <div class="pepper pe1"></div><div class="pepper pe2"></div><div class="pepper pe3"></div><div class="pepper pe4"></div><div class="pepper pe5"></div><div class="pepper pe6"></div><div class="pepper pe7"></div><div class="pepper pe8"></div><div class="pepper pe9"></div><div class="pepper pe10"></div><div class="pepper pe11"></div></div>';
    var topCont = "";
    var ingre = "";
    $(obj.ingredients).each(function() {
        if (this == "Red Peppers") {
            ingre = ingre + " " + this + ",";
            topCont = topCont + toppingsPepperoni;
            console.log(this);
        } else if (this == "Garlic") {
            ingre = ingre + " " + this + ",";
            topCont = topCont + toppingsPepper;
            console.log(this);
        } else if (this == "Tomato") {
            ingre = ingre + " " + this + ",";
            topCont = topCont + toppingsSausage;
            console.log(this);
        } else if (this == "Mushroom") {
            ingre = ingre + " " + this + ",";
            topCont = topCont + toppingsMushroom;
            console.log(this);
        } else if (this == "Olives") {
            ingre = ingre + " " + this + ",";
            topCont = topCont + toppingsOlive;
            console.log(this);
        }
    });

    var lastChar = ingre.slice(-1);
    if (lastChar == ',') {
        ingre = ingre.slice(0, -1);
    }

    if ($("#buildPizzaStep2").hasClass("active")) {
        var pizzaList = '<li id=pizzaId' + obj.id + '><input type="radio" id="' + obj.id + '" name="selectPizza" /><label for="' + obj.id + '" class="form-label"><span class="cm-icon icon-checkbox"></span></label><div class="pizzacontainer typ-sm"> <div class="panhandle"> </div><div class="pizzapan"> <div class="pizzashadow"> <div class="pizza"> <div class="tomatosauce"> <div class="cheese"> ' + topCont + '</div></div></div></div></div></div><div class="pizza-desc"><h3 class="pizza-name">' + obj.name + '</h3><span class="ingredients">' + ingre + '</span><span class="price"> <i class="fa fa-inr">&#8377;</i> ' + obj.price + '/- </span></div></li>';
        // $(".pizza-list").html("");
        $(".pizza-list").append(pizzaList);
    } else if ($("#buildPizzaStep3").hasClass("active")) {
        var pizzaList = '<div class="panhandle"> </div><div class="pizzapan"> <div class="pizzashadow"> <div class="pizza"> <div class="tomatosauce"> <div class="cheese"> ' + topCont + '</div></div></div></div></div></div>';
        $("#buildPizzaStep3 .pizzacontainer").html("");
        $("#buildPizzaStep3 .pizzacontainer").append(pizzaList);
    } else if ($("#buildPizzaStep4").hasClass("active")) {
        var pizzaList = '<div class="panhandle"> </div><div class="pizzapan"> <div class="pizzashadow"> <div class="pizza"> <div class="tomatosauce"> <div class="cheese"> ' + topCont + '</div></div></div></div></div></div>';
        $("#buildPizzaStep4 .pizzacontainer").html("");
        $("#buildPizzaStep4 .pizzacontainer").append(pizzaList);
    } else if ($("#buildPizzaStep5").hasClass("active")) {
        var pizzaList = '<div class="panhandle"> </div><div class="pizzapan"> <div class="pizzashadow"> <div class="pizza"> <div class="tomatosauce"> <div class="cheese"> ' + topCont + '</div></div></div></div></div></div>';
        $("#buildPizzaStep5 .pizzacontainer").html("");
        $("#buildPizzaStep5 .pizzacontainer").append(pizzaList);
    } else if ($("#buildPizzaStep6").hasClass("active")) {
        var pizzaList = '<div class="panhandle"> </div><div class="pizzapan"> <div class="pizzashadow"> <div class="pizza"> <div class="tomatosauce"> <div class="cheese"> ' + topCont + '</div></div></div></div></div></div>';
        $("#buildPizzaStep6 .pizzacontainer").html("");
        $("#buildPizzaStep6 .pizzacontainer").append(pizzaList);
    }

    totAmt = obj.price;
    pizzaCost = obj.price;

}