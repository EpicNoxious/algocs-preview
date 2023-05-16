// .............................scroll
// .............................scroll
// .............................scroll
// .............................scroll
// .............................scroll

// const locomotivescroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
//   smoothing: 1,
//   multiplier: 0.5,
//   smartphone: {
//     smooth: true,
//     multiplier: 0.5,
//   },
// });

const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// .............................responsive grid
// .............................responsive grid
// .............................responsive grid
// .............................responsive grid
// .............................responsive grid

barba.hooks.after(() => {
  // locomotivescroll.destroy();
  resizeCanvas();
  // locomotivescroll.init();
});

// .............................tile
// .............................tile
// .............................tile
// .............................tile
// .............................tile

// const container = document.getElementById("tile-container");
// function updateGrid() {
//   const tileSize = Math.floor(window.innerWidth * 0.05); // Set tile size to 5% of screen width

//   const bodyHeight = document.body.offsetHeight;
//   const scrollBarWidth = window.innerWidth - document.body.clientWidth;
//   const numRows = Math.ceil((bodyHeight + scrollBarWidth) / tileSize);
//   const numCols = Math.ceil(container.offsetWidth / tileSize);

//   // THIS CODE IS CREATING AN ISSUE WITH SCROLL
//   const totalHeight = numRows * tileSize;
//   container.style.height = totalHeight + "px";

//   const totalWidth = numCols * tileSize;
//   container.style.width = totalWidth + "px";
//   container.style.boxSizing = "border-box";
//   container.style.maxWidth = "100%"; // Set max-width to 100%

//   const root = document.documentElement;
//   root.style.setProperty("--tile-size", tileSize + "px");

//   container.innerHTML = "";

//   for (let i = 0; i < numRows * numCols; i++) {
//     const tile = document.createElement("div");
//     tile.classList.add("tile");
//     container.appendChild(tile);
//   }
// }

// updateGrid(); // Call the function for the first time

// window.addEventListener("resize", () => {
//   updateGrid(); // Call function whenever window is resized
// });

// .............................canvas
// .............................canvas
// .............................canvas
// .............................canvas
// .............................canvas

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const tileSize = Math.floor(window.innerWidth * 0.04); // Set tile size to 4% of screen width
const originalStrokeStyle = "#1f1f1f"; // Store the original stroke color

function resizeCanvas() {
  context.translate(0.5, 0.5);
  const bodyHeight = document.body.offsetHeight;
  const scrollBarWidth = window.innerWidth - document.body.clientWidth;
  const numRows = Math.floor((bodyHeight + scrollBarWidth) / tileSize);
  const numCols = Math.floor(window.innerWidth / tileSize);

  canvas.width = numCols * tileSize;
  canvas.height = numRows * tileSize;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      context.fillStyle = "#1f1f1f";
      context.fillRect(x, y, tileSize, tileSize);
      context.strokeStyle = "#1f1f1f";
      context.lineWidth = "2";
      context.strokeRect(x, y, tileSize, tileSize);
    }
  }

  // Add event listener for mousemove
  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);

    // Set the new stroke color with desired opacity
    context.strokeStyle = "rgba(23, 31, 230, 1)";

    // Stroke the tile with new color
    context.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

    // Set the stroke color back to the original color after a short delay (adjust as needed)
    setTimeout(function () {
      context.strokeStyle = originalStrokeStyle;
      context.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }, 500);
  });
}

resizeCanvas(); // Initial canvas sizing

// Add event listener for window resize
window.addEventListener("resize", function () {
  resizeCanvas();
});

// .............................imgbox zindex
// .............................imgbox zindex
// .............................imgbox zindex
// .............................imgbox zindex
// .............................imgbox zindex

function incrementZIndex() {
  let zIndex = 5;
  const boxes = document.querySelectorAll(".img-box");
  boxes.forEach((box) => {
    const imgBoxContainer = box.querySelector(".img-box-container");
    const toggleContainer = box.querySelector(".toggle-container");
    const imgBoxImage = box.querySelector(".img");
    const imgBoxMinus = box.querySelector(".img-cut");
    const toggleContainer2 = box.querySelector(".img-content");
    box.addEventListener("click", function () {
      // Increment the z-index of the clicked img-box
      this.style.zIndex = ++zIndex;

      // Change the background color of the toggle-container element for 1 second
      toggleContainer.style.backgroundColor = "rgb(var(--secondary))";
      toggleContainer2.style.backgroundColor = "rgb(var(--secondary))";
      setTimeout(() => {
        toggleContainer.style.backgroundColor = "";
        toggleContainer2.style.backgroundColor = "";
      }, 100);
    });
    toggleContainer.addEventListener("click", function () {
      box.classList.toggle("img-box-clicked");
      imgBoxContainer.classList.toggle("img-box-container-clicked");
      toggleContainer.classList.toggle("toggle-container-clicked");
      imgBoxImage.classList.toggle("img-clicked");
      if (imgBoxMinus.textContent === "-") {
        imgBoxMinus.textContent = "+";
      } else {
        imgBoxMinus.textContent = "-";
      }
      toggleContainer2.classList.toggle("img-content-clicked");
    });
  });
}

incrementZIndex();

// .............................cursor hover
// .............................cursor hover
// .............................cursor hover
// .............................cursor hover
// .............................cursor hover

