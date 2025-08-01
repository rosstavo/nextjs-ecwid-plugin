import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const ProductBrowser = ({
    storeId,
    categoriesPerRow = 3,
    views = "grid(3,3)",
    list = 10,
    table = 20,
    categoryView = "grid",
    searchView = "list",
}) => {
    console.log("ProductBrowser component mounted");

    useEffect(() => {
        let ecwidLoaded = false;

        function load_ecwid() {
            if (typeof Ecwid != "undefined") {
                Ecwid.OnAPILoaded.add(function () {
                    if (!ecwidLoaded) {
                        ecwidLoaded = true;
                        xProductBrowser(
                            `categoriesPerRow=${categoriesPerRow}`,
                            `views=${views} list(${list}) table(${table})`,
                            `categoryView=${categoryView}`,
                            `searchView=${searchView}`,
                            "id=ecStoreProductBrowser"
                        );
                    }
                });
            }
        }

        if (storeId === undefined || storeId === null) {
            console.error("Store ID is required for ProductBrowser component.");
            return;
        }

        window.ec = window.ec || {};
        window.ec.config = window.ec.config || {};
        window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
        window.ec.config.storefrontUrls.cleanUrls = true;
        window.ec.config.storefrontUrls.queryBasedCleanUrls = true;

        window.ecwid_script_defer = true;
        window.ecwid_dynamic_widgets = true;

        if (!document.getElementById("ecwid-script")) {
            var script = document.createElement("script");
            // script.charset = 'utf-8';
            script.type = "text/javascript";
            script.src =
                "https://app.ecwid.com/script.js?" +
                storeId +
                "&data_platform=nextjs";
            script.id = "ecwid-script";
            script.onload = load_ecwid;
            document.body.appendChild(script);
        } else {
            load_ecwid();
        }
    });

    if (!storeId) {
        return null;
    }

    return <div id="ecStoreProductBrowser"></div>;
};

export default ProductBrowser;
