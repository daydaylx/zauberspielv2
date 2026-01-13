const e={c1_s01_platform:{id:"c1_s01_platform",chapter:1,title:"Leerer Bahnsteig",narrative:`Der Bahnsteig ist leer. Nicht „spät abends leer", sondern falsch leer.

Keine Werbeplakate. Keine Bänke. Keine Automaten. Nur nackte Wände und eine Uhr, die stehen geblieben ist.

23:47.

Die Anzeigetafel flackert. Kein Text. Nur ein blinkendes Feld, wo normalerweise „Nächster Zug" stehen würde.

Du weißt nicht mehr, warum du hier bist. Die Erinnerung fühlt sich an wie ein Traum, der dir beim Aufwachen durch die Finger rinnt.

Aber du weißt: Du wartest auf etwas.`,choices:[{id:"look_around",label:"Umsehen und warten",effects:[{type:"inc",target:"tickets_truth",value:1}],next:"c1_s02_train_appears"},{id:"check_phone",label:"Handy checken",effects:[{type:"inc",target:"tickets_escape",value:1}],next:"c1_s02_train_appears"},{id:"try_leave",label:"Versuchen zu gehen",effects:[{type:"inc",target:"tickets_guilt",value:1},{type:"inc",target:"conductor_attention",value:1}],next:"c1_s02_train_appears"}],tags:[],state_notes:["Erste Ticket-Verteilung: Truth (beobachten), Escape (ablenken), Guilt (gehen wollen)"],atmosphere:"somber"},c1_s02_train_appears:{id:"c1_s02_train_appears",chapter:1,title:"Der Zug",narrative:`Ein Geräusch. Nicht das Rattern von Schienen, sondern ein tiefes Brummen, das du mehr im Brustkorb spürst als hörst.

Der Zug gleitet in den Bahnhof. Lautlos.

Er sieht aus wie ein alter Nachtzug aus den 80ern. Abblätternde Farbe, flackernde Innenbeleuchtung. Aber irgendwas stimmt nicht mit den Proportionen. Die Fenster sind zu schmal. Die Wagen zu lang.

Die Türen öffnen sich mit einem Zischen.

Niemand steigt aus.

Durch die Scheiben siehst du Silhouetten – Menschen, die reglos auf ihren Plätzen sitzen.`,choices:[{id:"board_immediately",label:"Sofort einsteigen",effects:[{type:"inc",target:"tickets_escape",value:1}],next:"c1_s03_inside_train"},{id:"inspect_train",label:"Den Zug genauer ansehen",effects:[{type:"inc",target:"tickets_truth",value:1}],next:"c1_s03_inside_train"},{id:"hesitate",label:"Zögern",effects:[{type:"inc",target:"tickets_guilt",value:1},{type:"inc",target:"memory_drift",value:1}],next:"c1_s03_inside_train"}],tags:[],state_notes:["Hesitate erhöht memory_drift (erstes Zeichen der Unsicherheit)"],atmosphere:"tense"},c1_s03_inside_train:{id:"c1_s03_inside_train",chapter:1,title:"Innen",narrative:`Du steigst ein.

Die Tür schließt sich hinter dir mit einem finalen Klack. Der Zug setzt sich in Bewegung – sanft, als würde er schweben.

Der Wagen ist ein Gang mit Abteilen. Rote Polstersitze, abgenutzt. Messinglampen, die flackern. Holzverkleidung, die nach altem Rauch riecht.

Zur Linken: Ein Mann, mittleren Alters, der aus dem Fenster starrt. Seine Augen bewegen sich nicht.

Zur Rechten: Ein leeres Abteil mit einem Koffer auf dem Sitz. Niemand in der Nähe.`,choices:[{id:"talk_to_man",label:"Den Mann ansprechen",effects:[{type:"inc",target:"tickets_love",value:1},{type:"inc",target:"rel_sleepless",value:1}],next:"c1_s04_sleepless_intro"},{id:"examine_suitcase",label:"Den Koffer untersuchen",effects:[{type:"inc",target:"tickets_truth",value:1}],next:"c1_s04_sleepless_intro"},{id:"find_seat",label:"Einfach einen Platz suchen",effects:[{type:"inc",target:"tickets_escape",value:1}],next:"c1_s04_sleepless_intro"}],tags:[],state_notes:["Talk_to_man etabliert erste Beziehung zu Sleepless","Koffer-Hinweis: Wird in Kap. 2 relevant (Comp7-Intro)"],atmosphere:"mystic"},c1_s04_sleepless_intro:{id:"c1_s04_sleepless_intro",chapter:1,title:"Der Schlaflose",narrative:`Der Mann bemerkt dich. Seine Augen sind rot umrandet, als hätte er seit Tagen nicht geschlafen.

„Du auch?" sagt er. Seine Stimme ist rau.

Du fragst: „Auch was?"

„Keine Ahnung, wo du eingestiegen bist. Kein Ticket in der Tasche. Keine Erinnerung daran, wie du hier gelandet bist."

Er lächelt müde. „Willkommen im Nachtzug."

Seine Worte treffen wie ein Schlag. Du greifst in deine Tasche. Leer. Kein Ticket. Keine Quittung. Nichts.`,choices:[{id:"ask_where",label:'„Wo fährt der Zug hin?"',effects:[{type:"inc",target:"tickets_truth",value:1},{type:"inc",target:"rel_sleepless",value:1}],next:"c1_s05_first_anomaly"},{id:"ask_how_long",label:'„Wie lange bist du schon hier?"',effects:[{type:"inc",target:"tickets_love",value:1},{type:"inc",target:"rel_sleepless",value:1}],next:"c1_s05_first_anomaly"},{id:"deny",label:'„Das kann nicht sein."',effects:[{type:"inc",target:"tickets_escape",value:1},{type:"dec",target:"rel_sleepless",value:1}],next:"c1_s05_first_anomaly"}],tags:[],state_notes:["Sleepless etabliert die Grundregel: Niemand hat ein Ticket","ask_where/ask_how_long: Unterschied zwischen Truth (Fakten) und Love (Empathie)","deny: Escape-Pattern, verschlechtert Beziehung"],atmosphere:"tense"},c1_s05_first_anomaly:{id:"c1_s05_first_anomaly",chapter:1,title:"Durchsage",narrative:`Eine Lautsprecherdurchsage knistert durch den Wagen:

„Sehr geehrte Fahrgäste, wir erreichen in Kürze—"

Pause.

Dann, als würde jemand ein Band zurückspulen:

„—erreichen in Kürze [unverständlich]. Bitte achten Sie auf Ihre persönlichen Gegenstände."

Der Schlaflose zuckt nicht mal. Als hätte er das schon hundertmal gehört.

Du fragst: „Was war das?"

Er seufzt. „Der Name der Station. Er fehlt. Seit drei Halten. Immer dasselbe."`,choices:[{id:"write_it_down",label:"Versuche, es aufzuschreiben",effects:[{type:"inc",target:"tickets_truth",value:1},{type:"inc",target:"conductor_attention",value:1}],next:"c1_end_station"},{id:"ignore_anomaly",label:"Ignorieren und weitergehen",effects:[{type:"inc",target:"tickets_escape",value:1}],next:"c1_end_station"},{id:"ask_sleepless",label:"Den Schlaflosen fragen",effects:[{type:"inc",target:"tickets_love",value:1},{type:"inc",target:"rel_sleepless",value:1}],next:"c1_end_station"}],tags:[],state_notes:["write_it_down erhöht conductor_attention (Aufmerksamkeit wird registriert)","Erste Memory-Drift-Manifestation (Stationsname fehlt)"],atmosphere:"mystic"},c1_end_station:{id:"c1_end_station",chapter:1,title:"Halt",narrative:`Der Zug hält. Kein Ruck, keine Bremse. Er steht einfach.

Durch das Fenster siehst du einen Bahnsteig. Leer. Identisch zum ersten.

Niemand steigt ein. Niemand steigt aus.

Nach dreißig Sekunden: Die Türen schließen sich. Der Zug fährt weiter.

Als du dich umdrehst, fällt dir etwas auf:

Der Schlaflose sieht anders aus. Seine Jacke ist jetzt dunkelblau. Vorher war sie grau. Du bist dir sicher.

Er bemerkt deinen Blick. „Was?"

Du sagst nichts.`,choices:[{id:"continue_to_chapter_2",label:"Weiter in Kapitel 2",effects:[{type:"set",target:"chapter_index",value:2}],next:"c2_s01_ticket_search"}],tags:["station_end"],state_notes:["Erste station_end-Szene: memory_drift wird automatisch erhöht","Callback: Jackenfarbe ändert sich (Drift-Effekt)","Sleepless reagiert nicht -> niemand bemerkt außer Spieler"],atmosphere:"somber"}};export{e as chapter1Scenes};
