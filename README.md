# OpenScanCloud API

Folgt...

## Installation

1. Repository klonen:
```bash
git clone https://github.com/[username]/openscancloud.git
cd openscancloud
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Umgebungsvariablen konfigurieren:
   - Erstelle eine `.env` Datei im Root-Verzeichnis
   - Füge folgende Konfiguration hinzu:
```properties
BASE_PATH=
HOST=localhost
PORT=8080
URL=http://localhost:8080
JWT_SECRET=dein-geheimer-schluessel
DEBUG=false
```

## Starten der Anwendung

1. Entwicklungsmodus starten:
```bash
npm run dev
```

2. Produktionsmodus starten:
```bash
npm start
```

## API Dokumentation

Die API-Dokumentation ist über Swagger UI verfügbar:

1. Starte den Server wie oben beschrieben
2. Öffne die Swagger UI unter: http://localhost:8080/docs (URL ggf. anpassen)

In der Swagger UI kannst du:
- Alle verfügbaren API-Endpunkte einsehen
- Die API-Methoden direkt testen
- Request/Response Schemas anzeigen lassen

## Tests

Um die Tests auszuführen:
```bash
npm test
```

