﻿module CSSP {
    export class TestAccordion {
        constructor() {
        }
        public DoTest: Function = ($cssPath: JQuery, CurrentCSSPath: string): void => {
            test(CurrentCSSPath + " [panel-group]", () => {
                ok($cssPath.children().length >= 1, "Accordian has at least 1 child div");
            });
            for (var i = 0, count = $cssPath.children().length; i < count; i++) {
                var $DivsPanel: JQuery = $cssPath.children().eq(i);
                test(CurrentCSSPath + " [panel-group] [panel]", () => {
                    ok($DivsPanel.is("div"), "panel-group child is div");
                    ok($DivsPanel.hasClass("panel"), "panel-group child has class panel");
                });
                // doing panel-heading
                var $DivPanelHeading = $DivsPanel.children().eq(0);
                test(CurrentCSSPath + " [panel-group] [panel] [panel-heading]", () => {
                    ok($DivPanelHeading.is("div"), "panel-group child of child is div");
                    ok($DivPanelHeading.hasClass("panel-heading"), "panel-group child of child has class panel");
                });
                var $DivPanelTitle = $DivPanelHeading.children().eq(0);
                test(CurrentCSSPath + " [panel-group] [panel] [panel-heading] [panel-title]", () => {
                    ok($DivPanelTitle.is("h4"), "panel-title is h4");
                    ok($DivPanelTitle.hasClass("panel-title"), "panel-title has class panel-title");
                });
                var $DivPanelLink = $DivPanelTitle.children().eq(0);
                test(CurrentCSSPath + " [panel-group] [panel] [panel-heading] [panel-title] [a]", () => {
                    ok($DivPanelLink.is("a"), "link is a");
                    ok($DivPanelLink.attr("data-toggle") != undefined, "link has attr data-toggle");
                    ok($DivPanelLink.attr("data-toggle") == "collapse", "link has attr data-toggle == collapse");
                    ok($DivPanelLink.attr("data-parent") != undefined, "link has attr data-parent");
                    ok($DivPanelLink.attr("href") != undefined, "link has attr href");
                    if ($cssPath.attr("id") != undefined) {
                        ok($DivPanelLink.attr("data-parent").substring(1) == $cssPath.attr("id"), "link data-parent equal panel-goup id");
                    }
                    else {
                    }
                });

                // doing panel-collapse
                var $DivPanelCollapse = $DivsPanel.children().eq(1);
                test(CurrentCSSPath + " [panel-group] [panel] [collapse]", () => {
                    ok($DivPanelCollapse.is("div"), "collapse is div");
                    ok($DivPanelCollapse.hasClass("panel-collapse"), "collapse has class panel-collapse");
                    if ($DivPanelCollapse.attr("id") != undefined) {
                        ok($DivPanelCollapse.attr("id") == $DivPanelLink.attr("href").substring(1), "collapse id == link href");
                    }
                });
                var $DivPanelCollapseBody = $DivPanelCollapse.children().eq(0);
                test(CurrentCSSPath + " [panel-group] [panel] [collapse] [body]", () => {
                    ok($DivPanelCollapseBody.is("div"), "collapse body is div");
                    ok($DivPanelCollapseBody.hasClass("panel-body"), "collapse body has class panel-body");
                });
            }
        };
    }
} 