# 🍕 Bella Pizza - App di Esercitazione in React Native

Bella Pizza è un'applicazione mobile sviluppata in React Native con Expo a scopo didattico (ITS). L'obiettivo è simulare in modo completo e sicuro il flusso utente di una moderna pizzeria digitale, dalla navigazione all'autenticazione, fino alla gestione di menu e ordini.

![React Native Logo](https://raw.githubusercontent.com/xxrettilexx/myfirstapp/main/assets/images/react-logo.png)

---

## ✨ Funzionalità Principali

L'applicazione simula un flusso utente semplice ma completo per una pizzeria:

-   👤 **Autenticazione Sicura**: Una schermata di `Login` che protegge l'accesso all'area principale dell'app.
-   🛤️ **Navigazione Ibrida**: Utilizzo di navigazione Stack (per flussi gerarchici come Prodotti → Dettaglio) e Tab Bar (per le sezioni principali).
-   🚀 **Navigazione Veloce**: La Tab Bar inferiore permette di spostarsi rapidamente tra Home (Menu), Ordini e Profilo.
-   💳 **Pagamento**: Funzione "Paga Tutto" per saldare tutti gli ordini in sospeso.
-   📜 **Cronologia Ordini**: Visualizzazione dello storico degli ordini pagati.
-   ⭐ **Punti Fedeltà**: Accumulo di punti fedeltà ad ogni ordine pagato.
-   🔧 **Impostazioni**: Schermata per personalizzare l'aspetto dell'app (tema e dimensione del testo).
-   📱 **Navigazione a Schede (Tabs)**: Una `Bottom Tab Bar` per muoversi tra le sezioni principali: `Home`, `Ordini` e `Profilo`.
-   ➡️ **Passaggio di Parametri**: Abilità di inviare dati da una schermata all'altra (es. ID e nome della pizza).
-   🔐 **Gestione della Sessione**: Utilizzo del `reset` dello stack di navigazione per un'esperienza di login/logout sicura e senza interruzioni.

---

## 🛠️ Architettura e Concetti Chiave

L'app adotta un'architettura di navigazione a navigatori annidati gestita da React Navigation, incapsulata nel NavigationContainer radice.

### Struttura della Navigazione

L'app è avvolta da un `NavigationContainer` che gestisce due navigatori principali annidati:

1.  **`RootStack` (StackNavigator)**: Il navigatore principale, responsabile della gestione dei flussi critici:

    -   Login (la porta d'accesso).
    -   MainTabs (l'area principale).
    -   PizzaDetails (schermata di dettaglio con parametri).

2.  **`MainTabs` (Bottom Tab Navigator)**: Il navigatore annidato che gestisce le tre sezioni principali dell'utente autenticato:
    -   `Home`: Mostra il menu.
    -   `Cart`: Mostra il carrello.
    -   `Orders`: Mostra gli ordini.
    -   `Profile`: Contiene il pulsante di logout e la cronologia ordini e la sezione impostazioni.

### Gestione dello Stato (Context API)

L'applicazione utilizza l'API Context di React per la gestione dello stato globale, suddiviso in contesti specifici:

-   `AuthContext`: Gestisce l'autenticazione dell'utente e la persistenza della sessione.
-   `CartContext`: Gestisce gli elementi nel carrello.
-   `OrderContext`: Gestisce gli ordini in sospeso.
-   `ProfileContext`: Gestisce il profilo dell'utente, inclusi i punti fedeltà e la cronologia degli ordini.
-   `SettingsContext`: Gestisce le impostazioni dell'app, come tema e dimensione del testo.

---

## ✅ Best Practice

-   **Separazione dei Concetti**: Il codice è organizzato in cartelle specifiche per `screens`, `components`, `navigation`, `context`, `hooks`, `constants` e `data`.
-   **Componenti Riutilizzabili**: Creazione di componenti generici come `PizzaCard`, `RadioButton` e `Collapsible` per mantenere il codice DRY (Don't Repeat Yourself).
-   **Stili Globali**: Utilizzo di un file `theme.ts` per definire stili globali e colori, garantendo coerenza visiva.
-   **Context API per lo Stato Globale**: Suddivisione dello stato in contesti specifici per una migliore manutenibilità.
-   **TypeScript**: Utilizzo di TypeScript per una maggiore sicurezza del tipo e un migliore autocompletamento.
-   **Navigazione Tipizzata**: I navigatori e le rotte sono tipizzati per evitare errori di navigazione.

## ❌ Bad Practice

-   **Stili Inline**: Evitare di utilizzare stili inline direttamente nei componenti. Preferire l'uso di `StyleSheet.create` o stili globali.
-   **Logica di Business nelle Schermate**: La logica di business complessa dovrebbe essere estratta in custom hooks o servizi, non lasciata direttamente nei componenti delle schermate.
-   **Stato Monolitico**: Evitare di creare un unico grande contesto per l'intera applicazione. Suddividere lo stato in contesti più piccoli e specifici.
-   **Mancanza di Gestione degli Errori**: Implementare una gestione degli errori più robusta, ad esempio per le chiamate di rete o le operazioni di storage.
-   **Componenti Troppo Grandi**: Suddividere i componenti complessi in componenti più piccoli e gestibili.

---


