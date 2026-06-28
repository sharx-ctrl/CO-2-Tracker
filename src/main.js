// Importiert verarbeitete Tailwind-Stylsheets über die Vite-Pipeline
import './style.css'

// 1. Fiktive CO2-Emissionsdaten
const emittentenDaten = [
  { land: 'China', unternehmen: 'State Grid Corporation', co2: 87.3, sektor: 'Branche: Energie-Sektor' },
  { land: 'USA', unternehmen: 'ExxonMobil', co2: 420.5, sektor: 'Branche: Schwerindustrie' },
  { land: 'Indien', unternehmen: 'Coal India', co2: 60.1, sektor: 'Branche: Energie-Sektor' },
  { land: 'Saudi-Arabien', unternehmen: 'Saudi Aramco', co2: 750.4, sektor: 'Branche: Schwerindustrie' },
  { land: 'Deutschland', unternehmen: 'RWE AG', co2: 85.7, sektor: 'Branche: Energie-Sektor' },
  { land: 'Russland', unternehmen: 'Gazprom', co2: 77.0, sektor: 'Branche: Energie-Sektor' },
  { land: 'Iran', unternehmen: 'National Iranian Oil Co.', co2: 211.8, sektor: 'Branche: Schwerindustrie' },
  { land: 'Südkorea', unternehmen: 'POSCO', co2: 79.4, sektor: 'Branche: Schwerindustrie' },
  { land: 'Japan', unternehmen: 'Nippon Steel', co2: 92.1, sektor: 'Branche: Schwerindustrie' },
  { land: 'Großbritannien', unternehmen: 'BP plc', co2: 280.6, sektor: 'Branche: Energie-Sektor' },
  { land: 'Brasilien', unternehmen: 'Petrobras', co2: 150.2, sektor: 'Branche: Energie-Sektor' },
  { land: 'Kanada', unternehmen: 'Suncor Energy', co2: 120.5, sektor: 'Branche: Energie-Sektor' },
  { land: 'Australien', unternehmen: 'BHP Billiton', co2: 144.0, sektor: 'Branche:: Schwerindustrie' },
];

// Zustandsspeicher (State-Management) der Anwendung
let aktuelleDaten = [...emittentenDaten];
let aktuelleSortierung = { spalte: null, aufsteigend: true };
let ausgewaehlterSektor = 'Alle anzeigen';
let suchBegriff = '';

// DOM (Document-Object-Model)-Caching für optimierte Zugriffe
const appDiv = document.querySelector('#table-app');
const htmlRoot = document.querySelector('#html-root');
const toggleDirBtn = document.querySelector('#toggle-dir');
const asideLinks = document.querySelectorAll('aside a');

// Initialisiert das User Interface, baut das Suchfeld und die Tabbellenkopf-Struktur auf
function initialisiereApp() {
  if (!appDiv) return;

  // Sicheres statisches HTML-Grundgerüst der Applikation
  appDiv.innerHTML = `
    <div class="mb-4">
      <input type="text" id="search-input" placeholder="Nach Land oder Unternehmen filtern..." 
             class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
    </div>
    <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th id="sort-land" class="px-4 py-3 text-left rtl:text-right font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none">Land ↕</th>
            <th id="sort-unternehmen" class="px-4 py-3 text-left rtl:text-right font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none">Unternehmen ↕</th>
            <th id="sort-co2" class="px-4 py-3 text-left rtl:text-right font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 select-none">CO2 (Mio. t) ↕</th>
          </tr>
        </thead>
        <tbody id="table-body" class="divide-y divide-gray-200 bg-white"></tbody>
      </table>
    </div>
  `;


  // Event-Listener für das Suchfeld (Echtzeitfilterung bei Eingabe)
  document.querySelector('#search-input').addEventListener('input', (e) => {
    suchBegriff = e.target.value;
    verarbeiteUndRendere();
  });

   // Event-Listener für interaktive Tabellensortierung bei Klick auf die Spaltenköpfe
  document.querySelector('#sort-land').addEventListener('click', () => sortiere('land'));
  document.querySelector('#sort-unternehmen').addEventListener('click', () => sortiere('unternehmen'));
  document.querySelector('#sort-co2').addEventListener('click', () => sortiere('co2'));

  // Erstmalige Berechnung und Darstellung der Daten 
  verarbeiteUndRendere();
}

