const ALLOWED_ORIGINS = ["http://localhost:5501", "https://annan.eu.org"]

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

/**
 * Simple cookie parser: returns an object mapping cookie names to values.
 */
function parseCookies(cookieString) {
    const cookies = {};
    if (!cookieString) return cookies;
    cookieString.split(";").forEach((cookie) => {
        const [name, ...rest] = cookie.split("=");
        if (!name) return;
        cookies[name.trim()] = rest.join("=").trim();
    });
    return cookies;
}

/**
 * Main request handler.
 */
async function handleRequest(request) {
    // Get the IP address from Cloudflare's header.
    const ip = request.headers.get("CF-Connecting-IP") || "unknown-ip";
    const userAgent = request.headers.get("User-Agent") || "Unknown";

    const origin = request.headers.get("Origin"); // Get the request origin
    const isAllowed = ALLOWED_ORIGINS.includes(origin); // Check if it's allowed

    // Get geolocation information from Cloudflare.
    const cfData = request.cf || {};
    const location = {
        country: cfData.country || "Unknown Country",
        region: cfData.region || "Unknown Region",
        city: cfData.city || "Unknown City",
    };

    let body;
    try {
        body = await request.json(); 
    } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
    }

    const screenWidth = body.screenWidth;
    const screenHeight = body.screenHeight;

    // Parse cookies from the request.
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = parseCookies(cookieHeader);
    let cookieValue = cookies["id"]; // May be undefined if not present.
    let stableId = null;
    let setCookie = false; // Will be true if we need to set/update the cookie.

    // Helper: create a record to store.
    const createRecord = (id, ip) => ({
        location, // storing location snapshot
        timestamp: Date.now(),
        userAgent,
        screenWidth,
        screenHeight,
        stableId: id,
        ip
    });

    // --- CASE 1: Cookie exists ---
    if (cookieValue) {
        // Try to get the record using the cookie key.
        const cookieKey = `user:cookie:${cookieValue}`;
        const cookieRecordRaw = await USER_KV.get(cookieKey);
        if (cookieRecordRaw) {
        // Found a record via cookie mapping.
        const record = JSON.parse(cookieRecordRaw);
        stableId = record.stableId;
        // If the IP has changed from what we recorded, update the record.
        if (record.ip !== ip) {
            record.ip = ip;
            record.location = location;
            record.timestamp = Date.now();
            // Update both KV mappings.
            await USER_KV.put(cookieKey, JSON.stringify(record));
            await USER_KV.put(`user:ip:${ip}`, JSON.stringify(record));
        }
        } else {
        // No record was found via cookie mapping.
        // Try to locate a record using the IP.
        const ipKey = `user:ip:${ip}`;
        const ipRecordRaw = await USER_KV.get(ipKey);
        if (ipRecordRaw) {
            // Found a record via IP mapping: use that stable ID.
            const record = JSON.parse(ipRecordRaw);
            stableId = record.stableId;
            // Now create a cookie mapping so that next time the cookie is used.
            await USER_KV.put(cookieKey, JSON.stringify(record));
        } else {
            // Neither cookie nor IP found in KV: treat this as a new visitor.
            stableId = crypto.randomUUID();
            const record = createRecord(stableId, ip);
            await USER_KV.put(cookieKey, JSON.stringify(record));
            await USER_KV.put(`user:ip:${ip}`, JSON.stringify(record));
        }
        }
    } else {
        // --- CASE 2: No cookie in the request ---
        // Look up by IP.
        const ipKey = `user:ip:${ip}`;
        const ipRecordRaw = await USER_KV.get(ipKey);
        if (ipRecordRaw) {
        // Found a record by IP mapping.
        const record = JSON.parse(ipRecordRaw);
        stableId = record.stableId;
        // We want to "restore" the cookie so that future requests use the cookie mapping.
        cookieValue = stableId;
        setCookie = true;
        // Save the mapping from cookie value to record.
        await USER_KV.put(`user:cookie:${cookieValue}`, JSON.stringify(record));
        } else {
        // No record found by either cookie or IP.
        // Generate a new stable id.
        stableId = crypto.randomUUID();
        cookieValue = stableId;
        setCookie = true;
        const record = createRecord(stableId, ip);
        await USER_KV.put(`user:cookie:${cookieValue}`, JSON.stringify(record));
        await USER_KV.put(ipKey, JSON.stringify(record));
        }
    }

    // Build the JSON response.
    const jsonResponse = JSON.stringify({
        stableId,
        location,
        userAgent,
        screenWidth,
        screenHeight,
    });

    // Build the response with JSON content type.
    const response = new Response(jsonResponse, {
        headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": isAllowed ? origin : "null",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
        },

    });

    // If we need to set (or restore) the cookie, add it to the response.
    if (setCookie) {
        response.headers.append(
        "Set-Cookie",
        `id=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`
        );
    }

    return response;
}