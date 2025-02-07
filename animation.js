import { animate } from "motion"

const navs = document.querySelectorAll("nav")

navs.forEach((n) => {
    n.addEventListener("mouseover", () => animate(n, {opacity: [0.5, 1], scale: [1, 1.1]}, {duration: 1}));
    n.addEventListener("mouseout", () => animate(n, {opacity: [1, 0.5], scale: [1.1, 1]}, {duration: 1}))
})

animate(
    navs,
    { opacity: [0, 0.5] },
    { duration: 1 }
);

let build_b = document.getElementById("tobuildbutton")
let track_b = document.getElementById("totrackbutton")
let con = document.getElementById("content")
let bui = document.getElementById("build")
let tra = document.getElementById("track")
build_b.addEventListener("click", () => {
    animate(con, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        con.style.display = "none";
        bui.style.display = "block";
        animate(bui, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

track_b.addEventListener("click", () => {
    animate(con, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        con.style.display = "none";
        tra.style.display = "block";
        animate(tra, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

let con_b = document.getElementById("toconbutton")
con_b.addEventListener("click", () => {
    animate(bui, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => { "none";
        bui.style.display = "none";
        con.style.display = "block";
        animate(con, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})

let con_t = document.getElementById("toconbuttontra")
con_t.addEventListener("click", () => {
    console.log('ha') 
    animate(tra, {opacity: [1, 0]}, {duration: 0.5 });
    setTimeout(() => {
        tra.style.display = "none";
        con.style.display = "block";
        animate(con, {opacity: [0, 1]}, {duration: 0.5});
    }, 500)
})