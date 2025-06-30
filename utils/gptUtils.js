import OpenAI from "openai";
import {
    addAssistantMessage,
    addUserMessage,
    getConversation,
    getLastSystemMessage,
} from "./conversationHistoryUtil";
import { setSchedule } from "./scheduleUtils";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

const openai = new OpenAI({
    apiKey: "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",
});

const systemPrompt = `DU BIST EIN AKADEMISCHER STUDIENPLAN-EXPERTE SPEZIALISIERT AUF DEN STUDIENGANG **INTERNATIONALES INFORMATIONSMANAGEMENT** (IIM). DEINE AUFGABE IST ES, FÜR STUDIERENDE EINEN OPTIMALEN STUNDENPLAN ZU GENERIEREN. Die Antwort soll strukturiert und übersichtlich im Markdown-Format erfolgen.

---

## 🎓 RELEVANTE INFORMATIONEN

- Semester (z.B. 3)
- Studienvariante (z.B. IIM, IKS, DRIKK)
- Großes Nebenfach (z.B. BWL, Medien, Informationstechnologie)
- Kleines Nebenfach (z.B. Musik, BWL, Psychologie)
- Ziel: ca. 30 Leistungspunkte (LP) pro Semester

---

## ZULÄSSIGE OPTIONEN

**Studienvarianten:**
- IIM (Internationales Informationsmanagement)
- IKS (Informations- und Kommunikationssysteme)
- LIN (Linguistik)
- GIM (Globales Informationsmanagement)
- DISO (Digitale Sozialwissenschaften)
- DRIKK (Deutsch-Russisches Interkulturelles Kommunikationsmanagement)

**Große Nebenfächer:**
- BWL
- Medien
- Informationstechnologie
- Psychologie
- Philosophie
- Übersetzen
- Literatur
- Geschichte
- Musik
- Politik
- Technik
- Soziologie

**Kleine Nebenfächer:**
- BWL
- Medien
- Informationstechnologie
- Psychologie
- Philosophie
- Übersetzen
- Literatur
- Geschichte
- Musik
- Politik
- Technik
- Soziologie

Nur Kombinationen aus diesen Listen sind gültig.

---

## DEINE AUFGABEN

1. **Ermittle** die relevanten Module für die gegebene Studienkonfiguration (inkl. Pflicht-/Wahlpflichtmodule)
2. **Baue** einen konfliktfreien Stundenplan für Mo–Fr (Zeitslots: 08:30–10, 10–12, 12–14, 14–16, 16–18)
3. **Priorisiere** Pflichtmodule und kritische Module für Studienfortschritt
4. **Beachte** Modulzeiten, Überschneidungen und die Zielanzahl an LP
5. **Liefere** eine klar strukturierte Darstellung im Markdown-Format
6. **Reagiere dynamisch** auf Nutzerwünsche (z.B. keine Frühveranstaltungen, mehr freie Tage)

---

## OUTPUTFORMATE

1. **Stundenplan Mo–Fr** (Liste für jeden Wochentag: Tag, Zeit, Modulname)
2. **Modullegende:** ECTS, Typ (Pflicht/Wahl), kurze Beschreibung (Bitte als Markdown-Liste formatieren)
3. **Optional:** JSON-Version des Stundenplans für maschinelle Weiterverarbeitung
4. **Abschlussfrage:** „Möchtest du etwas ändern?“
**Beachte, dass der Plan auf einem Smartphone lesbar sein muss. Verwende Markdown-Formatierung für bessere Lesbarkeit.**

---

## UMGANG MIT NUTZERWÜNSCHEN

Wenn der Nutzer Änderungswünsche äußert, erkenne die Intention und passe den Plan sinnvoll an:
- Frühtermine vermeiden
- Kompakte Studientage ermöglichen
- Sprach-/Themenpräferenzen berücksichtigen
Erkläre kurz, warum Änderungen möglich oder nicht möglich waren.

---

## FEHLERHANDLING

Wenn ungültige Eingaben vorkommen (z. B. nicht existierendes Nebenfach):
- Weise auf den Fehler hin
- Biete gültige Alternativen an
- Schlage eine korrigierte Konfiguration vor

---

## CHAIN OF THOUGHTS (interne Arbeitsweise)

1. Understand: Lese Studienvariante, Semester, Nebenfächer aus dem App-State
2. Basics: Ermittle empfohlene Module nach Variante/Nebenfächern/Semester
3. Break down: Sortiere Pflicht/Wahlpflicht/Optionalmodule
4. Analyze: Prüfe Modulzeiten und erkenne Konflikte
5. Build: Erzeuge einen optimalen Plan mit logischer Verteilung über die Woche
6. Edge Cases: Behandle Überschneidungen, Ausfälle, Blocktermine
7. Final Answer: Gib klaren, praktikablen Wochenplan in Markdown zurück

---

## VERMEIDE UNBEDINGT

- Doppelte Module oder Zeitüberschneidungen
- Zufällige oder erfundene Modulpläne
- Hartcodierte Zeiten ohne Abgleich mit Modulzeiten
- Wiederholtes Nachfragen bereits bekannter Informationen
- Vage oder unbrauchbare Antworten
`;

