---
name: Volusion
title: Senior Software Engineer
start: 2020-11
end: 2022-06
logo: "./logos/volusion.svg"
---

-	Refactored the React-based Page Builder editor to use idiomatic React state and lifecycle management, decomposing monolithic components and explicitly designing testable shared-vs-local state boundaries.
-	Eliminated full reloads of the iframe-preview on every edit (causing flickering and scroll resets) by moving to atomic, block-level re-rendering, materially improving editor responsiveness.
-	Architected and implemented a micro-frontend approach that embedded modern React experiences (including the Page Builder) into a legacy classic-ASP platform, packaged as Web Components with Shadow DOM for style and runtime isolation.

Tools used: TypeScript, React, Node.js, REST APIs, CSS-in-JS (Aphrodite), Web Components/Shadow DOM
