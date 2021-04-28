/* 

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

/**
* Library for the creation and alteration of floating divs
* Author Jean-Marc
*/
export default class resizable {
    static minimum_width = 500;
    static minimum_height = 100;

    // Used to prevent the resizable from falling off-screen due to viewport resizing.
    // If only this many pixels are on-screen at once in a given direction, push
    // the resizable back into the viewport.
    static offscreen_tolerance = 500
    // Allows us to add listeners to the unique overlays
    static numOfInstances = 0;
    // Each time a overlay is clicked its Z Index increases so it is seen above all other overlays
    static zIndex = 1000;

    constructor(defaultWidth, defaultHeight, backgroundColor){
        resizable.numOfInstances += 1;
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.uniqueId = resizable.numOfInstances;
        this.backgroundColor = backgroundColor;
        this.isDown = false;
        this.isResizing = false;
        this.createOverlay();
        this.resizeListeners();
        this.viewportResizeListeners();
        this.movementListeners();
    }
    /**
     * Generates the 3 necessary divs for the overlay and adds in the CSS based on its initialization variables
     * @memberof resizable
     * @method createOverlay()
     * @returns 3 divs appended to the body of the HTML doc
     */
    createOverlay(){
        const overlayDocument = document.createElement("div");
        this.overlayDocument = overlayDocument;
        overlayDocument.id = "overlay" + this.uniqueId;
        overlayDocument.className = "overlay colorMode1 noTransitions";
        overlayDocument.style.width = this.width + "px";
        overlayDocument.style.height = this.height + "px";
        overlayDocument.style.zIndex = resizable.zIndex;
        overlayDocument.style.left = window.innerWidth - this.width + "px";
        overlayDocument.style.display = "none";
        overlayDocument.style.opacity = .9;

        const boxDocument = document.createElement("div");
        this.boxDocument = boxDocument;
        boxDocument.id = "box" + this.uniqueId;
        boxDocument.className = "box";

        this.boxResizers = this.makeResizers();

        Object.values(this.boxResizers).forEach(boxResizer => overlayDocument.appendChild(boxResizer));
        overlayDocument.appendChild(boxDocument);
        document.body.appendChild(overlayDocument);
    }

    /**
     * Creates four resizer elements in the four corners of the box document.
     * @memberof resizable
     * @method makeResizers
     * @returns {object} An object with "top-right", "bot-right", "top-left", and "bot-left"
     * properties containing resizer elements
     */
    makeResizers() {
        let resizers = {};
        resizers.top_right = this.makeResizer("top-right");
        resizers.top_left = this.makeResizer("top-left");
        resizers.bot_right = this.makeResizer("bot-right");
        resizers.bot_left = this.makeResizer("bot-left");
        return resizers;
    }

    /**
     * Creates a single resizable element with the given additional CSS class.
     * @memberof resizable
     * @method makeResizer
     * @param {string} _class The name of the class to add
     * @returns {DOMElement} The element for the resizable
     */
    makeResizer(_class) {
        let resizer = document.createElement("div");
        resizer.id = "option" + this.uniqueId;
        resizer.className = "option " + _class;
        return resizer;
    }

    /**
     * Adds in the necessary listeners for the divs to be resized
     * @memberof resizable
     * @method resizeListeners()
     * @returns 3 listeners for mousemovement
     */
    resizeListeners(){
        Object.entries(this.boxResizers).forEach(r => {
            let corner = r[0];
            let boxResizable = r[1];
            boxResizable.addEventListener('mousedown', (e) => {
                /**
                 * Since there are the same listeners for resizing and movement we need these booleans so that resizing does
                 * not also move the div around and vice-versa
                 */
                this.isDown = true;
                this.isResizing = true;
                e.preventDefault();
                let dimensions = this.calculateDimensions(e);
                window.onmousemove = e => {
                    if(this.isDown && this.isResizing){
                        this.recomputeDimensionsAndResize(e, dimensions, corner);
                    }
                };
                window.onmouseup = () => {
                    this.isDown = false;
                    this.isResizing = false;
                };
            });
        });
    }

    /**
     * Adds in listeners for viewport (i.e. browser window events), so that the
     * resizable box stays within the viewport if it's being shrunk
     * @memberof resizable
     * @method viewportResizeListeners()
     */
    viewportResizeListeners() {
        window.addEventListener('resize', e => {
            let resizableX = this.overlayDocument.style.left;
            let resizableY = this.overlayDocument.style.top;
            resizableX = Number.parseInt(resizableX.substring(0, resizableX.length - 2));
            resizableY = Number.parseInt(resizableY.substring(0, resizableY.length - 2));

            if (window.innerWidth - resizableX < resizable.offscreen_tolerance) {
                this.overlayDocument.style.left = window.innerWidth - resizable.offscreen_tolerance + 'px';
            }
            if (window.innerHeight - resizableY < resizable.offscreen_tolerance) {
                this.overlayDocument.style.top = window.innerHeight - resizable.offscreen_tolerance + 'px';
            }
        });
    }

