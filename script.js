
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const message = input.value;
    if (!message) return;

    chat.innerHTML += `<div><strong>Ty:</strong> ${message}</div>`;
    input.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `Jsi komunitní poradce projektu CIRCLE. Pomáháš kreativcům s cenotvorbou, postupy při zakázkách a sdílíš zkušenosti ostatních tvůrců. Odpovídej konkrétně, lidsky, bez omáčky.

Znalost 1:
Téma: Zálohy
Tvůrce: Studio ZERO Limits / Petr Konopásek
Ve Studio ZERO Limits účtujeme vždy 50 % z celkové domluvené ceny jako zálohu před zahájením prací. Tento systém platí jak pro nové, tak pro stálé klienty. U nových klientů je to zcela zásadní – bez zálohy nezačínáme. Vystavujeme běžnou fakturu, která slouží jako rezervační poplatek. Teprve po jejím uhrazení je projekt aktivně zařazen do produkce.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Omlouvám se, ale na tohle zatím nemám dost dat. Zkus to jinak nebo doplníme znalost.";
        chat.innerHTML += `<div><strong>CIRCLE Asistent:</strong> ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        chat.innerHTML += `<div><strong>CIRCLE Asistent:</strong> Došlo k chybě při zpracování. Zkontroluj připojení nebo API klíč.</div>`;
    }
}
