var targetId = "#qunit-fixture";
var lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique.";

QUnit.module("UXReadMore", {
    setup: function () {
        $.uxreadmore.defaults.debug = true;
        $(targetId).empty();
    },
    teardown: function () {

    }
});

test("Default Options", function () {
    $.uxreadmore.defaults.debug = false;
    equal($.uxreadmore.defaults.debug, false);
    equal($.uxreadmore.defaults.ellipsisType, 'absolute');
    equal($.uxreadmore.defaults.ellipsisPoint, 200);
    equal($.uxreadmore.defaults.ellipsisSymbol, '...');
})

test("Absolute - Given text shorter than 200 then nothing should happend", function() {
    var textDiv = $('<div></div>');
    textDiv.append(generateText(100));
    $(targetId).append(textDiv);
    $(textDiv).uxreadmore();

    var targetTextDiv = $(targetId).find('div');
    equal($(targetTextDiv).data('cutOff'), "noCut", "CutOff value was not set!")
    equal($(targetId).find('.hiddenText').length, 0, "Read More was activated!");
})

test("Absolute - Given text greater than 200 then read more should be present", function() {
    var mainLength = $.uxreadmore.defaults.ellipsisPoint;

    var textDiv = $('<div></div>');
    textDiv.append(generateText(250));
    $(targetId).append(textDiv);
    $(textDiv).uxreadmore();

    var targetTextDiv = $(targetId).find('div');
    equal($(targetTextDiv).data('cutOff'), mainLength, "CutOff value was not set!")
    equal($(targetTextDiv).text().substring(mainLength - 3, mainLength), '...', "Ellipsis not found!"); 
    equal($(targetId).find('.hiddenText').length, 1, "Overflow text was not found!");
})

function generateText(length) {
    return lorem.substring(0, length);
}