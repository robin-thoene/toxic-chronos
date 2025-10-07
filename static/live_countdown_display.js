// Mostly taken from
// https://www.w3schools.com/howto/howto_js_countdown.asp

/**
 * Starts a live countdown towards the target date
 *
 * @param {string} displayElemetId - The HTML DOM id of the element to use as for displaying
 * @param {string} targetDateString - The string representation of the target date
 */
export function startCountdown(displayElemetId, targetDateString) {
  const countDownDate = new Date(targetDateString).getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(displayElemetId).innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(displayElemetId).innerHTML = "EXPIRED";
    }
  }, 1000);
}
