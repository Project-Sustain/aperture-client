/*                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/


Software in the Sustain Ecosystem are Released Under Terms of Apache Software License 

This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information. 

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION


1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. 

You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. 

END OF TERMS AND CONDITIONS
*/
import Gradient from "../third-party/Gradient"
import MapDataFilterWrapper from "./mapDataFilterWrapper"
import Util from "./apertureUtil"
import Query from "./Query"
import Color from "./Color"

/**
 * @class AutoQuery
 * @file Query layers in a very general fashion
 * @author Daniel Reynolds
 * @dependencies autoMenu.js menuGenerator.js geometryLoader.js
 * @notes Work in progress!
 */

export default class AutoQuery {
    static blockers = {}
    static blockerListener = null;
    /**
      * Constructs the instance of the autoquerier to a specific layer
      * @memberof AutoQuery
      * @method constructor
      * @param {JSON} layerData JSON which was spit out by autoMenu.js
      * @param {string=} graphPipeID optional ID of a pipe to spit all queried data into
      */
    constructor(layerData, graphPipeID) {
        this.data = layerData;
        this.collection = layerData.collection;
        this.map = globalThis.map;

        this.constraintData = {};
        this.constraintState = {};
        this.layerCache = {};

        this.streams = [];
        this.mapLayers = [];
        this.currentGeoJSON = [];
        this.layerIDs = new Set();
        this.currentQueries = new Set();

        this.constraintChangedFlag = false;
        this.enabled = false;
        this.geohashCache = [];

        this.linked = this.data.linkedGeometry ? true : false;

        if (layerData.temporal) {
            this.temporal = layerData.temporal;
            this.temporalFields = Object.entries(layerData.constraints)
                .filter(([constraintName, constraint]) => constraint.temporalType != null)
                .reduce((acc, [constraintName, constraint]) => {
                    return { ...acc, [constraintName]: constraint.temporalType }
                }, {});
        }

        this.colorFieldChangeSubscribers = [];
        this.color = layerData.color;
        if(this.color.variable){
            this.changeColorCodeField(this.color.variable, this.color)
        }
        else {
            this.changeColorCodeField(Object.keys(this.data.constraints)[0])
        }

        this.graphPipeID = graphPipeID;

        this.blockerGroup = this.data.linkedGeometry ?
            this.data.linkedGeometry === "tract_geo_140mb_no_2d_index" ?
                "tracts" : "counties"
            : this.data.label ?
                this.data.label : Util.cleanUpString(this.collection);

        if (this.data.linkedGeometry === "neon_sites") { //edge case for now
            this.blockerGroup = "Neon Sites";
        }

        if (this.blockerGroup.charAt(this.blockerGroup.length - 1) !== "s") {
            this.blockerGroup += "s";
        }

        this.minZoom = this.data.minZoom;
        this.blocked = false;
        AutoQuery.blockers[this.blockerGroup] = 0;

        this.map.on('moveend', () => {
            this.query();
        });
    }

    /**
      * Signals that this layer has been enabled
      * @memberof AutoQuery
      * @method onAdd
      */
    onAdd() {
        this.enabled = true;
        this.query();
    }

    /**
      * Signals that this layer has been disabled, along with some cleanup work
      * @memberof AutoQuery
      * @method onAdd
      */
    onRemove() {
        this.clearMapLayers();
        this.killCurrentQueries();

        const oldBlockers = JSON.stringify(AutoQuery.blockers);
        AutoQuery.blockers[this.blockerGroup] -= this.blocked;
        this.blocked = false;
        this.checkAndDispatch(oldBlockers);

        this.layerIDs.clear()
        this.currentGeoJSON = [];
        this.enabled = false;
        this.geohashCache = [];
        MapDataFilterWrapper.removeCollection(this.collection);
    }

