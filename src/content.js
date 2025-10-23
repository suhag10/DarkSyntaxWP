// content.js
(() => {
    "use strict";

    HTMLElement.prototype.addEvent = function (type, handler, options = false) {
        if (!this || typeof this.addEventListener !== "function") return;
        this.addEventListener(type.trim(), handler, options);
        return this;
    };

    const ds = {
        html: document.documentElement,
        storage: localStorage,
        id: (selector, scope = document) => scope.getElementById(selector),
        class: (selector, scope = document) => scope.querySelector(selector),
        classes: (selector, scope = document) => scope.querySelectorAll(selector),
        create: (tag, scope = document) => scope.createElement(tag),
        appendBody: (node, scope = document) => scope.body.appendChild(node),
        redirect: (url) => (window.location.href = url),
        hexToRgb: (hex) => {
            let bigint = parseInt(hex.replace("#", ""), 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;
            return `${r}, ${g}, ${b}`;
        },
        applyThemeColors: (selector = "#themeGroup button") => {
            const buttons = ds.classes(selector);
            buttons.forEach((button) => {
                let color  = button.value || "";
                let filter = color.replace(/(#*)/g, "");
                button.style.setProperty("background-color", "#" + filter, "important");
            });
        },
        applyTheme: () => {
            let data = ds.storage.getItem("data-theme") || "#10b981";
            let rgb  = ds.hexToRgb(data);
            ds.html.style.setProperty("--ds-theme-primary", data);
            ds.html.style.setProperty("--ds-theme-primary-rgb", rgb);
        },
        search: () => {
            let input  = ds.id("ds_search_input");
            let button = ds.id("ds_search_button");
            let uri = "https://developer.wordpress.org/?s=";

            button?.addEvent("click", () => ds.redirect(uri + input.value));
            input?.addEvent("keypress", (e) => {
                if (e.key === "Enter") ds.redirect(uri + input.value);
            });
        },
        openSidebar: (target) => {
            try {
                let element = ds.class(target);
                element?.classList.toggle("opened");
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Create main UI container
    let div = ds.create("div");
    div.id = "darkSyntaxWP";
    div.className = "darksyntax";
    div.innerHTML = `
    <div class="scroll-[Y]">
        <h4 class="title">DarkSyntaxWP</h4>
        <div class="search-box">
            <div class="input">
                <input class="search-input" id="ds_search_input" placeholder="Search resources" type="search" required />
            </div>
            <button type="button" id="ds_search_button" aria-label="Search">
                <svg class="search-icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
                </svg>
            </button>
        </div>
        <h4 class="title-color-palette mb-0">Choose a colour</h4>
        <button type="button" class="opened-btn" id="openSidebarBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
        </button>
        <div id="themeGroup" class="btn-group">
            <div class="color-palette">
                <h3>Default</h3>
                <button type="button" data-id="11" value="#00c684"></button>
                <button type="button" data-id="11" value="#008080"></button>
                <button type="button" data-id="11" value="#AB6C56"></button>
                <button type="button" data-id="11" value="#B5835A"></button>
            </div>
            <div class="color-palette">
                <h3>Slate</h3>
                <button type="button" data-id="slate-300" value="#cbd5e1"></button>
                <button type="button" data-id="slate-400" value="#94a3b8"></button>
                <button type="button" data-id="slate-500" value="#64748b"></button>
                <button type="button" data-id="slate-600" value="#475569"></button>
                <button type="button" data-id="slate-700" value="#334155"></button>
            </div>
            <div class="color-palette">
                <h3>Gray</h3>
                <button type="button" data-id="gray-300" value="#d1d5db"></button>
                <button type="button" data-id="gray-400" value="#9ca3af"></button>
                <button type="button" data-id="gray-500" value="#6b7280"></button>
                <button type="button" data-id="gray-600" value="#4b5563"></button>
                <button type="button" data-id="gray-700" value="#374151"></button>
            </div>
            <div class="color-palette">
                <h3>Zinc</h3>
                <button type="button" data-id="zinc-300" value="#d4d4d8"></button>
                <button type="button" data-id="zinc-400" value="#a1a1aa"></button>
                <button type="button" data-id="zinc-500" value="#71717a"></button>
                <button type="button" data-id="zinc-600" value="#52525b"></button>
                <button type="button" data-id="zinc-700" value="#3f3f46"></button>
            </div>
            <div class="color-palette">
                <h3>Neutral</h3>
                <button type="button" data-id="neutral-300" value="#d4d4d4"></button>
                <button type="button" data-id="neutral-400" value="#a3a3a3"></button>
                <button type="button" data-id="neutral-500" value="#737373"></button>
                <button type="button" data-id="neutral-600" value="#525252"></button>
                <button type="button" data-id="neutral-700" value="#404040"></button>
            </div>
            <div class="color-palette">
                <h3>Stone</h3>
                <button type="button" data-id="stone-300" value="#d6d3d1"></button>
                <button type="button" data-id="stone-400" value="#a8a29e"></button>
                <button type="button" data-id="stone-500" value="#78716c"></button>
                <button type="button" data-id="stone-600" value="#57534e"></button>
                <button type="button" data-id="stone-700" value="#44403c"></button>
            </div>
            <div class="color-palette">
                <h3>Red</h3>
                <button type="button" data-id="red-300" value="#fca5a5"></button>
                <button type="button" data-id="red-400" value="#f87171"></button>
                <button type="button" data-id="red-500" value="#ef4444"></button>
                <button type="button" data-id="red-600" value="#dc2626"></button>
                <button type="button" data-id="red-700" value="#b91c1c"></button>
            </div>
            <div class="color-palette">
                <h3>Orange</h3>
                <button type="button" data-id="orange-300" value="#fdba74"></button>
                <button type="button" data-id="orange-400" value="#fb923c"></button>
                <button type="button" data-id="orange-500" value="#f97316"></button>
                <button type="button" data-id="orange-600" value="#ea580c"></button>
                <button type="button" data-id="orange-700" value="#c2410c"></button>
            </div>
            <div class="color-palette">
                <h3>Amber</h3>
                <button type="button" data-id="amber-300" value="#fcd34d"></button>
                <button type="button" data-id="amber-400" value="#fbbf24"></button>
                <button type="button" data-id="amber-500" value="#f59e0b"></button>
                <button type="button" data-id="amber-600" value="#d97706"></button>
                <button type="button" data-id="amber-700" value="#b45309"></button>
            </div>
            <div class="color-palette">
                <h3>Yellow</h3>
                <button type="button" data-id="yellow-300" value="#fde047"></button>
                <button type="button" data-id="yellow-400" value="#facc15"></button>
                <button type="button" data-id="yellow-500" value="#eab308"></button>
                <button type="button" data-id="yellow-600" value="#ca8a04"></button>
                <button type="button" data-id="yellow-700" value="#a16207"></button>
            </div>
            <div class="color-palette">
                <h3>Lime</h3>
                <button type="button" data-id="lime-300" value="#bef264"></button>
                <button type="button" data-id="lime-400" value="#a3e635"></button>
                <button type="button" data-id="lime-500" value="#84cc16"></button>
                <button type="button" data-id="lime-600" value="#65a30d"></button>
                <button type="button" data-id="lime-700" value="#4d7c0f"></button>
            </div>
            <div class="color-palette">
                <h3>Green</h3>
                <button type="button" data-id="green-300" value="#86efac"></button>
                <button type="button" data-id="green-400" value="#4ade80"></button>
                <button type="button" data-id="green-500" value="#22c55e"></button>
                <button type="button" data-id="green-600" value="#16a34a"></button>
                <button type="button" data-id="green-700" value="#15803d"></button>
            </div>
            <div class="color-palette">
                <h3>Emerald</h3>
                <button type="button" data-id="emerald-300" value="#6ee7b7"></button>
                <button type="button" data-id="emerald-400" value="#34d399"></button>
                <button type="button" data-id="emerald-500" value="#10b981"></button>
                <button type="button" data-id="emerald-600" value="#059669"></button>
                <button type="button" data-id="emerald-700" value="#047857"></button>
            </div>
            <div class="color-palette">
                <h3>Teal</h3>
                <button type="button" data-id="teal-300" value="#5eead4"></button>
                <button type="button" data-id="teal-400" value="#2dd4bf"></button>
                <button type="button" data-id="teal-500" value="#14b8a6"></button>
                <button type="button" data-id="teal-600" value="#0d9488"></button>
                <button type="button" data-id="teal-700" value="#0f766e"></button>
            </div>
            <div class="color-palette">
                <h3>Cyan</h3>
                <button type="button" data-id="cyan-300" value="#67e8f9"></button>
                <button type="button" data-id="cyan-400" value="#22d3ee"></button>
                <button type="button" data-id="cyan-500" value="#06b6d4"></button>
                <button type="button" data-id="cyan-600" value="#0891b2"></button>
                <button type="button" data-id="cyan-700" value="#0e7490"></button>
            </div>
            <div class="color-palette">
                <h3>Sky</h3>
                <button type="button" data-id="sky-300" value="#7dd3fc"></button>
                <button type="button" data-id="sky-400" value="#38bdf8"></button>
                <button type="button" data-id="sky-500" value="#0ea5e9"></button>
                <button type="button" data-id="sky-600" value="#0284c7"></button>
                <button type="button" data-id="sky-700" value="#0369a1"></button>
            </div>
            <div class="color-palette">
                <h3>Blue</h3>
                <button type="button" data-id="blue-300" value="#93c5fd"></button>
                <button type="button" data-id="blue-400" value="#60a5fa"></button>
                <button type="button" data-id="blue-500" value="#3b82f6"></button>
                <button type="button" data-id="blue-600" value="#2563eb"></button>
                <button type="button" data-id="blue-700" value="#1d4ed8"></button>
            </div>
            <div class="color-palette">
                <h3>Indigo</h3>
                <button type="button" data-id="indigo-300" value="#a5b4fc"></button>
                <button type="button" data-id="indigo-400" value="#818cf8"></button>
                <button type="button" data-id="indigo-500" value="#6366f1"></button>
                <button type="button" data-id="indigo-600" value="#4f46e5"></button>
                <button type="button" data-id="indigo-700" value="#4338ca"></button>
            </div>
            <div class="color-palette">
                <h3>Violet</h3>
                <button type="button" data-id="violet-300" value="#c4b5fd"></button>
                <button type="button" data-id="violet-400" value="#a78bfa"></button>
                <button type="button" data-id="violet-500" value="#8b5cf6"></button>
                <button type="button" data-id="violet-600" value="#7c3aed"></button>
                <button type="button" data-id="violet-700" value="#6d28d9"></button>
            </div>
            <div class="color-palette">
                <h3>Purple</h3>
                <button type="button" data-id="purple-300" value="#d8b4fe"></button>
                <button type="button" data-id="purple-400" value="#c084fc"></button>
                <button type="button" data-id="purple-500" value="#a855f7"></button>
                <button type="button" data-id="purple-600" value="#9333ea"></button>
                <button type="button" data-id="purple-700" value="#7e22ce"></button>
            </div>
            <div class="color-palette">
                <h3>Fuchsia</h3>
                <button type="button" data-id="fuchsia-300" value="#f0abfc"></button>
                <button type="button" data-id="fuchsia-400" value="#e879f9"></button>
                <button type="button" data-id="fuchsia-500" value="#d946ef"></button>
                <button type="button" data-id="fuchsia-600" value="#c026d3"></button>
                <button type="button" data-id="fuchsia-700" value="#a21caf"></button>
            </div>
            <div class="color-palette">
                <h3>Pink</h3>
                <button type="button" data-id="pink-300" value="#f9a8d4"></button>
                <button type="button" data-id="pink-400" value="#f472b6"></button>
                <button type="button" data-id="pink-500" value="#ec4899"></button>
                <button type="button" data-id="pink-600" value="#db2777"></button>
                <button type="button" data-id="pink-700" value="#be185d"></button>
            </div>
            <div class="color-palette">
                <h3>Rose</h3>
                <button type="button" data-id="rose-300" value="#fda4af"></button>
                <button type="button" data-id="rose-400" value="#fb7185"></button>
                <button type="button" data-id="rose-500" value="#f43f5e"></button>
                <button type="button" data-id="rose-600" value="#e11d48"></button>
                <button type="button" data-id="rose-700" value="#be123c"></button>
            </div>
        </div>
    </div>
    `;

    ds.appendBody(div);
    ds.applyThemeColors();
    ds.applyTheme();
    ds.search();

    ds.id("openSidebarBtn")?.addEvent("click", () => ds.openSidebar(".darksyntax"));

    ds.classes("#themeGroup button").forEach((button) => {
        button.addEvent("click", () => {
            let primary = button.value;
            if (!primary) return;

            let primaryRgb = ds.hexToRgb(primary);
            let setTheme = `
            --ds-theme-primary: ${primary};
            --ds-theme-primary-rgb: ${primaryRgb};
            `.replace(/[\n\s]/g, "");

            ds.html.setAttribute("style", setTheme);
            ds.storage.setItem("data-theme", primary);
        });
    });

    try {
        let [bannerBg, bannerText] = [
            ".has-lemon-3-background-color",
            "p.has-text-align-center.has-small-font-size",
        ];

        let target = ds.class(bannerText);
        let hasClass = target?.closest(bannerBg);

        if (hasClass) {
            target?.parentNode?.classList.remove("has-lemon-3-background-color");
            target?.parentNode?.classList.add("ds-header-banner");
        }
    } catch (error) {
        console.error("Banner update error:", error);
    }
})();