const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");
const colorpicker = document.querySelector("#colorpicker");
const swatch = document.querySelectorAll(".swatch");
const brush = document.querySelector("#brushSize");
const eraser = document.querySelector("#eraserSize");
const ball = document.querySelector(".navBar__ball");
const nav = document.querySelector(".navBar");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
brush.value = 10;
eraser.value = 10;
ball.style.width = "10px";

function draw(e) {
    if (!isDrawing) return;
    console.log(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function litsener() {
    save.addEventListener("click", (e) => {
        window.open(canvas.toDataURL("image/png"));
        let gh = canvas.toDataURL("png");

        let a = document.createElement("a");
        a.href = gh;
        a.download = "image.png";

        a.click();
    });

    reset.addEventListener("click", (e) => {
        let color = ctx.strokeStyle;
        let size = ctx.lineWidth;
        ctx.reset();
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    colorpicker.addEventListener("change", (e) => {
        ctx.strokeStyle = e.target.value;
        ball.style.background = e.target.value;
    });

    swatch.forEach((el) => {
        el.style.background = el.getAttribute("data-color");

        el.addEventListener("click", (e) => {
            canvas.style.cursor = "url('images/pencil.png') 0 32, pointer";
            brush.setAttribute("data-color", "");
            ball.style.width = brush.value + "px";
            ctx.lineWidth = brush.value;
            ctx.strokeStyle = e.target.getAttribute("data-color");
            ball.style.background = e.target.getAttribute("data-color");
        });
    });

    brush.oninput = function () {
        if (brush.getAttribute("data-color")) {
            ctx.strokeStyle = brush.getAttribute("data-color");
            ball.style.background = ctx.strokeStyle;
            brush.setAttribute("data-color", "");
            canvas.style.cursor = "url('images/pencil.png') 0 32, pointer";
        }

        ball.style.width = this.value + "px";
        ctx.lineWidth = this.value;
    };

    eraser.oninput = function () {
        if (!brush.getAttribute("data-color")) {
            brush.setAttribute("data-color", ball.style.background);
            canvas.style.cursor = "url(images/eraser.png) 0 32, pointer";
            console.log(ball.style.cursor);
        }        ball.style.width = this.value + "px";
        ctx.lineWidth = this.value;
        ball.style.width = this.value + "px";
        ctx.lineWidth = this.value;
        ball.style.background = "#fff";
        ctx.strokeStyle = "#fff";
    };

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
}

function init() {
    canvas.width = window.innerWidth - 27;
    canvas.height = window.innerHeight - nav.offsetHeight - 41;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = brush.value;

    litsener();
}

init();
