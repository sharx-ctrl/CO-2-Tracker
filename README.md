 Aufgabe: KlimaTransparenz-Globale C02-Emissionsplattform

Eine öffentlich zugängliche, hochperformante und sichere Webanwendung, die Transparenz über die jährlichen (fiktiven) CO2-Emissionen der weltweit größten Länder und Unternehmen schaffen soll. Entwickelt als Open-Source-Projekt für eine einführende, interdisziplinäre Non-Profit-Organisation im Bereich Klimawandel.

1. Kern-Features & Kriterien
Die Anwendung wurde streng nach den Vorgaben der Projekt-Fallstudie entwickelt, und erfüllt folgende Kriterien:
- Corporate Identity: Die Einbindung eines offiziellen Markenlogos und aussagekräftigen Titels im Header sowie als Favicon im Browser-Tab.
- Semantische Webstruktur: Barrierefreier Aufbau unter Verwendung morderner HTML5-Elemente (<header> mit globaler Navigation, <main>-Inhaltsbereich, <aside>-Sidebar und <footer> mit rechtlichen Hinweisen).
- Interkulturelle Barrierefreiheit (RTL): Volle Unterstützung für Rechts-nach-Links Schriftkulturen. Über ein integriertes Togglesystem spiegelt sich das gesamte Layout inkl. Menü-Positionen und Textflüssen) dank Tailwinds nativer RTL-Direktiven dynamisch um.
- Responsives Design: Mobile-First-Architektur, für Desktop-Monitore, Tablets und Smartphones. Navigationselemente komprimieren sich mobil automatisch; Datentabellen bleiben via Wischgeste (overflow-x-auto) voll lesbar.
- Interaktive CO2-Datentabelle: Clientseitige Echtzeit-Filterung über eine Freitext-Suche nach Ländern/Unternehmen, kombinierte Sektor-Filterung über die Sidebar, sowie dynamische Spalten-Sortierung (aufsteigend/absteigend).
- Robuste App-Sicherheit: Schutz vor Cross-Site-Scripting Attacken (XSS). Alle dynamischen User- und Daten-Inputs werden über 'textContent' maskiert, was das Ausführen von injiziertem Schadcode im DOM (Document Object Model) nahezu unmöglich macht.

2. Technische Infrastruktur

-> Build-Tool/Compiler: Vite (v6+) für schnelle Entwicklungszyklen und optimierte Production-Builds

-> CSS-Framework: Tailwind CSS (v4+) Utility-First Framework zur Umsetzung des responsive Designs ohne Performance loss

-> JS-Engine: Natives Vanilla JS (ES6+ Module) maximale Stabilität, Unabhängigkeit von Drittanbieter-Laufzeiten sowie sehr kleine Dateigröße.

-> Lokale Installation & Entwicklungsumgebung:
um auf dem lokalen Rechner zu starten (z.B. Powershell oder macOSZsh)
Repository klonen (git clone)
2. Terminal öffnen und (npm install) eintippen
3. Server starten über (npm run dev)

Vercel-link: https://vercel.com/new/bastian3/success?auto-redirect=true&developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=co-2-tracker-qh4lza0oi-bastian3.vercel.app&projectName=co-2-tracker&s=https%3A%2F%2Fgithub.com%2Fsharx-ctrl%2FCO-2-Tracker&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=RzeN_vskh5G37YnCp5ahN&teamSlug=bastian3

Quellen:
HTML/JS:
- https://developer.mozilla.org/de/docs/Web/HTML/How_to/Author_fast-loading_HTML_pages
- https://www.freecodecamp.org/
- https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion
- https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener

tailwindcss (Vite):
- https://tailwindcss.com/docs/installation/using-vite
- 

XSS:
- https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

