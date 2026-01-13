export async function fetchIssues(payload) {
    const response = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch issues");
    }

    return response.json();
}
