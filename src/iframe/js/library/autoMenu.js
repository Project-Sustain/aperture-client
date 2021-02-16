/**
 * @namespace AutoMenu
 * @file Build a menu based on the metadata catalog & details provided by users about the metadata
 * @author Daniel Reynolds
 * @notes Work in progress!
 */

const AutoMenu = {
    //get the querier
    _sustainQuerier: new SharedWorker('js/library/queryWorker.js'),

    /**
     * Main, asyncronous function which is called by an external code block
     * @memberof AutoMenu
     * @method build
     * @param {JSON} menuMetaData user-provided metadata about the metadata, which fits a schema
     * @param {JSON} overwrite Object which overwrites any fields that are auto generated, useful for custom queries.
     * @returns {JSON} JSON which can be used with menuGenerator.js to build a menu
     */
    build: async function (menuMetaData, overwrite) {
        return new Promise(((resolve) => {
            let catalog = {};
            AutoMenu._sustainQuerier.port.postMessage({
                type: "query",
                collection: "Metadata",
                queryParams: [],
            });
            AutoMenu._sustainQuerier.port.onmessage = function (msg) {
                if (msg.data.type == "data") {
                    catalog[msg.data.data.collection] = msg.data.data; // do da data dance
                } else if (msg.data.type == "end") {
                    //build it
                    const autoMenu = this.bindMenuToCatalog(menuMetaData, catalog);

                    //return it
                    resolve({
                        ...autoMenu,
                        ...overwrite,
                    });
                }
            }.bind(this);
        }).bind(this));
    },

    /**
     * Helper function for @method build
     * @memberof AutoMenu
     * @method bindMenuToCatalog
     */
    bindMenuToCatalog: function (menuMetaData, catalog) {
        let result = {};

        menuMetaData.forEach(metadata => {
            if (catalog[metadata.collection]) {
                const catalogLayer = catalog[metadata.collection];

                //These are hardcoded for now
                let autoMenuLayer = {};
                if(metadata.level){
                    autoMenuLayer["group"] = "Tract, County, & State Data";
                    autoMenuLayer["subGroup"] = metadata.level === "tract" ? "Tract Level" : "County Level";
                    autoMenuLayer["linkedGeometry"] = metadata.level === "tract" ? "tract_geo_GISJOIN" : "county_geo_GISJOIN";
                    autoMenuLayer["joinProperty"] = "GISJOIN";
                }
                else{
                    autoMenuLayer["group"] = "Infrastructure & Natural Features";
                    autoMenuLayer["subGroup"] = "Auto Generated";
                }

                if(metadata.icon)
                    autoMenuLayer["icon"] = metadata.icon;

                if(metadata.color){
                    if(typeof metadata.color === "string"){
                        autoMenuLayer["color"] = {
                            style: "solid",
                            colorCode: metadata.color
                        };
                    }
                    else{
                        autoMenuLayer["color"] = metadata.color;
                    }
                }
                else{
                    autoMenuLayer["color"] = autoMenuLayer["color"] = {
                        style: "solid",
                        colorCode: "#000000"
                    };
                }

                //where the constraints are added, lots of cool stuff here
                autoMenuLayer["constraints"] = this.buildConstraintsFromCatalog(metadata, catalogLayer);
                autoMenuLayer["collection"] = catalogLayer.collection;
                autoMenuLayer["label"] = metadata.label;
                //gets label if provided, names it the collection name otherwise
                const label = catalogLayer.collection;

                //add finished layer to result
                result[label] = autoMenuLayer;
            }
        });

        return result;
    },


    /**
     * Helper function for @method bindMenuToCatalog
     * @memberof AutoMenu
     * @method buildConstraintsFromCatalog
     */
    buildConstraintsFromCatalog: function (metadata, catalogLayer) {
        let result = {};
        catalogLayer.fieldMetadata.forEach(constraint => {
            const fieldIndex = this.arrayIndexOf(constraint.name, metadata.fieldMetadata);
            const constraintName = constraint.name;
            if (fieldIndex !== -1) {
                const hideByDefaultMask = {
                    hideByDefault: false
                }
                // console.log("----------------")
                // console.log(constraintName);
                // console.log(JSON.parse(JSON.stringify(constraint)))
                // console.log(">>>>>>>>>>>>>")
                constraint = { //bind defined values
                    ...constraint,
                    ...hideByDefaultMask,
                    ...metadata.fieldMetadata[fieldIndex]
                }
                // console.log(JSON.parse(JSON.stringify(constraint)))
                // console.log("----------------")
            }
            constraint = this.convertFromDefault(constraint);
            constraint = this.buildStandardConstraint(constraint);
            if(constraint){
                //console.log(constraint);
                result[constraintName] = constraint;
            }
        });

        return result;
    },


    /**
     * Helper function for @method buildConstraintsFromCatalog
     * @memberof AutoMenu
     * @method arrayIndexOf
     */
    arrayIndexOf: function (fieldName, fieldMetadata) {
        if (!fieldMetadata) {
            return -1;
        }

        let count = 0;
        for (let i = 0; i < fieldMetadata.length; i++) {
            if (fieldMetadata[i].name === fieldName) {
                return i;
            }
        }
        return -1;
    },


    /**
     * Helper function for @method buildConstraintsFromCatalog
     * @memberof AutoMenu
     * @method convertFromDefault
     */
    convertFromDefault: function (constraint) {
        if (constraint.type === "STRING") {
            constraint.type = "multiselect";
        }
        else if (constraint.type === "NUMBER" || constraint.type === "range") {
            constraint.type = "range";
            if (!constraint.min || constraint.min === -999) {
                constraint.min = 0;
            }
        }
        else if (constraint.type === "DATE" || constraint.type === "date") {
            constraint.type = "date";
            switch(typeof(constraint.maxDate)){
                case 'string':
                    constraint.min = new Date(constraint.minDate).getTime();
                    constraint.max = new Date(constraint.maxDate).getTime();
                    break;
                case 'number':
                    constraint.min = constraint.minDate;
                    constraint.max = constraint.maxDate;
                    break;
                case 'object':
                    if(constraint.maxDate.$numberLong){
                        constraint.min = Number(constraint.minDate.$numberLong);
                        constraint.max = Number(constraint.maxDate.$numberLong);
                    }
                    else{
                        console.error("Cannot deal with date field!");
                        console.error(constraint);
                    }
            }
        }

        const DEFAULTS = {
            hideByDefault: true
        }

        constraint = {
            ...DEFAULTS,
            ...constraint
        }

        return constraint;
    },


    /**
     * Helper function for @method buildConstraintsFromCatalog
     * @memberof AutoMenu
     * @method buildStandardConstraint
     */
    buildStandardConstraint: function (constraint) {
        let result = {};

        if (constraint.label)
            result.label = constraint.label;


        if (constraint.type === "range" || constraint.type === "date") {
            result.step = constraint.step;
            const DEFAULTS = {
                step: 1,
            }
            result = {
                ...DEFAULTS,
                ...result
            }
            result.type = "slider";

            result.range = [constraint.min, constraint.max];
            result.default = result.range;


            if(result.range[0] === result.range[1] || !constraint.max) //error check
                return null;


            if(constraint.type === "date")
                result.isDate = true;
        }
        else if (constraint.type = "multiselect") {
            result.type = "multiselector";
            result.options = constraint.values;
            if(!result.options || result.options.length < 1)
                return null;
        }
        else if (constraint.type = "select") {
            result.type = "selector";
            result.options = constraint.values;

            if(!result.options || result.options.length < 1)
                return null;
        }


        result.hide = constraint.hideByDefault;


        return result;
    }
}

try {
    module.exports = {
        AutoMenu: AutoMenu
    }
} catch (e) { }