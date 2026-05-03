// Hooks the slide-6 video onerror handler to reveal the CSS animation fallback.
// Runs once on DOM load; safe if the video element doesn't exist yet.
(function () {
  function wireFallback() {
    const video = document.querySelector('#slide-6 video.demo-video');
    const fallback = document.querySelector('#slide-6 .demo-fallback');
    if (!video || !fallback) return;

    function showFallback() {
      video.style.display = 'none';
      fallback.classList.add('active');
    }

    video.addEventListener('error', showFallback);
    video.addEventListener('abort', showFallback);
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      showFallback();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireFallback);
  } else {
    wireFallback();
  }
})();
