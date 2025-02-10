import { animate } from "motion"

const navs = document.querySelectorAll("nav")

navs.forEach((n) => {
    n.addEventListener("mouseover", () => animate(n, {opacity: [0.8, 1], scale: [1, 1.1]}, {duration: 1}));
    n.addEventListener("mouseout", () => animate(n, {opacity: [1, 0.8], scale: [1.1, 1]}, {duration: 1}))
})

animate(navs, {opacity: [0, 0.8]}, {duration: 1});

let build_b = document.getElementById("tobuildbutton")
let about_b = document.getElementById("toaboutbutton")
let con = document.getElementById("content")
let bui = document.getElementById("build")
let bgd = document.getElementById("globe")
let abo = document.getElementById("about")
build_b.addEventListener("click", () => {
    animate(con, {opacity: [1, 0]}, {duration: 0.5 });
    animate(bgd, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        con.style.display = "none";
        bgd.style.display = "none";
        bui.style.display = "block";
        animate(bui, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

about_b.addEventListener("click", () => {
    animate(con, {opacity: [1, 0]}, {duration: 0.5 });
    animate(bgd, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        con.style.display = "none";
        bgd.style.display = "none";
        abo.style.display = "block";
        animate(abo, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

let con_b = document.getElementById("toconbutton")
con_b.addEventListener("click", () => {
    animate(bui, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => { "none";
        bui.style.display = "none";
        con.style.display = "block";
        bgd.style.display = "block";
        animate(bgd, {opacity: [0, 1]}, {duration: 0.5 });
        animate(con, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

let con_a = document.getElementById("toconbuttonabo")
con_a.addEventListener("click", () => { 
    animate(abo, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        abo.style.display = "none";
        con.style.display = "block";
        bgd.style.display = "block";
        animate(con, {opacity: [0, 1]}, {duration: 0.5});
        animate(bgd, {opacity: [0, 1]}, {duration: 0.5 });
    }, 500)
})