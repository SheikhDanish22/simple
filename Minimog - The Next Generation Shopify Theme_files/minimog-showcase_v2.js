const showcaseTemplate = document.createElement("template");
showcaseTemplate.innerHTML = `
<style>
* {
	box-sizing: border-box;
  }
  
  @keyframes placeholder-background-loading {
	0% {
	  opacity: 0.03;
	}
	50% {
	  opacity: 0.07;
	}
	100% {
	  opacity: 0.03;
	}
  }
  .f-hidden {
	display: none;
  }
  
  .f-icon__svg {
	display: block;
	width: 1em;
	height: 1em;
  }
  
  .f-button {
	outline: none;
	text-align: center;
	padding: 10px 26px;
	line-height: 26px;
	white-space: normal;
	transition: 0.25s all;
	display: inline-block;
	font-size: 16px;
	font-weight: 500;
	letter-spacing: 0;
	text-decoration: none;
	text-transform: none;
	border-radius: 5px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background-color: #000;
	color: #fff;
  }
  
  .f-button:hover {
	box-shadow: 0 0 0 2px #000;
  }
  
  .f-scrollbar--y {
	overflow-y: auto;
  }
  
  .f-scrollbar--y::-webkit-scrollbar {
	width: var(--sf-scroll-bar-width, 3px);
  }
  
  .f-scrollbar--y::-webkit-scrollbar-thumb {
	background: #ebebeb;
  }
  
  .f-scrollbar--y::-webkit-scrollbar-thumb:hover {
	background: #555;
  }
  
  .f-hint {
	--hint-background: #000;
	--hint-text: #fff;
	position: relative;
	display: inline-block;
  }
  
  .f-hint:before, .f-hint:after {
	position: absolute;
	-webkit-transform: translateZ(0);
	transform: translateZ(0);
	visibility: hidden;
	opacity: 0;
	z-index: 1000000;
	pointer-events: none;
	-webkit-transition: 0.3s ease;
	transition: 0.3s ease;
	-webkit-transition-delay: 0ms;
	transition-delay: 0ms;
	transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s cubic-bezier(0.71, 1.7, 0.77, 1.24), -webkit-transform 0.3s cubic-bezier(0.71, 1.7, 0.77, 1.24);
  }
  
  .f-hint:before {
	content: "";
	position: absolute;
	background: transparent;
	border: 7px solid transparent;
	z-index: 1000001;
  }
  
  .f-hint:after {
	content: attr(aria-label);
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
	background: var(--hint-background);
	color: var(--hint-text);
	padding: 7px 10px;
	font-size: 14px;
	font-weight: 500;
	line-height: 14px;
	white-space: nowrap;
	border-radius: 3px;
  }
  
  .f-hint:hover:before, .f-hint:hover:after {
	visibility: visible;
	opacity: 1;
	transition-delay: 0.1s;
  }
  
  .f-hint.f-hint__left:before, .f-hint.f-hint__left:after {
	right: 100%;
	bottom: 50%;
  }
  
  .f-hint.f-hint__left:before {
	border-left-color: var(--hint-background);
	margin-right: -13px;
	margin-bottom: -7px;
  }
  
  .f-hint.f-hint__left:after {
	margin-bottom: -14px;
  }
  
  .f-hint.f-hint__left:hover:before, .f-hint.f-hint__left:hover:after {
	transform: translateX(-8px);
  }
  
  .f-grid {
	display: grid;
	grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
	grid-gap: var(--grid-gap-x, 24px) var(--grid-gap-y, 24px);
  }
  .f-grid > * {
	min-width: 0;
  }
  
  .f-showcase__toolbar {
	position: fixed;
	z-index: 100000;
	top: 200px;
	right: 0;
	display: block;
	width: var(--toolbal-size, 40px);
	line-height: 60px;
	border-right: 0;
	border-radius: 5px 0 0 5px;
	background: rgba(242, 100, 34, 0.8);
	text-align: center;
	box-shadow: -3px 0px 10px -2px rgba(0, 0, 0, 0.1);
	transform: translateX(100%);
	transition: 0.5s cubic-bezier(0.15, 0.75, 0.5, 1);
  }
  
  .f-showcase__toolbar a {
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--toolbal-size, 40px);
	height: var(--toolbal-size, 40px);
	font-size: 20px;
	color: #fff !important;
  }
  
  .f-showcase__toolbar svg {
	width: 1em;
	height: 1em;
  }
  .f-showcase__toolbar svg[fill]:not([fill=none]) {
	fill: currentColor;
  }
  
  .f-showcase__modal {
	--modal-rounded: 5px;
	--modal-width: 1458px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 100001;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: 0.3s all;
  }
  
  .f-showcase__modal:before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	cursor: zoom-out;
  }
  
  .f-showcase.opened .f-showcase__modal {
	opacity: 1;
	visibility: visible;
	pointer-events: auto;
  }
  
  .f-showcase.initialed .f-showcase__toolbar {
	transform: none;
  }
  
  .f-showcase__close-button {
	position: absolute;
	top: 0;
	right: 0;
	width: 40px;
	height: 40px;
	border: 0;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.17);
	transform: translate(50%, -50%);
	cursor: pointer;
	color: #000;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  .f-showcase__close-button svg {
    width: 20px;
    height: 20px;
  }
  
  .f-showcase__close-button:hover {
	background: #000;
	color: #fff;
  }
  
  .f-showcase__modal-content {
	position: relative;
	width: var(--modal-width);
	max-width: calc(100% - 50px);
  }
  
  .f-showcase__panel {
	position: relative;
	overflow-y: auto;
	border-radius: var(--modal-rounded);
	max-height: calc(100vh - 60px);
	background: #f5f3f6;
  }
  
  .f-showcase__panel-header {
	text-align: center;
	margin: 0 0 var(--modal-header-gap, 35px);
  }
  
  .f-showcase__panel-inner {
	padding: var(--modal-pt, 30px) calc(var(--modal-pr, 30px) - var(--sf-scroll-bar-width, 3px)) var(--modal-pb, 48px) var(--modal-pl, 30px);
  }
  
  .f-showcase__panel-heading {
	font-size: 30px;
	margin: 0;
  }
  
  .f-showcase__panel-heading mark {
	background: none;
	font-weight: bold;
	color: #f26422;
  }
  
  .f-showcase__panel-description {
	margin: 8px auto 0;
	font-size: 18px;
	max-width: 600px;
  }
  
  .f-showcase__panel-button {
	margin: 18px 0 0;
  }
  
  .f-showcase__item {
	text-decoration: none;
	display: block;
	position: relative;
	background: hsl(0, 0%, 100%);
	border-radius: 5px;
	padding: 16px;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	box-shadow: 2px 7px 15px rgba(0, 0, 0, 0.04);
  }
  
  .f-showcase__item:hover img {
	transform: scale3d(1.1, 1.1, 1.1) translateZ(0);
  }
  
  .f-showcase__item-image {
	position: relative;
	z-index: 0;
	-webkit-mask-image: -webkit-radial-gradient(white, black);
	overflow: hidden;
	line-height: 1;
	font-size: 0;
  }
  
  .f-showcase__item-image:before {
	content: "";
	background-color: #000;
	animation: placeholder-background-loading 1.5s infinite linear;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	pointer-events: none;
  }
  
  .f-showcase__item img {
	user-select: none;
	-webkit-user-drag: none;
	user-drag: none;
	-webkit-touch-callout: none;
	width: 100%;
	height: auto;
	max-width: 100%;
	transition: 1s cubic-bezier(0.15, 0.75, 0.5, 1) 0s;
  }
  
  .f-showcase__item-info {
	position: relative;
	padding: 12px 0 0;
  }
  
  .f-showcase__item-heading {
	font-size: 18px;
	line-height: 26px;
	color: #000;
	margin: 0;
  }
  
  .f-showcase__item-badges {
	position: absolute;
	top: 16px;
	right: 0;
	display: flex;
	align-items: center;
	gap: 5px;
  }
  
  .f-badge {
	background: var(--item-bg, #000);
	color: var(--item-txt, #fff);
	border-radius: 12px;
	height: 24px;
	min-width: 54px;
	padding: 3px 9px;
	line-height: 18px;
	font-size: 13px;
	font-weight: 500;
	text-transform: uppercase;
	display: inline-block;
	text-align: center;
  }
  .f-badge.free {
	--item-bg: #4caf50;
  }
  .f-badge.hot {
	--item-bg: #d84143;
  }
  .f-badge.new {
	--item-bg: #ff5722;
  }
  
  .f-showcase__item-description {
	color: #828c9e;
  }
  
  @media screen and (max-width: 991px) {
	.f-showcase__panel-heading {
	  font-size: 24px;
	}
	.f-grid {
	  --grid-columns: 2;
	}
  }
  @media screen and (max-width: 767px) {
	.f-showcase {
	  --toolbal-size: 44px;
	  max-width: calc(100% - 50px);
	}
	.f-showcase__panel-heading {
	  font-size: 18px;
	}
	.f-showcase__panel-description {
	  font-size: 16px;
	}
	.f-showcase__modal {
	  --modal-pr: 16px;
	  --modal-pl: 16px;
	}
	.f-grid {
	  --grid-gap-x: 12px;
	  --grid-gap-y: 12px;
	}
	.f-showcase__item {
	  padding: 16px 12px;
	}
	.f-showcase__item-info {
	  position: static;
	}
	.f-showcase__item-badges {
	  top: 22px;
      right: 18px;
      gap: 3px;
	}
	.f-badge {
		font-size: 10px;
		min-width: 0;
		height: 20px;
		padding: 1px 8px;
		border-radius: 10px;
	}
	.f-showcase__item-heading {
	  font-size: 16px;
	}
	.f-showcase__item-description {
	  font-size: 15px;
	}
  }
</style>

<div class="f-showcase">
	<div class="f-showcase__toolbar">
		<a href="#" class="f-showcase__toggle-button f-hint f-hint__left" aria-label="Preview Demos">
			<svg class="f-icon__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path></svg>
		</a>
    <a target="_blank" href="https://foxecom.com/pages/affiliate?utm_source=minimog%2Bdemo&utm_medium=sidebar%2Bmenu&utm_campaign=foxaffiliatelaunch2024" class="f-showcase__toggle-button f-hint f-hint__left" aria-label="Explore FoxEcom Affiliate Program">
			<svg class="f-icon__svg" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M16.5171 9.29395V11.2939" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.5171 21.2939V23.2939" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.5171 28.2939C23.1445 28.2939 28.5171 22.9214 28.5171 16.2939C28.5171 9.66653 23.1445 4.29395 16.5171 4.29395C9.88967 4.29395 4.51709 9.66653 4.51709 16.2939C4.51709 22.9214 9.88967 28.2939 16.5171 28.2939Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5171 21.2939H18.0171C18.6801 21.2939 19.316 21.0306 19.7849 20.5617C20.2537 20.0929 20.5171 19.457 20.5171 18.7939C20.5171 18.1309 20.2537 17.495 19.7849 17.0262C19.316 16.5573 18.6801 16.2939 18.0171 16.2939H15.0171C14.354 16.2939 13.7182 16.0306 13.2493 15.5617C12.7805 15.0929 12.5171 14.457 12.5171 13.7939C12.5171 13.1309 12.7805 12.495 13.2493 12.0262C13.7182 11.5573 14.354 11.2939 15.0171 11.2939H19.5171" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
		</a>
	</div>
	<div class="f-showcase__modal">
		<div class="f-showcase__modal-content">
			<button class="f-showcase__close-button" aria-label="Close">
				<svg  class="f-icon__svg" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
				</svg>
			</button>
			<div id="f-showcase__panel" class="f-showcase__panel f-hidden f-scrollbar--y">
				<div class="f-showcase__panel-inner">
					<div class="f-showcase__panel-header">
					<h2 class="h5 f-showcase__panel-heading"></h2>
					<div class="f-showcase__panel-description"></div>
					<a href="#" target="_blank" rel="nofollow" class="f-showcase__panel-button f-button">Buy Now</a>
					</div>
					<div class="f-showcase__panel-body f-grid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

if (!customElements.get("f-showcase")) {
  customElements.define(
    "f-showcase",
    class MShowcase extends HTMLElement {
      constructor() {
        super();
        this.dataUrl =
          "https://d6vygj6nlotna.cloudfront.net/public/minimog/minimog-showcase.json";
        this.selectors = {
          wrapper: ".f-showcase",
          toolbar: ".f-showcase__toolbar",
          triggerButton: ".f-showcase__toggle-button",
          closeButton: ".f-showcase__close-button",
          modal: ".f-showcase__modal",
          modalContent: ".f-showcase__modal-content",
          panel: ".f-showcase__panel",
          panelHeading: ".f-showcase__panel-heading",
          panelDescription: ".f-showcase__panel-description",
          panelButton: ".f-showcase__panel-button",
          panelBody: ".f-showcase__panel-body",
        };
        this.activeClass = "opened";
        this.initialClass = "initialed";
        this.loadedClass = "loaded";

        this.delayShowing = 1000;
      }

      connectedCallback() {
        fetch(this.dataUrl)
          .then((res) => res.json())
          .then((res) => {
            if (res.items.length > 0) {
              this.renderComponents(res);
            }
          });
      }

      renderComponents(themeInfo) {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(showcaseTemplate.content.cloneNode(true));

        let toolbarHTML = "";
        if (this.isObjectHasValue(themeInfo, "support_url")) {
          toolbarHTML += this.renderToolbarLink(
            themeInfo.support_url,
            "support"
          );
        }
        if (this.isObjectHasValue(themeInfo, "documentation_url")) {
          toolbarHTML += this.renderToolbarLink(
            themeInfo.documentation_url,
            "documentation"
          );
        }
        if (this.isObjectHasValue(themeInfo, "purchase_url")) {
          toolbarHTML += this.renderToolbarLink(
            themeInfo.purchase_url,
            "purchase"
          );
        }

        this.wrapper = this.shadowRoot.querySelector(this.selectors.wrapper);
        this.modal = this.shadowRoot.querySelector(this.selectors.modal);
        this.modalContent = this.shadowRoot.querySelector(
          this.selectors.modalContent
        );
        this.toolbar = this.shadowRoot.querySelector(this.selectors.toolbar);
        this.closeButton = this.shadowRoot.querySelector(
          this.selectors.closeButton
        );
        this.panel = this.shadowRoot.querySelector(this.selectors.panel);
        this.panelHeading = this.shadowRoot.querySelector(
          this.selectors.panelHeading
        );
        this.panelDescription = this.shadowRoot.querySelector(
          this.selectors.panelDescription
        );
        this.panelButton = this.shadowRoot.querySelector(
          this.selectors.panelButton
        );
        this.panelBody = this.shadowRoot.querySelector(
          this.selectors.panelBody
        );

        this.panelHeading.innerHTML = themeInfo.name;
        this.panelDescription.innerHTML = themeInfo.description;
        this.panelButton.setAttribute("href", themeInfo.landing_url);
        this.toolbar.innerHTML += toolbarHTML;

        this.triggerButton = this.toolbar.querySelector(
          this.selectors.triggerButton
        );

        const instance = this;

        let output = "";
        themeInfo.items.map(function (item) {
          output += instance.renderItem(item);
        });

        this.panelBody.innerHTML = output;

        this.triggerButton.addEventListener(
          "click",
          this.handleTogglePanel.bind(this)
        );
        this.closeButton.addEventListener(
          "click",
          this.handleClosePanel.bind(this)
        );
        this.modal.addEventListener(
          "click",
          this.handleClickOutsite.bind(this)
        );

        this.showing();
      }

      async showing() {
        await this.sleep(this.delayShowing);
        this.wrapper.classList.add(this.initialClass);
      }

      sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      renderToolbarLink(link, type) {
        let title = "";
        let icon = "";
        switch (type) {
          case "support":
            title = "Support Chanel";
            icon =
              '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm39.1,131.79a47.84,47.84,0,0,0,0-55.58l28.5-28.49a87.83,87.83,0,0,1,0,112.56ZM96,128a32,32,0,1,1,32,32A32,32,0,0,1,96,128Zm88.28-67.6L155.79,88.9a47.84,47.84,0,0,0-55.58,0L71.72,60.4a87.83,87.83,0,0,1,112.56,0ZM60.4,71.72l28.5,28.49a47.84,47.84,0,0,0,0,55.58L60.4,184.28a87.83,87.83,0,0,1,0-112.56ZM71.72,195.6l28.49-28.5a47.84,47.84,0,0,0,55.58,0l28.49,28.5a87.83,87.83,0,0,1-112.56,0Z"></path></svg>';
            break;
          case "documentation":
            title = "Documentation";
            icon =
              '<svg class="f-icon__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>';
            break;
          case "purchase":
            title = "Purchase Minimog";
            icon =
              '<svg class="f-icon__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,184,200ZM231.65,74.35l-28.53,92.71A23.89,23.89,0,0,1,180.18,184H84.07A24.11,24.11,0,0,1,61,166.59L24.82,40H8A8,8,0,0,1,8,24H24.82A16.08,16.08,0,0,1,40.21,35.6L48.32,64H224a8,8,0,0,1,7.65,10.35ZM213.17,80H52.89l23.49,82.2a8,8,0,0,0,7.69,5.8h96.11a8,8,0,0,0,7.65-5.65Z"></path></svg>';
            break;
        }
        return `<a class="f-hint f-hint__left" href="${link}" target="_blank" rel="nofollow" aria-label="${title}">${icon}</a>`;
      }

      renderItem(item) {
        let badgeHTML = "";

        if (item.hasOwnProperty("badges") && item.badges.length > 0) {
          item.badges.map(function (badge) {
            badgeHTML += `<span class="f-badge ${badge}">${badge}</span>`;
          });
          badgeHTML =
            '<div class="f-showcase__item-badges">' + badgeHTML + "</div>";
        }

        let categoryHTML = "";

        if (item.hasOwnProperty("category")) {
          if (typeof item.category !== "object") {
            console.log(item);
          }
          categoryHTML = `<div class="f-showcase__item-description">${item.category.join(
            ", "
          )}</div>`;
        }

        return `<a href="${item.url}" class="f-showcase__item">
            <div class="f-showcase__item-image">
              <img src="${item.thumbnail}" alt="${item.name}" loading="lazy" width="267" height="187"/>
            </div>
            <div class="f-showcase__item-info">${badgeHTML}
              <h3 class="f-showcase__item-heading">${item.name}</h3>${categoryHTML}
            </div>
          </a>`;
      }

      isObjectHasValue(obj, key) {
        return obj.hasOwnProperty(key) && "" !== obj[key];
      }

      disConnectedcallback() {
        this.triggerButton.removeEventListener(
          "click",
          this.handleTogglePanel.bind(this)
        );
        this.closeButton.removeEventListener(
          "click",
          this.handleClosePanel.bind(this)
        );
        this.modal.removeEventListener(
          "click",
          this.handleClickOutsite.bind(this)
        );
      }

      handleTogglePanel(evt) {
        evt.preventDefault();
        if (this.wrapper.classList.contains(this.activeClass)) {
          this.closePanel();
        } else {
          this.openPanel();
        }
      }

      handleClosePanel(evt) {
        evt.preventDefault();
        this.closePanel();
      }

      handleClickOutsite(evt) {
        if (
          evt.target.closest(".f-showcase__modal-content") !== this.modalContent
        ) {
          this.closePanel();
        }
      }

      openPanel() {
        if (!this.wrapper.classList.contains(this.loadedClass)) {
          this.panel.classList.remove("f-hidden");
          this.wrapper.classList.add(this.loadedClass);
        }
        this.wrapper.classList.add(this.activeClass);
      }

      closePanel() {
        this.wrapper.classList.remove(this.activeClass);
      }
    }
  );
}

class FoxEcomShowcase {
  constructor() {
    this.renderComponent(true);
  }

  renderComponent() {
    const component = document.createElement("f-showcase");
    document.body.appendChild(component);
  }
}

new FoxEcomShowcase();
