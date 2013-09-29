(function ($, window, undefined) {
    $.uxreadmore = {
        version: '1.0.0',
        defaults: {
            debug: false,
            ellipsisType: 'absolute',
            ellipsisPoint: 200,
            ellipsisSymbol: '...'
        }
    };

    var settings;
    var debugLog = false;

    $.fn.uxreadmore = function (options) {
        var target;

        settings = $.extend({}, $.uxreadmore.defaults, options);
        if (settings.debug === true) {
            debugLog = true;
        }

        // FLOW
        // See if text is longer than cutoffpoint
        // Determine type:
        //  - Absolute
        //  - Nearest word boundary
        // Cut text
        // Hide overflow in <span>
        // Add read more link to original container

        target = $(this);

        if ($(target).text().length >= settings.ellipsisPoint) {
            if (settings.ellipsisType === 'absolute') {
                setTargetAttributes(target);
                extractOverflowText(target);
            }
        } else {
            setTargetAttributes(target, true);
        }
    }

    function setTargetAttributes(target, noCut) {
        if (noCut === true) {
            $(target).data('cutOff', "noCut");
        } else {
            $(target).data('cutOff', settings.ellipsisPoint);
        }
    }

    function extractOverflowText(target) {
        var contents, hiddenSpan;

        contents = $(target).text();
        hiddenSpan = $('<span></span>');
        $(target).text(contents.substring(0, settings.ellipsisPoint - 3) + settings.ellipsisSymbol);
        hiddenSpan.text(contents.substring(settings.ellipsisPoint - 3));
        hiddenSpan.addClass('hiddenText');

        $(target).append(hiddenSpan);
    }

    function debug(logItem) {
        if (debugLog === true) {
            console.log(logItem);
        }
    }
})(jQuery, window);