export const openPip = async () => {
  if (!('documentPictureInPicture' in window)) {
    alert('PictureInPicture is not supported.');
    return;
  }

  const pipWindow = await (
    window as any
  ).documentPictureInPicture.requestWindow({
    width: 480,
    height: 800,
  });

  const sourceDoc = document;
  const targetDoc = pipWindow.document;

  targetDoc.replaceChild(
    sourceDoc.documentElement.cloneNode(true),
    targetDoc.documentElement,
  );

  copyStylesAndScripts(sourceDoc, targetDoc);
  addViewportMeta(targetDoc);
  observeDomChanges(sourceDoc, targetDoc);
  enableExternalLinks(targetDoc);
};

const copyStylesAndScripts = (sourceDoc: Document, targetDoc: Document) => {
  sourceDoc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    if (link instanceof HTMLLinkElement) {
      const clonedLink = targetDoc.createElement('link');
      clonedLink.rel = 'stylesheet';
      clonedLink.href = link.href;
      targetDoc.head.appendChild(clonedLink);
    }
  });

  Array.from(sourceDoc.styleSheets).forEach((sheet) => {
    if (sheet instanceof CSSStyleSheet) {
      try {
        const cssRules = Array.from(sheet.cssRules).map((rule) => rule.cssText);
        if (cssRules.length > 0) {
          const styleElement = targetDoc.createElement('style');
          styleElement.textContent = cssRules.join('\n');
          targetDoc.head.appendChild(styleElement);
        }
      } catch (e) {
        console.warn(`Could not access stylesheet: ${sheet.href}`, e);
      }
    }
  });

  sourceDoc.querySelectorAll('script').forEach((script) => {
    const newScript = targetDoc.createElement('script');
    if (script.src) {
      newScript.src = script.src;
    } else {
      newScript.textContent = script.textContent;
    }
    targetDoc.body.appendChild(newScript);
  });
};

const addViewportMeta = (targetDoc: Document) => {
  const viewportMeta = targetDoc.createElement('meta');
  viewportMeta.name = 'viewport';
  viewportMeta.content =
    'width=device-width, initial-scale=1.0, user-scalable=yes';
  targetDoc.head.appendChild(viewportMeta);
};

const observeDomChanges = (sourceDoc: Document, targetDoc: Document) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        targetDoc.body.innerHTML = sourceDoc.body.innerHTML;
        copyStylesAndScripts(sourceDoc, targetDoc);
      }
    });
  });

  observer.observe(sourceDoc.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
};

const enableExternalLinks = (targetDoc: Document) => {
  targetDoc.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.tagName === 'A') {
      event.preventDefault();
      const link = target as HTMLAnchorElement;

      window.open(link.href, '_blank');
    }
  });
};
