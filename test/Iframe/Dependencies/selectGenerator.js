const assert = require('assert');
var selectGenerator = require('../../../src/Iframe/Dependencies/selectGenerator');
global.Util = require('../../../src/Iframe/Dependencies/getInfrastructure.js').Util;
var jsdom = require('jsdom-global');
let jsonData = require("../../../src/Iframe/Dependencies/infrastructure.json");
global.elem = document.createElement('div');
elem.id = 'area';

function notAFunction() { }

describe('SelectGenerator', function () {
    describe('config()', function () {
        it('should configurate the select box', function () {
            selectGenerator.Generator.config(jsonData, null, true, notAFunction,"checkbox");
            assert.deepEqual(elem.innerHTML, '');
            selectGenerator.Generator.config(jsonData, elem, true, notAFunction,"checkbox",true,"<br><b>Very important attribution</b>");
            assert.deepEqual(elem.childElementCount, 12);
            elem.innerHTML = '';
            selectGenerator.Generator.config(jsonData, elem, true, notAFunction,"checkbox",false,"<br><b>Very important attribution</b>");
            assert.deepEqual(elem.childElementCount, 31);
            document.body.appendChild(elem);
            var coll = document.getElementsByClassName("collapsible");
            for (let i = 0; i < coll.length; i++) {
                coll[i].click();
            }
        });
    });

    describe('clearChecks()', function () {
        it('should configurate the select box', function () {
            selectGenerator.Generator.clearChecks();
            var features = document.getElementsByClassName("featureCheck");
            let checked = false;
            for (let i = 0; i < features.length; i++) {
                if (features[i].checked) {
                    checked = true;
                }
            }
            assert.deepEqual(checked, false);
        });
    });

    describe('showAttribution()', function () {
        it('it should show/hide the last object in the container passed to it', function () {
            $(elem).last().css({"display": "block"});
            selectGenerator.Generator.showAttribution(elem);
            assert.deepEqual($(elem).last().css("display"),"none");
            selectGenerator.Generator.showAttribution(elem);
            assert.deepEqual($(elem).last().css("display"),"block");
        });
    });
});
