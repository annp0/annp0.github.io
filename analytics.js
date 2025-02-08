let interact = false

function act() {
    if (!interact) {
        fetchUserInfo()
    }
    interact = true
}

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

async function fetchUserInfo() {
    try {
    const response = await fetch("https://tracker-kv.phsnomy.workers.dev", 
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
          'Origin': 'http://localhost:5501', // Add your website's origin for CORS
        },
        body: JSON.stringify({
          screenWidth: window.innerWidth,  // or any dynamic screen width
          screenHeight: window.innerHeight  // or any dynamic screen height
        })
    }
    );
    const data = await response.json();
    document.getElementById("user-id").innerText = data.stableId;
    document.getElementById("user-location").innerText = 
        `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    document.getElementById("status").style.color = "green";
    } catch (error) {
    console.error("Failed to fetch user info:", error);
    document.getElementById("user-id").innerText = "Error";
    document.getElementById("user-location").innerText = "Unknown";
    }
}

document.addEventListener('mousemove', act());
document.addEventListener('scroll', act());
