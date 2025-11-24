# Nauka Liter i Sylab 🦉

Projekt edukacyjny dla dzieci (4+ lat) służący do nauki liter i sylab w formie zabawy.

## Funkcje

- **Nauka**: Przeglądanie kart z literami (małymi i dużymi) oraz sylabami.
- **Audio**: Lektor (synteza mowy) czytający litery i sylaby.
- **Quiz**: Testowanie wiedzy poprzez wybór odpowiedniej litery po usłyszeniu dźwięku.
- **System Nagród**: Zdobywanie gwiazdek za poprawne odpowiedzi i kupowanie wirtualnych naklejek.
- **Responsywność**: Działa na komputerach i telefonach.

## Uruchomienie (Lokalnie)

Wymagany Node.js (wersja 16+).

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom w trybie deweloperskim:
   ```bash
   npm run dev
   ```

3. Otwórz w przeglądarce adres wyświetlony w terminalu (zazwyczaj `http://localhost:5173`).

## Budowanie (Build)

Aby utworzyć wersję produkcyjną (pliki statyczne):

```bash
npm run build
```

Pliki pojawią się w folderze `dist/`.

## Technologie

- React
- Vite
- Web Speech API (Synteza mowy)
- LocalStorage (Zapisywanie postępów)