function cursorHover() {
  const cursorText = document.querySelector(".cursor-hover");
  const hoverable = document.querySelectorAll(".hoverable");

  document.addEventListener("mousemove", function (e) {
    let X = e.clientX - cursorText.clientWidth / 2;
    let Y = e.clientY - cursorText.clientHeight;
    gsap.to(cursorText, {
      x: X,
      y: Y,
      duration: 0.5,
    });
  });

  hoverable.forEach((item) => {
    item.addEventListener("mousemove", () => {
      cursorText.style.opacity = "1";
      cursorText.style.display = "inline-block";
      cursorText.innerText = item.dataset.trailerContent;
    });
    item.addEventListener("mouseout", () => {
      cursorText.style.display = "none";
      cursorText.style.opacity = "0";
    });
  });
}

cursorHover();
// .............................barba
// .............................barba
// .............................barba
// .............................barba
// .............................barba

barba.init({
  cache: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        window.scrollTo(0, 0);
        done();
      },

      async enter(data) {
        mainAnimation();
        incrementZIndex();
        cursorHover();
      },

      async once(data) {
        revealAnimation();
        mainAnimation();
      },
    },
  ],
});

pageTransition = () => {
  var timeline = gsap.timeline();
  timeline.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.1,
  });

  timeline.to("ul.transition li", {
    duration: 0.5,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: 0.1,
    delay: 0.5,
  });
};
revealAnimation = () => {
  // locomotivescroll.stop();

  const btn = document.querySelector(".btn-reveal");
  btn.addEventListener("click", function () {
    console.log(1);
    gsap.to(".btn-reveal", 1, {
      opacity: 0,
      y: -50,
      ease: Expo.easeInOut,
    });

    gsap.to(".text-wrapper > div", 1, {
      x: "500",
      ease: Expo.easeInOut,
      delay: 1,
      stagger: 0.1,
    });

    gsap.to(".text-wrapper", 3, {
      y: -400,
      scale: 4.5,
      rotate: -90,
      ease: Expo.easeInOut,
      delay: 1.5,
    });

    gsap.to(".text", 1, {
      opacity: 1,
      ease: Expo.easeInOut,
      delay: 3,
    });

    gsap.to(".text-wrapper > div", 4, {
      x: "-4000",
      ease: Expo.easeInOut,
      delay: 3.5,
      stagger: 0.05,
    });

    gsap.to(".text-container li", {
      duration: 0.5,
      scaleY: 0,
      transformOrigin: "bottom left",
      stagger: 0.1,
      delay: 6.5,
      onComplete: function () {
        const elementsToHide = document.querySelectorAll(
          ".btn-reveal, .text-wrapper > div, .text-wrapper, .text, .text-container"
        );
        elementsToHide.forEach((element) => {
          element.style.display = "none";
        });
        // locomotivescroll.start();
      },
    });
  });
};
mainAnimation = () => {
  const timeline = gsap.timeline();
  const gallery = document.getElementById("gallery-container");
  const btn = document.querySelector(".btn");
  const btnBgSlide = document.querySelector(".btn-bg-slide");
  const pictureLib = document.querySelector(".picture-lib");
  const pictures = document.querySelectorAll(".mg-box");
  let scrollX = 0;
  let scrollY = 0;

  let cursorScrollY = 0;

  // .............................gallery hover
  // .............................gallery hover
  // .............................gallery hover
  // .............................gallery hover
  // .............................gallery hover
  if (gallery)
    function onMouseMove(e) {
      scrollX = e.clientX;
      scrollY = e.clientY;
      const xDecimal = scrollX / window.innerWidth,
        yDecimal = scrollY / window.innerHeight;

      const maxX = gallery.offsetWidth - window.innerWidth,
        maxY = gallery.offsetHeight - window.innerHeight;

      const posX = maxX * xDecimal * -1,
        posY = maxY * yDecimal * -1;

      gsap.to(gallery, {
        x: posX,
        y: posY,
        ease: "power2.out",
      });
    }

  // .............................toggle mail img box
  // .............................toggle mail img box
  // .............................toggle mail img box
  // .............................toggle mail img box
  // .............................toggle mail img box

  if (pictureLib) {
    let currentLastIndex = 2;
    let zIndexPicture = 5;
    pictureLib.addEventListener("click", () => {
      currentLastIndex = (currentLastIndex + 1) % 3;
      pictures[currentLastIndex].style.zIndex = ++zIndexPicture;
    });
  }

  // Add the mousemove event listener
  window.addEventListener("mousemove", onMouseMove);

  timeline
    .to(".logo object", {
      duration: 0.7,
      y: 0,
      ease: "power2.out",
    })
    .to(".hero h4 div.overflow div.slide-in", {
      duration: 0.5,
      y: 0,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.5,
    })
    .to(".hero h1 div.overflow div.slide-in-in", {
      duration: 0.5,
      y: 0,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.5,
    })
    .to(".color", {
      duration: 0.3,
      ease: "power2.out",
      color: "rgb(var(--background))",
      rotation: -3,
    })
    .from(".check", {
      duration: 0.3,
      ease: "power2.out",
      scaleY: 0,
      transformOrigin: "center",
    })
    .to(".check", {
      scaleY: 1,
    })
    .set(".color-svg", {
      scale: 0,
      opacity: 1,
    })
    .to(".color-svg", {
      duration: 1,
      ease: Linear.easeNone,
      scale: 1,
      opacity: 1,
      rotation: 720,
    })
    .to(".color-svg", {
      duration: 2,
      ease: Linear.easeNone,
      repeat: -1,
      rotation: 360,
    });
};

delay = (n) => {
  n = n || 1100;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};
