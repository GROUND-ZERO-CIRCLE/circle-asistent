
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const apiKey = document.getElementById("apiKey").value;
    const message = input.value;
    if (!apiKey || !message) return;

    chat.innerHTML += `<div><strong>Ty:</strong> ${message}</div>`;
    input.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer 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`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "Jsi komunitní poradce projektu CIRCLE. Pomáháš kreativcům s cenotvorbou, postupy při zakázkách a sdílíš zkušenosti ostatních tvůrců. Odpovídej konkrétně, lidsky, bez omáčky." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Chyba při zpracování odpovědi.";
    chat.innerHTML += `<div><strong>CIRCLE Asistent:</strong> ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
}
