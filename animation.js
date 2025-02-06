import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"

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

  