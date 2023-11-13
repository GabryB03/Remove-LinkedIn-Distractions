// ==UserScript==
// @name         LinkedIn Remove Distractions
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Remove all the LinkedIn distractions to get concentrated on what's really important
// @author       GabryB03
// @match        https://www.linkedin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @updateURL    https://github.com/GabryB03/Remove-LinkedIn-Distractions/raw/main/RemoveLinkedInDistractions.user.js
// @downloadURL  https://github.com/GabryB03/Remove-LinkedIn-Distractions/raw/main/RemoveLinkedInDistractions.user.js
// @grant        none
// ==/UserScript==

(function()
{
    'use strict';
    const css =
    `
        .msg-overlay-list-bubble, a[href='https://www.linkedin.com/notifications/?'], a[href='https://www.linkedin.com/mynetwork/?doMynetworkRefresh=true'], a[href='https://www.linkedin.com/mynetwork/?'], div[class='premium-upsell-link'] { display: none !important; visibility: hidden !important; }
    `;
    const head = document.head || document.getElementsByTagName('head')[0];
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = css;
    head.appendChild(styleElement);

    function getElementByXpath(path)
    {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function asyncLoop()
    {
        try
        {
            if (window.location.href.startsWith('https://www.linkedin.com/feed/') || window.location.href == 'https://www.linkedin.com/')
            {
                var distractingElements =
                [
                    "main[class='scaffold-layout__main']",
                    "div[class='scaffold-layout__sidebar']",
                    "a[href='https://www.linkedin.com/notifications/?']",
                    "a[href='https://www.linkedin.com/mynetwork/?doMynetworkRefresh=true']",
                    "a[href='https://www.linkedin.com/mynetwork/?']",
                    "div[class='premium-upsell-link']",
                    "div[class='mb2']",
                    "div[class='scaffold-layout__sticky-content']",
                    "button[class='global-nav__app-launcher-trigger']"
                ];

                for (var i = 0; i < distractingElements.length; i++)
                {
                    var distractingElement = document.querySelector(distractingElements[i]);
    
                    if (distractingElement != null && distractingElement != undefined)
                    {
                        distractingElement.remove();
                    }
                }
            }

            var distractingPaths = ["/html/body/div[6]/div[3]/div/div/div[2]/div/div/aside", "/html/body/div[5]/div[3]/div/div/div[2]/div/div/aside"];

            for (var i = 0; i < distractingPaths.length; i++)
            {
                var sidebarElement = getElementByXpath(distractingPaths[i]);

                if (sidebarElement != null && sidebarElement != undefined)
                {
                    if (sidebarElement.innerHTML.includes("<div id=\"browsemap_recommendation\""))
                    {
                        sidebarElement.remove();
                    }
                }
            }
        }
        catch (e)
        {

        }

        setTimeout(async function()
        {
            await asyncLoop();
        },
        500);
    }

    asyncLoop();
})();