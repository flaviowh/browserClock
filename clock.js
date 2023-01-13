const color = document.querySelector(".color");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const timestamp = document.querySelector("#timestamp");
const body = document.querySelector(".body");

const positions = ["to left", "to bottom", "to bottom right", "to top", "to bottom left", "to top right"];
const intervals = [0, 1, 10, 15, 30, 60];

let currentTimer = 0;
let activeTimers = [];
let lightMode = false;

function changeColorGradients() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const average_lumi = (luminance(color1) + luminance(color2)) / 2;
    const btns = [btn1, btn2];

    lightMode = average_lumi <= 180 ? true : false;

    timestamp.style.borderColor = lightMode ? "black" : "white";
    timestamp.style.color = lightMode ? "white" : "black";

    btns.forEach(btn => {
        let color = lightMode ? "white" : "black";
        btn.style.color = color;
        btn.style.borderColor = color;
    });

    let gradient = `linear-gradient(${randomPosition()}, rgb(${color1}), rgb(${color2})`;
    document.body.style.background = gradient;
}

btn1.addEventListener("click", changeColorGradients);

function getRandomColor() {
    let rgb = [];
    for (let i = 0; i < 3; i++) {
        let selected = Math.floor(Math.random() * 256);
        rgb.push(selected);
    }
    return rgb;
}

let clock = setInterval(() => {
    let timestring = new Date().toTimeString().slice(0, 8);
    timestamp.textContent = timestring;
}, 1000);

function changeInterval() {
    activeTimers.forEach(clearInterval);

    if (currentTimer < intervals.length - 1) {
        currentTimer++;
    } else {
        currentTimer = 0;
    }

    let interval = intervals[currentTimer] * 60000;
    btn2.textContent = currentTimer > 0 ? `${intervals[currentTimer]}  mins` : "interval";

    if (currentTimer > 0) {
        let newTimer = setInterval(changeColorGradients, interval);
        activeTimers.push(newTimer);
    }
}

function randomPosition() {
    let idx = Math.floor(Math.random() * positions.length);
    return positions[idx];
}

const luminance = function (rgb) {
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

btn2.addEventListener("click", changeInterval);
document.addEventListener("DOMContentLoaded", changeColorGradients);
