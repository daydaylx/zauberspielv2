import { Scene, Ending, PlayerStats } from './types';

export const scenes: Record<string, Scene> = {
  // ------------------------------------------------------------------
  // PROLOG
  // ------------------------------------------------------------------
  "P0_Intro": {
    id: "P0_Intro",
    kapitel: "Prolog",
    titel: "Der Flug nach Nareth",
    atmosphere: "mystic",
    beschreibung: "Das Luftschiff 'Aetherwind' ächzt im Sturm. Die Holzplanken vibrieren unter deinen Füßen. Unter dir liegt die Welt der Gewöhnlichen, verborgen unter einer Decke aus langweiligem Grau. Vor dir, wie eine Insel im tosenden Himmelsmeer, ragt die Spitze des Berges Nareth hervor.\n\nDie Akademie. Türme, die wie Federkiele in den Himmel stechen. Man sagt, die Realität hier oben sei dünn wie Papier – bereit, von denen neu geschrieben zu werden, die die Tinte der Magie beherrschen.\n\nDu umklammerst die Reling. In deiner Tasche hast du nichts als einen Brief der Aufnahme und ein seltsames, altes Amulett deiner Großmutter, das warm wird, je näher ihr kommt.",
    choices: [
      {
        text: "Das Amulett heimlich betrachten.",
        beschreibungFolge: "Du ziehst es halb aus der Tasche. Es pulsiert im Takt deines Herzens.",
        werteAenderung: { wissen: 1 },
        flagsAenderung: { has_amulet_insight: true },
        naechsteSzeneId: "P1_ankunft"
      },
      {
        text: "Den Blick fest auf die Akademie richten.",
        beschreibungFolge: "„Ich werde dort bestehen“, denkst du. Du prägst dir die Struktur der Türme ein.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "P1_ankunft"
      },
      {
        text: "Die anderen Schüler mustern.",
        beschreibungFolge: "Wer ist nervös? Wer ist arrogant? Du scannst die Gesichter nach Verbündeten.",
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "P1_ankunft"
      },
      {
        text: "Einen Rivalen ausmachen.",
        beschreibungFolge: "Ein schlanker Schüler mit Silberbrosche mustert dich kühl, als wärst du ein Problem, das er später löst.",
        flagsAenderung: { early_rival_seen: true },
        naechsteSzeneId: "P1_ankunft"
      }
    ]
  },

  // ------------------------------------------------------------------
  // KAPITEL 5 – FLUCHT / NACHHALL VOR DEN ENDEN
  // ------------------------------------------------------------------

  "K5_freundschaft": {
    id: "K5_freundschaft",
    kapitel: "Kapitel 5",
    titel: "Nachhall des Lichts",
    atmosphere: "mystic",
    beschreibung: "Das Licht eurer gebündelten Magie drückt den Schatten zurück. Für einen Moment herrscht Stille, nur euer gemeinsamer Atem füllt das Sanktum. Lira lacht erschöpft, Jorin wischt sich Tinte aus den Augen. Arelis ringt sich ein heiseres 'Gut gemacht' ab.\n\nÜber euch rieseln Staub und lose Buchseiten herab. Die Kathedrale aus schwarzem Stein knarzt, als würde sie neu schreiben, was eben geschah. Der Weg hinaus flimmert wie ein schmaler Steg aus hellem Schimmer.",
    choices: [
      { text: "Zusammen hinausgehen.", beschreibungFolge: "Drei Hände bleiben verhakt. Ihr tretet in den Schimmer.", naechsteSzeneId: "EP_start" }
    ]
  },

  "K5_opfer": {
    id: "K5_opfer",
    kapitel: "Kapitel 5",
    titel: "Der Preis der Stille",
    atmosphere: "somber",
    beschreibung: "Der Blitz, der das Buch zerreißt, lässt ein Nachbild in deinem Blick zurück. Dann: Stille. Kein Prickeln mehr in den Fingern – leer, klar, schmerzend. Lira starrt auf deine Hände, Jorin schluckt hart. Arelis’ Blick ist voller Sorge und Respekt.\n\nStaub senkt sich wie Schnee. Ohne dein inneres Knistern fühlt sich die Luft schwerer an, aber auch ungefährlicher. Der Ausgang zeichnet sich als matter Lichtstreifen ab.",
    choices: [
      { text: "Weitergehen, ohne Magie.", beschreibungFolge: "Jeder Schritt klingt lauter, weil kein Zauber ihn dämpft.", naechsteSzeneId: "E1_RETTUNG_VERLUST" }
    ]
  },

  "K5_macht": {
    id: "K5_macht",
    kapitel: "Kapitel 5",
    titel: "Krone aus Tinte",
    atmosphere: "dark",
    beschreibung: "Die Tinte fließt in deine Adern, süß und scharf. Das Buch schlägt in deinem Brustkorb wie ein zweites Herz. Arelis weicht zurück, Lira und Jorin tun es ihr gleich. Ihre Silhouetten werden zu scheuen Schatten im Rücken des neuen Meisters.\n\nDie Hallen biegen sich leicht, als würden sie dir Platz machen. Ein kalter Wind trägt deinen Namen und schmeckt metallisch. Vor dir liegt der Aufgang – oder die Thronstufe, je nachdem, wie du sie betrachtest.",
    choices: [
      { text: "Voranschreiten, die Macht annehmen.", beschreibungFolge: "Der Schatten folgt dir wie ein Umhang.", naechsteSzeneId: "E3_MACHT_EGO" }
    ]
  },

  "K5_siegel": {
    id: "K5_siegel",
    kapitel: "Kapitel 5",
    titel: "Neue Linien",
    atmosphere: "mystic",
    beschreibung: "Die alten Formeln vibrieren noch in der Luft. Runen brennen auf deinen Handflächen nach, Arelis atmet schwer, aber sie steht. Das Buch schläft wieder, doch neue Sigillen leuchten schwach – deine Handschrift mischt sich unter die des Ersten Direktors.\n\nLira zieht dich am Ärmel: 'Beeil dich, bevor es sich anders überlegt.' Jorin hält das Siegelprotokoll fest an sich, als wäre es ein Versprechen.",
    choices: [
      { text: "Die Halle verlassen, als Hüter.", beschreibungFolge: "Das Siegel summt hinter dir, ein leiser Takt, der dich begleiten wird.", naechsteSzeneId: "EP_start" }
    ]
  },

  "K5_verrat": {
    id: "K5_verrat",
    kapitel: "Kapitel 5",
    titel: "Das Kippen",
    atmosphere: "dark",
    beschreibung: "Das Zögern – oder die Abkehr – reißt ein Loch in euren Kreis. Der Schatten nutzt es gierig. Tinte schießt über den Boden, kriecht eure Beine hinauf. Arelis’ Stab klirrt erneut, diesmal ohne Hände, die ihn greifen.\n\nLira schreit, Jorin ruft deinen Namen, doch der Sturm klingt wie ein Buch, das Seiten verschlingt. Der Ausgang wackelt, als wäre er nur noch Erinnerung.",
    choices: [
      { text: "Fallen lassen.", beschreibungFolge: "Der Schatten klappt über euch zu wie ein Einband.", naechsteSzeneId: "E5_Verrat" }
    ]
  },

  "P1_ankunft": {
    id: "P1_ankunft",
    kapitel: "Prolog",
    titel: "Der Himmel hält den Atem an",
    atmosphere: "normal",
    beschreibung: "Das Luftschiff legt mit einem brutalen Ruck an. Raus mit euch!‘, brüllt ein Aufseher. Der Wind auf den Docks ist gnadenlos; er zerrt an den Roben wie ein wildes Tier.\n\nHunderte neue Schüler drängen sich auf den schwankenden Stegen. Gedränge. Ellbogen. Panik.\n\nDirekt neben dir stolpert jemand. Ein schmächtiger Junge mit viel zu großer Brille – Jorin. Sein Koffer verhakt sich, er verliert das Gleichgewicht. Hilfe!‘, quietscht er, als er über die Kante der Planke rutscht. Er hängt nur noch mit einer Hand am morschen Holz. Unter ihm: Tausend Meter freier Fall.",
    choices: [
      {
        text: "Sofort zupacken! (Reflex)",
        beschreibungFolge: "Du denkst nicht nach. Deine Hand schießt vor und packt sein Handgelenk, kurz bevor er abrutscht.",
        werteAenderung: { mut: 1, empathie: 1 },
        flagsAenderung: { helped_jorin_prolog: true, jorin_ally: true },
        naechsteSzeneId: "P2_Planke_Retter"
      },
      {
        text: "‚Achtung!‘ rufen und Hilfe holen.",
        beschreibungFolge: "Du bist zu weit weg oder zu vernünftig. Du alarmierst die Aufseher.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "P2_Planke_Hilfe"
      },
      {
        text: "Zurückweichen. Nicht mitreißen lassen.",
        beschreibungFolge: "Selbsterhaltung ist auch eine Tugend. Oder?",
        werteAenderung: { mut: 1, empathie: -1 },
        naechsteSzeneId: "K1_zeremonie"
      }
    ]
  },

  "P2_Planke_Retter": {
    id: "P2_Planke_Retter",
    kapitel: "Prolog",
    titel: "Ein erster Verbündeter",
    atmosphere: "normal",
    beschreibung: "Mit einem Ruck, der dir fast die Schulter auskugelt, ziehst du Jorin zurück auf die Planke. Er landet keuchend auf den Knien, bleich wie ein Leintuch. Seine Brille hängt schief auf der Nase.\n\nEr starrt dich mit großen Augen an. Du... du hast mich festgehalten. Warum?‘ Er schluckt. Ich bin Jorin. Ich... ich vergesse das nicht.‘\n\nEin Aufseher schiebt euch weiter. Nicht trödeln!‘",
    choices: [
      { text: "„Schon gut, Jorin. Atmen nicht vergessen.“", beschreibungFolge: "Ein kurzes, verbindendes Nicken.", naechsteSzeneId: "P2_dock_nachklang" }
    ]
  },

  "P2_Planke_Hilfe": {
    id: "P2_Planke_Hilfe",
    kapitel: "Prolog",
    titel: "Knappe Rettung",
    atmosphere: "normal",
    beschreibung: "Ein Aufseher eilt herbei, den Zauberstab gezückt. Ein violetter Schimmer umhüllt Jorin und zieht ihn wie eine Marionette hoch. Er landet unsanft auf dem Holz.\n\nEr sieht dich an, zupft seine Robe zurecht. In seinem Blick liegt Enttäuschung, aber auch Erleichterung. Danke für's... Rufen‘, murmelt er leise und verschwindet schnell in der Menge.",
    choices: [
      { text: "Sich dem Strom zum Haupttor anschließen.", beschreibungFolge: "", naechsteSzeneId: "P2_dock_nachklang" }
    ]
  },

  "P2_dock_nachklang": {
    id: "P2_dock_nachklang",
    kapitel: "Prolog",
    titel: "Zwischen Turmwind und Herzklopfen",
    atmosphere: "normal",
    beschreibung: "Der Wind peitscht weiter, aber in deinem Ohr dröhnt nur dein eigener Puls. Der morschen Planke entweicht ein letzter, langgezogener Knarz – als Echo der Gefahr eben. Neben dir sortiert Jorin schweigend seine Bücher, der Abdruck deiner Finger noch rot an seinem Handgelenk.\n\nAuf dem Weg zum Haupttor flutet plötzlich normales Akademie-Leben zurück: Ein Mädchen lacht, irgendwo fällt ein Koffer zu Boden, eine Glocke läutet zum Appell. Der Kontrast macht das gerade Erlebte realer.\n\nDu atmest tief ein. Noch drei Stufen, dann beginnt Nareth offiziell.",
    choices: [
      { text: "Mit dem Strom zum Haupttor gehen.", beschreibungFolge: "Der Lärm der Menge wird zu einem Teppich, der deine Gedanken dämpft.", naechsteSzeneId: "P3_vor_dem_tor" }
    ]
  },

  "P3_vor_dem_tor": {
    id: "P3_vor_dem_tor",
    kapitel: "Prolog",
    titel: "Das Flüstern der Menge",
    atmosphere: "normal",
    beschreibung: "Ihr steht vor dem riesigen Portal der Akademie. Die Menge der Schüler hat sich etwas beruhigt, aber die Luft ist elektrisch geladen.\n\nJorin steht neben dir und putzt hektisch seine Brille. 'Meine Mutter hat mich gewarnt', murmelt er mehr zu sich selbst. 'Nareth frisst die Schwachen. Und ich habe fast schon am Hafen versagt.'\n\nWeiter links siehst du ein Mädchen mit feuerroten Haaren – Lira. Sie lehnt lässig an einer Statue und beobachtet die nervösen Neulinge mit einem amüsierten Grinsen. Sie scheint die Einzige zu sein, die keine Angst hat.",
    choices: [
      {
        text: "Jorin aufmuntern. 'Wir schaffen das schon.'",
        beschreibungFolge: "Jorin lächelt schwach. 'Vielleicht. Danke, dass du nicht weggegangen bist.'",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { jorin_loyalty_boost: true },
        naechsteSzeneId: "K1_zeremonie"
      },
      {
        text: "Lira beobachten.",
        beschreibungFolge: "Sie bemerkt deinen Blick, zwinkert dir kurz zu und wendet sich dann ab. Interessant.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_zeremonie"
      },
      {
        text: "Konzentriert bleiben. Keine Ablenkungen.",
        beschreibungFolge: "Du ignorierst die anderen und richtest deine Robe. Du bist hier, um zu lernen, nicht um Händchen zu halten.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_zeremonie"
      }
    ]
  },

  "K1_zeremonie": {
    id: "K1_zeremonie",
    kapitel: "Kapitel 1",
    titel: "Schatten im Licht",
    atmosphere: "mystic",
    beschreibung: "Die Große Halle riecht nach Bienenwachs und Anspannung. Tausende Kerzen schweben unter einer Decke, die den Sternenhimmel zeigt. Professor Arelis' Stimme hallt: 'Magie ist eine Schuld.' Plötzlich flackern Kerzen. Kälte kriecht hoch. Ihr Schatten am Pult – er bewegt sich eigenständig, Klauen greifen ins Leere. Dein Puls rast: Illusion oder echt? Lira neben dir zuckt.",
    choices: [
      {
        text: "Lira: 'Das Vieh – echt?'",
        beschreibungFolge: "Du suchst sofort den Kontakt.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { trusted_by_lira: true },
        naechsteSzeneId: "K1_zeremonie_nachklang"
      },
      {
        text: "Jorin: 'Keine Illusion.'",
        beschreibungFolge: "Du teilst deine Analyse.",
        werteAenderung: { wissen: 1 },
        flagsAenderung: { trusted_by_jorin: true },
        naechsteSzeneId: "K1_zeremonie_nachklang"
      },
      {
        text: "Schweigen, scannen.",
        beschreibungFolge: "Niemandem trauen. Paranoia steigt.",
        werteAenderung: { wissen: 1 },
        flagsAenderung: { paranoia_flag: true },
        naechsteSzeneId: "K1_zeremonie_nachklang"
      },
      {
        text: "Arelis' Assistentin abfangen.",
        beschreibungFolge: "Die junge Assistentin stolpert fast über deine Frage. 'Alles unter Kontrolle', flüstert sie, aber ihre Augen flackern.",
        flagsAenderung: { questioned_staff: true },
        naechsteSzeneId: "K1_zeremonie_nachklang"
      }
    ]
  },

  "K1_zeremonie_nachklang": {
    id: "K1_zeremonie_nachklang",
    kapitel: "Kapitel 1",
    titel: "Flur nach dem Flackern",
    atmosphere: "normal",
    beschreibung: "Die Türen der Großen Halle schwingen auf. Der Geruch von Bienenwachs klebt dir noch in der Nase, die Kälte des lebendigen Schattens steckt in deinen Fingern. Draußen im Korridor tobt plötzlich wieder Alltag: ein Hausgeist schimpft über Wachstropfen, ältere Schüler lachen zu laut, als müssten sie die Stille übertönen. Ein Wachstropfen knistert, als er auf Stein fällt – ein kleines Echo der flackernden Kerzen.\n\nLira reibt sich die Arme, als wolle sie die Gänsehaut fortwischen. Jorin blättert fahrig in seinem Notizbuch. Zwei Siebtklässler flüstern: 'Westflügel bleibt dicht... seit dem letzten Unfall.' Ein Wort fällt auf: 'verbotene Bereiche'.\n\nDas Flüstern aus der Halle hallt wie ein Echo in dir nach, nur gedämpft vom Lärm des Flurs.",
    choices: [
      { text: "Weiter zum Übungsplatz gehen.", beschreibungFolge: "Die Kerzen flackern noch in deiner Erinnerung, als ihr den Campus betretet.", naechsteSzeneId: "K1_campus_weg" },
      {
        text: "Etwas Kerzenwachs einsammeln.",
        beschreibungFolge: "Du löst einen erkalteten Wachsklumpen vom Boden. Er riecht noch schwach nach Honig.",
        itemBelohnung: "Kerzenwachs",
        naechsteSzeneId: "K1_campus_weg"
      }
    ]
  },

  "K1_campus_weg": {
    id: "K1_campus_weg",
    kapitel: "Kapitel 1",
    titel: "Wege über dem Abgrund",
    atmosphere: "normal",
    beschreibung: "Der Geruch von Bienenwachs ist noch da – oder bildet dein Gehirn ihn nur ein? Eine Woche ist seit der Zeremonie vergangen, aber das Flüstern über den 'Schattenvorfall' ist nie ganz verstummt.\n\nDu bist auf dem Weg zum Übungsplatz für deine erste Lektion in 'Verteidigung'. Der Wind pfeift heute besonders stark um die Türme. Vor dir gabelt sich der Weg:\n\nLinks führt die 'Glasbrücke' direkt zum Ziel – eine Abkürzung ohne Geländer, direkt über dem Abgrund. Rechts führen die 'Steinernen Arkaden' geschützt, aber langsam am Hauptgebäude entlang, wo ältere Schüler tuscheln.",
    choices: [
      {
        text: "Über die Glasbrücke. (Mut)",
        beschreibungFolge: "Du trittst auf das transparente Glas. Unter deinen Stiefeln ziehen Wolken vorbei. Der Wind zerrt an dir, aber du genießt den Nervenkitzel. Du kommst mit klarem Kopf und voller Adrenalin an.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_duell_intro"
      },
      {
        text: "Durch die Arkaden. (Wissen)",
        beschreibungFolge: "Du wählst den sicheren Weg. Dabei schnappst du Gesprächsfetzen von Siebtklässlern auf: '...Kaelens Familie... Instabilität... haben den Rat bestochen...' Interessant.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_duell_intro"
      },
      {
        text: "Stehenbleiben und lauschen. (Empathie)",
        beschreibungFolge: "Du verlangsamst den Schritt, bleibst hinter einer Säule. Zwei ältere Schüler flüstern: 'Westflügel bleibt dicht, seit der Wächter verschwunden ist.' 'Arelis tut, als wäre es nie passiert.' Ein Kältestich im Nacken.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { heard_westfluegel: true },
        naechsteSzeneId: "K1_duell_intro"
      }
    ]
  },

  "K1_duell_intro": {
    id: "K1_duell_intro",
    kapitel: "Kapitel 1",
    titel: "Der erste Schultag",
    atmosphere: "normal",
    beschreibung: "Woche eins. Der Alltag in Nareth ist ein Schleifstein. Theorie am Morgen, blaue Flecken am Nachmittag.\n\nIn 'Verteidigung gegen Instabilität' steht ihr auf dem windigen Übungsplatz. Kaelen, ein Junge mit arrogantem Lächeln und dem Wappen einer Gründerfamilie auf der Brust, tritt vor. Er mustert dich abfällig, hält den Kopf ein wenig zu hoch, als würde der Wind nur ihm gehorchen.\n\n‚Na, Frischling? Arelis scheint dich ja zu mögen. Mal sehen, ob du Talent hast oder nur gut schleimen kannst.‘ Lira im Hintergrund rollt die Augen, Jorin hebt warnend die Hand, sagt aber nichts.\n\nKaelen hebt den Zauberstab. Die Luft um ihn herum wird schwer, ölig. Die Spitze seines Stabs saugt das Licht ein. Das ist keine Schulmagie. Das ist instabile Schattenmagie, und seine Hand zittert vor Anstrengung. Ein Hauch von Ozon legt sich auf deine Zunge.",
    choices: [
      {
        text: "„Kaelen, stopp! Du verbrennst dich selbst!“ (Warnen)",
        beschreibungFolge: "Du siehst nicht den Feind, sondern die Gefahr.",
        werteAenderung: { empathie: 1, wissen: 1 },
        flagsAenderung: { rivalry_kaelen: true },
        naechsteSzeneId: "K1_duell_result_warn"
      },
      {
        text: "Schild hoch! Volle Konfrontation.",
        beschreibungFolge: "Er will Streit? Er kriegt Streit.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { rivalry_kaelen: true },
        naechsteSzeneId: "K1_duell_result_fight"
      },
      {
        text: "Seine Energie in den Boden ableiten.",
        beschreibungFolge: "Lass ihn ins Leere laufen.",
        werteAenderung: { wissen: 2 },
        flagsAenderung: { rivalry_kaelen: true },
        naechsteSzeneId: "K1_duell_result_smart"
      }
    ]
  },

  "K1_duell_result_warn": {
    id: "K1_duell_result_warn",
    kapitel: "Kapitel 1",
    titel: "Explosive Dankbarkeit",
    atmosphere: "danger",
    beschreibung: "Kaelen blinzelt, irritiert. Zauber platzt – Rußwolke. Er hustet, ruiniert. Unverletzt, aber gedemütigt. 'Du denkst, du bist besser?', zischt er. 'Das zahle ich dir heim.' Rivalität entfacht.\n\nArelis: 'Empathie ist Verteidigung. 10 Punkte.'",
    effekteBeimBetreten: { itemBelohnung: "Arelis' Lob", empathie: 1 },
    choices: [{ text: "Einreihen.", beschreibungFolge: "", naechsteSzeneId: "K1_duell_nachklang" }]
  },
  "K1_duell_result_fight": {
    id: "K1_duell_result_fight",
    kapitel: "Kapitel 1",
    titel: "Ein lauter Knall",
    atmosphere: "danger",
    beschreibung: "BAMM. Deine Magie trifft auf seine. Die Luft explodiert. Ihr beide fliegt rückwärts in den Matsch. Kaelen rappelt sich auf, hält sich die Seite. Er grinst – ein echtes, wildes Grinsen. Nicht schlecht für einen Niemand‘, zischt er. Aber beim nächsten Mal mach ich dich fertig.‘",
    effekteBeimBetreten: { mut: 1 },
    choices: [{ text: "Den Schlamm abklopfen.", beschreibungFolge: "", naechsteSzeneId: "K1_duell_nachklang" }]
  },
  "K1_duell_result_smart": {
    id: "K1_duell_result_smart",
    kapitel: "Kapitel 1",
    titel: "Taktischer Sieg",
    atmosphere: "normal",
    beschreibung: "Du erdest dich. Als sein Fluch dich trifft, leitest du die Energie einfach durch deine Stiefel in das Pflaster. Kaelens Zauber verpufft wie ein nasses Streichholz. Stille.\n\nDann kichern die ersten. Kaelen steht da, den Stab erhoben, völlig wirkungslos. Seine Ohren werden rot. Das... war Absicht‘, murmelt er und stürmt davon.",
    effekteBeimBetreten: { itemBelohnung: "Alte Karte", wissen: 1 },
    choices: [{ text: "Souverän lächeln.", beschreibungFolge: "", naechsteSzeneId: "K1_duell_nachklang" }]
  },

  "K1_duell_nachklang": {
    id: "K1_duell_nachklang",
    kapitel: "Kapitel 1",
    titel: "Staub im Atem",
    atmosphere: "normal",
    beschreibung: "Der Geruch von Ozon und verbrannter Erde hängt in der Luft, während ihr den Übungsplatz verlasst. Kaelen reibt wortlos seine Handknöchel, Lira spuckt Schlamm aus. Jorin tippt nervös Notizen: 'Instabilität reagiert auf...'\n\nAuf dem Weg zum Skriptorium wird der Wind leiser, ersetzt durch das kratzende Geräusch tausender Federn in der Ferne. Ein paar Zweitklässler starren euch an, flüstern: 'Die Neuen haben Arelis duelliert?'\n\nDer Adrenalinspiegel sinkt langsam, macht Platz für ein dumpfes Pochen hinter den Schläfen.",
    choices: [
      { text: "In den Unterricht schleppen.", beschreibungFolge: "Du wischst Staub von deiner Robe, bevor du die Schwelle des Skriptoriums übertrittst.", naechsteSzeneId: "K1_unterricht_arelis" },
      {
        text: "Kaelen direkt ansprechen.",
        beschreibungFolge: "Sein Blick ist noch heiß vom Kampf. 'Revanche', zischt er. Oder – wenn du ruhiger sprichst – 'Warst nicht übel.'",
        flagsAenderung: { kaelen_dialog_done: true },
        naechsteSzeneId: "K1_duell_kaelen_dialog"
      }
    ]
  },

  "K1_duell_kaelen_dialog": {
    id: "K1_duell_kaelen_dialog",
    kapitel: "Kapitel 1",
    titel: "Funken im Staub",
    atmosphere: "tense",
    beschreibung: "Der Staub legt sich langsam. Kaelens Atmung ist rau, sein Stolz angekratzt. Die Glasaugen der Statuen um den Platz spiegeln euch, als wären sie Zuschauer.",
    choices: [
      {
        text: "Versöhnlich: 'War knapp. Du hast Kraft.'",
        beschreibungFolge: "Seine Schultern sinken einen Fingerbreit. 'Du auch', murmelt er. Ein brüchiger Waffenstillstand.",
        flagsAenderung: { rivalry_kaelen: false },
        naechsteSzeneId: "K1_unterricht_arelis"
      },
      {
        text: "Sticheln: 'Deine Schatten wackeln.'",
        beschreibungFolge: "Sein Kiefer mahlt. 'Pass auf, Frischling. Nächstes Mal ohne Publikum.'",
        flagsAenderung: { rivalry_kaelen: true },
        naechsteSzeneId: "K1_unterricht_arelis"
      }
    ]
  },

  "K1_unterricht_arelis": {
    id: "K1_unterricht_arelis",
    kapitel: "Kapitel 1",
    titel: "Die Tinte der Realität",
    atmosphere: "normal",
    beschreibung: "Der Duell-Staub ist kaum abgeklopft, da sitzt ihr schon im Skriptorium. Der Raum riecht nach Pergament und scharfer Tinte. Professor Arelis schreitet durch die Reihen.\n\n'Magie ist kein wildes Fuchteln', doziert sie streng und korrigiert Jorins Haltung. 'Wir schreiben die Welt neu. Eine Glyphe nach der anderen.' Sie deutet auf die Tafel. 'Die Rune für 'Feuer'. Ein falscher Haken, und ihr wärmt nicht den Tee, sondern verbrennt das Haus.'\n\nJorin zeichnet die Rune mit mikroskopischer Präzision nach (Flucht in die Theorie). Lira hingegen hämmert ihren Federkiel fast durchs Papier. Ihr Tintenfass vibriert. Sie hat Angst, hier nur Durchschnitt zu sein.",
    choices: [
      {
        text: "Jorin loben: 'Perfekter Schwung.'",
        beschreibungFolge: "Er errötet leicht, entspannt sich aber. 'Es ist das Einzige, was ich kontrollieren kann', flüstert er.",
        werteAenderung: { empathie: 1, wissen: 1 },
        flagsAenderung: { jorin_loyalty_boost: true },
        naechsteSzeneId: "K1_skriptorium_extra"
      },
      {
        text: "Lira helfen: 'Nicht drücken. Fließen lassen.'",
        beschreibungFolge: "Sie schnaubt, lockert aber den Griff. 'Ich hasse diese Feinarbeit. Ich will Ergebnisse.'",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { trusted_by_lira: true },
        naechsteSzeneId: "K1_skriptorium_extra"
      },
      {
        text: "Sich auf die eigene Arbeit konzentrieren.",
        beschreibungFolge: "Du ignorierst die Dramen und meisterst die Rune. Arelis nickt dir anerkennend zu. Ein seltener Moment.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_skriptorium_extra"
      },
      {
        text: "Die Rune absichtlich perfekter setzen als verlangt.",
        beschreibungFolge: "Du fügst einen winzigen Schwung hinzu, der die Energie stabiler macht. Arelis’ Augenbraue zuckt, sagt aber nichts.",
        werteAenderung: { wissen: 1, mut: 1 },
        flagsAenderung: { perfectionist_rune: true },
        naechsteSzeneId: "K1_skriptorium_extra"
      },
      {
        text: "Die Rune minimal falsch setzen, um das Limit zu testen.",
        beschreibungFolge: "Ein Funke zischt, das Pergament rußt an. Arelis bohrt ihren Blick in dich. 'Keine Spielereien', knurrt sie.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { regelbrecher: true },
        naechsteSzeneId: "K1_skriptorium_extra"
      }
    ]
  },

  "K1_skriptorium_extra": {
    id: "K1_skriptorium_extra",
    kapitel: "Kapitel 1",
    titel: "Verborgene Worte",
    atmosphere: "mystic",
    beschreibung: "Der Unterricht ist vorbei. Die meisten Schüler drängen hinaus, froh, der strengen Aufsicht zu entkommen. Staubkörner tanzen im Licht, das durch die hohen Spitzbogenfenster fällt.\n\nArelis steht noch vorne am Pult und sortiert Pergamente. Sie wirkt abgelenkt, fast besorgt. Ihr Blick wandert immer wieder zu einem versiegelten Brief an der Seite.\n\nJorin packt langsam seine Sachen, Lira wartet ungeduldig an der Tür. Du hast einen Moment, bevor du gehen musst.",
    choices: [
      {
        text: "Arelis direkt ansprechen: 'Ist alles in Ordnung, Professor?'",
        beschreibungFolge: "Sie schreckt fast zusammen. Ihr Blick wird scharf. 'Neugier ist eine gefährliche Eigenschaft in Nareth', sagt sie kühl. 'Aber... danke der Nachfrage. Geh nun.'",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { arelis_suspcicious: true },
        naechsteSzeneId: "K1_campus_wahl"
      },
      {
        text: "Versuchen, den Brief zu stibitzen. (Wissen)",
        beschreibungFolge: "Du lässt den Brief in deinen Ärmel gleiten. Es ist kein Brief – es ist eine herausgerissene Tagebuchseite. 'Tag 1: Ich habe das Buch gefunden...', steht darauf.",
        werteAenderung: { wissen: 1 },
        itemBelohnung: "Tagebuchseite 1",
        naechsteSzeneId: "K1_campus_wahl"
      },
      {
        text: "Unter Liras Tisch nachsehen.",
        beschreibungFolge: "Bevor du gehst, bückst du dich. Lira hat etwas in das Holz geritzt: Keine Beleidigung, sondern eine Skizze. Es sieht aus wie der Plan eines Lüftungsschachts.",
        itemBelohnung: "Skizze des Schachts",
        naechsteSzeneId: "K1_campus_wahl"
      },
      {
        text: "Einfach gehen. Nicht auffallen.",
        beschreibungFolge: "Besser keinen Ärger riskieren. Du schließt dich dem Strom der Schüler an.",
        naechsteSzeneId: "K1_campus_wahl"
      }
    ]
  },

  "K1_campus_wahl": {
    id: "K1_campus_wahl",
    kapitel: "Kapitel 1 - Nachmittag",
    titel: "Freie Stunden",
    atmosphere: "normal",
    beschreibung: "Der Nachmittag gehört dir. Die Sonne steht tief über den Türmen von Nareth und taucht den Campus in goldenes Licht. Du hast Zeit für eine Aktivität, bevor die Abenddämmerung – und damit die Vorbereitung für die Nacht – beginnt.",
    choices: [
      {
        text: "Das Gewächshaus untersuchen (Gefahr & Zutaten).",
        beschreibungFolge: "Ein süßlicher, schwerer Duft weht aus dem gläsernen Bau herüber.",
        naechsteSzeneId: "K1_gewaechshaus"
      },
      {
        text: "Den Astronomieturm erklimmen (Jorin suchen).",
        beschreibungFolge: "Die höchste Spitze der Akademie. Dort ist es ruhig.",
        naechsteSzeneId: "K1_astronomie"
      },
      {
        text: "Direkt zum Gemeinschaftsraum.",
        beschreibungFolge: "Du willst keine Zeit verschwenden.",
        naechsteSzeneId: "K1_fest_intro"
      }
    ]
  },

  "K1_gewaechshaus": {
    id: "K1_gewaechshaus",
    kapitel: "Kapitel 1",
    titel: "Der Garten der Flüsterpflanzen",
    atmosphere: "mystic",
    beschreibung: "Die Luft hier drinnen ist feucht und warm. Seltsame Pflanzen mit violetten Adern winden sich an den Säulen empor. In der Mitte des Raumes siehst du einen Tisch mit alchemistischen Zutaten, doch der Weg ist von einer 'Schlaf-Lilie' versperrt. Sie bewegt sich leicht, als würde sie atmen.",
    choices: [
      {
        text: "Vorsichtig vorbeischleichen.",
        beschreibungFolge: "Du hältst den Atem an. Die Pflanze zuckt, aber du bist leise genug.",
        itemBelohnung: "Schlafpuder",
        naechsteSzeneId: "K1_fest_intro"
      },
      {
        text: "Mit Wissen beruhigen (Wissen >= 1).",
        beschreibungFolge: "Du summst eine Melodie. Die Blüte öffnet sich. Darin liegt keine Frucht, sondern ein vergilbtes Papier: 'Tag 14: Der Schatten spricht zu mir.'",
        itemBelohnung: "Tagebuchseite 2",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_fest_intro",
        condition: (s) => s.wissen >= 1
      },
      {
        text: "Gewalt anwenden (Mut).",
        beschreibungFolge: "Du schlägst die Ranken beiseite. Die Pflanze stäubt dir Pollen ins Gesicht, aber du ergatterst das Puder.",
        itemBelohnung: "Schlafpuder",
        flagsAenderung: { covered_in_pollen: true },
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_fest_intro"
      }
    ]
  },

  "K1_astronomie": {
    id: "K1_astronomie",
    kapitel: "Kapitel 1",
    titel: "Dem Himmel so nah",
    atmosphere: "dream",
    beschreibung: "Der Wind hier oben ist kalt und klar. Du findest Jorin, der durch ein riesiges Teleskop starrt. 'Die Konstellation...', murmelt er. 'Der Drache steht im Haus des Schattens. Das ist seit der Gründung nicht passiert.' Er bemerkt dich und deutet auf eine Karte.",
    choices: [
      {
        text: "Unter der Sternenkarte suchen.",
        beschreibungFolge: "Unter der Karte klebt ein Zettel. Arelis' Handschrift: 'Tag 40: Ich muss es versiegeln. Auch wenn es mein Herz kostet.'",
        itemBelohnung: "Tagebuchseite 3",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_fest_intro"
      },
      {
        text: "Mit Jorin über seine Ängste reden.",
        beschreibungFolge: "'Ich habe Angst, dass ich versage', sagt er. 'Aber hier oben wirken Probleme so klein.'",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { jorin_loyalty_boost: true },
        naechsteSzeneId: "K1_fest_intro"
      }
    ]
  },

  "K1_fest_intro": {
    id: "K1_fest_intro",
    kapitel: "Kapitel 1 - Abend",
    titel: "Das Fest der Lichter",
    atmosphere: "dream",
    beschreibung: "Als du den Innenhof betrittst, hat die Dämmerung eingesetzt. Tausende kleiner, magischer Laternen schweben in der Luft wie ein zweiter Sternenhimmel. Schüler lachen, Musik spielt. Es ist eine seltene Pause vom strengen Drill.\n\nDoch die Idylle trügt. Kaelen steht inmitten einer Gruppe von Bewunderern und erzählt lautstark eine Geschichte – und er deutet direkt auf dich.",
    choices: [
      {
        text: "Hingehen und ihn konfrontieren. (Mut)",
        beschreibungFolge: "Du drängst dich durch die Menge. Die Musik scheint leiser zu werden.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_fest_kaelen"
      },
      {
        text: "Lieber Abstand halten und Lira suchen.",
        beschreibungFolge: "Du weichst aus, doch Kaelen ruft laut: 'Seht mal, wer sich da versteckt!' Es gibt kein Entkommen.",
        naechsteSzeneId: "K1_fest_kaelen"
      }
    ]
  },

  "K1_fest_kaelen": {
    id: "K1_fest_kaelen",
    kapitel: "Kapitel 1",
    titel: "Öffentliches Theater",
    atmosphere: "tense",
    beschreibung: "Kaelen grinst herablassend. 'Unser Neuzugang! Hat sich heute Nachmittag sicher im Staub verkrochen.'\n\nEr mustert dich. Wenn du Pollen im Gesicht hast (vom Gewächshaus), lacht er: 'Seht nur! Hat wohl mit Blumen gekämpft und verloren!' Die Menge kichert.",
    choices: [
      {
        text: "Konter: 'Ich habe wenigstens keine Angst vor Schmutz.' (Mut)",
        beschreibungFolge: "Ein Raunen geht durch die Menge. Kaelens Lächeln gefriert. 'Mutig', zischt er. 'Aber dumm.'",
        werteAenderung: { mut: 1 },
        flagsAenderung: { public_respect: true },
        naechsteSzeneId: "K1_fest_moment"
      },
      {
        text: "Witz: 'Besser Pollen als deine Parfümwolke.' (Empathie)",
        beschreibungFolge: "Lira lacht laut auf. Die Spannung bricht, und Kaelen steht als der Eitle da.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { public_respect: true },
        naechsteSzeneId: "K1_fest_moment"
      },
      {
        text: "Schweigend weggehen. (Stolz)",
        beschreibungFolge: "Du lässt ihn einfach stehen. Das ist vielleicht die stärkste Antwort. Kaelen wirkt irritiert, dass sein Publikum geht.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_fest_moment"
      }
    ]
  },

  "K1_fest_moment": {
    id: "K1_fest_moment",
    kapitel: "Kapitel 1",
    titel: "Ein ruhiger Moment",
    atmosphere: "mystic",
    beschreibung: "Der Trubel hat sich gelegt. Du stehst am Rand des Hofes, eine schwebende Laterne direkt über dir. Lira lehnt an einer Säule und beobachtet dich. Jorin sortiert nervös sein Besteck am Buffet.\n\nEs ist der letzte ruhige Moment, bevor ihr euch im Gemeinschaftsraum trefft.",
    choices: [
      {
        text: "Lira eine Laterne schenken.",
        beschreibungFolge: "Sie fängt das Licht und wird rot. 'Danke... ist nicht mein Stil, aber... hübsch.'",
        flagsAenderung: { romance_lira: true },
        naechsteSzeneId: "K1_traum_start"
      },
      {
        text: "Mit Jorin über die Sterne reden.",
        beschreibungFolge: "Er strahlt mehr als die Laternen. 'Siehst du? Sie leiten uns.' Ein Moment tiefer Verbundenheit.",
        flagsAenderung: { romance_jorin: true },
        naechsteSzeneId: "K1_traum_start"
      },
      {
        text: "Allein die Ruhe genießen.",
        beschreibungFolge: "Du sammelst dich. Dein Geist ist klar wie Kristall.",
        werteAenderung: { wissen: 1, mut: 1 },
        naechsteSzeneId: "K1_traum_start"
      }
    ]
  },

  "K1_traum_start": {
    id: "K1_traum_start",
    kapitel: "Zwischenspiel",
    titel: "Die schwarze Bibliothek",
    atmosphere: "dream",
    beschreibung: "Die Musik des Fests verblasst. Die Laternen erlöschen nicht, sie tropfen – wie schwarze Tinte – auf dich herab. Plötzlich stehst du nicht mehr im Innenhof, sondern in einer unendlichen Halle aus dunklem Wasser. Bücherregale ragen wie Riffe aus der Tiefe.\n\nEine Stimme, weder männlich noch weiblich, hallt überall und nirgends: 'Warum suchst du mich? Warum störst du meinen Schlaf?'",
    choices: [
      {
        text: "Für meine Freunde. Ich will sie beschützen.",
        beschreibungFolge: "Das Wasser wird warm. 'Loyalität... ein starker Schild, aber eine schwere Kette.'",
        flagsAenderung: { motivation_friends: true },
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K1_traum_ende"
      },
      {
        text: "Ich will Macht. Niemand soll mich mehr herumschubsen.",
        beschreibungFolge: "Das Wasser kocht. 'Ehrgeiz... die Tinte liebt den Ehrgeiz.'",
        flagsAenderung: { motivation_power: true },
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_traum_ende"
      },
      {
        text: "Ich will die Wahrheit verstehen.",
        beschreibungFolge: "Das Wasser wird klar wie Glas. 'Neugier... der Schlüssel zu allen Türen, auch zu denen, die besser geschlossen blieben.'",
        flagsAenderung: { motivation_knowledge: true },
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_traum_ende"
      }
    ]
  },

  "K1_traum_ende": {
    id: "K1_traum_ende",
    kapitel: "Zwischenspiel",
    titel: "Erwachen",
    atmosphere: "mystic",
    beschreibung: "Du schreckst hoch. Du stehst wieder im Flur vor dem Gemeinschaftsraum. Deine Hände sind trocken, aber du schmeckst noch immer Salz und Tinte auf der Zunge.\n\nWar das eine Warnung? Oder eine Einladung? Die Realität fühlt sich plötzlich dünner an.",
    choices: [
      {
        text: "Den Kopf schütteln und reingehen.",
        beschreibungFolge: "Du verdrängst das Bild. Jetzt zählt nur der Plan.",
        naechsteSzeneId: "K1_stimme_interlude"
      }
    ]
  },

  "K1_stimme_interlude": {
    id: "K1_stimme_interlude",
    kapitel: "Zwischenspiel",
    titel: "Ein Flüstern",
    atmosphere: "tense",
    beschreibung: "Du greifst nach der Klinke zum Gemeinschaftsraum. Doch für eine Sekunde gefriert die Luft. Eine Stimme spricht direkt in deinen Kopf:",
    choices: [
      {
        text: "Hinhören...",
        beschreibungFolge: "Die Stimme kichert. 'Du bist mutig. Aber Mut blutet so leicht.'",
        naechsteSzeneId: "K1_flur_echo",
        condition: (s) => s.mut >= s.wissen && s.mut >= s.empathie
      },
      {
        text: "Hinhören...",
        beschreibungFolge: "Die Stimme raunt. 'Du weißt so viel. Aber weißt du auch, wann du aufhören musst?'",
        naechsteSzeneId: "K1_flur_echo",
        condition: (s) => s.wissen > s.mut && s.wissen >= s.empathie
      },
      {
        text: "Hinhören...",
        beschreibungFolge: "Die Stimme seufzt. 'Du fühlst ihren Schmerz. Das wird dich zerbrechen.'",
        naechsteSzeneId: "K1_flur_echo",
        condition: (s) => s.empathie > s.mut && s.empathie > s.wissen
      }
    ]
  },

  "K1_flur_echo": {
    id: "K1_flur_echo",
    kapitel: "Kapitel 1",
    titel: "Tintenfinger im Flur",
    atmosphere: "normal",
    beschreibung: "Die Feder kratzt noch in deiner Handfläche nach, als du das Skriptorium verlässt. Deine Finger riechen nach Tinte und Metall. Im Gang hängen Plakate mit Schulregeln – 'Nachtruhe', 'Verbotener Westflügel – nur mit Erlaubnis'. Ein Hausgeist poliert die Messingknäufe und summt eine Melodie, die wie das Echo der schwebenden Glyphen klingt. Auf einer abgefallenen Tafel hat jemand 'Wahrheit?' in den Staub geschrieben und wieder verwischt.\n\nLira pustet eine Tintenblase von ihrem Daumen, Jorin tippt mit dem Federkiel gegen seine Zähne. Die Geräusche des Gemeinschaftsraums sickern durch die Tür vor euch: gedämpftes Lachen, Kaminprasseln, ein murmelndes Kartenspiel.",
    choices: [
      { text: "Die Tür zum Gemeinschaftsraum öffnen.", beschreibungFolge: "Der Geruch von Rauch löst den von Tinte ab.", naechsteSzeneId: "K1_hub" },
      {
        text: "Schwarzes Brett lesen.",
        beschreibungFolge: "Zwischen Aushängen siehst du eine verblasste Notiz: 'Westflügel – Wartung bis auf Weiteres. Keine Ausnahmen.' Daneben ein eingeritztes 'Lügner'.",
        flagsAenderung: { noticed_noticeboard: true },
        naechsteSzeneId: "K1_hub"
      },
      {
        text: "Den summenden Hausgeist ansprechen.",
        beschreibungFolge: "Der Geist schnauft: 'Sie polieren die Knäufe, aber nicht die Wahrheit.' Dann verschwindet er in der Wand.",
        flagsAenderung: { ghost_comment: true },
        naechsteSzeneId: "K1_hub"
      }
    ]
  },

  "K1_hub": {
    id: "K1_hub",
    kapitel: "Kapitel 1",
    titel: "Ruhe vor dem Sturm",
    atmosphere: "normal",
    beschreibung: "Der Geruch von Tinte klebt noch an deinen Fingern, als du die Tür öffnest. Im Gemeinschaftsraum knistert ein magisches Feuer, das zwar Licht, aber kaum Wärme spendet. Doch heute ist etwas anders: Die Schatten in den Ecken pulsieren im Takt eines unsichtbaren Herzschlags.\n\nLira sitzt auf der Lehne eines alten Sessels und lässt einen Dolch nervös zwischen ihren Fingern tanzen. Jorin vergräbt sich in einer Ecke hinter einem Bücherstapel. Sein Astrolabium auf dem Tisch dreht sich wild, obwohl es windstill ist. 'Die Barriere ist dünn heute Nacht', murmelt er bleich zu sich selbst. 'Dünner als seit hundert Jahren.'\n\nDu hast einen Moment Zeit, bevor die Nachtruhe beginnt. Wen sprichst du an?",
    choices: [
      {
        text: "Zu Lira gehen. Sie wirkt unruhig.",
        beschreibungFolge: "Sie bemerkt dich sofort und grinst, aber es erreicht ihre Augen nicht ganz.",
        naechsteSzeneId: "K1_hub_lira",
        condition: (_s, f) => !f.talked_lira
      },
      {
        text: "Jorin fragen, was er da liest.",
        beschreibungFolge: "Er schreckt hoch, als hätte er einen Geist gesehen.",
        naechsteSzeneId: "K1_hub_jorin",
        condition: (_s, f) => !f.talked_jorin
      },
      {
        text: "Die Bibliothek besuchen und lernen.",
        beschreibungFolge: "Du ziehst dich zurück, um die Grundlagen der Magie zu vertiefen. Wissen ist Macht.",
        werteAenderung: { wissen: 1 },
        flagsAenderung: { studied_library: true },
        naechsteSzeneId: "K1_hub", 
        condition: (_s, f) => !f.studied_library
      },
      {
        text: "Warten, bis alle schlafen. Dann los.",
        beschreibungFolge: "Du wartest, bis das Feuer heruntergebrannt ist. Lira nickt dir aus dem Schatten zu. Es ist Zeit.",
        naechsteSzeneId: "K1_nacht_setup"
      },
      {
        text: "Kaelen am Fenster ansprechen.",
        beschreibungFolge: "Du trittst in seinen persönlichen Bereich. Er spannt sich sofort an.",
        flagsAenderung: { talked_kaelen: true },
        naechsteSzeneId: "K1_hub_kaelen",
        condition: (_s, f) => !!f.rivalry_kaelen
      },
      {
        text: "Lira und Jorin an einen Tisch holen.",
        beschreibungFolge: "Du klopfst auf die Tischplatte. Lira springt von der Lehne, Jorin lugt über sein Buch.",
        flagsAenderung: { grouped_lira_jorin: true },
        naechsteSzeneId: "K1_hub_gruppe",
        condition: (_s, f) => !f.grouped_lira_jorin
      }
    ]
  },

  "K1_hub_gruppe": {
    id: "K1_hub_gruppe",
    kapitel: "Kapitel 1",
    titel: "Drei am Tisch",
    atmosphere: "normal",
    beschreibung: "Lira legt den Dolch beiseite, Jorin schiebt einen Turm Bücher auf die Seite. Das Feuer wirft flackernde Schatten über das Holz, als säße noch jemand Vierter bei euch.",
    choices: [
      {
        text: "Teamgeist: 'Wenn wir was reißen wollen, dann gemeinsam.'",
        beschreibungFolge: "Lira nickt langsam. Jorin atmet aus, als hätte er auf Erlaubnis gewartet.",
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K1_hub"
      },
      {
        text: "Pragmatisch: 'Reden ist gut, aber wir brauchen Fakten.'",
        beschreibungFolge: "Jorin tippt sofort Notizen, Lira verdreht die Augen, bleibt aber sitzen.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_hub"
      },
      {
        text: "Mutig: 'Heute Nacht testen wir, was hinter dem Westflügel flüstert.'",
        beschreibungFolge: "Lira grinst breit. Jorin schluckt schwer, blickt auf sein rotierendes Astrolabium und nickt dann. 'Wenn wir jemals eine Chance haben, das Siegel zu durchdringen, dann jetzt. Morgen könnte es wieder undurchdringlich sein.' Der Plan ist gefasst.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { night_plan_reinforced: true },
        naechsteSzeneId: "K1_hub"
      }
    ]
  },

  "K1_hub_kaelen": {
    id: "K1_hub_kaelen",
    kapitel: "Kapitel 1",
    titel: "Kaelen im Feuer",
    atmosphere: "tense",
    beschreibung: "Kaelen dreht sich langsam um. Das Feuerlicht spiegelt sich in seinen Augen, doch dahinter liegt eine tiefe Dunkelheit. 'Was willst du?' fragt er leise. Seine Stimme zittert kaum merklich.\n\nEr wirkt nicht mehr so arrogant wie auf dem Übungsplatz. Eher... gejagt.",
    choices: [
      {
        text: " 'Diese Schattenmagie vorhin... woher kannst du das?'",
        beschreibungFolge: "Ein Muskel in seinem Kiefer zuckt. 'Es ist das Erbe meiner Familie', flüstert er. 'Ein Fluch, den wir als Gabe verkaufen.' Er wendet sich ab. Du hast etwas Wichtiges gelernt.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_hub"
      },
      {
        text: "Provokation: 'Du bist schwach, Kaelen.'",
        beschreibungFolge: "Seine Augen verengen sich zu Schlitzen. 'Pass auf, Frischling. Eines Tages wirst du stolpern, und ich werde da sein.'",
        flagsAenderung: { rivalry_kaelen: true },
        naechsteSzeneId: "K1_hub"
      }
    ]
  },

    "K1_hub_lira": {

      id: "K1_hub_lira",

      kapitel: "Kapitel 1",

      titel: "Liras Spielzeug",

      atmosphere: "normal",

      beschreibung: "Lira fängt den Dolch blind aus der Luft. 'Hübsch, oder?' Sie hält ihn ins Licht. 'Hab ich im Büro des Hausmeisters... ausgeliehen.'\n\nIhr Blick wandert zu einer Gruppe verängstigter Erstklässler am Kamin. Ihr Grinsen wird weicher. 'Die Kleinen frieren. Dieser Dietrich öffnet auch den Vorratsschrank mit den extra Decken. Jemand sollte... 'versehentlich' welche verteilen.'\n\nSie hält dir den Dietrich hin. Es geht ihr nicht nur um den Kick.",

    effekteBeimBetreten: { flagsAenderung: { talked_lira: true } },

    choices: [

      { text: "Behalt ihn. Verteil du die Decken.", beschreibungFolge: "Sie nickt anerkennend. 'Mach ich. Aber sag Arelis nichts.'", naechsteSzeneId: "K1_hub" },

        { text: "Gib her. Ich übernehme das.", beschreibungFolge: "Du nimmst den Dietrich. Er fühlt sich schwer an – wie Verantwortung.", itemBelohnung: "Liras Dietrich", naechsteSzeneId: "K1_hub" },
        {
          text: "Warnen: 'Gib ihn lieber zurück.'",
          beschreibungFolge: "Lira kneift die Augen zusammen. 'Seit wann spielst du Aufseher?'",
          flagsAenderung: { lira_irritiert: true },
          naechsteSzeneId: "K1_hub"
        }

      ]

    },

    "K1_hub_jorin": {

      id: "K1_hub_jorin",

      kapitel: "Kapitel 1",

      titel: "Verlorene Geschichte",

      atmosphere: "normal",

      beschreibung: "Jorin schlägt das Buch so heftig zu, dass Staub aufwirbelt. Seine Augen blitzen hinter der Brille. 'Es ist unfair!', zischt er ungewöhnlich laut.\n\n'Der Erste Direktor... alle sagen, er war ein Held. Aber hier...' Er tippt auf den Einband. 'Er hat seine besten Schüler geopfert, um das Siegel zu schließen. Sie wurden einfach aus der Geschichte gelöscht. Das ist nicht gerecht. Niemand sollte vergessen werden.'\n\nEr zittert vor unterdrückter Wut. Das ist nicht nur Angst – das ist Prinzip.",

      effekteBeimBetreten: { flagsAenderung: { talked_jorin: true }, wissen: 1 },

      choices: [
        { text: "Ihm recht geben. 'Die Wahrheit muss ans Licht.'", beschreibungFolge: "Jorin atmet tief durch. 'Genau. Und wenn wir dafür in den Keller müssen.'", naechsteSzeneId: "K1_hub" },
        {
          text: "Vorsicht anmahnen: 'Vielleicht hat er sie gerettet.'",
          beschreibungFolge: "Jorin blinzelt, ringt kurz. 'Oder er hat sie geopfert. Wir brauchen Beweise.'",
          flagsAenderung: { jorin_doubt: true },
          naechsteSzeneId: "K1_hub"
        }
      ]

    },

  "K1_nacht_setup": {
    id: "K1_nacht_setup",
    kapitel: "Kapitel 2",
    titel: "Letzte Ruhe vor dem Schritt",
    atmosphere: "tense",
    beschreibung: "Der Gemeinschaftsraum leert sich. Das magische Feuer ist nur noch eine Glut, die wie ein rotes Auge im Kamin glimmt. Deine Finger riechen noch nach Tinte und Rauch, dein Herzschlag passt sich dem leisen Knistern an.\n\nDu packst leise deine Tasche: Kreide, Amulett, ein Stück Brot. Lira taucht aus dem Schatten auf, legt zwei Finger an ihre Lippen. 'Flüstern nur, wenn nötig.' Jorin steht bereits fertig angezogen im Türrahmen, die Brille beschlägt vor Nervosität.\n\nDer Flur hinter der Tür wirkt wie ein schwarzes Maul, das euch verschlingen will.",
    choices: [
      { text: "Kapuzen hoch. Tür auf.", beschreibungFolge: "Du spürst das kalte Metall der Klinke – das Echo des Dietrichs in deiner Tasche.", naechsteSzeneId: "K1_nacht_aufbruch" },
      {
        text: "Einen Erstklässler zurück ins Bett schicken. (Empathie)",
        beschreibungFolge: "Ein kleiner Schüler blinzelt verschlafen zur Tür. Du legst ihm eine Hand auf die Schulter. 'Schlaf weiter.' Er nickt und verschwindet.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { kept_firstyear_safe: true },
        naechsteSzeneId: "K1_nacht_aufbruch"
      },
      {
        text: "Ignorieren und Fokus halten. (Mut)",
        beschreibungFolge: "Der Erstklässler starrt euch an, aber du lässt ihn stehen. Keine Zeit für Nebenfronten.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { ignored_firstyear: true },
        naechsteSzeneId: "K1_nacht_aufbruch"
      }
    ]
  },

  "K1_nacht_aufbruch": {
    id: "K1_nacht_aufbruch",
    kapitel: "Kapitel 2",
    titel: "Schatten im Flur",
    atmosphere: "tense",
    beschreibung: "Die Glut aus dem Kamin bleibt als roter Fleck in deiner Erinnerung, während dich nun nur das fahle Mondlicht begleitet. Die Gänge sind in gespenstische Stille getaucht. Nur das gelegentliche Schnarchen der Porträts an den Wänden unterbricht die Ruhe.\n\nLira zieht ihre Kapuze tief ins Gesicht. 'Wir müssen zum Westflügel', flüstert sie. 'Es gibt zwei Wege. Der Hauptkorridor ist schneller, aber Filch... äh, der Hausmeister patrouilliert dort oft mit seiner verfluchten Laterne.'\n\nJorin deutet auf ein verstaubtes Gitter in der Wand. 'Oder der alte Dienstbotenschacht. Eng, dreckig, voller Spinnen... aber sicher.'",
    choices: [
      {
        text: "Hauptkorridor. Wir sind schnell genug. (Mut)",
        beschreibungFolge: "Du schiebst die schwere Eichentür auf. Der Gang liegt weit und offen vor euch.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K1_nacht_flur"
      },
      {
        text: "Dienstbotenschacht. Sicher ist sicher. (Wissen)",
        beschreibungFolge: "Jorin seufzt erleichtert, als du das Gitter öffnest. 'Danke. Ich hasse Konfrontationen.'",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K1_nacht_tunnel"
      },
      {
        text: "Die 'Alte Karte' prüfen.",
        beschreibungFolge: "Du entfaltest die Karte, die du Kaelen abgenommen hast. Da! Ein markierter Geheimgang hinter einem Wandteppich. Er umgeht beide Gefahren.",
        werteAenderung: { wissen: 1, mut: 1 },
        naechsteSzeneId: "K2_bibliothek_start",
        condition: (_s, _f, i) => i.includes("Alte Karte")
      },
      {
        text: "Porträt beruhigen, damit es schweigt. (Empathie)",
        beschreibungFolge: "Du legst den Finger auf die Lippen und flüsterst dem schnarchenden Porträt zu. Es nickt schläfrig und bleibt stumm.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { portrait_bribed: true },
        naechsteSzeneId: "K1_nacht_flur"
      }
    ]
  },

  "K1_nacht_flur": {
    id: "K1_nacht_flur",
    kapitel: "Kapitel 2",
    titel: "Ein riskantes Spiel",
    atmosphere: "tense",
    beschreibung: "Ihr huscht von Säule zu Säule. Plötzlich – ein Lichtkegel! Schritte hallen auf dem Steinboden.\n\n'Versteck!', zischt Lira. Ihr drückt euch in eine Nische hinter einer Statue des Gründers. Der Hausmeister schlurft vorbei, seine Laterne wirft lange, tanzende Schatten. Er bleibt kurz stehen, schnuppert in die Luft... und geht weiter.\n\nDein Herz hämmert gegen deine Rippen. Das war knapp.",
    choices: [
      { text: "Weiteratmen und los.", beschreibungFolge: "Ihr wartet noch eine Sekunde, dann sprintet ihr zum Eingang des Westflügels.", naechsteSzeneId: "K2_kaelen_intercept" },
      {
        text: "Pebble werfen, um Filch abzulenken.",
        beschreibungFolge: "Du schleuderst einen Kiesel in den Seitengang. Die Laterne schwenkt, Schritte folgen dem Geräusch.",
        flagsAenderung: { distracted_filch: true },
        naechsteSzeneId: "K2_kaelen_intercept"
      }
    ]
  },

  "K1_nacht_tunnel": {
    id: "K1_nacht_tunnel",
    kapitel: "Kapitel 2",
    titel: "Staub und Spinnen",
    atmosphere: "tense",
    beschreibung: "Es ist eng. Es ist dunkel. Und es riecht nach Jahrhunderte altem Staub. Ihr kriecht auf Händen und Kneen.\n\n'Iiiiih', macht Lira leise, als sie in ein Spinnennetz fasst. Jorin murmelt beruhigende Formeln vor sich hin, um die Panik zu unterdrücken.\n\nDoch der Weg ist sicher. Ihr kommt hinter einem Wandteppich heraus, direkt vor dem Eingang zum Westflügel. Ihr seid zwar staubbedeckt, aber unentdeckt.",
    choices: [
      { text: "Den Staub abklopfen.", beschreibungFolge: "Lira zieht eine tote Spinne aus ihren Haaren. 'Nie wieder', flüstert sie.", naechsteSzeneId: "K2_kaelen_intercept" },
      {
        text: "Spinne zerdrücken. (Mut)",
        beschreibungFolge: "Ein leises Knacken. Jorin verzieht das Gesicht, aber der Tunnel riecht jetzt weniger nach Angst.",
        werteAenderung: { mut: 1 },
        flagsAenderung: { killed_spider: true },
        naechsteSzeneId: "K2_kaelen_intercept"
      },
      {
        text: "Jorin beruhigen. (Empathie)",
        beschreibungFolge: "Du legst ihm die Hand auf den Rücken. 'Noch drei Meter.' Seine Atmung wird ruhiger.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { calmed_jorin_tunnel: true },
        naechsteSzeneId: "K2_kaelen_intercept"
      }
    ]
  },

  "K2_kaelen_intercept": {
    id: "K2_kaelen_intercept",
    kapitel: "Kapitel 2",
    titel: "Schatten im Weg",
    atmosphere: "tense",
    beschreibung: "Ihr tretet aus dem Dunkel auf den Korridor vor dem Westflügel. Doch der Weg ist versperrt.\n\nKaelen lehnt lässig an der Wand, den Zauberstab in der Hand. Er wirkt nicht überrascht. 'Habe ich es mir doch gedacht', flüstert er. 'Die kleinen Helden auf großer Mission.'\n\nLira spannt sich an. Kaelen hebt den Stab. 'Ich könnte jetzt Alarm schlagen. Arelis würde mich belohnen. Es sei denn... ihr macht mir ein besseres Angebot.'",
    choices: [
      {
        text: "Duellieren: 'Aus dem Weg, Kaelen.' (Mut >= 1)",
        beschreibungFolge: "Ein kurzer, harter Kampf. Du entwaffnest ihn mit einem schnellen Spruch. Er stolpert zurück, beeindruckt und wütend. 'Das... war Glück.' Er verschwindet.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K2_bibliothek_start",
        condition: (s) => s.mut >= 1
      },
      {
        text: "Appell an seinen Ehrgeiz (Respekt).",
        beschreibungFolge: "Du erinnerst ihn an das Fest. 'Wir suchen das Schattenbuch. Wenn wir es finden, teilen wir den Ruhm.' Er zögert. 'Na gut. Aber ich will das erste Kapitel lesen.' Er lässt euch passieren.",
        flagsAenderung: { kaelen_ally: true },
        naechsteSzeneId: "K2_bibliothek_start",
        condition: (_s, f) => !!f.public_respect
      },
      {
        text: "Bestechen (Schlafpuder).",
        beschreibungFolge: "Du wirfst ihm den Beutel zu. 'Hier. Alchemisten zahlen gut dafür.' Er fängt ihn, grinst und tritt beiseite.",
        itemVerlust: "Schlafpuder",
        naechsteSzeneId: "K2_bibliothek_start",
        condition: (_s, _f, i) => i.includes("Schlafpuder")
      },
      {
        text: "Bluffen: 'Arelis weiß Bescheid.' (Wissen)",
        beschreibungFolge: "Er blinzelt unsicher. 'Wirklich?' Das Risiko ist ihm zu hoch. Er zieht ab.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K2_bibliothek_start"
      }
    ]
  },

  "K2_bibliothek_start": {
    id: "K2_bibliothek_start",
    kapitel: "Kapitel 2",
    titel: "Die Tür im Nichts",
    atmosphere: "mystic",
    beschreibung: "Es ist weit nach Mitternacht. Die Gänge der Akademie sind totenstill, nur das ferne Heulen des Windes ist zu hören. Lira presst dir plötzlich ihre Hand auf den Mund und zieht dich in eine Nische.\n\n'Pssht! Da vorne.' Sie deutet in die Dunkelheit. Am Ende des Westflügels ragt eine massive schwarze Tür auf, die das Licht der Fackeln zu verschlucken scheint.\n\nJorin steht zitternd daneben. 'Arelis wird uns töten', flüstert er. 'Das ist der versiegelte Bereich. Niemand war dort unten seit...' Er bricht ab.\n\nDein Amulett beginnt plötzlich zu glühen. Ein unsichtbarer Sog zieht dich zur Tür. Sie ist nicht verschlossen – sie wartet.",
    choices: [
      {
        text: "Den Dietrich benutzen (Liras Geschenk).",
        beschreibungFolge: "Du holst den Dietrich hervor. Er passt perfekt in das Schloss, als wäre er dafür gemacht.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K2_abstieg",
        condition: (_s, _f, i) => i.includes("Liras Dietrich")
      },
      {
        text: "Die Tür mit Gewalt aufbrechen.",
        beschreibungFolge: "Du wirfst dich gegen das Holz. Es ächzt protestierend und gibt nach. Jorin hält sich entsetzt die Ohren zu.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K2_abstieg"
      },
      {
        text: "Die Runen am Rahmen lesen.",
        beschreibungFolge: "Du fährst die Symbole nach. Sie erzählen keine Warnung, sondern eine Einladung.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K2_abstieg"
      },
      {
        text: "Zurückgehen. Das ist zu gefährlich.",
        beschreibungFolge: "Du drehst dich um... doch hinter dir steht Kaelen im Schatten. Er grinst. 'Zu spät für Rückzieher.' Er schubst dich vorwärts.",
        flagsAenderung: { delayed_bibliothek: true },
        naechsteSzeneId: "K1_hub"
      },
      {
        text: "Amulett an die Tür halten.",
        beschreibungFolge: "Das Amulett vibriert, die Runen glimmen auf. Ein Muster zeichnet einen sicheren Pfad auf die erste Treppenstufe.",
        flagsAenderung: { amulet_guided: true },
        naechsteSzeneId: "K2_abstieg"
      }
    ]
  },

  "K2_abstieg": {
    id: "K2_abstieg",
    kapitel: "Kapitel 2",
    titel: "Der Abstieg",
    atmosphere: "danger",
    beschreibung: "Die Tür schwingt auf und gibt den Blick auf eine Wendeltreppe frei, die sich in eine unendliche Schwärze hinabschraubt. Die Luft hier ist eiskalt und riecht nach altem Papier und Ozon.\n\nIhr steigt hinab. Die Wände scheinen zu atmen; uralte Pergamente kleben an den Steinen wie eine zweite Haut. Eine körperlose Stimme hallt aus der Tiefe zu euch herauf:\n\n'Zwei Pfade führen zum Kern. Wähle weise, Schüler: Suchst du die Wahrheit, die schmerzt? Oder die Macht, die schützt?'",
    choices: [
      { text: "Ich suche die Wahrheit.", werteAenderung: { wissen: 1 }, naechsteSzeneId: "K2_runenraum" },
      { text: "Ich suche die Macht.", werteAenderung: { mut: 1 }, naechsteSzeneId: "K2_fallenraum" },
      { text: "Ich nehme alles.", werteAenderung: { wissen: 1, mut: 1 }, flagsAenderung: { hybrid_path: true }, naechsteSzeneId: "K2_hybrid_raum" },
      {
        text: "Den Weg markieren (Kreide).",
        beschreibungFolge: "Du zeichnest kleine Kreidezeichen an die Wände. Der Stein scheint sie zu schlucken, aber ein Rest bleibt.",
        werteAenderung: { wissen: 1 },
        flagsAenderung: { path_marked: true },
        naechsteSzeneId: "K2_abstieg"
      }
    ]
  },

  "K2_hybrid_raum": {
    id: "K2_hybrid_raum",
    kapitel: "Kapitel 2",
    titel: "Hybrider Pfad",
    atmosphere: "danger",
    beschreibung: "Dieser Gang ist ein Chaos aus fliegenden Büchern und magischen Barrieren. Du musst gleichzeitig Zauber weben und physischen Angriffen ausweichen. Jorin entschärft die Runen, während Lira die Bücher mit Feuerstößen abwehrt. Es ist ein wilder, gefährlicher Tanz.",
    choices: [
      { text: "Durchkämpfen!", werteAenderung: { wissen: 1 }, naechsteSzeneId: "K2_reflexion" }
    ]
  },

  "K2_reflexion": {
    id: "K2_reflexion",
    kapitel: "Kapitel 2",
    titel: "Atemzug im Dunkeln",
    atmosphere: "mystic",
    beschreibung: "Ihr erreicht eine kleine Kammer, sicher vor den Fallen. Ihr alle atmet schwer. Lira lehnt an der Wand, ihr Gesicht ist rußverschmiert, aber sie lacht leise. Jorin putzt hektisch seine Brille.\n\n'Wir sind noch am Leben', murmelt er ungläubig. 'Aber... habt ihr das gespürt? Die Bibliothek... sie lebt.'\n\nDu hast einen Moment, um dich zu sammeln, bevor ihr tiefer in das Sanktum vordringt.",
    choices: [
      {
        text: "Lira fragen: 'Warum machst du das hier wirklich?'",
        beschreibungFolge: "Sie hört auf zu lachen und sieht dich ernst an.",
        naechsteSzeneId: "K2_talk_lira",
        condition: (_s, f) => !f.talked_lira_deep
      },
      {
        text: "Jorin fragen: 'Bereust du es, mitgekommen zu sein?'",
        beschreibungFolge: "Er zögert, dann schüttelt er den Kopf.",
        naechsteSzeneId: "K2_talk_jorin",
        condition: (_s, f) => !f.talked_jorin_deep
      },
      {
        text: "Weitergehen. Wir sind fast da.",
        beschreibungFolge: "Genug geredet. Das Schattenbuch wartet.",
        naechsteSzeneId: "K2_gang_zum_geist"
      },
      {
        text: "Phiole teilen (wenn vorhanden).",
        beschreibungFolge: "Ihr trinkt reihum einen Schluck der staubigen Phiole. Sie schmeckt nach Metall, beruhigt aber die Nerven.",
        condition: (_s, _f, i) => i.includes("Staubige Phiole"),
        itemVerlust: "Staubige Phiole",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { shared_phiole: true },
        naechsteSzeneId: "K2_gang_zum_geist"
      },
      {
        text: "Brot teilen.",
        beschreibungFolge: "Du brichst dein Stück Brot in drei Teile. Lira grinst, Jorin kaut dankbar und beruhigt sich.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { shared_bread: true },
        naechsteSzeneId: "K2_gang_zum_geist"
      }
    ]
  },

  "K2_gang_zum_geist": {
    id: "K2_gang_zum_geist",
    kapitel: "Kapitel 2",
    titel: "Stiller Gang",
    atmosphere: "tense",
    beschreibung: "Eure Schritte hallen gedämpft auf dem kalten Stein. Der Rauchgeschmack aus den Fallen hängt noch in deinem Hals, vermischt mit dem Ozon der schwebenden Glyphen. Lira knackt nervös ihre Finger, Jorin zählt lautlos Treppenstufen, als könne das Ordnung in das Chaos bringen.\n\nVor euch flackert ein einsamer Fackelschein. Dahinter beginnt eine runde Kammer – und etwas Nebliges bewegt sich darin.",
    choices: [
      { text: "In die Kammer treten.", beschreibungFolge: "Du atmest einmal ruhig aus und trittst vor.", naechsteSzeneId: "K2_geisterraum" },
      {
        text: "Flüstern: 'Wenn es schiefgeht, wer zieht zurück?'",
        beschreibungFolge: "Lira: 'Ich nicht.' Jorin: 'Ich schon... falls ich muss.' Der Satz bleibt zwischen euch wie eine Notbremse.",
        flagsAenderung: { fallback_plan: true },
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K2_geisterraum"
      },
      {
        text: "Paranoia: 'Vielleicht drehen wir um.'",
        beschreibungFolge: "Lira funkelt dich an, Jorin wirkt erleichtert. Die Idee legt sich wie kalter Staub auf eure Nerven.",
        flagsAenderung: { paranoia_flag: true },
        naechsteSzeneId: "K2_geisterraum"
      }
    ]
  },

  "K2_talk_lira": {
    id: "K2_talk_lira",
    kapitel: "Kapitel 2",
    titel: "Liras Feuer",
    atmosphere: "mystic",
    beschreibung: "'Wegen des Nervenkitzels?' Lira schüttelt den Kopf, ihre roten Haare glühen im schwachen Licht. 'Nein. Mein Vater war ein Wächter hier. Er ist nie zurückgekommen. Sie sagten, er sei bei einem Unfall gestorben.'\n\nSie ballt die Faust, bis die Knöchel weiß hervortreten. 'Ich glaube ihnen nicht. Arelis weiß etwas. Und dieses Buch... vielleicht steht es darin.'",
    effekteBeimBetreten: { flagsAenderung: { talked_lira_deep: true }, empathie: 1 },
    choices: [
      { text: "Zurück zur Gruppe.", naechsteSzeneId: "K2_reflexion" }
    ]
  },

  "K2_talk_jorin": {
    id: "K2_talk_jorin",
    kapitel: "Kapitel 2",
    titel: "Jorins Mut",
    atmosphere: "mystic",
    beschreibung: "Jorin setzt seine Brille wieder auf. 'Ich habe immer Angst', gibt er zu. 'Jeden Tag. Aber... Wissen ist das Einzige, was die Angst besiegt. Wenn wir verstehen, was das Schattenbuch ist, können wir es kontrollieren. Oder?'\n\nEr sieht dich hoffnungsvoll an. 'Außerdem... wollte ich einmal im Leben kein Feigling sein.'",
    effekteBeimBetreten: { flagsAenderung: { talked_jorin_deep: true }, empathie: 1 },
    choices: [
      { text: "Zurück zur Gruppe.", naechsteSzeneId: "K2_reflexion" }
    ]
  },

  "K2_runenraum": {
    id: "K2_runenraum",
    kapitel: "Kapitel 2",
    titel: "Raum der Worte",
    atmosphere: "mystic",
    beschreibung: "Der Raum ist gefüllt mit schwebenden Glyphen, die wie Irrlichter umherschwirren. Es gibt keinen Boden, nur Platten, auf denen Worte leuchten. Jorin tritt vor und kneift die Augen zusammen.\n\n'Das ist Alt-Narethianisch', flüstert er. 'Ein Passwort-Puzzle. Wir müssen den richtigen Satz bilden, um die Brücke zu rufen.'",
    choices: [
      {
        text: "Das Runenfragment benutzen.",
        beschreibungFolge: "Du hältst das Fragment hoch, das du gefunden hast. Die Glyphen reagieren sofort und ordnen sich zu einer Brücke.",
        flagsAenderung: { runen_kenner: true },
        naechsteSzeneId: "K2_reflexion",
        condition: (_s, _f, i) => i.includes("Runenfragment")
      },
      {
        text: "Das Muster analysieren (Wissen).",
        beschreibungFolge: "Du erkennst die Syntax. Es ist kein Satz, es ist eine mathematische Formel. Du trittst auf die richtigen Platten.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K2_reflexion",
        condition: (s) => s.wissen >= 2
      },
      { text: "Einfach raten und springen.", beschreibungFolge: "Du springst auf gut Glück. Eine Platte bröckelt unter dir weg, aber du schaffst es gerade so auf die andere Seite.", naechsteSzeneId: "K2_reflexion" },
      {
        text: "Seitenplattform riskieren: nach Loot suchen.",
        beschreibungFolge: "Du balancierst zu einer schwebenden Seitenplatte. Ein Runenbeutel liegt dort – aber die Glyphen darunter flackern bedrohlich.",
        werteAenderung: { mut: 1 },
        itemBelohnung: "Runenbeutel",
        naechsteSzeneId: "K2_reflexion"
      }
    ]
  },

  "K2_fallenraum": {
    id: "K2_fallenraum",
    kapitel: "Kapitel 2",
    titel: "Pfad der Klingen",
    atmosphere: "danger",
    beschreibung: "Lira reißt dich im letzten Moment zurück. 'Vorsicht!'\n\nVor euch schwingen riesige Pendel aus geschärftem Obsidian durch den Gang. Der Boden ist voller Druckplatten. Ein einziger falscher Schritt würde euch in Stücke schneiden. Es gibt keinen magischen Trick hier – nur Timing und Schnelligkeit.",
    choices: [
      {
        text: "Den Mechanismus mit dem Dietrich blockieren.",
        beschreibungFolge: "Du rammst den Dietrich in das Zahnrad an der Wand. Mit einem Kreischen bleiben die Pendel stehen.",
        naechsteSzeneId: "K2_reflexion",
        condition: (_s, _f, i) => i.includes("Liras Dietrich")
      },
      {
        text: "Hindurchrennen (Mut).",
        beschreibungFolge: "Du wartest auf die Lücke. Eins, zwei... JETZT! Du sprintest los, den Luftzug der Klingen im Nacken.",
        werteAenderung: { mut: 1 },
        naechsteSzeneId: "K2_reflexion",
        condition: (s) => s.mut >= 2
      },
      {
        text: "Nebenraum anvisieren: alte Wache durchsuchen.",
        beschreibungFolge: "Du entdeckst eine schmale Tür zwischen den Pendeln. Dahinter liegt ein verstaubter Wachraum – und eine kleine Truhe.",
        flagsAenderung: { side_room_loot: true },
        itemBelohnung: "Staubige Phiole",
        naechsteSzeneId: "K2_reflexion"
      }
    ]
  },

  "K2_geisterraum": {
    id: "K2_geisterraum",
    kapitel: "Kapitel 2",
    titel: "Das Echo",
    atmosphere: "mystic",
    beschreibung: "Der Gang mündet in einer runden Kammer. In der Mitte schwebt eine Gestalt aus blassem Nebel – ein Geist, gekleidet in die Roben eines alten Direktors.\n\nEr sieht euch nicht an, sondern starrt auf einen leeren Sockel. 'Es fehlt... warum fehlt es?', wimmert er. Seine Stimme klingt wie raschelndes Papier. 'Das Buch muss schlafen. Wenn es wach ist, träumt es Albträume.'\n\nLira weicht zurück. 'Ist das... ein Wächter?'",
    choices: [
      {
        text: "Versuchen, mit ihm zu reden (Empathie).",
        beschreibungFolge: "Du trittst vor. 'Wir wollen helfen. Was ist mit dem Buch passiert?' Der Geist sieht dich zum ersten Mal an. In seinen leeren Augenhöhlen steht unendliche Trauer.",
        werteAenderung: { empathie: 1 },
        flagsAenderung: { geist_geheimnis: true },
        naechsteSzeneId: "K2_geister_nachklang"
      },
      {
        text: "Analysieren: Was hält ihn hier?",
        beschreibungFolge: "Du erkennst die Bindungsrunen am Boden. Er ist kein Wächter, er ist ein Gefangener. Er wurde hier zurückgelassen.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K2_geister_nachklang"
      },
      { text: "Schnell an ihm vorbeischleichen.", beschreibungFolge: "Ihr nutzt seine Verwirrung und huscht in den Schatten an ihm vorbei, tiefer in das Sanktum.", naechsteSzeneId: "K2_geister_nachklang" },
      {
        text: "Ihn fester binden.",
        beschreibungFolge: "Du verstärkst die Runen mit Kreide. Der Geist windet sich, sein Klagen wird dumpfer.",
        flagsAenderung: { geist_gebunden: true },
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K2_geister_nachklang"
      },
      {
        text: "Ihn lösen.",
        beschreibungFolge: "Du wischt vorsichtig eine Rune aus. Für einen Moment wird der Geist klar und fest. Er greift nach deinem Arm: 'Das Buch... es ist aus Arelis' Reue gemacht. Es kann nicht zerstört, nur vergeben werden.' Dann zerfasert er wie Rauch.",
        flagsAenderung: { geist_befreit: true, knows_secret_weakness: true },
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K2_geister_nachklang"
      }
    ]
  },

  "K2_geister_nachklang": {
    id: "K2_geister_nachklang",
    kapitel: "Kapitel 2",
    titel: "Kalter Atem",
    atmosphere: "mystic",
    beschreibung: "Der Nebel des Geistes zieht dir eine Gänsehaut über den Nacken. Seine Klage schwebt noch im Raum – 'das Buch muss schlafen' – und legt sich wie Reif auf deine Gedanken.\n\nDer Gang dahinter ist niedriger, enger. Schwarze Tinte zieht feine Fäden an den Wänden, als wäre sie frisch vergossen. Jeder Schritt klingt, als würdest du durch dickes Papier laufen.\n\nLira lehnt kurz an der Wand, atmet tief durch. Jorin putzt seine Brille so heftig, dass das Glas fast springt. Ihr wisst alle: Hinter der nächsten Tür gibt es kein Zurück mehr.",
    choices: [
      { 
        text: "Einen Schwur leisten: 'Wir gehen da rein. Zusammen. Egal was passiert.'", 
        beschreibungFolge: "Lira sieht dich an, Angst und Entschlossenheit im Blick. Sie legt ihre Hand auf deine. Jorin legt seine zitternde Hand darauf. 'Zusammen', flüstert er. Die Magie zwischen euch verdichtet sich zu einem fast greifbaren Schild.", 
        werteAenderung: { empathie: 2 },
        flagsAenderung: { loyalty_max: true },
        naechsteSzeneId: "K3_nebel_start" 
      },
      {
        text: "Lira fragen: 'Bereit für den größten Ärger unseres Lebens?'",
        beschreibungFolge: "Ein echtes, wildes Grinsen bricht durch ihre Angst. 'Immer. Solange du mir den Rücken freihältst.'",
        flagsAenderung: { lira_ready: true },
        naechsteSzeneId: "K3_nebel_start"
      },
      {
        text: "Jorin fragen: 'Was sagt die Theorie über das Überleben?'",
        beschreibungFolge: "Er schluckt. 'Statistisch gesehen schlecht. Aber Ausnahmen bestätigen die Regel.' Er strafft die Schultern.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K3_nebel_start"
      },
      { text: "Wortlos die Tür öffnen. Fokus.", beschreibungFolge: "Keine Worte mehr. Nur noch Tat.", naechsteSzeneId: "K3_nebel_start" },
      {
        text: "Amulett gegen die Tinte halten.",
        beschreibungFolge: "Das Amulett glimmt; die Tintenfäden weichen kurz, als hätten sie Respekt.",
        flagsAenderung: { amulet_tuned: true },
        naechsteSzeneId: "K3_nebel_start"
      }
    ]
  },

  "K3_nebel_start": {
    id: "K3_nebel_start",
    kapitel: "Kapitel 3",
    titel: "Der Nebel der Vergangenheit",
    atmosphere: "somber",
    beschreibung: "Die Tür zum Sanktum schwingt auf, doch dahinter liegt kein Raum, sondern dichter, grauer Nebel. Stimmen flüstern darin.\n\n'Vorsicht', warnt Jorin, aber seine Stimme klingt weit weg. 'Das ist eine psychomimetische Barriere. Sie liest unsere Erinnerungen.'\n\nPlötzlich schreit Lira auf. Der Nebel hat sie gepackt.",
    choices: [
      {
        text: "Lira folgen! Wir lassen niemanden zurück.",
        beschreibungFolge: "Du stürzt dich in den grauen Dunst.",
        naechsteSzeneId: "K3_lira_trial"
      }
    ]
  },

  "K3_lira_trial": {
    id: "K3_lira_trial",
    kapitel: "Kapitel 3",
    titel: "Liras Prüfung",
    atmosphere: "danger",
    beschreibung: "Du findest Lira am Boden. Über ihr steht eine schemenhafte Gestalt – ein großer Mann in Wächter-Robe.\n\n'Schwach', dröhnt die Gestalt. 'Genau wie deine Mutter. Du wirst Nareth brennen sehen.' Lira wimmert und hält sich die Ohren zu. 'Es stimmt', schluchzt sie. 'Ich bin schuld.'",
    choices: [
      {
        text: "Empathie: 'Das ist nicht dein Vater, Lira! Das ist nur Angst!'",
        beschreibungFolge: "Deine Stimme durchschneidet die Illusion. Lira hebt den Kopf. 'Du... hast recht.' Sie steht auf und schlägt nach dem Schatten. Er verpufft.",
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K3_jorin_trial"
      },
      {
        text: "Angriff: Den Schatten mit Magie attackieren.",
        beschreibungFolge: "Du feuerst einen Lichtblitz ab. Der Schatten weicht zurück, aber Lira ist immer noch erschüttert.",
        flagsAenderung: { party_trauma: true },
        naechsteSzeneId: "K3_jorin_trial"
      }
    ]
  },

  "K3_jorin_trial": {
    id: "K3_jorin_trial",
    kapitel: "Kapitel 3",
    titel: "Jorins Prüfung",
    atmosphere: "somber",
    beschreibung: "Kaum ist Lira frei, siehst du Jorin. Er starrt auf ein brennendes Buch, das im Nebel schwebt. 'Ich habe es falsch berechnet', murmelt er manisch. 'Die Formel... alle sind tot wegen mir.' Er greift nach einem Dolch, um 'den Fehler zu korrigieren'.",
    choices: [
      {
        text: "Logik: 'Jorin! Schau auf die Variablen! Das ist nicht deine Handschrift!'",
        beschreibungFolge: "Er blinzelt. Er rückt seine Brille zurecht. 'Tatsächlich... der Koeffizient ist falsch.' Das Feuer erlischt. Er atmet tief durch.",
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K3_schattenbuch"
      },
      {
        text: "Ihm den Dolch aus der Hand schlagen.",
        beschreibungFolge: "Der Dolch klirrt zu Boden. Jorin zittert am ganzen Leib. 'Danke', flüstert er, aber er wirkt gebrochen.",
        flagsAenderung: { party_trauma: true },
        naechsteSzeneId: "K3_schattenbuch"
      }
    ]
  },

  "K3_schattenbuch": {
    id: "K3_schattenbuch",
    kapitel: "Kapitel 3",
    titel: "Herz aus Tinte",
    atmosphere: "danger",
    beschreibung: "Ihr betretet das Innerste Sanktum. Es ist eine Kathedrale aus schwarzem Stein. Und dort, auf einem Altar aus Knochen, liegt es.\n\nDas Schattenbuch.\n\nEs ist riesig, gebunden in etwas, das wie Drachenhaut aussieht. Es pulsiert im Takt deines Herzschlags. Schwarze Tinte tropft von den Seiten und fließt den Altar hinab wie Blut.\n\nLiras Augen weiten sich. 'Es ist... wunderschön.' Sie macht einen Schritt darauf zu. Jorin hingegen würgt, als müsste er sich übergeben. 'Es fühlt sich falsch an. Wie eine Krankheit.'\n\nDu spürst ein Ziehen in deiner Brust. Das Buch ruft dich.",
    choices: [
      {
        text: "Das Buch beruhigen (Geister-Wissen).",
        beschreibungFolge: "Du flüsterst die Worte, die der Geist dir genannt hat. 'Schlaf... träume nicht.' Das Pochen wird langsamer, die Tinte zieht sich zurück. Du hast Zeit gewonnen.",
        werteAenderung: { wissen: 2, empathie: 1 },
        naechsteSzeneId: "K3_schattenbuch_echo",
        condition: (_s, f) => !!f.geist_geheimnis
      },
      {
        text: "Es berühren. Du musst wissen, was drin steht. (Wissen >=3)",
        beschreibungFolge: "Deine Finger streifen das Leder. Kälte schießt durch deinen Arm. Bilder fluten deinen Geist: Brennende Städte, fallende Sterne... und Arelis, die das Buch versiegelt.",
        werteAenderung: { wissen: 2, mut: 1 },
        flagsAenderung: { saw_shadow_truth: true },
        naechsteSzeneId: "K3_schattenbuch_echo",
        condition: (s) => s.wissen >= 3
      },
      {
        text: "Weg hier! Lira zurückziehen.",
        beschreibungFolge: "Du packst Lira an der Schulter und reißt sie zurück. 'Fass es nicht an!', schreist du. Der Bann bricht, sie blinzelt verwirrt.",
        werteAenderung: { empathie: 1 },
        naechsteSzeneId: "K3_schattenbuch_echo"
      },
      {
        text: "Ein Opfer anbieten (Gegenstand verlieren).",
        beschreibungFolge: "Du legst einen persönlichen Gegenstand – eine Feder, ein Amulettband, einen Dietrich – auf den Altar. Das Buch verstummt für einen Herzschlag, als würde es kosten.",
        flagsAenderung: { offered_item: true },
        naechsteSzeneId: "K3_schattenbuch_echo"
      },
      {
        text: "Mit Tintenwachs versiegeln. (Kerzenwachs)",
        beschreibungFolge: "Du drückst das honigduftende Wachs auf eine Ecke des Buches. Der Duft überlagert kurz den Metallgeruch der Tinte.",
        condition: (_s, _f, i) => i.includes("Kerzenwachs"),
        itemVerlust: "Kerzenwachs",
        flagsAenderung: { wax_used: true },
        naechsteSzeneId: "K3_schattenbuch_echo"
      },
      {
        text: "Runenbeutel streuen.",
        beschreibungFolge: "Du wirfst eine Handvoll Runensand über den Altar. Die Partikel glimmen kurz und ordnen sich zu einem schützenden Kreis.",
        condition: (_s, _f, i) => i.includes("Runenbeutel"),
        itemVerlust: "Runenbeutel",
        flagsAenderung: { runes_shield: true },
        naechsteSzeneId: "K3_schattenbuch_echo"
      }
    ]
  },

  "K3_schattenbuch_echo": {
    id: "K3_schattenbuch_echo",
    kapitel: "Kapitel 3",
    titel: "Tintenhall",
    atmosphere: "danger",
    beschreibung: "Egal, ob du das Buch beruhigt, berührt oder zurückgerissen hast – der Raum pulsiert im Nachhall. Tinte tropft in langsamen, schweren Tropfen, jeder wie ein Herzschlag. Lira wischt sich die Hände an ihrer Robe ab, als könne sie das Gefühl loswerden. Jorin presst das Buch seiner Notizen fester an sich, als Gegengewicht gegen das Gewicht des Schattens.\n\nEin Windstoß, der nach Kreide riecht, fährt durch die Kathedrale. Für einen Atemzug ist alles still – dann flutet gleißendes Licht herein. Ein vertrauter Stab klirrt auf Stein.",
    choices: [
      { text: "Zum Licht wenden.", beschreibungFolge: "Du blinzelst; Arelis steht im Portal.", naechsteSzeneId: "K4_barriere" },
      {
        text: "Kurz mit Lira flüstern.",
        beschreibungFolge: "'Wenn wir hier rauskommen, suchen wir weiter', zischt sie. Oder: 'Wenn wir fallen, dann gemeinsam.'",
        flagsAenderung: { lira_pre_finale: true },
        naechsteSzeneId: "K3_schattenbuch_echo"
      },
      {
        text: "Jorin beruhigen.",
        beschreibungFolge: "Seine Hände zittern. 'Halt mich fest, wenn ich zögere', flüstert er. Du nickst.",
        flagsAenderung: { jorin_pre_finale: true },
        naechsteSzeneId: "K3_schattenbuch_echo"
      }
    ]
  },

  "K4_barriere": {
    id: "K4_barriere",
    kapitel: "Kapitel 4",
    titel: "Die Wächterin fällt",
    atmosphere: "mystic",
    beschreibung: "Bevor ihr reagieren könnt, erzittert der Raum. Licht flutet herein – blendend weiß.\n\n'GENUG!', hallt eine Stimme, die Fels spalten könnte.\n\nProfessor Arelis steht am Eingang des Sanktums. Ihr Haar weht in einem unsichtbaren Sturm, ihr Zauberstab ist auf euch gerichtet. Aber sie wirkt nicht wütend. Sie wirkt... ängstlich.\n\n'Ihr Narren', flüstert sie, und ihre Stimme bricht. 'Ihr wisst nicht, was ihr geweckt habt. Ich habe es versiegelt, um ihn zu schützen. Um euch alle zu schützen.'\n\nHinter ihr beginnt der Schatten des Buches zu wachsen. Er formt Klauen, die nach ihr greifen.",
    choices: [
      { text: "Arelis warnen! 'Hinter dir!'", naechsteSzeneId: "K4_finale_callback" },
      {
        text: "Kurze Frage: 'Wer ist er?'",
        beschreibungFolge: "Arelis’ Augen weiten sich. 'Der Wächter, den ihr vertrieben habt', stößt sie hervor, bevor der Schatten zuschlägt.",
        flagsAenderung: { lore_waechter: true },
        naechsteSzeneId: "K4_finale_callback"
      },
      {
        text: "Den befreiten Geist rufen. (Wenn befreit)",
        beschreibungFolge: "Du flüsterst den Namen, den er hauchte. Ein kalter Hauch streift Arelis, der Schatten zögert einen Herzschlag.",
        flagsAenderung: { geist_called: true, shielded_finale: true },
        condition: (_s, f) => !!f.geist_befreit,
        naechsteSzeneId: "K4_finale_callback"
      },
      {
        text: "Die Runen lösen, um ihn zu befreien. (Wenn gebunden)",
        beschreibungFolge: "Mit hastigen Kreidezügen löschst du ein Zeichen. Der Geist reißt sich los, sein Aufschrei lässt den Schatten flackern.",
        flagsAenderung: { geist_befreit: true, geist_called: true, shielded_finale: true },
        condition: (_s, f) => !!f.geist_gebunden,
        naechsteSzeneId: "K4_finale_callback"
      }
    ]
  },

  "K4_finale_callback": {
    id: "K4_finale_callback",
    kapitel: "Kapitel 4",
    titel: "Entscheidung am Abgrund",
    atmosphere: "danger",
    beschreibung: "Zu spät. Eine Klaue aus reiner Dunkelheit schießt hervor und schmettert Arelis gegen die Wand. Sie rutscht zu Boden, ihr Stab rollt davon.\n\nDas Buch öffnet sich nun vollständig. Ein Wirbelsturm aus Tinte und Schatten bricht los. Jorin klammert sich an eine Säule: 'Der Schild bricht! Wir müssen hier raus!'\n\nLira sieht dich an, ihre Augen voller Panik: 'Tu etwas! Du hast die Führung!'\n\nArelis hebt schwach den Kopf. 'Versiegelt es...', keucht sie. 'Oder... beendet es.'\n\nDie Magie in dir vibriert. Du spürst, dass dies der Moment ist, auf den dich alles vorbereitet hat.",
    effekteBeimBetreten: { mut: 2 },
    choices: [
      {
        text: "Schild wirken, bevor du wählst. (kostet Mut, erleichtert Wahl)",
        beschreibungFolge: "Du reißt rasch ein Schutzgeflecht hoch. Es frisst dir Kraft, dämpft aber den Sturm einen Herzschlag lang.",
        werteAenderung: { mut: -1 },
        flagsAenderung: { shielded_finale: true },
        naechsteSzeneId: "K4_finale_callback"
      },
      {
        text: "Arelis' Stab greifen. (Wissen +1)",
        beschreibungFolge: "Du hechtest nach dem Stab, spürst altvertraute Runen brennen. Ein Hauch von Struktur im Chaos.",
        flagsAenderung: { have_stab: true },
        werteAenderung: { wissen: 1 },
        naechsteSzeneId: "K4_finale_callback",
        condition: (_s, f) => !f.have_stab
      },
      {
        text: "Staubige Phiole über Arelis gießen.",
        beschreibungFolge: "Die Flüssigkeit riecht nach Metall und Minze. Arelis' Atem stabilisiert sich, ihre Augen fokussieren kurz.",
        itemVerlust: "Staubige Phiole",
        flagsAenderung: { arelis_stabilized: true },
        naechsteSzeneId: "K4_finale_callback",
        condition: (_s, _f, i) => i.includes("Staubige Phiole")
      },
      {
        text: "Zusammenstehen! Wir sind stärker als der Schatten! (Empathie >= 2)",
        beschreibungFolge: "Du greifst nach Liras und Jorins Händen. 'Nicht allein', rufst du gegen den Sturm. 'Zusammen!'",
        condition: (s, f) => s.empathie >= 2 || !!f.shielded_finale || !!f.runes_shield || !!f.wax_used || !!f.amulet_tuned || !!f.arelis_stabilized || !!f.have_stab || !!f.geist_called,
        naechsteSzeneId: "K5_freundschaft"
      },
      {
        text: "Das Opfer bringen. Die Magie zerstören. (Wissen >= 2)",
        beschreibungFolge: "Du erkennst die Struktur des Fluchs. Er braucht Magie, um zu existieren. Wenn du ihm die Quelle nimmst...",
        condition: (s, f) => s.wissen >= 2 || !!f.shielded_finale || !!f.runes_shield || !!f.wax_used || !!f.amulet_tuned || !!f.arelis_stabilized || !!f.have_stab || !!f.geist_called,
        naechsteSzeneId: "K5_opfer"
      },
      {
        text: "Die Macht ergreifen. Ich werde der neue Meister! (Mut >= 2)",
        beschreibungFolge: "Warum fürchten, was man beherrschen kann? Du schreitest direkt in den Sturm.",
        condition: (s, f) => s.mut >= 2 || !!f.saw_shadow_truth || !!f.shielded_finale || !!f.runes_shield || !!f.wax_used || !!f.amulet_tuned || !!f.arelis_stabilized || !!f.have_stab || !!f.geist_called,
        naechsteSzeneId: "K5_macht"
      },
      {
        text: "Das Siegel erneuern. Arelis helfen.",
        beschreibungFolge: "Du stürzt dich auf Arelis' Stab und beginnst, die alten Formeln zu rezitieren.",
        condition: (s, f) => s.wissen >= 1 || !!f.shielded_finale || !!f.runes_shield || !!f.wax_used || !!f.amulet_tuned || !!f.arelis_stabilized || !!f.have_stab || !!f.geist_called,
        naechsteSzeneId: "K5_siegel"
      },
      {
        text: "Zögern. Die Angst ist zu groß.",
        beschreibungFolge: "Du erstarrst. Die Schatten kommen näher. Es ist zu viel.",
        naechsteSzeneId: "K5_verrat"
      },
      {
        text: "Arelis misstrauen. Sie hat uns belogen! (Paranoia)",
        beschreibungFolge: "Warum sollten wir ihr helfen? Sie ist der Grund für all das! Du wendest dich ab.",
        condition: (_s, f) => !!f.paranoia_flag,
        naechsteSzeneId: "K5_verrat"
      },
      {
        text: "WAHRES ENDE: Arelis' Tagebuch zitieren.",
        beschreibungFolge: "Du ziehst die Seiten hervor. 'Du hast es nicht aus Bosheit getan, Arelis. Du wolltest uns schützen!' Deine Worte brechen den Bann der Scham, der den Schatten nährt.",
        condition: (_s, _f, i) => i.includes("Tagebuchseite 1") && i.includes("Tagebuchseite 2") && i.includes("Tagebuchseite 3"),
        naechsteSzeneId: "EP_start"
      }
    ]
  },

  "EP_start": {
    id: "EP_start",
    kapitel: "Epilog",
    titel: "Eine Woche später",
    atmosphere: "dream",
    beschreibung: "Der Sturm hat sich gelegt. Nareth steht noch. Die Sonne scheint heller als je zuvor auf die Türme.\n\nDu stehst im Innenhof. Das Leben geht weiter, aber alles hat sich verändert.",
    choices: [
      {
        text: "Nach Lira und Jorin sehen.",
        beschreibungFolge: "Sie sitzen auf der Mauer. Sie winken dir zu. Ihr braucht keine Worte mehr.",
        naechsteSzeneId: "E4_FREUNDSCHAFT" 
      },
      {
        text: "Kaelen suchen.",
        beschreibungFolge: "Er steht abseits. Er sieht dich an – diesmal ohne Spott.",
        naechsteSzeneId: "EP_kaelen",
        condition: (_s, f) => !!f.kaelen_ally
      },
      {
        text: "Einfach den Frieden genießen. (Spiel beenden)",
        beschreibungFolge: "Es ist vorbei. Und es war gut.",
        naechsteSzeneId: "E2_SIEGEL_VERANTWORTUNG"
      }
    ]
  },

  "EP_kaelen": {
    id: "EP_kaelen",
    kapitel: "Epilog",
    titel: "Ein neuer Anfang",
    atmosphere: "normal",
    beschreibung: "Kaelen nickt dir zu. 'Nicht übel für einen Anfänger', sagt er. Aber er lächelt dabei. Vielleicht ist das der Beginn einer echten Rivalität – oder Freundschaft.",
    choices: [
      { text: "Grinsen und gehen.", naechsteSzeneId: "E4_FREUNDSCHAFT" }
    ]
  }
};

