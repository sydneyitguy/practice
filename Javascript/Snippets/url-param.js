/**
 * Replace / Add a url param
 * @return string (whole query strings)
 */
function setURLParam(key, value, query) {
    if(typeof query == 'undefined') {
        var query = window.location.search.substring(1);
    }
    var vars = query.split('&');
    if(!vars[0]) {
        vars = [];
    }

    var replaced = false;
    for(var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if(pair[0] == key) {
            vars[i] = pair[0] + '=' + value;
            replaced = true;
        }
    }

    if(!replaced) {
        vars.push(key + '=' + value);
    }

    return vars.join('&');
}

function getURLParam(key, defaultValue, integer) {
    var regex = new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search);
    var value = decodeURIComponent((regex || [,''])[1].replace(/\+/g, '%20')) || null;

    if(!value) {
        return defaultValue;
    }

    if(integer === true) {
        if(isNaN(value)) {
            return defaultValue;
        }
        return parseInt(value);
    }

    return value;
}
