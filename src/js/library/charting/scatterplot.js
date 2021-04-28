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

import Chart from "./chart";
import * as d3 from "../../third-party/d3.min.js";

export default class Scatterplot extends Chart {
    constructor() {
        super([]);
    }

    rerender(newWidth, newHeight, viewIndex) {
        let view = this.views[viewIndex];

        newWidth = newWidth < Chart.MINIMUM_WIDTH ? Chart.MINIMUM_WIDTH : newWidth;
        newHeight = newHeight < Chart.MINIMUM_HEIGHT ? Chart.MINIMUM_HEIGHT : newHeight;
        view.width = newWidth;
        view.height = newHeight;
        view.svg.attr("viewBox", [0, 0, newWidth, newHeight]);

        view.x = d3.scaleLinear()
            .domain(d3.extent(this.data, d => d.x)).nice()
            .range([view.margin.left, view.width - view.margin.right])

        view.y = d3.scaleLinear()
            .domain(d3.extent(this.data, d => d.y)).nice()
            .range([view.height - view.margin.bottom, view.margin.top])

        view.xAxis = g => g
            .attr("transform", `translate(0,${view.height - view.margin.bottom})`)
            .call(d3.axisBottom(view.x).ticks(view.width / 80))
            .call(g => g.select(".domain").remove())

        view.yAxis = g => g
            .attr("transform", `translate(${view.margin.left},0)`)
            .call(d3.axisLeft(view.y))
            .call(g => g.select(".domain").remove())

        view.svg.select("g#points")
            .selectAll("circle")
            .data(this.data)
            .join("circle")
                .attr("cx", d => view.x(d.x))
                .attr("cy", d => view.y(d.y))
                .attr("r", 3);

        view.svg.select("g#xAxis").call(view.xAxis);
        view.svg.select("g#yAxis").call(view.yAxis);
        view.svg.select("g#xGrid")
            .selectAll("line")
            .data(view.x.ticks())
            .join("line")
                .attr("x1", d => 0.5 + view.x(d))
                .attr("x2", d => 0.5 + view.x(d))
                .attr("y1", view.margin.top)
                .attr("y2", view.height - view.margin.bottom)
        view.svg.select("g#yGrid")
            .selectAll("line")
            .data(view.y.ticks())
            .join("line")
                .attr("y1", d => 0.5 + view.y(d))
                .attr("y2", d => 0.5 + view.y(d))
                .attr("x1", view.margin.left)
                .attr("x2", view.width - view.margin.right);

        view.svg.select("text#xAxisLabel")
            .attr("x", newWidth - view.margin.right)
            .attr("y", newHeight - view.margin.bottom / 2 + 4)
            .attr("text-anchor", "end")
            .attr("font-size", "8pt")
            .text(this.data.x);

        view.svg.select("text#yAxisLabel")
            .attr("x", view.margin.left / 2)
            .attr("y", view.margin.top / 2)
            .attr("text-anchor", "start")
            .attr("font-size", "8pt")
            .text(this.data.y);
    }

    changeData(newData) {
        this.data = newData;
        this.rerenderAllViews();
    }

    makeNewView(node, width, height) {
        let view = {};
        view.width = width;
        view.height = height;
        
        view.svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

        view.margin = { top: 20, right: 20, bottom: 50, left: 50 };

        view.svg.append("g").attr("id", "xAxis");
        view.svg.append("g").attr("id", "yAxis");
        view.svg.append("text").attr("id", "xAxisLabel");
        view.svg.append("text").attr("id", "yAxisLabel");
        view.svg.append("g").attr("id", "xGrid")
            .attr("stroke", "grey")
            .attr("stroke-opacity", 0.5);
        view.svg.append("g").attr("id", "yGrid")
            .attr("stroke", "grey")
            .attr("stroke-opacity", 0.5);
        view.svg.append("g").attr("id", "points")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("fill", "none");

        return view;
    }
}

