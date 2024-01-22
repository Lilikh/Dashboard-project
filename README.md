Projekt Dashboard


Introduktion
Detta projekt är en interaktiv dashboardapplikation som ger användaren möjlighet att hantera klocka och datum, redigera rubriken, spara och ta bort länkar, visa väder i närtid, det finns en Currency Converter och skriva snabba anteckningar.


Klocka och Datum
I denna del uppdateras klockan och datumet kontinuerligt utan att sidan behöver laddas om. Jag har implementerat detta genom att använda JavaScript-intervaller för att hålla klockan aktuell. En styrka i koden är dess kontinuerliga uppdatering, men jag överväger att optimera tidszonhanteringen för att göra det mer användarvänligt.


Redigerbar Rubrik
Användaren kan ändra rubriken genom att klicka på den. Ändringarna sparas direkt. Implementationen fungerar väl.


Hantering av Sparade Länkar
Användaren kan enkelt lägga till och ta bort sparade länkar. Jag har också integrerat hämtning av favicons från länkarna och visar dem på dashboarden. En styrka är visualiseringen av favicons, men jag letar efter sätt att förbättra prestanda vid hantering av ett stort antal länkar.


Vädret i Närtid
Jag använder browserns geolocation-api för att bestämma användarens plats och hämtar väderdata från ett öppet API. Användaren kan anpassa platsen. En styrka är den dynamiska platsanpassningen, men jag överväger att lägga till mer information om vädret.


Currency Converter
Den här delen möjliggör valutaomvandling och hämtar data från ett externt API. Användaren kan enkelt konvertera mellan olika valutor. En styrka är dess användarvänlighet, men jag överväger att lägga till möjligheten att spara och hämta tidigare konverteringshistorik.


Skrivbara Anteckningar
Användaren kan skriva snabba anteckningar i en stor textarea som sparas kontinuerligt. Det finns bara stöd för en yta för anteckningar för närvarande. En styrka är den enkla användningen, men jag överväger att lägga till stöd för flera anteckningar.


Randomiserad Bild från Unsplash API
Genom att klicka på en knapp hämtas en randomiserad bild från Unsplash API och används som bakgrund på dashboarden. För närvarande finns ingen möjlighet för användaren att ange ett specifikt sökord för att få en tematisk bild. Den slumpmässiga bilden ger en oväntad och varierande touch till dashboarden.


För att förbättra denna funktion överväger jag att lägga till stöd för användardefinierade sökord så att användarna kan anpassa bakgrunden efter sina intressen och önskemål. Detta skulle lägga till en extra dimension av personligt uttryck och flexibilitet till dashboarden.

Slutsats
Projektet kombinerar olika funktioner för att skapa en mångsidig dashboardapplikation. Det finns styrkor i implementationen, men jag är medveten om några områden som kan förbättras. Jag ser fram emot feedback från er för att kontinuerligt förbättra och utveckla projektet.


API keys
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
4.Dagens väder (finns in line 223 in main.js)
API keys: f02a383a62d8a84368b496f0af2d5e84
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
5- Currency Converter(finns api key in line 283 in main.js)
API key:ec24bd599c28e54f30b29bc4
⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
7. Slum ny background(finns api key in line 358 in main.js)
API key:8RcHvVomaFB6gi9ldkMOjaLui6isGkWpV8GI9pNvILU