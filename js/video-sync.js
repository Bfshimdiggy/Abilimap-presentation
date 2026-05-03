// video-sync.js
// On every entry into a slide that contains 2+ <video> elements,
// reset all of them to t=0 and start playback in the same animation frame
// so the pair stays in lock-step. Each re-entry resets, preventing drift.
(function () {
  function syncVideos(videos) {
    if (!videos || videos.length < 2) return;

    Array.from(videos).forEach(function (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch (e) { /* ignore */ }
    });

    function playAll() {
      requestAnimationFrame(function () {
        Array.from(videos).forEach(function (v) {
          var p = v.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        });
      });
    }

    var pending = 0;
    Array.from(videos).forEach(function (v) {
      if (v.readyState < 3) {
        pending++;
        var handler = function () {
          v.removeEventListener('canplay', handler);
          pending--;
          if (pending === 0) playAll();
        };
        v.addEventListener('canplay', handler);
      }
    });

    if (pending === 0) playAll();
  }

  function handleSlide(slide) {
    if (!slide) return;
    var videos = slide.querySelectorAll('video');
    if (videos.length >= 2) {
      // Brief delay so we run after Reveal's own autoplay logic, then override.
      setTimeout(function () { syncVideos(videos); }, 60);
    }
  }

  function wire() {
    if (!window.Reveal) return false;
    Reveal.on('slidechanged', function (e) { handleSlide(e.currentSlide); });
    Reveal.on('ready', function (e) { handleSlide(e.currentSlide); });
    return true;
  }

  if (!wire()) {
    document.addEventListener('DOMContentLoaded', wire);
  }
})();
