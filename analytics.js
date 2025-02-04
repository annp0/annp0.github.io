async function fetchUserInfo() {
    try {
    const response = await fetch("https://analytics.phsnomy.workers.dev");
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

fetchUserInfo();
