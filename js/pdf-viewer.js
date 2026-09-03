/**
 * Opens a PDF in an overlay.
 *
 * The iframe gets its src only when the overlay opens, so a large document never
 * competes with the page for bandwidth on load. Focus is moved into the dialog and
 * returned to the trigger on close, and the page behind is locked from scrolling.
 */
(function () {
  'use strict';

  var overlay = document.querySelector('.pdf-overlay');
  if (!overlay) return;

  var frame = overlay.querySelector('.pdf-frame');
  var title = overlay.querySelector('.pdf-dialog-title');
  var download = overlay.querySelector('.pdf-download');
  var closeBtn = overlay.querySelector('.pdf-close');
  var laatsteTrigger = null;

  function open(src, label) {
    laatsteTrigger = document.activeElement;
    title.textContent = label;
    download.href = src;
    // #view=FitH opens at page width, which is what a reader expects.
    frame.src = src + '#view=FitH';
    overlay.setAttribute('open', '');
    document.body.classList.add('overlay-open');
    closeBtn.focus();
  }

  function close() {
    overlay.removeAttribute('open');
    document.body.classList.remove('overlay-open');
    // Dropping the src stops the plugin rendering and frees the memory.
    frame.removeAttribute('src');
    if (laatsteTrigger && laatsteTrigger.focus) laatsteTrigger.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-pdf]');
    if (trigger) {
      e.preventDefault();
      open(trigger.getAttribute('data-pdf'), trigger.getAttribute('data-pdf-title') || 'Document');
      return;
    }
    if (e.target === overlay || e.target.closest('.pdf-close')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.hasAttribute('open')) close();
  });
})();
