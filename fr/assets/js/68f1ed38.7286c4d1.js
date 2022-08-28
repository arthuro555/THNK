"use strict";(self.webpackChunkthnk_docs=self.webpackChunkthnk_docs||[]).push([[466],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>p});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),h=u(a),p=i,m=h["".concat(l,".").concat(p)]||h[p]||c[p]||r;return a?n.createElement(m,o(o({ref:t},d),{},{components:a})):n.createElement(m,o({ref:t},d))}));function p(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var u=2;u<r;u++)o[u]=a[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},5369:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>u});var n=a(7462),i=(a(7294),a(3905));const r={sidebar_position:1,title:"What is THNK?",description:"A brief introduction to THNK - What is it? Why would I want to use it? How do I get started? All of those questions will be answered here. It is the recommended starting point to get started with the THNK framework.",keywords:["getting started","intro"]},o="Getting started with THNK - What is THNK anyways?",s={unversionedId:"why-thnk",id:"why-thnk",title:"What is THNK?",description:"A brief introduction to THNK - What is it? Why would I want to use it? How do I get started? All of those questions will be answered here. It is the recommended starting point to get started with the THNK framework.",source:"@site/docs/why-thnk.md",sourceDirName:".",slug:"/why-thnk",permalink:"/fr/docs/why-thnk",draft:!1,editUrl:"https://github.com/arthuro555/THNK/tree/main/docs/docs/why-thnk.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"What is THNK?",description:"A brief introduction to THNK - What is it? Why would I want to use it? How do I get started? All of those questions will be answered here. It is the recommended starting point to get started with the THNK framework.",keywords:["getting started","intro"]},sidebar:"tutorialSidebar",next:{title:"Getting started",permalink:"/fr/docs/category/getting-started"}},l={},u=[{value:"Why THNK?",id:"why-thnk",level:2},{value:"It makes your game work in both single- and multi-player without any extra changes",id:"it-makes-your-game-work-in-both-single--and-multi-player-without-any-extra-changes",level:3},{value:"Multiplayer can be enabled in a single action",id:"multiplayer-can-be-enabled-in-a-single-action",level:3},{value:"THNK multiplayer is always authoritative",id:"thnk-multiplayer-is-always-authoritative",level:3},{value:"Server builds",id:"server-builds",level:3},{value:"Dead simple object &amp; variables synchronization",id:"dead-simple-object--variables-synchronization",level:3},{value:"It provides an optimized solution for synchronizing objects and variables across server and clients.",id:"it-provides-an-optimized-solution-for-synchronizing-objects-and-variables-across-server-and-clients",level:3},{value:"And much more!",id:"and-much-more",level:3},{value:"How do I get started?",id:"how-do-i-get-started",level:2}],d={toc:u};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started-with-thnk---what-is-thnk-anyways"},"Getting started with THNK - What is THNK anyways?"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"THNK is a framework for building GDevelop games with multiplayer in mind.")),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"THNK is a framework, and not a simple extension - it's a whole way of structuring and coding your games. It is made to be very flexible despite forcing a structure onto your events, so no need to worry if you already started making your game and want to add THNK to it. Check out the ",(0,i.kt)("a",{parentName:"p",href:"/docs/migrating"},"Migration Guide")," for more informations.")),(0,i.kt)("h2",{id:"why-thnk"},"Why THNK?"),(0,i.kt)("p",null,"Building your game on top of THNK provides multiple benefits. Here are the most notable ones:"),(0,i.kt)("h3",{id:"it-makes-your-game-work-in-both-single--and-multi-player-without-any-extra-changes"},"It makes your game work in both single- and multi-player without any extra changes"),(0,i.kt)("p",null,"THNK by itself doesn't makes your game multiplayer games per-se, by default it still works in singleplayer as normal. You can switch to scenes built with THNK and they will work just like they would if not made with it. You are not committing to multiplayer by using THNK - only making it super easy to add a high quality multiplayer feature to the game."),(0,i.kt)("h3",{id:"multiplayer-can-be-enabled-in-a-single-action"},"Multiplayer can be enabled in a single action"),(0,i.kt)("p",null,"The real magic of THNK lies in its numerous adapter extensions. An adapter extension allows you to launch a server or client for a specifc networking backend in 1 action. The currently available adapters include:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"P2P (World-Wide LAN-like experience)"),(0,i.kt)("li",{parentName:"ul"},"WebSockets (True LAN experience) (coming soon!)"),(0,i.kt)("li",{parentName:"ul"},"Split-screen (coming soon!)")),(0,i.kt)("p",null,"This allows for a variety of types of multiplayers to be implemented without any efforts in mere minutes!"),(0,i.kt)("h3",{id:"thnk-multiplayer-is-always-authoritative"},"THNK multiplayer is always authoritative"),(0,i.kt)("p",null,"Multiplayer games can be done in a lot of ways. All there is to it in the end is to synchronize objects across instances of a game. But certain ways of doing it can be bad: if we let everyone synchronize any object of the game, a hacker could easily send malicious updates to other clients in order to cheat or crash their games."),(0,i.kt)("p",null,"Authoritative multiplayer is an architecture that aims to protect against this. In an authoritative architecture, there is a single designated server that runs all of the game code. This is the so-called ",(0,i.kt)("em",{parentName:"p"},"source of truth"),": all instances of the game will trust it and only that servers. That way, for a hacker to manipulate the game, they would have to control the server."),(0,i.kt)("p",null,"This technique is not 100% infaillible either, especially in a context where anyone can host a server and the host may be a hacker, but it should still protects against 99% the hacking & cheating techniques & attempts."),(0,i.kt)("p",null,"In THNK, all multiplayer, regardless of the adapter, will always be authoritative. Simply by making your game with THNK, you highly decrease the chances of someone managing to hack or cheat in your game."),(0,i.kt)("h3",{id:"server-builds"},"Server builds"),(0,i.kt)("p",null,"THNK is made to be able to create a special server build out of your game. This build can then be shared with players for them to host their own game servers (like minecraft), or you can use it to host optimized game servers on your own, allowing to create MMOs for example."),(0,i.kt)("p",null,"In the future, a THNK Cloud is planned. This would be a platform that would take care of creating server builds for you and hosting your game servers, ",(0,i.kt)("em",{parentName:"p"},"for free"),"! If you want it to see the light of day, consider ",(0,i.kt)("a",{parentName:"p",href:"https://ko-fi.com/arthuro555"},"making a donation to help buy the servers"),"."),(0,i.kt)("h3",{id:"dead-simple-object--variables-synchronization"},"Dead simple object & variables synchronization"),(0,i.kt)("p",null,"Synchronizing objects and variables can be a pain when doing multiplayer by yourself. In THNK, it is a simple as putting a behavior on objects you want to be synchronized, and prefix the names of variables you want to be synchornized with ",(0,i.kt)("inlineCode",{parentName:"p"},"State."),". You can focus on your game instead of the netwroking and synchronizing of different things."),(0,i.kt)("h3",{id:"it-provides-an-optimized-solution-for-synchronizing-objects-and-variables-across-server-and-clients"},"It provides an optimized solution for synchronizing objects and variables across server and clients."),(0,i.kt)("p",null,"THNK is as optimized as it gets for making your games server and client super fast."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"It uses a custom binary protocol based on ",(0,i.kt)("a",{parentName:"li",href:"https://google.github.io/flatbuffers/"},"FlatBuffers")," and ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/kriszyp/msgpackr"},"msgpackr"),", instead of much heavier formats like JSON, and additionally, all messages are compressed using the defalte algorithm, the same as the one used in zip files, to use the most minimal bandwidth and provide faster packing and unpacking of messages."),(0,i.kt)("li",{parentName:"ul"},"It synchronizes in a smart way: it only synchronizes the parts you care about, and only if they changed since the last server tick."),(0,i.kt)("li",{parentName:"ul"},"It allows to have a server update rate slower than the client, and interpolate results on the client, to use up less server resources and bandwidth. (WIP)"),(0,i.kt)("li",{parentName:"ul"},"It never runs server code on the client or client code on server builds (Note that THNK servers in non-server builds of the game also act as a client to itself)")),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"It is planned to add the possibility to leverage the optimized binary snapshotting of a scene to allow adding saving and loading easily in the future.")),(0,i.kt)("h3",{id:"and-much-more"},"And much more!"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Linking objects to players"),(0,i.kt)("li",{parentName:"ul"},"Authentication (coming soon!)"),(0,i.kt)("li",{parentName:"ul"},"Server replication (designating and keeping up to date a secondary server as a failsafe) (coming soon!)"),(0,i.kt)("li",{parentName:"ul"},"Etc...")),(0,i.kt)("h2",{id:"how-do-i-get-started"},"How do I get started?"),(0,i.kt)("p",null,"Are you convinced yet? If so, ",(0,i.kt)("a",{parentName:"p",href:"/docs/category/getting-started/"},"continue to the next page to learn how to get started using THNK.")))}c.isMDXComponent=!0}}]);