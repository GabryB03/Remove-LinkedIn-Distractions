// ==UserScript==
// @name         LinkedIn Remove Distractions
// @namespace    http://tampermonkey.net/
// @version      1.1
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

    function asyncLoop()
    {
        try
        {
            var distractingElements = [];

            if (window.location.href.startsWith('https://www.linkedin.com/feed/'))
            {
                distractingElements =
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
            }
            else
            {
                distractingElements =
                [
                    "a[href='https://www.linkedin.com/notifications/?']",
                    "a[href='https://www.linkedin.com/mynetwork/?doMynetworkRefresh=true']",
                    "a[href='https://www.linkedin.com/mynetwork/?']",
                    "div[class='premium-upsell-link']"
                ];
            }

            for (var i = 0; i < distractingElements.length; i++)
            {
                var distractingElement = document.querySelector(distractingElements[i]);

                if (distractingElement != null && distractingElement != undefined)
                {
                    distractingElement.remove();
                }
            }

            {
                var messageBubble = document.getElementsByClassName("msg-overlay-list-bubble")[0];

                if (messageBubble != null && messageBubble != undefined)
                {
                    messageBubble.remove();
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