export const endings: Record<string, Ending> = {
  "E6_TRUE_ENDING": {
    id: "E6_TRUE_ENDING",
    titel: "Der Kreis schließt sich",
    beschreibung: "Arelis bricht weinend zusammen, aber der Schatten löst sich auf – nicht durch Gewalt, sondern durch Verständnis. Du hast nicht nur die Schule gerettet, sondern auch die Seele deiner Lehrerin geheilt. Sie tritt zurück und übergibt dir die Leitung der Bibliothek. Diesmal aber als Ort des Wissens, nicht der Angst."
  },
  "E1_RETTUNG_VERLUST": {
    id: "E1_RETTUNG_VERLUST",
    titel: "Das Opfer des Wissens",
    beschreibung: "Du entscheidest dich, das Buch zu opfern. Mit einem grellen Blitz löst sich das Schattenbuch auf. Doch das Wissen hat seinen Preis: Du verlierst deine magische Kraft, hast aber Nareth gerettet. Jorin klopft dir auf die Schulter. 'Wir haben es überlebt. Das ist Magie genug.'"
  },
  "E2_SIEGEL_VERANTWORTUNG": {
    id: "E2_SIEGEL_VERANTWORTUNG",
    titel: "Hüter des Siegels",
    beschreibung: "Du erneuerst das Siegel mit Arelis' Hilfe. Es kostet dich fast deine gesamte Willenskraft, aber die Bibliothek wird wieder sicher verschlossen. Arelis ernennt dich offiziell zum 'Hüter des Schattens'. Dein Schulleben geht weiter, aber du trägst nun eine schwere Last."
  },
  "E3_MACHT_EGO": {
    id: "E3_MACHT_EGO",
    titel: "Schattenmeister",
    beschreibung: "Du greifst nach dem Buch und unterwirfst den Schatten deinem Willen. Die Macht durchströmt dich, süß und dunkel. Arelis weicht entsetzt zurück. Du bist nicht mehr ihr Schüler – du bist ihr Meister. Aber Lira und Jorin wenden sich von dir ab. Du hast die Macht, aber du bist allein."
  },
  "E4_FREUNDSCHAFT": {
    id: "E4_FREUNDSCHAFT",
    titel: "Der Zirkel von Nareth",
    beschreibung: "Ihr drei – Du, Lira und Jorin – bündelt eure Magie. Chaos, Ordnung und Empathie verschmelzen zu einem Licht, das die Schatten vertreibt, ohne sie zu vernichten. Arelis lächelt stolz. 'Das ist die wahre Magie von Nareth.' Ihr habt nicht nur die Schule gerettet, sondern einen Bund fürs Leben geschlossen."
  },
  "E5_Verrat": {
    id: "E5_Verrat",
    titel: "Der Ewig Schreibende",
    beschreibung: "Du zögerst zu lange oder wendest dich im falschen Moment ab. Der Schatten bricht aus dem Buch und hüllt die Bibliothek nicht in Dunkelheit, sondern in Pergament. Du schreist, aber kein Ton kommt heraus – nur Tinte tropft von deinen Lippen.\n\nDu spürst, wie du flach wirst, zweidimensional. Arelis, Lira, Jorin... ihr alle werdet auf die Seiten gesogen. Ihr seid nun Teil der Geschichte – dazu verdammt, das tragische letzte Kapitel immer und immer wieder zu durchleben, während neue Schüler euch lesen, aber niemals befreien. Das Buch klappt zu."
  }
};

export const initialStats: PlayerStats = {
  mut: 0,
  wissen: 0,
  empathie: 0
};