    /**
     * Calculates dimensions for resize, only because the resize function needed less lines
     * @memberof resizable
     * @method calculateDimensions
     * @param {event} e - the current position of the mouse
     * @returns 4 listeners for mousemovement
     */
    calculateDimensions(e){
        let dimensions = {};
        dimensions.width = parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('width').replace('px', ''));
        dimensions.height = parseFloat(getComputedStyle(this.overlayDocument, null).getPropertyValue('height').replace('px', ''));
        dimensions.y = this.overlayDocument.getBoundingClientRect().top;
        dimensions.x = this.overlayDocument.getBoundingClientRect().left;
        dimensions.pageX = e.pageX;
        dimensions.pageY = e.pageY;
        return dimensions;
    }

    recomputeDimensionsAndResize(current, old, relativeCorner){
        let widthDelta = current.pageX - old.pageX;
        let heightDelta = current.pageY - old.pageY;

        let leftOffset = old.x;
        let topOffset = old.y;

        if (relativeCorner === 'top_left' || relativeCorner === 'bot_left') {
            this.width = (old.width - widthDelta);
            leftOffset = (old.x + widthDelta);
        } else {
            this.width = (old.width + widthDelta);
        }

        if (relativeCorner === 'top_right' || relativeCorner === 'top_left') {
            this.height = (old.height - heightDelta);
            topOffset = (old.y + heightDelta);
        } else {
            this.height = (old.height + heightDelta);
        }

        this.resizeBox(topOffset, leftOffset);
    }

    resizeBox(topOffset, leftOffset) {
        let enough_width = this.width > resizable.minimum_width;
        let enough_height = this.height > resizable.minimum_height;

        if (enough_width) {
            this.overlayDocument.style.width = this.width + 'px';
            this.overlayDocument.style.left = leftOffset + 'px';
        }

        if (enough_height) {
            this.overlayDocument.style.height = this.height + 'px';
            this.overlayDocument.style.top = topOffset + 'px';
        }

        if (enough_width && enough_height && this.onResizeCallback) {
            this.onResizeCallback(this.width, this.height);
        }
    }

    setResizeCallback(cb) {
        this.onResizeCallback = cb;
    }

    triggerResizeEvent() {
        this.onResizeCallback(this.width, this.height);
    }

    /**
     * Adds in the necessary listeners for the div to be moved
     * @memberof resizable
     * @method movementListeners()
     * @returns 4 listeners for mousemovement
     */
    movementListeners(){
        let offset = [0,0];
        let mousePosition;
        this.overlayDocument.addEventListener('mousedown', ()=>{
            resizable.zIndex += 1;
            this.overlayDocument.style.zIndex = resizable.zIndex;
        });

        this.overlayDocument.addEventListener('mousedown', (e) => {
            // Do not initiate dragging if we've clicked an <input> element
            if (document.elementFromPoint(e.clientX, e.clientY).tagName === "INPUT") {
                this.isDown = false;
            } else {
                this.isDown = true;
            }

            offset = [
                this.overlayDocument.offsetLeft - e.clientX,
                this.overlayDocument.offsetTop - e.clientY
            ];

        }, true);

        this.overlayDocument.addEventListener('mouseup', () => {
            this.isDown = false;
        }, true);

        window.addEventListener('mousemove', (event) => {
            if (this.isDown && !this.isResizing) {
                mousePosition = this.moveBox(event, mousePosition, offset);
            }
        }, true);

    }

    moveBox(event, mousePosition, offset){
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        this.overlayDocument.style.left = (mousePosition.x + offset[0]) + 'px';
        this.overlayDocument.style.top  = (mousePosition.y + offset[1]) + 'px';
        return mousePosition;
    }

    toggleVisible(){
        let currentlyVisible = this.overlayDocument.style.display === "block";
        if (currentlyVisible) {
            this.overlayDocument.style.display = "none";
        } else {
            this.overlayDocument.style.display = "block";
            for (let areaName in this.chartAreas) {
                this.chartAreas[areaName].rerender(this.width, this.height);
            }
        }
    }

    addChartArea(type, chartArea) {
        this.chartAreas[type] = chartArea;
        chartArea.attachTo(this.boxDocument);
    }
}

