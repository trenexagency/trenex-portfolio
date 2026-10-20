---
name: Trenex Agency verification
description: Verification constraints for the Trenex service pages, including the cinematic entry overlay and browser gesture tests.
---

The Web, App & Software Development page starts with an entry overlay that can obscure the lower page during static captures. For interaction tests, ensure the overlay has exited and the target element is actually inside the browser viewport before sending touch or pointer input. Smooth scrolling can leave the target offscreen when a test assumes it has arrived.

**Why:** Browser input coordinates are viewport-relative; dispatching a gesture at a target’s document-space position does not reach the page element.

**How to apply:** Prefer typecheck and workflow/browser logs for static verification. For interaction tests, wait for the entry overlay, use a non-animated scroll to position the section, verify its viewport bounds, then test gestures and narrow-screen overflow.
