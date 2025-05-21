
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const message = input.value;
    if (!message) return;

    chat.innerHTML += `<div><strong>Ty:</strong> ${message}</div>`;
    input.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer DOPLŇTE_SVŮJ_KLÍČ",
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