    /**
      * Updates a constraint's data, and adds it if nonexistent.
      * This is meant to plug into the "onConstraintChange" attribute of
      * menuGenerator.js
      * @memberof AutoQuery
      * @method updateConstraint
      * @param {string} constraint name of constraint
      * @param {?} value value of constraint, type is dependant of type of constraint
      * @param {boolean} isActive is this constraint selected? this is only relevant for multiselector (checkbox) constraints.
      */
    updateConstraint(constraint, value, isActive) {
        if (!constraint)
            return;
        let changed = false;
        switch (this.getConstraintType(constraint)) {
            case "slider":
                const mData = this.getConstraintMetadata(constraint);
                if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) //change string to number
                        value[i] = Number(value[i]);
                    if (mData.plus && value[value.length - 1] >= mData.range[1] && value[0] > mData.range[0]) //maxed out on upper bound
                        value[value.length - 1] = 2147483647;
                }
                else
                    value = Number(value);
                changed = !this.constraintData[constraint] || this.constraintData[constraint].join() !== value.join();
                this.constraintData[constraint] = value;
                break;
            case "selector":
                changed = this.constraintData[constraint] !== value;
                this.constraintData[constraint] = value;
                break;
            case "multiselector":
                if (!this.constraintData[constraint])
                    this.constraintData[constraint] = {};
                changed = this.constraintData[constraint][value] !== isActive;
                this.constraintData[constraint][value] = isActive;
                break;
        }
        if (changed)
            this.reQuery();
    }

    /**
      * Restarts querying. This is used whenever a constraint changes, as any
      * layers or existing queries are no longer relevant.
      * @memberof AutoQuery
      * @method reQuery
      */
    reQuery() {
        if (this.enabled) {
            this.clearMapLayers();
            this.killCurrentQueries();
            this.geohashCache = [];
            this.query();
        }
    }
    /**
      * Kills current Queries
      * @memberof AutoQuery
      * @method killCurrentQueries
      */
    killCurrentQueries() {
        for (const qid of [...this.currentQueries]) {
            Query.killQuery(qid);
        }
        this.currentQueries.clear();
    }

    changeColorCodeField(fieldName, predefinedColor=null) {
        if(fieldName === this.color.variable){
            predefinedColor = this.color;
        }
        const colorField = this.data.constraints[fieldName] ?? this.data.constraints[`properties.${fieldName}`]
        if(colorField){
            this.colorField = { name: fieldName, label: colorField.label };

            if (colorField?.type === "slider") {
                this.protoColor = new Color("numeric", colorField.range, predefinedColor);
            }
            else if (colorField?.type === "multiselector") {
                this.protoColor = new Color("string", colorField.options, predefinedColor);
            }
            this.colorFieldChangeSubscribers.forEach(func => func(this.colorField))
            this.clearMapLayers();
            const currentGeoJSONCopy = JSON.parse(JSON.stringify(this.currentGeoJSON))
            this.currentGeoJSON = []
            MapDataFilterWrapper.removeCollection(this.collection);
            currentGeoJSONCopy.forEach(geoJSON => this.renderGeoJSON(geoJSON))
        }
    }

    /**
      * Gets metadata for constraint, useful helper function
      * @memberof AutoQuery
      * @method getConstraintMetadata
      * @param {string} constraintName name of constraint
      * @returns {object} constraint metadata
      */
    getConstraintMetadata(constraintName) {
        return this.data.constraints[constraintName];
    }

    /**
      * Gets type of constraint, useful helper function
      * @memberof AutoQuery
      * @method getConstraintType
      * @param {string} constraintName name of constraint
      * @return {string} constraint type
      */
    getConstraintType(constraintName) {
        return this.getConstraintMetadata(constraintName).type;
    }

    /**
      * Activates or deactivates a constraint, requeries after.
      * @memberof AutoQuery
      * @method getConstraintType
      * @param {string} constraintName name of constraint
      * @param {boolean} active should the constraint be activated or deactivated
      */
    constraintSetActive(constraintName, active) {
        this.constraintState[constraintName] = active;
        this.reQuery();
    }

    /**
      * Runs a query for this layer, and automatically renders what should be
      * rendered.
      * @memberof AutoQuery
      * @method query
      * @param {Array<GeoJSON>} forcedGeometry OPTIONAL array of geojson features
      * which can overide any automatic stuff. This parameter is ONLY used when
      * new features come in with @method listenForLinkedGeometryUpdates
      */
    query() {
        if (!this.enabled || !this.zoomIsValid()) {
            return;
        }
        let id;
        const callback = (d) => {
            const { event, payload } = d;
            if (event === "data") {
                this.renderGeoJSON(payload.data);
            }
            else if (event === "info") {
                payload.geohashes && this.geohashCache.push(...payload.geohashes);
                if (payload.id) {
                    id = payload.id;
                    this.currentQueries.add(payload.id);
                }
            }
            else if (event === "end") {
                this.currentQueries.delete(id);
            }
        }

        Query.makeQuery({
            collection: this.collection,
            pipeline: this.buildConstraintPipeline(),
            granularity: "coarse",
            callback,
            bounds: this.map.getBounds(),
            geohashBlacklist: this.geohashCache
        });
    }

    zoomIsValid() {
        const oldBlockers = JSON.stringify(AutoQuery.blockers);
        const mapZoom = this.map.getZoom();
        if (mapZoom < this.minZoom) {
            AutoQuery.blockers[this.blockerGroup] += !this.blocked;
            this.blocked = true;
            this.checkAndDispatch(oldBlockers);
            return false;
        }
        else {
            AutoQuery.blockers[this.blockerGroup] -= this.blocked;
            this.blocked = false;
        }
        this.checkAndDispatch(oldBlockers);

        return true;
    }

    checkAndDispatch(oldBlockers) {
        if (oldBlockers !== JSON.stringify(AutoQuery.blockers)) {
            AutoQuery.dispatchBlocker();
        }
    }

    static setBlockerListener(listener) {
        AutoQuery.blockerListener = listener;
    }

    static dispatchBlocker() {
        AutoQuery.blockerListener(AutoQuery.blockers);
    }

    addToExistingFeaturesNoDuplicates(existingFeatures, newFeatures) {
        const newFeaturesNoDuplicates = newFeatures.filter(nFeature => {
            return !existingFeatures.find(eFeature => eFeature.GISJOIN === nFeature.GISJOIN)
        });
        return existingFeatures.concat(newFeaturesNoDuplicates)
    }

    pullGISJOINSFromArray(arr) {
        return arr.map(feature => {
            return feature.GISJOIN;
        });
    }

    /**
      * Clears all of the current layers from this class on the map.
      * @memberof AutoQuery
      * @method clearMapLayers
      */
    clearMapLayers() {
        window.renderInfrastructure.removeSpecifiedLayersFromMap(this.mapLayers);
        this.mapLayers = [];
        this.layerIDs.clear();
    }

    /**
      * Renders GeoJSON data
      * @memberof AutoQuery
      * @method renderGeoJSON
      * @param {GeoJSON} data GeoJSON feature to be rendered
      */
    renderGeoJSON(data) {
        const id = this.linked ? data.id.split("_")[0] : data.id;
        if (!this.enabled || this.layerIDs.has(id))
            return;

        MapDataFilterWrapper.add(data, this.collection);

        let indexData = {};
        //console.log(this.constraintData[this.temporal])
        indexData[this.collection] = {
            "color": this.getColor(data.properties),
            "joinField": this.data.joinField
        }

        data.properties.meta = this.buildMetaMap();
        data.properties.colorInfo = {
            currentColorField: this.colorField,
            updateColorFieldName: this.changeColorCodeField.bind(this),
            validColorFieldNames: Object.keys(this.data.constraints).map(Util.removePropertiesPrefix),
            subscribeToColorFieldChange: this.subscribeToColorFieldChange.bind(this),
            colorSummary: () => { return this.protoColor.getColorSummary() }
        }

        if (this.getIcon())
            indexData[this.collection]["iconAddr"] = `./images/map-icons/${this.getIcon()}.png`;

        indexData[this.collection]["border"] = this.color.border;
        indexData[this.collection]["opacity"] = this.color.opacity;
        this.mapLayers = this.mapLayers.concat(window.renderInfrastructure.renderGeoJson(data, indexData));
        this.currentGeoJSON.push(data)
        this.layerIDs.add(id);

    }

    subscribeToColorFieldChange (func) {
        this.colorFieldChangeSubscribers.push(func)
    }

    /**
      * Gets icon
      * @memberof AutoQuery
      * @method getIcon
      * @returns Icon data
      */
    getIcon() {
        return this.data.icon;
    }

    /**
      * Builds a mongodb aggregation pipeline for the active and
      * relevant constraints
      * @memberof AutoQuery
      * @method buildConstraintPipeline
      * @returns {Array<object>} mongodb aggregation pipeline
      */
    buildConstraintPipeline() {
        let pipeline = [];
        if (this.temporal) {
            pipeline = this.buildTemporalPreProcess();
        }
        for (const constraintName in this.constraintState) {
            if (constraintName !== this.temporal && this.constraintState[constraintName]) {
                const constraintData = this.constraintData[constraintName];

                if (!this.constraintIsRelevant(constraintName, constraintData))
                    continue;

                const pipelineStep = { "$match": this.buildConstraint(constraintName, constraintData) };
                pipeline.push(pipelineStep);
            }
        }

        return pipeline;
    }

    buildTemporalPreProcess() {
        let groupStage = {
            _id: `$${this.data.joinField}`,
            [this.data.joinField]: { "$first": `$${this.data.joinField}` }
        }
        const fieldsNotGrouped = Object.keys(this.data.constraints).filter(name => !Object.keys(this.temporalFields).includes(name))
        for (const field of fieldsNotGrouped) {
            groupStage[field] = { "$first": `$${field}` }
        }
        for (const [field, type] of Object.entries(this.temporalFields)) {
            groupStage[field] = { [`$${type}`]: `$${field}` }
        }
        groupStage = {
            "$group": groupStage
        }

        return [{ "$match": this.buildConstraint(this.temporal, this.constraintData[this.temporal]) }, groupStage]
    }

    addMongoProject() {
        let project = { GISJOIN: 1 };
        for (const constraintName in this.constraintState) {
            if (this.constraintState[constraintName]) {
                project[constraintName] = 1
            }
        }
        return { "$project": project };
    }

    buildMetaMap() {
        return Object.entries(this.data.constraints).reduce((ret, [constraintName, constraintMeta]) => {
            const add = {};
            add.label = constraintMeta.label;
            add.isDate = constraintMeta.isDate;
            add.unit = constraintMeta.unit;
            add.important = this.constraintState[constraintName] ? true : false;
            add.temporal = constraintMeta.temporalType ? {
                temporalRange: this.constraintData[this.temporal],
                collection: this.collection
            } : null;

            ret[Util.removePropertiesPrefix(constraintName)] = add;
            return ret;
        }, {})
    }

    /**
      * Decides if a constraint is relevant. For example, if there is a 
      * constraint where you can select categorical attributes, and they are all
      * selected, it is not relevant as it does not have any effect on the results.
      * @memberof AutoQuery
      * @method constraintIsRelevant
      * @param {string} constraintName name of constraint
      * @param {object} constraintData data about the state of the constraint
      * @returns {boolean} 
      */
    constraintIsRelevant(constraintName, constraintData) {
        if (this.getConstraintType(constraintName) === "multiselector") {
            for (const key in constraintData) {
                if (!constraintData[key])
                    return true;
            }
            return false;
        }
        else if (this.getConstraintType(constraintName) === "slider") {
            const range = this.getConstraintMetadata(constraintName).range;
            return !(constraintData[0] <= range[0] && range[1] <= constraintData[1]);
        }
        else {
            return true;
        }
    }

    /**
      * Takes the state of the constraint, and turns it into a mongo query
      * @memberof AutoQuery
      * @method buildConstraint
      * @param {string} constraintName name of constraint
      * @param {object} constraintData data about the state of the constraint
      * @returns {object} mongo piece of the mongo query pipeline 
      */
    buildConstraint(constraintName, constraintData) {
        let step;
        switch (this.getConstraintType(constraintName)) {
            case "slider":
                step = {
                    "$gte": constraintData[0],
                    "$lte": constraintData[1]
                };
                break;
            case "selector":
                console.log("SELECTOR");
                break;
            case "multiselector":
                let $in = [];
                for (const opt in constraintData) {
                    if (constraintData[opt]) {
                        $in.push(opt);
                    }
                }
                step = { "$in": $in };
                break;
        }
        const queryConstraint = {};
        queryConstraint[constraintName] = step;
        return queryConstraint;
    }

    /**
      * Gets a color code to use based on the "properties" attribute of a GeoJSON
      * @memberof AutoQuery
      * @method getColor
      * @param {object} properties "properties" attribute of the geojson feature
      * being rendered.
      * @returns {string} hex color code
      */
    getColor(properties) {
        const propsVarName = Util.removePropertiesPrefix(this.colorField.name);
        const value = properties[propsVarName];
        return this.protoColor?.getColor(value)
    }
}

try {
    module.exports = {
        AutoQuery: AutoQuery
    }
} catch (e) { }

