# 🍕 Bella Pizza - App di Esercitazione in React Native

Benvenuto nel progetto **Pizzeria ITS**! Questa è un'applicazione mobile creata come esercitazione per il corso ITS, focalizzata sull'apprendimento dei concetti fondamentali di React Native e della navigazione mobile.

![React Native Logo](https://raw.githubusercontent.com/xxrettilexx/myfirstapp/main/assets/images/react-logo.png)

---

## ✨ Funzionalità Principali

L'applicazione simula un flusso utente semplice ma completo per una pizzeria:

-   👤 **Flusso di Autenticazione**: Una schermata di `Login` che protegge l'accesso all'area principale dell'app.
-   📚 **Navigazione a Stack**: Gestisce la navigazione gerarchica tra le schermate, ad esempio dalla lista prodotti al dettaglio.
-   📱 **Navigazione a Schede (Tabs)**: Una `Bottom Tab Bar` per muoversi tra le sezioni principali: `Home`, `Ordini` e `Profilo`.
-   ➡️ **Passaggio di Parametri**: Abilità di inviare dati da una schermata all'altra (es. ID e nome della pizza).
-   🔐 **Gestione della Sessione**: Utilizzo del `reset` dello stack di navigazione per un'esperienza di login/logout sicura e senza interruzioni.

---

## 🛠️ Architettura e Concetti Chiave

Il progetto è stato costruito seguendo fedelmente le lezioni del corso, in particolare l'architettura manuale di **React Navigation** come spiegato nelle slide del "Giorno 3".

### Struttura della Navigazione

L'app è avvolta da un `NavigationContainer` che gestisce due navigatori principali annidati:

1.  **`RootStack` (StackNavigator)**: Gestisce il flusso principale.
    -   `Login`: Schermata iniziale.
    -   `MainTabs`: Un'unica schermata che contiene al suo interno il Tab Navigator.
    -   `PizzaDetails`: Schermata di dettaglio accessibile dall'app.

    ```tsx
    // navigation/RootStack.tsx
    export type RootStackParamList = {
      Login: undefined;
      MainTabs: undefined;
      PizzaDetails: { id: string; name: string };
    };

    const Stack = createNativeStackNavigator<RootStackParamList>();

    export default function RootStack() {
      return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PizzaDetails" component={PizzaDetailsScreen} />
        </Stack.Navigator>
      );
    }
    ```

2.  **`MainTabs` (TabNavigator)**: Gestisce le schede principali.
    -   `Home`: Mostra il menu.
    -   `Orders`: Mostra gli ordini.
    -   `Profile`: Contiene il pulsante di logout.

    ```tsx
    // navigation/MainTabs.tsx
    const Tab = createBottomTabNavigator<TabsParamList>();

    export default function MainTabs() {
      return (
        <Tab.Navigator /* ... */ >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      );
    }
    ```

### Gestione del Flusso di Login/Logout

Per garantire che l'utente non possa tornare alla schermata di login dopo essersi autenticato (e viceversa), utilizziamo l'azione `reset` della navigazione.

```tsx
// screens/LoginScreen.tsx -> Al login
navigation.reset({
  index: 0,
  routes: [{ name: 'MainTabs' }],
});

// screens/ProfileScreen.tsx -> Al logout
navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  })
);
```

---

## 🚀 Come Avviare il Progetto

Segui questi passaggi per eseguire l'app in locale.

1.  **Clona il Repository**
    ```bash
    git clone [https://github.com/XxRettilexX/myFirstApp.git](https://github.com/XxRettilexX/myFirstApp.git)
    cd myfirstapp
    ```

2.  **Installa le Dipendenze**
    Assicurati di avere Node.js installato, poi esegui:
    ```bash
    npm install
    ```

3.  **Avvia Expo**
    ```bash
    npx expo start
    ```
    -   Scansiona il QR code con l'app **Expo Go** sul tuo smartphone (iOS o Android).
    -   Oppure, premi `a` per aprire in un emulatore Android o `i` per un simulatore iOS.

---

## 💻 Stack Tecnologico

-   **Framework**: React Native con Expo
-   **Linguaggio**: TypeScript
-   **Navigazione**: React Navigation (`@react-navigation/native-stack`, `@react-navigation/bottom-tabs`)
-   **Icone**: `@expo/vector-icons`

Fatto con ❤️ durante il corso ITS.