// Zentrale Business-Logik: Verarbeitet Filterung und Sortierung basierend auf Anwendungsstatus
function verarbeiteUndRendere() {
  const bereinigterSektor = ausgewaehlterSektor.trim();
  const istTop10 = bereinigterSektor === 'Top 10 Emittenten';

  // Filter-Logik kombiniert Freitextsuche und Sektorenauswahl
  aktuelleDaten = emittentenDaten.filter(item => {
    const passtSektor = bereinigterSektor === 'Alle anzeigen' || 
                        istTop10 || 
                        item.sektor === bereinigterSektor;
                        
    const passtSuche = item.land.toLowerCase().includes(suchBegriff.toLowerCase()) || 
                       item.unternehmen.toLowerCase().includes(suchBegriff.toLowerCase());
                       
    return passtSektor && passtSuche;
  });

  // 2. Spezial-Filterung für die Top 10 Emittenten
  if (istTop10) {
    aktuelleDaten.sort((a, b) => b.co2 - a.co2);
    aktuelleDaten = aktuelleDaten.slice(0, 10);
  } 
  // 3. Generische Sorter-Algorithmen für Strings (also Länder) und Zahlen (also CO2-Emissionen)
  else if (aktuelleSortierung.spalte) {
    aktuelleDaten.sort((a, b) => {
      let wertA = a[aktuelleSortierung.spalte];
      let wertB = b[aktuelleSortierung.spalte];
      if (typeof wertA === 'string') {
        return aktuelleSortierung.aufsteigend ? wertA.localeCompare(wertB) : wertB.localeCompare(wertA);
      } else {
        return aktuelleSortierung.aufsteigend ? wertA - wertB : wertB - wertA;
      }
    });
  }

  rendereTabelle();
}

// Erstellt DOM-Knoten und befüllt diese hochsicher gegen Cross-Site-Scripting
function rendereTabelle() {
  const tbody = document.querySelector('#table-body');
  if (!tbody) return;
  tbody.innerHTML = ''; // Leert vorherige Render-Zyklen

  // Fallback, falls Filter keine Übereinstimmung liefern
  if (aktuelleDaten.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="px-4 py-8 text-center text-gray-500 italic">Keine Daten gefunden</td></tr>`;
    return;
  }

  // Generiert Tabellenezeilen programmgesteuert
  aktuelleDaten.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50 transition';

    // Sicherheit-Architektur
    // Durch Nutzung von 'document.createElement' kombiniert mit 'textContent' wird sichergestellt, dass alle Daten als reiner Text behandelt werden und somit keine schädlichen Skripte ausgeführt werden können (Cross-Site-Scripting-Schutz).
    // injiuierter Schadcode (<script>maliciousCode()</script>) würde als harmloser Text dargestellt und nicht als ausführbarer Code interpretiert werden.
  
    const tdLand = document.createElement('td');
    tdLand.className = 'px-4 py-3 text-gray-900 font-medium';
    tdLand.textContent = item.land;

    const tdUnternehmen = document.createElement('td');
    tdUnternehmen.className = 'px-4 py-3 text-gray-600';
    tdUnternehmen.textContent = item.unternehmen;

    const tdCo2 = document.createElement('td');
    tdCo2.className = 'px-4 py-3 text-gray-600 tabular-nums';
    // .toLocaleString() formatiert die CO2-Zahl länderspzeifisch (bspw. Komma für deutsche Leser)
    tdCo2.textContent = item.co2.toLocaleString('de-DE') + ' Mio. t';

    // Nodes im DOM-Baum anordnen
    tr.appendChild(tdLand);
    tr.appendChild(tdUnternehmen);
    tr.appendChild(tdCo2);
    tbody.appendChild(tr);
  });
}

//Togglesystem für die Sortierrichtung (Aufsteigend/Absteigend) bei wiederholtem Klick auf die gleiche Spalte
function sortiere(spalte) {
  if (aktuelleSortierung.spalte === spalte) {
    aktuelleSortierung.aufsteigend = !aktuelleSortierung.aufsteigend;
  } else {
    aktuelleSortierung.spalte = spalte;
    aktuelleSortierung.aufsteigend = true;
  }
  verarbeiteUndRendere();
}

// .textContent.trim(), um Zeilenumbrüche im HTML abzufangen
asideLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    asideLinks.forEach(l => l.classList.remove('text-emerald-600', 'font-medium'));
    link.classList.add('text-emerald-600', 'font-medium');
    ausgewaehlterSektor = link.textContent.trim();
    verarbeiteUndRendere();
  });
});

// Manipuliert das globale HTML 'dir' Attribut zur Echtzeit-Spiegelung der Webseite
if (toggleDirBtn && htmlRoot) {
  toggleDirBtn.addEventListener('click', () => {
    const aktuelleRichtung = htmlRoot.getAttribute('dir');
    if (aktuelleRichtung === 'ltr') {
      htmlRoot.setAttribute('dir', 'rtl');
      toggleDirBtn.textContent = 'Schriftrichtung: RTL (Arabisch)';
    } else {
      htmlRoot.setAttribute('dir', 'ltr');
      toggleDirBtn.textContent = 'Schriftrichtung: LTR (Deutsch)';
    }
  });
}

// Initialisiert den Start der Anwendung beim Laden des Browsers
initialisiereApp();