<!-- $theme: default -->
<!-- $size: 16:9 -->
<!-- $width: 22in -->
<!-- $height: 22in -->


Projektdokumentation 
==

#### Michael Ajala 

###### Ausbildungsberuf: Fachinformatiker für Anwendungsentwicklung
### Entwicklung einer CMS Erweiterung

---
# ![](https://github.com/m1cl/maya-calendar/blob/master/maya_logo.png)
---
Inhaltsverzeichnis
==
#### 1. Projektbeschreibung
- Projektumfeld
- Ist-Analyse
- Soll-Konzept
- Projektabrenzung

#### 2. Projektplanung
- Personalplanung
- Erfassung der verwendeten Software
- Zeitlicher Projektplan
## 3. Projektdurchführung
- Erstellung des Plugin-templates
- Ordnerstruktur festlegen
- Menü-Reiter im Dashboard erstellen
- Erstellung des Dashboards
- Erstellung des Kalenders
## 4. Testphase
## 5. Projektabschluss
---
## 1. Projektbeschreibung
---
#### Projektumfeld
 [NLP-Zentrum-Berlin](http://www.nlp-zentrum-berlin.de) ist ein Kleinunternehmen mit 10 Mitarbeitern, darunter 9 NLP-Trainer und eine Bürokauffrau. Während meines Praktikums bei NLP-Zentrum-Berlin bestand meine Aufgabe darin, Kunden bei der Erstellung ihrer Internetpräsenz behilflich zu sein. Dazu gehörte unter anderem die Installation und Verwaltung von Content Management Systmen.

---
#### Ist-Analyse

Viele Kunden von NLP-Zentrum-Berlin bieten Siminare an und möchte sie auf ihrer Internetseite anbieten. In der Regel ist Wordpress die erste Wahl und kann durch Plugins erweitert werden. Auf der Suche nach einem passenden Event Calendar musste ich feststellen, dass die meisten Plugins nicht für den End-User konzipiert wurden und dementsprechend eine schlechte User Experience aufwiesen. 

___
#### Soll-Analyse

Deshalb kam mir die Idee ein Plugin zu entwerfen, dass es Menschen ermöglicht, ihre Veranstaltungen und Kunden zu verwalten ohne dafür vorher in das Handbuch gucken zu müssen. Die Oberfläche sollte intuitiv und übersichtlich sein. Jeder Schaltfläche soll eindeutig und einfach zu bedienen sein. Zudem sollte die Oberfläche anschaulich wirken, sowohl im Front-End als auch im Back-End.

---
#### Projektabrenzung
Das Hauptaugenmerk soll zunächst nur auf das Design und die User Experience gelegt werden.

---
 ## 2. Projektplanung
 
 ---
 #### Personalplanung
Ansprechpartner bei Fragen:
- Michael Ajala (Junior Front-End Developer)

Ansprechpartner bei Fragen zur Projektdurchführung:
- Michael Ajala (Junior Front-End Develper)

Ansprechpartner bei Datenschutz:
- Michael Ajala (Junior Front-End Developer)

---
#### Erfassung der verwendeten Software
Wie schon erwähnt wird die Open Source Software Wordpress verwendet, sodass es keine Kosten für Lizensen enstehen. Zur Erstellung des Quellcodes wird auch Open Source Software verwendet.  Hier eine Liste der verwendeten Software: 
|Software|Beschreibung|
|:--|--:|
|Wordpress|Freies Web-Content-Management-System|
|Vim|Text Editor für Unix, das im Terminal ausgeführt werden kann|
|MariaDB| Open Source Datenbankverwaltungssystem|
|MyCli| CLI Client für MySQL und MariaDB|
|Google Chrome| kostenloser Web Browser|
|Git| Programm zur Versionskontrolle|




---
#### Zeitlicher Projektplan
|Projekterfassung| 4 h|
|:--|--:|
|Ist-Analyse|2h|
|Soll-Analyse|2h|

|Planung und Entwurf	| 50 h|
|:--|--:|
|Einarbeitung in die Wordpress-Plugin Entwicklung|4h|
|Einrichtung der Testumgebung| 1h|
|Datenbankstruktur erstellen|	4h|
|Erstellung des Dashboards| 8h|
|Erstellung des Kalenders| 8h|
|Fehlerbehebung|10h|
|Sicherheitstests|10h|
|Dokumentation|13h|


|Realisierung	| 4 h|
|:--|--:|
|Doployment|2h|
|Qualitätssicherheit|2h|

---
## 3. Projektdurchführung

---
## Erstellung des Plugin-templates
Damit Wordpress das Plugin erkennt, wird zunächst eine PHP-Datei mit einem Header erstellt. 
```php
* ./maya-calendar.php
* 
*  @link              http://ajala.io
 * @since             1.0.0
 * @package           Maya_Calendar
 *
 * @wordpress-plugin
 * Plugin Name:       Maya Calendar
 * Plugin URI:        http://ajala.io/maya-calendar
 * Description:       Manage your event
 * Version:           1.0.0
 * Author:            Michael Ajala
 * Author URI:        http://ajala.io/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       maya-calendar
 * Domain Path:       /languages
 */
```
Diese Datei wird in das Root-Verzeichnis des Plugins gesichtert. Wordpress schaut nach, ob sich Dateien findet lassen, die mit einem Header versehen sind und registriert sie dann als Plugin. Im Admin Bereich von Wordpress wird dann das Plugin angezeigt
# ![](/home/m1cl/Dokumente/projekt/wordpress-plugin-start.png)

---
## Ordnerstruktur festlegen
Als nächstes wird die die Ornderstruktur festgelegt. Damit man die Übersicht behält, wird die Applikation in zwei Bereiche unterteilt. Im admin Ordner befinden sich alle Dateien, die nicht von der Öffentlichkeit gesehen werden sollen. Im public Bereich befindet sich der Kalender, der später auf der Internetseite platziert wird.
```bash
maya-calendar/
├── admin
│   ├── assets
│   ├── css
│   └── js
└── public
    ├── assets
    ├── css
    └── js

```

---
## Menü-Reiter im Dashboard erstellen
Damit ein Menü in Wordpress angezeigt werden kann, muss man Wordpress sagen, was es tun soll. Wordpress verfügt über Funktionen, die es möglichen mit Wordpress zu interagieren. Mit diesen sogenannten Hooks lässt sich z.B. das Dashboard modifieren. 
Zunächst schreibt man eine Funktion, in der man den Namen des Menü-Reiters, die Datei, die angezeigt werden soll und dem Menü einen eindeutigen Bezeichnung gibt.
```php
public function add_options_page() {
        $this->plugin_screen_hook_suffix = add_options_page(
            __('Maya Calendar Settings', 'maya-calendar'),
            __('Maya Calendar', 'maya-calendar'),
            'manage_options',
            $this->plugin_name,
            array($this, 'display_options_page')
        );
 }
```
Und anschließend übergibt man die Funktion an die Hook weiter: 
```php
$this->loader->add_action('admin_menu', $plugin_admin, 'add_options_page');
```

---
## Erstellung des Dashboards
Für die Erstellung des Dashboards habe ich mich für React.js entschieden, einem Framework von Facebook, womit sich schnelle UIs erstellen lassen. Zunächst wird eine Funktion erstellt, die auf eine Datei zeigt, die nachher in Wordpress angezeigt wird:
```php
public function display_options_page() {
	include_once 'admin/index.html';
    }
```
In der index.html Datei befinden sich zwei DOM Element: 
```html
 <body>
       <div id="root">
       </div>
  </body>
```
Das div Element bekommt eine id, damit React auf das Element zugreifen kann und das Dashboard rendert. Im nächsten Schritt wird die Dashboard Komponente erstellt:
```javascript
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DatePicker from './DatePicker';
import TableComponent from './TableComponent';
import TextField from './TextFieldComponent';
import Paper from 'material-ui/Paper';
import ToggleableEventButton from './ToggleableEventButton';
import BookingTableComponent from './BookingTableComponent';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    marginRight: 20,
    fontWeight: 400,}
  },
  slide: {
    padding: 10,
    width: '90%',
  },
};

export default class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }
  handleChange = (z) => {
    this.setState({
      slideIndex: z,
    });
  };
  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Dashboard" value={0} />
          <Tab label="Create an Event" value={1} />
          <Tab label="Options" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
              Bookings
            <h2 style={styles.headline}></h2>
				<BookingTableComponent />
          </div>
          <div style={styles.slide}>
              Events
			<TableComponent />
			<ToggleableEventButton />
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
```
Danach wird eine Javascript Datei erstellt, die auf die index.html zugreift und das Dashboard in das div Element rendert:
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DashboardComponent from './components/DashboardComponent';

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <DashboardComponent />
    </MuiThemeProvider>
);
function run(){
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
const loadedStates = ['complete', 'loaded', 'interactive'];

if(loadedStates.includes(document.readyState) && document.body) {
    run();
}else {
    window.addEventListener('DOMContentLoaded', run, false);
}
```
Die letzten 5 Zeilen sind dafür da, um sicher zu gehen, dass alle JavaScript und CSS Dateien vom Browser geladen wurden, bevor das Dashboard gerendert wird. Somit ist gewährleistet, dass das Dashboard ordnungsgemäß angezeigt wird. Das Resultat sieht wie folgt aus:

# ![](/home/m1cl/Dokumente/projekt/wordpress-create-event.png)


---
## Erstellung des Kalenders 
Wie schon bei Dashboard wird zunächst auf die Datei verwiesen, die Wordpress anzeigen soll: 
```php
public function display_maya_calendar() {
	include_once 'public/index.html';
    }
```
Danach fügt man die 2 DOM-Elemente in die index.html Datei ein:
```html
 <body>
       <div id="root">
       </div>
  </body>
```
Nun ist die Kalender-Komponente dran: 
```javascript
import Calendar from 'rc-calendar';
import React from 'react';
import ReactDOM from 'react-dom';
import 'rc-calendar/assets/index.css';
import 'react-popover';
import 'rc-select/assets/index.css';
import Select from 'rc-select';



import moment from 'moment';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('de-de').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function onSelect(value) {
  console.log('select', value.format(format));
}
export default class MayaCalendar extends React.Component {
    constructor(props){
        super(props);
    };
 render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <FullCalendar
          style={{ margin: 10 }}
          fullscreen={false}
          onSelect={onSelect}
          defaultValue={now}
        />
      </div>
    );
  }
}
```
Oben wird das Format mit const format definiert, in welches der Kalender die Daten verarbeiten soll. Imnächsten Schritt wird mit Hilfe der Helfer Klasse moment das heutige Datum ermittelt und in die gültige Weltzeit umgewandelt. Zudem wird bei const defaultCalendarValue der Standardwert des Kalenders definiert, der bei jedem Aufruf angezeigt werden soll. 
Das ganze sieht dann so aus:
# ![](/home/m1cl/Dokumente/projekt/wordpress-calendar.png)

---
## 4. Testphase

---
Aufgrund des hohen Zeitaufwands, dass durch die komplexe Infrakstruktur zustande kam, habe ich keine Test schreiben können. 

---
## 5. Projektabschluss

---
### Kosten-Nutzen-Analyse
Es sind keine wirklichen Kosten entstanden. Auf der Haben-Seite steht nur die Zeit. Jeder von mir verwendete Software ist Open-Source oder kostenlos nutzbar. Auf der Haben-Seite steht lediglich die Zeit. Folgende Kalkulation folgt daraus: 
|Aufwandskosten| ~ 70h * 50,00 € (Stundensatz Junior-Front-End Developer) = 3500,00 €|
|:--|--:|

---
### Fazit

Die einzelnen Komponenten funtkioneren. Die Kommunikation zwischen den beiden muss noch über eine Datenbank erstellt werden, sodass der Kunden sich über den Kalender für eine Veranstaltung anmelden kann. Auch fehlt das Popover Fenster, dass bei einem Klick auf einem Event die Beschreibung der Veranstaltung anzeigen lässt.
