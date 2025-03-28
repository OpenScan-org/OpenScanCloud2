# Projektstruktur, Entwicklungsrichtlinien und Feature-Integration

## Überblick
Dieses Projekt basiert auf Node.js mit Express und nutzt Sequelize als ORM zur Datenbankverwaltung. Die API-Dokumentation erfolgt über Swagger, und die Sicherheits- sowie Validierungslogik wird über dedizierte Middlewares abgewickelt.

> **Wichtig:** Alle Code-Kommentare und Swagger-Dokumentationen müssen immer in **Englisch** verfasst sein.

## Kurzbeschreibung des Ablaufs
Ein Benutzer lädt über die API einen neuen Job hoch. Die API teilt diesen Job automatisch in passende Teilaufgaben ein. Registrierte Worker (z. B. Maschinen für die Fotogrammetrie) fragen regelmäßig bei der API nach verfügbaren Jobs und übernehmen diese zur Bearbeitung. Nach Abschluss laden sie die Ergebnisse hoch und aktualisieren den Jobstatus. Jobs können so gestaltet sein, dass sie von mehreren Workern nacheinander bearbeitet werden. Zusätzlich existiert eine administrative Route, über die Admin-Benutzer Benutzergruppen und weitere systemrelevante Einstellungen verwalten können.

## Ordnerstruktur und Zuständigkeiten

- **src/server.js**  
  Initialisiert die Express-Anwendung, konfiguriert globale Middlewares (CORS, JSON-Parser), bindet die API-Routen und die Swagger-Dokumentation ein, und stellt die Datenbankverbindung her.

- **src/routes/**  
  Enthält alle Routen-Definitionen. Jede Route bindet den entsprechenden Controller und notwendige Middlewares (z. B. für Validierung und Authentifizierung).  
  _Wichtig:_ Keine Parameterprüfungen oder Authentifizierungslogik im Controller – diese erfolgen ausschließlich in den Middlewares.

- **src/controllers/**  
  Verantwortlich für die Verarbeitung der Anfragen, indem sie die Geschäftslogik in den Services aufrufen.

- **src/services/**  
  Enthält die zentrale Geschäftslogik, die den Datenbankzugriff und die Verarbeitung der Modelle koordiniert.

- **src/models/**  
  Definiert die Datenbankmodelle mittels Sequelize, inklusive Validierungen, Beziehungen und Hooks (z. B. Passwort-Hashing).

- **src/middlewares/**  
  - **Validierungsmiddleware:** Nutzt `express-validator`, um Eingaben zu prüfen, bevor sie an den Controller weitergegeben werden.
  - **Authentifizierungsmiddleware:** Überprüft mittels JWT, ob der Benutzer authentifiziert ist.

- **src/config/**  
  Beinhaltet Konfigurationsdateien, z. B.:
  - **database.js:** Datenbankkonfiguration.
  - **swagger.js:** Zentrale Swagger-Konfiguration für die API-Dokumentation.

## API-Design und Best Practices

- **Schichten-Trennung:**  
  Jeder Layer (Route, Controller, Service, Modell) hat eine klar definierte Verantwortung.  
  **Nicht zulässig:** Die Überprüfung von POST-Parametern oder Authentifizierungsprüfungen im Controller.

- **Validierung:**  
  Alle Eingaben werden ausschließlich in der Validierungsmiddleware geprüft. Bei Fehlern erfolgt eine direkte Rückgabe einer 400-Antwort.

- **Authentifizierung:**  
  Die JWT-basierte Authentifizierung wird über eine zentrale Middleware realisiert und in den Routen eingebunden.

- **Swagger-Dokumentation:**  
  Jeder API-Endpunkt muss mit JSDoc-Kommentaren versehen werden, die den Swagger-Spezifikationen entsprechen. Dies gewährleistet eine stets aktuelle und nachvollziehbare API-Dokumentation.  
  _Hinweis:_ Alle Swagger-Dokumentationskommentare sind in Englisch zu verfassen.

## Vorgehensweise bei der Integration eines neuen Features

1. **Planung und Dokumentation:**  
   - Erstellen Sie einen Entwurf für das neue Feature und definieren Sie, welche Funktionalitäten, Datenbankfelder und Beziehungen benötigt werden.
   - Notieren Sie die zu implementierenden API-Endpunkte sowie erforderliche Parameter und Sicherheitsanforderungen.

2. **Routen erstellen/anpassen:**  
   - Legen Sie neue Routen in der entsprechenden Datei unter `src/routes/` an oder passen Sie bestehende Routen an.
   - Registrieren Sie neue Routen in `src/routes/index.js`, falls erforderlich.
   - Schreiben Sie zu jedem neuen oder geänderten Endpunkt passende Swagger-Kommentare (in Englisch), um die API-Dokumentation aktuell zu halten.

3. **Modelle erstellen/anpassen:**  
   - Erstellen Sie bei Bedarf ein neues Modell in `src/models/` oder erweitern Sie ein bestehendes Modell, um zusätzliche Datenfelder oder Beziehungen abzubilden.
   - Achten Sie darauf, notwendige Validierungen und assoziative Beziehungen zu definieren.

4. **Services erstellen/anpassen:**  
   - Implementieren oder erweitern Sie die Geschäftslogik im entsprechenden Service unter `src/services/`.  
   - Die Services sollten alle Kernprozesse und Datenbankinteraktionen zentralisieren, um die Controller schlank zu halten.

5. **Controller erstellen/anpassen:**  
   - Erstellen Sie einen neuen Controller oder erweitern Sie einen bestehenden unter `src/controllers/`, um die neuen Funktionalitäten anzubinden.
   - Die Controller sollten ausschließlich als Vermittler zwischen den Routen und den Services fungieren und keinerlei Validierungs- oder Authentifizierungslogik enthalten.

6. **Validierung und Authentifizierung:**  
   - Falls das Feature neue Eingabeparameter benötigt, erweitern Sie die Validierungsmiddleware in `src/middlewares/validation.middleware.js`.
   - Integrieren Sie die Authentifizierungsmiddleware (`AuthMiddleware.verifyToken`) in den Routen, falls das Feature geschützt werden muss.

## Zusammenfassung
Um ein neues Feature zu integrieren, gehen Sie wie folgt vor:
- **Planen und dokumentieren:** Definieren Sie die Anforderungen und API-Endpunkte.
- **Routen:** Erstellen oder passen Sie Routen an und dokumentieren Sie diese (Code-Kommentare und Swagger-Dokumentation in Englisch).
- **Modelle:** Erstellen oder erweitern Sie Modelle, um die Datenstruktur anzupassen.
- **Services:** Implementieren Sie die Geschäftslogik zentral in den Services.
- **Controller:** Binden Sie die neuen Funktionen in den Controllern ein, ohne Validierungs- oder Authentifizierungslogik zu implementieren.
- **Middlewares:** Nutzen Sie dedizierte Middlewares für Validierung und Authentifizierung, um eine klare Verantwortungsaufteilung zu gewährleisten.