const generateTimetablePrompt = `DU BIST EIN FORMATIERUNGSASSISTENT. 
DEINE EINZIGE AUFGABE IST ES, EINEN STUNDENPLAN ALS SAUBERES JSON ZURÜCKZUGEBEN. 
DIE EINGABE IST EINE TEXTBESCHREIBUNG DES STUNDENPLANS (z.B. im Markdown-Format). 
GIB **NUR** EIN JSON-OBJEKT ZURÜCK – KEINEN ERKLÄRENDEN TEXT.
### HINWEISE:
- KEINE weiteren Kommentare oder Erklärungen
- ZEITEN bitte im Format "HH:MM"
- ALLE Module aus dem Plan einbauen
- FELDER vollständig und konsistent füllen
`;

export const getChatGptResponse = async () => {
    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        instructions: systemPrompt,
        input: getConversation(),
        text: {
            format: {
                type: "text",
            },
        },
        tools: [
            {
                type: "file_search",
                vector_store_ids: ["vs_6831e5fb79748191a8a3d55ceff0cd62"],
            },
        ],
        temperature: 1,
        max_output_tokens: 2048,
        top_p: 1,
        store: true,
    });

    if (response) {
        let role = response.output[0].role;
        let text = response.output_text;
        addAssistantMessage(text);
        //console.log(getConversation());
        return;
    }

    throw new Error("No response from OpenAI");
};

export const generateTimetable = async (userId) => {
    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
            getLastSystemMessage(),
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: generateTimetablePrompt,
                    },
                ],
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "wochenstundenplan",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        stundenplan: {
                            type: "array",
                            description:
                                "Eine Liste der Stunden für jeden Wochentag.",
                            items: {
                                type: "object",
                                properties: {
                                    wochentag: {
                                        type: "string",
                                        description: "Der Tag der Woche.",
                                    },
                                    startzeit: {
                                        type: "string",
                                        description:
                                            "Die Startzeit des Kurses im Format HH:MM.",
                                    },
                                    endzeit: {
                                        type: "string",
                                        description:
                                            "Die Endzeit des Kurses im Format HH:MM.",
                                    },
                                    name: {
                                        type: "string",
                                        description: "Der Name des Kurses.",
                                    },
                                    lp: {
                                        type: "string",
                                        description:
                                            "Anzahl der Leistungspunkte des Kurses.",
                                    },
                                },
                                required: [
                                    "wochentag",
                                    "startzeit",
                                    "endzeit",
                                    "name",
                                    "lp",
                                ],
                                additionalProperties: false,
                            },
                        },
                    },
                    required: ["stundenplan"],
                    additionalProperties: false,
                },
            },
        },
        reasoning: {},
        tools: [],
        temperature: 1,
        max_output_tokens: 2048,
        top_p: 1,
        store: true,
    });

    if (response) {
        let text = response.output_text;
        let parsed = JSON.parse(text);
        //addAssistantMessage(text);
        console.log(parsed.stundenplan);

        const { error } = await supabase
            .from("profile")
            .update({ schedule: parsed })
            .eq("id", userId);

        addAssistantMessage(
            "Dein Stundenplan wurde erfolgreich erstellt!\nDu wirst in wenigen Sekunden zu deinem Stundenplan weitergeleitet."
        );

        setTimeout(() => {
            router.navigate("/(tabs)/(study)/planner");
        }, 5000);

        return;
    }
};
