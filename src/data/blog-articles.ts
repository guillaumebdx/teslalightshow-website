import xlightshowsImg from '@/assets/blog/xlightshows_screenshot.png'
import teslalightshareImg from '@/assets/blog/tesla_light_share_screenshot.png'
import xlightsImg from '@/assets/blog/xlights_overview.png'
import glovebox from '@/assets/blog/boite-a-gant.jpg'
import exportScreen from '@/assets/blog/export.png'

// --------------- Types ---------------
export type BlockType =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'cta'; text: string; href: string }
  | { type: 'list'; items: string[] }

export interface ArticleTranslation {
  title: string
  description: string
  content: BlockType[]
}

export interface BlogArticle {
  slug: string
  date: string
  thumbnail: string
  translations: Record<string, ArticleTranslation>
}

// --------------- Articles ---------------
export const articles: BlogArticle[] = [
  {
    slug: 'tesla-light-show-communities-download-ready-made-shows',
    date: '2026-03-29',
    thumbnail: xlightshowsImg,
    translations: {
      en: {
        title: 'Tesla Light Show Communities: Download Ready-Made Shows',
        description:
          'Discover the best Tesla light show communities where you can download free, ready-to-play .fseq light shows for your Model 3, Model Y, Model S, Model X and Cybertruck.',
        content: [
          {
            type: 'paragraph',
            text: "Tesla light shows have become a global phenomenon. Since Tesla opened its Light Show feature to custom .fseq files, a vibrant community of creators has emerged — sharing thousands of free, ready-to-play shows you can load onto your vehicle in minutes. Whether you're looking for a holiday classic, a high-energy EDM sync, or something cinematic, chances are someone has already built it.",
          },
          {
            type: 'heading',
            text: 'xLightShows — The Largest Tesla Light Show Library',
          },
          {
            type: 'paragraph',
            text: 'xLightShows.io is one of the most popular platforms for downloading Tesla light shows. It hosts a massive catalog of community-created shows, organized by genre, popularity and vehicle compatibility. Each show comes with the .fseq file and the matching audio track, ready to transfer to a USB drive.',
          },
          {
            type: 'image',
            src: xlightshowsImg,
            alt: 'xLightShows.io — Tesla light show download platform',
            caption: 'xLightShows.io — browse and download thousands of Tesla light shows',
          },
          {
            type: 'paragraph',
            text: "The platform features shows for all Tesla models that support the light show feature. You'll find everything from Christmas classics to modern chart-toppers, all carefully synced by community members. It's a great starting point if you want to see what's possible with Tesla light shows.",
          },
          {
            type: 'heading',
            text: 'Tesla Light Share — Community-Driven Light Show Exchange',
          },
          {
            type: 'paragraph',
            text: "TeslaLightShare.io is another excellent community hub dedicated to Tesla light shows. The platform focuses on community sharing and collaboration, letting creators upload their shows and receive feedback. It's a great place to discover unique, creative light shows that you won't find anywhere else.",
          },
          {
            type: 'image',
            src: teslalightshareImg,
            alt: 'TeslaLightShare.io — Tesla light show community platform',
            caption: 'TeslaLightShare.io — share and discover community Tesla light shows',
          },
          {
            type: 'paragraph',
            text: "Both platforms make it incredibly easy to get started: download the files, copy them to a USB drive formatted as FAT32 or exFAT, place them in a folder called \"LightShow\", plug the drive into your Tesla, and activate the light show from your vehicle's Toybox menu.",
          },
          {
            type: 'heading',
            text: 'Create Your Own Tesla Light Show with LightShow Studio',
          },
          {
            type: 'paragraph',
            text: "Downloading ready-made shows is fun, but nothing beats creating your own Tesla light show from scratch. With LightShow Studio, you can design a fully custom light show synchronized to your favorite music — with millisecond precision. Control all 21 vehicle elements individually: headlights, turn signals, fog lights, brake lights, windows, mirrors, trunk and charge port.",
          },
          {
            type: 'paragraph',
            text: "Don't want to start from zero? The built-in AI analyzes your music and generates a complete, perfectly synchronized light show in seconds. Choose a preset mood — Fireworks, Party, Romantic, Spooky — or describe your vision in a custom prompt. Then fine-tune every detail on the visual timeline, or just export and enjoy.",
          },
          {
            type: 'cta',
            text: 'Create your Tesla Light Show for free →',
            href: '/#download',
          },
          {
            type: 'paragraph',
            text: 'LightShow Studio exports native .fseq files — the exact same format used by the communities above. Your creations are fully compatible with any Tesla that supports light shows. Available for free on iOS and Android.',
          },
        ],
      },
      fr: {
        title: 'Communautés Tesla Light Show : téléchargez des shows prêts à l\'emploi',
        description:
          'Découvrez les meilleures communautés Tesla light show où télécharger gratuitement des fichiers .fseq prêts à jouer pour votre Model 3, Model Y, Model S, Model X et Cybertruck.',
        content: [
          {
            type: 'paragraph',
            text: "Les Tesla light shows sont devenus un phénomène mondial. Depuis que Tesla a ouvert sa fonction Light Show aux fichiers .fseq personnalisés, une communauté dynamique de créateurs a vu le jour — partageant des milliers de shows gratuits, prêts à jouer, que vous pouvez charger sur votre véhicule en quelques minutes. Que vous cherchiez un classique de Noël, un sync EDM énergique ou quelque chose de cinématique, il y a de grandes chances que quelqu'un l'ait déjà créé.",
          },
          {
            type: 'heading',
            text: 'xLightShows — La plus grande bibliothèque de Tesla Light Shows',
          },
          {
            type: 'paragraph',
            text: "xLightShows.io est l'une des plateformes les plus populaires pour télécharger des Tesla light shows. Elle héberge un catalogue massif de shows créés par la communauté, organisés par genre, popularité et compatibilité véhicule. Chaque show inclut le fichier .fseq et la piste audio correspondante, prêts à transférer sur une clé USB.",
          },
          {
            type: 'image',
            src: xlightshowsImg,
            alt: 'xLightShows.io — plateforme de téléchargement de Tesla light shows',
            caption: 'xLightShows.io — parcourez et téléchargez des milliers de Tesla light shows',
          },
          {
            type: 'paragraph',
            text: "La plateforme propose des shows pour tous les modèles Tesla compatibles. Vous trouverez de tout : classiques de Noël, tubes du moment, le tout soigneusement synchronisé par les membres de la communauté. C'est un excellent point de départ pour découvrir ce qui est possible avec les Tesla light shows.",
          },
          {
            type: 'heading',
            text: 'Tesla Light Share — Échange communautaire de Light Shows',
          },
          {
            type: 'paragraph',
            text: "TeslaLightShare.io est un autre excellent hub communautaire dédié aux Tesla light shows. La plateforme met l'accent sur le partage et la collaboration, permettant aux créateurs de publier leurs shows et de recevoir des retours. C'est l'endroit idéal pour découvrir des light shows uniques et créatifs que vous ne trouverez nulle part ailleurs.",
          },
          {
            type: 'image',
            src: teslalightshareImg,
            alt: 'TeslaLightShare.io — plateforme communautaire Tesla light show',
            caption: 'TeslaLightShare.io — partagez et découvrez des Tesla light shows communautaires',
          },
          {
            type: 'paragraph',
            text: "Les deux plateformes rendent le démarrage incroyablement simple : téléchargez les fichiers, copiez-les sur une clé USB formatée en FAT32 ou exFAT, placez-les dans un dossier \"LightShow\", branchez la clé dans votre Tesla, et activez le light show depuis le menu Toybox de votre véhicule.",
          },
          {
            type: 'heading',
            text: 'Créez votre propre Tesla Light Show avec LightShow Studio',
          },
          {
            type: 'paragraph',
            text: "Télécharger des shows existants c'est sympa, mais rien ne vaut la création de votre propre Tesla light show. Avec LightShow Studio, concevez un show entièrement personnalisé synchronisé sur votre musique préférée — avec une précision à la milliseconde. Contrôlez individuellement les 21 éléments du véhicule : phares, clignotants, antibrouillards, feux stop, vitres, rétroviseurs, coffre et trappe de charge.",
          },
          {
            type: 'paragraph',
            text: "Vous ne voulez pas partir de zéro ? L'IA intégrée analyse votre musique et génère un light show complet et parfaitement synchronisé en quelques secondes. Choisissez une ambiance prédéfinie — Feux d'artifice, Fête, Romantique, Spooky — ou décrivez votre vision dans un prompt personnalisé. Affinez ensuite chaque détail sur la timeline visuelle, ou exportez directement.",
          },
          {
            type: 'cta',
            text: 'Créez votre Tesla Light Show gratuitement →',
            href: '/#download',
          },
          {
            type: 'paragraph',
            text: "LightShow Studio exporte des fichiers .fseq natifs — exactement le même format utilisé par les communautés ci-dessus. Vos créations sont entièrement compatibles avec toute Tesla supportant les light shows. Disponible gratuitement sur iOS et Android.",
          },
        ],
      },
      de: {
        title: 'Tesla Light Show Communities: Fertige Shows herunterladen',
        description:
          'Entdecken Sie die besten Tesla Light Show Communities, wo Sie kostenlose .fseq Light Shows für Ihr Model 3, Model Y, Model S, Model X und Cybertruck herunterladen können.',
        content: [
          {
            type: 'paragraph',
            text: 'Tesla Light Shows sind zu einem globalen Phänomen geworden. Seit Tesla seine Light Show-Funktion für benutzerdefinierte .fseq-Dateien geöffnet hat, ist eine lebendige Community von Erstellern entstanden — die Tausende von kostenlosen, abspielbereiten Shows teilt, die Sie in wenigen Minuten auf Ihr Fahrzeug laden können.',
          },
          {
            type: 'heading',
            text: 'xLightShows — Die größte Tesla Light Show Bibliothek',
          },
          {
            type: 'paragraph',
            text: 'xLightShows.io ist eine der beliebtesten Plattformen zum Herunterladen von Tesla Light Shows. Sie beherbergt einen riesigen Katalog von Community-Shows, organisiert nach Genre, Beliebtheit und Fahrzeugkompatibilität.',
          },
          {
            type: 'image',
            src: xlightshowsImg,
            alt: 'xLightShows.io — Tesla Light Show Download-Plattform',
            caption: 'xLightShows.io — Tausende Tesla Light Shows durchsuchen und herunterladen',
          },
          {
            type: 'heading',
            text: 'Tesla Light Share — Community-getriebener Light Show Austausch',
          },
          {
            type: 'paragraph',
            text: 'TeslaLightShare.io ist ein weiterer hervorragender Community-Hub für Tesla Light Shows. Die Plattform konzentriert sich auf Teilen und Zusammenarbeit.',
          },
          {
            type: 'image',
            src: teslalightshareImg,
            alt: 'TeslaLightShare.io — Tesla Light Show Community-Plattform',
            caption: 'TeslaLightShare.io — Tesla Light Shows teilen und entdecken',
          },
          {
            type: 'paragraph',
            text: 'Beide Plattformen machen den Einstieg einfach: Dateien herunterladen, auf einen FAT32/exFAT-USB-Stick kopieren, in einen Ordner "LightShow" legen, einstecken und über das Toybox-Menü aktivieren.',
          },
          {
            type: 'heading',
            text: 'Erstellen Sie Ihre eigene Tesla Light Show mit LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'Fertige Shows herunterladen macht Spaß, aber nichts geht über eine selbst erstellte Tesla Light Show. Mit LightShow Studio gestalten Sie eine vollständig individuelle Light Show, synchronisiert zu Ihrer Lieblingsmusik — mit Millisekunden-Präzision. Die integrierte KI kann auch eine komplette Show in Sekunden generieren.',
          },
          {
            type: 'cta',
            text: 'Erstellen Sie Ihre Tesla Light Show kostenlos →',
            href: '/#download',
          },
          {
            type: 'paragraph',
            text: 'LightShow Studio exportiert native .fseq-Dateien — genau das Format der oben genannten Communities. Kostenlos für iOS und Android verfügbar.',
          },
        ],
      },
      es: {
        title: 'Comunidades Tesla Light Show: Descarga shows listos para usar',
        description:
          'Descubre las mejores comunidades de Tesla light show donde descargar archivos .fseq gratuitos para tu Model 3, Model Y, Model S, Model X y Cybertruck.',
        content: [
          {
            type: 'paragraph',
            text: 'Los Tesla light shows se han convertido en un fenómeno global. Desde que Tesla abrió su función Light Show a archivos .fseq personalizados, ha surgido una vibrante comunidad de creadores — compartiendo miles de shows gratuitos listos para reproducir que puedes cargar en tu vehículo en minutos.',
          },
          {
            type: 'heading',
            text: 'xLightShows — La mayor biblioteca de Tesla Light Shows',
          },
          {
            type: 'paragraph',
            text: 'xLightShows.io es una de las plataformas más populares para descargar Tesla light shows. Alberga un catálogo masivo de shows creados por la comunidad, organizados por género, popularidad y compatibilidad de vehículos.',
          },
          {
            type: 'image',
            src: xlightshowsImg,
            alt: 'xLightShows.io — plataforma de descarga de Tesla light shows',
            caption: 'xLightShows.io — explora y descarga miles de Tesla light shows',
          },
          {
            type: 'heading',
            text: 'Tesla Light Share — Intercambio comunitario de Light Shows',
          },
          {
            type: 'paragraph',
            text: 'TeslaLightShare.io es otro excelente centro comunitario dedicado a los Tesla light shows. La plataforma se centra en compartir y colaborar.',
          },
          {
            type: 'image',
            src: teslalightshareImg,
            alt: 'TeslaLightShare.io — plataforma comunitaria de Tesla light shows',
            caption: 'TeslaLightShare.io — comparte y descubre Tesla light shows comunitarios',
          },
          {
            type: 'paragraph',
            text: 'Ambas plataformas facilitan el inicio: descarga los archivos, cópialos a una memoria USB en FAT32/exFAT, colócalos en una carpeta "LightShow", conecta la memoria a tu Tesla y activa el light show desde el menú Toybox.',
          },
          {
            type: 'heading',
            text: 'Crea tu propio Tesla Light Show con LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'Descargar shows es divertido, pero nada supera crear tu propio Tesla light show. Con LightShow Studio, diseña un show completamente personalizado sincronizado con tu música favorita — con precisión al milisegundo. La IA integrada también puede generar un show completo en segundos.',
          },
          {
            type: 'cta',
            text: 'Crea tu Tesla Light Show gratis →',
            href: '/#download',
          },
          {
            type: 'paragraph',
            text: 'LightShow Studio exporta archivos .fseq nativos — el mismo formato usado por las comunidades mencionadas. Disponible gratis en iOS y Android.',
          },
        ],
      },
    },
  },
  {
    slug: 'xlights-create-tesla-light-shows-on-pc',
    date: '2026-03-29',
    thumbnail: xlightsImg,
    translations: {
      en: {
        title: 'xLights: Create Tesla Light Shows on Your PC',
        description:
          'Discover xLights, the free open-source software to create Tesla light shows on PC and Mac. A powerful, highly customizable tool for advanced light show creators.',
        content: [
          {
            type: 'paragraph',
            text: 'If you\'re serious about creating Tesla light shows and prefer working on a computer, xLights is the go-to tool. Originally designed for holiday lighting displays, xLights has become one of the most popular desktop applications for building custom Tesla light shows — and it\'s completely free and open-source.',
          },
          {
            type: 'heading',
            text: 'What is xLights?',
          },
          {
            type: 'paragraph',
            text: 'xLights is a free, open-source sequencing software available on Windows, Mac and Linux. It was originally built for Christmas light displays, but the Tesla community adopted it to create custom .fseq light shows for Tesla vehicles. The software lets you map every controllable element of your Tesla — headlights, turn signals, fog lights, brake lights, windows, mirrors, trunk and charge port — onto a visual sequencing grid.',
          },
          {
            type: 'image',
            src: xlightsImg,
            alt: 'xLights software interface — Tesla light show sequencer on PC',
            caption: 'xLights — a powerful open-source sequencer for Tesla light shows',
          },
          {
            type: 'heading',
            text: 'A Highly Customizable Tesla Light Show Tool',
          },
          {
            type: 'paragraph',
            text: 'What makes xLights stand out is the sheer level of customization it offers. You have full control over every single light event: timing, duration, intensity, fade curves, effects and patterns. The timeline editor lets you zoom in to the millisecond and place events with surgical precision. You can layer effects, create complex sequences and fine-tune every detail of your Tesla light show.',
          },
          {
            type: 'paragraph',
            text: 'The software also supports importing audio files and displaying the waveform alongside your sequence, making it easier to sync lights to the beat. Advanced users can create macros, use effect presets and even script custom behaviors.',
          },
          {
            type: 'heading',
            text: 'The Learning Curve',
          },
          {
            type: 'paragraph',
            text: 'xLights is incredibly powerful, but that power comes with complexity. The interface can feel overwhelming at first — there are dozens of menus, panels and settings. Setting up a Tesla model mapping requires some initial configuration, and the workflow is designed for desktop use with a mouse and keyboard. For experienced creators who want maximum control, it\'s unbeatable. But if you\'re new to Tesla light shows, the learning curve can be steep.',
          },
          {
            type: 'heading',
            text: 'Create Tesla Light Shows on Mobile with LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'If you want a simpler, more intuitive way to create Tesla light shows — especially on the go — LightShow Studio is the perfect complement. Designed specifically for Tesla, the app gives you an interactive 3D model where you tap directly on vehicle elements to add light events. The visual timeline is synced to your audio with millisecond precision, and the built-in AI can generate a complete light show from your music in seconds.',
          },
          {
            type: 'paragraph',
            text: 'No complex setup, no configuration files — just pick a song, place your events (or let the AI do it), and export a ready-to-play .fseq file. Whether you prefer the deep customization of xLights on PC or the speed and simplicity of LightShow Studio on mobile, both tools export the same native Tesla .fseq format.',
          },
          {
            type: 'cta',
            text: 'Try LightShow Studio for free \u2192',
            href: '/#download',
          },
        ],
      },
      fr: {
        title: 'xLights : cr\u00e9ez des Tesla Light Shows sur PC',
        description:
          'D\u00e9couvrez xLights, le logiciel gratuit et open-source pour cr\u00e9er des Tesla light shows sur PC et Mac. Un outil puissant et tr\u00e8s personnalisable pour les cr\u00e9ateurs avanc\u00e9s.',
        content: [
          {
            type: 'paragraph',
            text: 'Si vous souhaitez cr\u00e9er des Tesla light shows et que vous pr\u00e9f\u00e9rez travailler sur ordinateur, xLights est l\u2019outil de r\u00e9f\u00e9rence. Con\u00e7u \u00e0 l\u2019origine pour les d\u00e9corations lumineuses de No\u00ebl, xLights est devenu l\u2019un des logiciels desktop les plus populaires pour concevoir des light shows Tesla personnalis\u00e9s \u2014 et il est enti\u00e8rement gratuit et open-source.',
          },
          {
            type: 'heading',
            text: 'Qu\u2019est-ce que xLights ?',
          },
          {
            type: 'paragraph',
            text: 'xLights est un logiciel de s\u00e9quen\u00e7age gratuit et open-source disponible sur Windows, Mac et Linux. Il a \u00e9t\u00e9 initialement cr\u00e9\u00e9 pour les illuminations de No\u00ebl, mais la communaut\u00e9 Tesla l\u2019a adopt\u00e9 pour cr\u00e9er des fichiers .fseq personnalis\u00e9s. Le logiciel permet de mapper chaque \u00e9l\u00e9ment contr\u00f4lable de votre Tesla \u2014 phares, clignotants, antibrouillards, feux stop, vitres, r\u00e9troviseurs, coffre et trappe de charge \u2014 sur une grille de s\u00e9quen\u00e7age visuel.',
          },
          {
            type: 'image',
            src: xlightsImg,
            alt: 'Interface xLights \u2014 s\u00e9quenceur Tesla light show sur PC',
            caption: 'xLights \u2014 un s\u00e9quenceur open-source puissant pour Tesla light shows',
          },
          {
            type: 'heading',
            text: 'Un outil Tesla Light Show ultra personnalisable',
          },
          {
            type: 'paragraph',
            text: 'Ce qui distingue xLights, c\u2019est le niveau de personnalisation qu\u2019il offre. Vous avez un contr\u00f4le total sur chaque \u00e9v\u00e9nement lumineux : timing, dur\u00e9e, intensit\u00e9, courbes de fondu, effets et patterns. L\u2019\u00e9diteur de timeline permet de zoomer jusqu\u2019\u00e0 la milliseconde et de placer les \u00e9v\u00e9nements avec une pr\u00e9cision chirurgicale. Vous pouvez superposer des effets, cr\u00e9er des s\u00e9quences complexes et affiner chaque d\u00e9tail de votre Tesla light show.',
          },
          {
            type: 'paragraph',
            text: 'Le logiciel supporte \u00e9galement l\u2019import de fichiers audio et l\u2019affichage de la waveform \u00e0 c\u00f4t\u00e9 de votre s\u00e9quence, facilitant la synchronisation des lumi\u00e8res sur le rythme. Les utilisateurs avanc\u00e9s peuvent cr\u00e9er des macros, utiliser des presets d\u2019effets et m\u00eame scripter des comportements personnalis\u00e9s.',
          },
          {
            type: 'heading',
            text: 'La courbe d\u2019apprentissage',
          },
          {
            type: 'paragraph',
            text: 'xLights est incroyablement puissant, mais cette puissance s\u2019accompagne de complexit\u00e9. L\u2019interface peut sembler intimidante au d\u00e9but \u2014 il y a des dizaines de menus, panneaux et r\u00e9glages. La configuration du mapping Tesla n\u00e9cessite un param\u00e9trage initial, et le workflow est con\u00e7u pour un usage desktop avec souris et clavier. Pour les cr\u00e9ateurs exp\u00e9riment\u00e9s qui veulent un contr\u00f4le maximal, c\u2019est imbattable. Mais si vous d\u00e9butez dans les Tesla light shows, la prise en main peut \u00eatre ardue.',
          },
          {
            type: 'heading',
            text: 'Cr\u00e9ez des Tesla Light Shows sur mobile avec LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'Si vous cherchez un moyen plus simple et intuitif de cr\u00e9er des Tesla light shows \u2014 surtout en mobilit\u00e9 \u2014 LightShow Studio est le compl\u00e9ment parfait. Con\u00e7ue sp\u00e9cifiquement pour Tesla, l\u2019app vous offre un mod\u00e8le 3D interactif o\u00f9 vous touchez directement les \u00e9l\u00e9ments du v\u00e9hicule pour ajouter des \u00e9v\u00e9nements lumineux. La timeline visuelle est synchronis\u00e9e \u00e0 votre audio \u00e0 la milliseconde, et l\u2019IA int\u00e9gr\u00e9e peut g\u00e9n\u00e9rer un light show complet en quelques secondes.',
          },
          {
            type: 'paragraph',
            text: 'Pas de configuration complexe, pas de fichiers de mapping \u2014 choisissez une chanson, placez vos \u00e9v\u00e9nements (ou laissez l\u2019IA le faire), et exportez un fichier .fseq pr\u00eat \u00e0 jouer. Que vous pr\u00e9f\u00e9riez la personnalisation profonde de xLights sur PC ou la rapidit\u00e9 et la simplicit\u00e9 de LightShow Studio sur mobile, les deux outils exportent le m\u00eame format natif Tesla .fseq.',
          },
          {
            type: 'cta',
            text: 'Essayez LightShow Studio gratuitement \u2192',
            href: '/#download',
          },
        ],
      },
      de: {
        title: 'xLights: Tesla Light Shows am PC erstellen',
        description:
          'Entdecken Sie xLights, die kostenlose Open-Source-Software zum Erstellen von Tesla Light Shows auf PC und Mac. Ein leistungsstarkes, hochgradig anpassbares Tool.',
        content: [
          {
            type: 'paragraph',
            text: 'Wenn Sie Tesla Light Shows erstellen m\u00f6chten und lieber am Computer arbeiten, ist xLights das Werkzeug der Wahl. Urspr\u00fcnglich f\u00fcr Weihnachtsbeleuchtungen entwickelt, ist xLights zu einer der beliebtesten Desktop-Anwendungen f\u00fcr Tesla Light Shows geworden \u2014 kostenlos und Open-Source.',
          },
          {
            type: 'heading',
            text: 'Was ist xLights?',
          },
          {
            type: 'paragraph',
            text: 'xLights ist eine kostenlose Sequenzierungs-Software f\u00fcr Windows, Mac und Linux. Sie erm\u00f6glicht es, jeden steuerbaren Tesla-Element \u2014 Scheinwerfer, Blinker, Nebelscheinwerfer, Bremslichter, Fenster, Spiegel, Kofferraum und Ladeklappe \u2014 auf einem visuellen Raster zu platzieren.',
          },
          {
            type: 'image',
            src: xlightsImg,
            alt: 'xLights Software \u2014 Tesla Light Show Sequencer am PC',
            caption: 'xLights \u2014 ein leistungsstarker Open-Source-Sequencer f\u00fcr Tesla Light Shows',
          },
          {
            type: 'heading',
            text: 'Ein hochgradig anpassbares Tesla Light Show Tool',
          },
          {
            type: 'paragraph',
            text: 'Was xLights auszeichnet, ist das enorme Ma\u00df an Anpassungsm\u00f6glichkeiten. Sie haben volle Kontrolle \u00fcber jedes Lichtereignis: Timing, Dauer, Intensit\u00e4t, Fade-Kurven, Effekte und Muster. Der Timeline-Editor erlaubt Zoom bis auf die Millisekunde.',
          },
          {
            type: 'heading',
            text: 'Die Lernkurve',
          },
          {
            type: 'paragraph',
            text: 'xLights ist unglaublich leistungsstark, aber die Oberfl\u00e4che kann anfangs \u00fcberw\u00e4ltigend wirken. F\u00fcr erfahrene Ersteller ist es unschlagbar. Wenn Sie neu bei Tesla Light Shows sind, kann der Einstieg steil sein.',
          },
          {
            type: 'heading',
            text: 'Tesla Light Shows mobil erstellen mit LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'F\u00fcr einen einfacheren Weg, Tesla Light Shows zu erstellen \u2014 besonders unterwegs \u2014 ist LightShow Studio die perfekte Erg\u00e4nzung. Ein interaktives 3D-Modell, visuelle Timeline mit Millisekunden-Pr\u00e4zision und integrierte KI. Beide Tools exportieren dasselbe native Tesla .fseq-Format.',
          },
          {
            type: 'cta',
            text: 'LightShow Studio kostenlos testen \u2192',
            href: '/#download',
          },
        ],
      },
      es: {
        title: 'xLights: crea Tesla Light Shows en tu PC',
        description:
          'Descubre xLights, el software gratuito y open-source para crear Tesla light shows en PC y Mac. Una herramienta potente y altamente personalizable.',
        content: [
          {
            type: 'paragraph',
            text: 'Si quieres crear Tesla light shows y prefieres trabajar en un ordenador, xLights es la herramienta de referencia. Dise\u00f1ado originalmente para decoraciones navide\u00f1as, xLights se ha convertido en una de las aplicaciones de escritorio m\u00e1s populares para crear light shows Tesla personalizados \u2014 completamente gratis y open-source.',
          },
          {
            type: 'heading',
            text: '\u00bfQu\u00e9 es xLights?',
          },
          {
            type: 'paragraph',
            text: 'xLights es un software de secuenciaci\u00f3n gratuito para Windows, Mac y Linux. Permite mapear cada elemento controlable de tu Tesla \u2014 faros, intermitentes, antiniebla, luces de freno, ventanas, espejos, maletero y puerto de carga \u2014 en una cuadr\u00edcula de secuenciaci\u00f3n visual.',
          },
          {
            type: 'image',
            src: xlightsImg,
            alt: 'Interfaz de xLights \u2014 secuenciador de Tesla light shows en PC',
            caption: 'xLights \u2014 un potente secuenciador open-source para Tesla light shows',
          },
          {
            type: 'heading',
            text: 'Una herramienta Tesla Light Show altamente personalizable',
          },
          {
            type: 'paragraph',
            text: 'Lo que distingue a xLights es el nivel de personalizaci\u00f3n que ofrece. Tienes control total sobre cada evento de luz: timing, duraci\u00f3n, intensidad, curvas de fade, efectos y patrones. El editor de timeline permite hacer zoom hasta el milisegundo.',
          },
          {
            type: 'heading',
            text: 'La curva de aprendizaje',
          },
          {
            type: 'paragraph',
            text: 'xLights es incre\u00edblemente potente, pero la interfaz puede resultar abrumadora al principio. Para creadores experimentados es inigualable. Si eres nuevo en los Tesla light shows, el aprendizaje puede ser empinado.',
          },
          {
            type: 'heading',
            text: 'Crea Tesla Light Shows en m\u00f3vil con LightShow Studio',
          },
          {
            type: 'paragraph',
            text: 'Para una forma m\u00e1s simple de crear Tesla light shows \u2014 especialmente en movimiento \u2014 LightShow Studio es el complemento perfecto. Modelo 3D interactivo, timeline visual con precisi\u00f3n al milisegundo e IA integrada. Ambas herramientas exportan el mismo formato nativo Tesla .fseq.',
          },
          {
            type: 'cta',
            text: 'Prueba LightShow Studio gratis \u2192',
            href: '/#download',
          },
        ],
      },
    },
  },
  {
    slug: 'how-to-install-tesla-light-show-usb',
    date: '2026-03-29',
    thumbnail: glovebox,
    translations: {
      en: {
        title: 'How to Install a Tesla Light Show via USB',
        description:
          'Step-by-step guide to install a custom Tesla light show on your Model 3, Model Y, Model S, Model X or Cybertruck using a USB drive. Formatting, folder structure and troubleshooting tips.',
        content: [
          {
            type: 'paragraph',
            text: "Installing a custom Tesla light show is surprisingly simple \u2014 all you need is a USB flash drive and a .fseq file paired with its audio track. This guide covers everything: which USB drive to use, how to format it, how to structure your files, and how to launch your show from the vehicle's touchscreen.",
          },
          {
            type: 'heading',
            text: 'What You Need',
          },
          {
            type: 'list',
            items: [
              'A Tesla running software v11.0 (2021.44.25) or newer',
              'A supported vehicle: Model S (2021+), Model 3, Model X (2021+), Model Y or Cybertruck',
              'A USB flash drive (any size \u2014 light show files are small)',
              'A .fseq light show file and its matching .mp3 or .wav audio file',
            ],
          },
          {
            type: 'heading',
            text: 'Step 1: Format Your USB Drive',
          },
          {
            type: 'paragraph',
            text: 'Your USB drive must be formatted as exFAT or FAT32 (on Windows) or MS-DOS FAT (on Mac). ext3 and ext4 also work on Linux. Important: NTFS is not supported by Tesla. If your drive is NTFS, you will need to reformat it.',
          },
          {
            type: 'paragraph',
            text: 'Two critical rules: the drive must not contain a \"TeslaCam\" folder at the root level, and must not contain any map update or firmware update files. If you previously used this drive for Sentry Mode or dashcam, use a different one or reformat it completely.',
          },
          {
            type: 'heading',
            text: 'Step 2: Create the LightShow Folder',
          },
          {
            type: 'paragraph',
            text: 'At the root of your USB drive, create a folder named exactly \"LightShow\" (capital L, capital S, no spaces). The name is case-sensitive \u2014 \"lightshow\" or \"Lightshow\" will not work.',
          },
          {
            type: 'heading',
            text: 'Step 3: Add Your Light Show Files',
          },
          {
            type: 'paragraph',
            text: 'Place your .fseq file and its matching audio file (.mp3 or .wav) inside the LightShow folder. The filenames must match exactly: for example, \"myshow.fseq\" and \"myshow.mp3\". Tesla recommends using .wav format with a 44.1 kHz sample rate for best synchronization. You can add multiple shows to the same USB drive \u2014 just make sure each pair of files shares the same base name.',
          },
          {
            type: 'paragraph',
            text: 'Your USB structure should look like this: USB root \u2192 LightShow/ \u2192 myshow.fseq + myshow.mp3 (and optionally show2.fseq + show2.wav, etc.).',
          },
          {
            type: 'heading',
            text: 'Step 4: Plug In and Launch',
          },
          {
            type: 'paragraph',
            text: 'Insert the USB drive into one of your Tesla\'s USB ports. On Model 3 and Model Y (post-2021), the USB data port is located inside the glovebox. On older models, use the front console USB ports. Do not use a port that is dedicated to charging only \u2014 it must be a data-capable USB port.',
          },
          {
            type: 'image',
            src: glovebox,
            alt: 'Tesla Model 3 / Model Y glovebox USB port for light show',
            caption: 'The USB data port inside the glovebox on Model 3 and Model Y',
          },
          {
            type: 'paragraph',
            text: 'Wait a few seconds for the car to detect the drive. Then open Toybox from the touchscreen, select \"Light Show\", and tap \"Schedule Show\". If your files are correctly formatted, you will see \"Custom Light Show\" and your shows will appear in the dropdown menu. Select one and enjoy!',
          },
          {
            type: 'heading',
            text: 'Troubleshooting',
          },
          {
            type: 'list',
            items: [
              'If the popup says \"Light Show\" instead of \"Custom Light Show\", your USB formatting or folder structure is incorrect.',
              'Make sure the folder is named exactly \"LightShow\" (case-sensitive).',
              'Make sure the .fseq and audio filenames match exactly.',
              'Reformat the drive as exFAT if in doubt, and make sure there is no TeslaCam folder.',
              'If the show was working and stopped, try removing the USB, rebooting the car (hold both scroll wheels), and reinserting.',
            ],
          },
          {
            type: 'heading',
            text: 'The Easy Way: LightShow Studio Guides You Through Export',
          },
          {
            type: 'paragraph',
            text: "If all of this sounds like a lot of steps, LightShow Studio has you covered. The app includes a built-in step-by-step export tutorial that walks you through the entire process \u2014 from exporting the .fseq file to transferring it to USB and plugging it into your Tesla. Every instruction is right there on screen, including which USB port to use and what to expect on your car's touchscreen.",
          },
          {
            type: 'image',
            src: exportScreen,
            alt: 'LightShow Studio export tutorial \u2014 step-by-step guide to install on Tesla',
            caption: 'LightShow Studio walks you through every step, from export to USB to your Tesla',
          },
          {
            type: 'paragraph',
            text: 'No need to remember file formats, folder names or USB specs \u2014 the app handles everything and tells you exactly what to do. Create your show, export, follow the guide, plug in, and play.',
          },
          {
            type: 'cta',
            text: 'Create and export your Tesla Light Show \u2192',
            href: '/#download',
          },
        ],
      },
      fr: {
        title: 'Comment installer un Tesla Light Show via USB',
        description:
          'Guide \u00e9tape par \u00e9tape pour installer un light show Tesla personnalis\u00e9 sur votre Model 3, Model Y, Model S, Model X ou Cybertruck avec une cl\u00e9 USB. Formatage, structure des dossiers et conseils.',
        content: [
          {
            type: 'paragraph',
            text: "Installer un Tesla light show personnalis\u00e9 est \u00e9tonnamment simple \u2014 il vous suffit d'une cl\u00e9 USB et d'un fichier .fseq accompagn\u00e9 de sa piste audio. Ce guide couvre tout : quelle cl\u00e9 utiliser, comment la formater, comment organiser vos fichiers, et comment lancer le show depuis l'\u00e9cran tactile de votre v\u00e9hicule.",
          },
          {
            type: 'heading',
            text: 'Ce dont vous avez besoin',
          },
          {
            type: 'list',
            items: [
              'Une Tesla avec le logiciel v11.0 (2021.44.25) ou plus r\u00e9cent',
              'Un v\u00e9hicule compatible : Model S (2021+), Model 3, Model X (2021+), Model Y ou Cybertruck',
              'Une cl\u00e9 USB (n\u2019importe quelle taille \u2014 les fichiers sont l\u00e9gers)',
              'Un fichier .fseq et son fichier audio .mp3 ou .wav correspondant',
            ],
          },
          {
            type: 'heading',
            text: '\u00c9tape 1 : Formater votre cl\u00e9 USB',
          },
          {
            type: 'paragraph',
            text: 'Votre cl\u00e9 USB doit \u00eatre format\u00e9e en exFAT ou FAT32 (Windows) ou MS-DOS FAT (Mac). ext3 et ext4 fonctionnent aussi sous Linux. Important : le NTFS n\u2019est pas support\u00e9 par Tesla. Si votre cl\u00e9 est en NTFS, il faudra la reformater.',
          },
          {
            type: 'paragraph',
            text: 'Deux r\u00e8gles cruciales : la cl\u00e9 ne doit pas contenir de dossier \"TeslaCam\" \u00e0 la racine, ni de fichiers de mise \u00e0 jour carte ou firmware. Si vous avez utilis\u00e9 cette cl\u00e9 pour le mode Sentinelle ou le dashcam, utilisez-en une autre ou reformatez-la compl\u00e8tement.',
          },
          {
            type: 'heading',
            text: '\u00c9tape 2 : Cr\u00e9er le dossier LightShow',
          },
          {
            type: 'paragraph',
            text: '\u00c0 la racine de votre cl\u00e9 USB, cr\u00e9ez un dossier nomm\u00e9 exactement \"LightShow\" (L majuscule, S majuscule, sans espace). Le nom est sensible \u00e0 la casse \u2014 \"lightshow\" ou \"Lightshow\" ne fonctionneront pas.',
          },
          {
            type: 'heading',
            text: '\u00c9tape 3 : Ajouter vos fichiers',
          },
          {
            type: 'paragraph',
            text: 'Placez votre fichier .fseq et son fichier audio (.mp3 ou .wav) dans le dossier LightShow. Les noms de fichiers doivent correspondre exactement : par exemple, \"monshow.fseq\" et \"monshow.mp3\". Tesla recommande le format .wav avec un taux d\u2019\u00e9chantillonnage de 44,1 kHz pour une synchronisation optimale. Vous pouvez ajouter plusieurs shows sur la m\u00eame cl\u00e9 USB.',
          },
          {
            type: 'paragraph',
            text: 'Structure attendue : Racine USB \u2192 LightShow/ \u2192 monshow.fseq + monshow.mp3 (et \u00e9ventuellement show2.fseq + show2.wav, etc.).',
          },
          {
            type: 'heading',
            text: '\u00c9tape 4 : Brancher et lancer',
          },
          {
            type: 'paragraph',
            text: 'Ins\u00e9rez la cl\u00e9 USB dans un port USB de votre Tesla. Sur les Model 3 et Model Y (post-2021), le port USB data se trouve dans la bo\u00eete \u00e0 gants. Sur les mod\u00e8les plus anciens, utilisez les ports USB de la console avant. N\u2019utilisez pas un port d\u00e9di\u00e9 uniquement \u00e0 la charge \u2014 il doit s\u2019agir d\u2019un port data.',
          },
          {
            type: 'image',
            src: glovebox,
            alt: 'Port USB bo\u00eete \u00e0 gants Tesla Model 3 / Model Y pour light show',
            caption: 'Le port USB data dans la bo\u00eete \u00e0 gants des Model 3 et Model Y',
          },
          {
            type: 'paragraph',
            text: 'Attendez quelques secondes que la voiture d\u00e9tecte la cl\u00e9. Puis ouvrez Toybox depuis l\u2019\u00e9cran tactile, s\u00e9lectionnez \"Light Show\" et appuyez sur \"Schedule Show\". Si vos fichiers sont correctement format\u00e9s, vous verrez \"Custom Light Show\" et vos shows appara\u00eetront dans le menu d\u00e9roulant.',
          },
          {
            type: 'heading',
            text: 'D\u00e9pannage',
          },
          {
            type: 'list',
            items: [
              'Si le popup affiche \"Light Show\" au lieu de \"Custom Light Show\", le formatage USB ou la structure des dossiers est incorrect.',
              'V\u00e9rifiez que le dossier s\u2019appelle exactement \"LightShow\" (sensible \u00e0 la casse).',
              'V\u00e9rifiez que les noms des fichiers .fseq et audio correspondent exactement.',
              'Reformatez la cl\u00e9 en exFAT en cas de doute, et assurez-vous qu\u2019il n\u2019y a pas de dossier TeslaCam.',
              'Si le show fonctionnait puis a cess\u00e9, essayez de retirer la cl\u00e9, red\u00e9marrer la voiture (maintenez les deux molettes), puis r\u00e9ins\u00e9rer la cl\u00e9.',
            ],
          },
          {
            type: 'heading',
            text: 'La solution facile : LightShow Studio vous guide pour l\u2019export',
          },
          {
            type: 'paragraph',
            text: 'Si tout cela vous semble compliqu\u00e9, LightShow Studio a pens\u00e9 \u00e0 vous. L\u2019app inclut un tutoriel d\u2019export int\u00e9gr\u00e9 qui vous accompagne \u00e0 chaque \u00e9tape \u2014 de l\u2019export du fichier .fseq au transfert sur cl\u00e9 USB et au branchement dans votre Tesla. Toutes les instructions s\u2019affichent directement \u00e0 l\u2019\u00e9cran, y compris quel port USB utiliser et quoi attendre sur l\u2019\u00e9cran de votre voiture.',
          },
          {
            type: 'image',
            src: exportScreen,
            alt: 'Tutoriel d\u2019export LightShow Studio \u2014 guide \u00e9tape par \u00e9tape pour installer sur Tesla',
            caption: 'LightShow Studio vous guide \u00e0 chaque \u00e9tape, de l\u2019export \u00e0 la cl\u00e9 USB \u00e0 votre Tesla',
          },
          {
            type: 'paragraph',
            text: 'Pas besoin de retenir les formats de fichiers, noms de dossiers ou sp\u00e9cifications USB \u2014 l\u2019app g\u00e8re tout et vous dit exactement quoi faire. Cr\u00e9ez votre show, exportez, suivez le guide, branchez et profitez.',
          },
          {
            type: 'cta',
            text: 'Cr\u00e9ez et exportez votre Tesla Light Show \u2192',
            href: '/#download',
          },
        ],
      },
      de: {
        title: 'Tesla Light Show per USB installieren \u2014 Schritt f\u00fcr Schritt',
        description:
          'Schritt-f\u00fcr-Schritt-Anleitung zur Installation einer Tesla Light Show per USB auf Model 3, Model Y, Model S, Model X oder Cybertruck. Formatierung, Ordnerstruktur und Tipps.',
        content: [
          {
            type: 'paragraph',
            text: 'Eine Tesla Light Show zu installieren ist erstaunlich einfach \u2014 alles was Sie brauchen ist ein USB-Stick und eine .fseq-Datei mit dem passenden Audio-Track.',
          },
          {
            type: 'heading',
            text: 'Was Sie brauchen',
          },
          {
            type: 'list',
            items: [
              'Tesla mit Software v11.0 (2021.44.25) oder neuer',
              'Unterst\u00fctzte Fahrzeuge: Model S (2021+), Model 3, Model X (2021+), Model Y, Cybertruck',
              'Ein USB-Stick (beliebige Gr\u00f6\u00dfe)',
              'Eine .fseq Light Show-Datei und die passende .mp3/.wav Audiodatei',
            ],
          },
          {
            type: 'heading',
            text: 'Schritt 1: USB-Stick formatieren',
          },
          {
            type: 'paragraph',
            text: 'Der Stick muss als exFAT oder FAT32 formatiert sein. NTFS wird von Tesla nicht unterst\u00fctzt. Der Stick darf keinen \"TeslaCam\"-Ordner und keine Firmware-Updates enthalten.',
          },
          {
            type: 'heading',
            text: 'Schritt 2: LightShow-Ordner erstellen',
          },
          {
            type: 'paragraph',
            text: 'Erstellen Sie im Stammverzeichnis einen Ordner namens \"LightShow\" (Gro\u00df-/Kleinschreibung beachten).',
          },
          {
            type: 'heading',
            text: 'Schritt 3: Dateien hinzuf\u00fcgen',
          },
          {
            type: 'paragraph',
            text: 'Legen Sie die .fseq-Datei und die Audio-Datei in den LightShow-Ordner. Die Dateinamen m\u00fcssen exakt \u00fcbereinstimmen (z.B. show.fseq + show.mp3). Tesla empfiehlt .wav mit 44,1 kHz. Mehrere Shows auf einem Stick sind m\u00f6glich.',
          },
          {
            type: 'heading',
            text: 'Schritt 4: Einstecken und starten',
          },
          {
            type: 'paragraph',
            text: 'Stecken Sie den USB-Stick in einen Daten-USB-Port. Bei Model 3 und Model Y (ab 2021) befindet sich dieser im Handschuhfach.',
          },
          {
            type: 'image',
            src: glovebox,
            alt: 'Tesla Model 3 / Model Y Handschuhfach USB-Anschluss',
            caption: 'Der USB-Datenanschluss im Handschuhfach von Model 3 und Model Y',
          },
          {
            type: 'paragraph',
            text: '\u00d6ffnen Sie Toybox, w\u00e4hlen Sie \"Light Show\" und tippen Sie auf \"Schedule Show\". Wenn alles korrekt ist, erscheint \"Custom Light Show\" mit Ihren Shows.',
          },
          {
            type: 'heading',
            text: 'Der einfache Weg: LightShow Studio f\u00fchrt Sie durch den Export',
          },
          {
            type: 'paragraph',
            text: 'LightShow Studio enth\u00e4lt ein integriertes Schritt-f\u00fcr-Schritt-Tutorial, das Sie durch den gesamten Prozess f\u00fchrt \u2014 vom .fseq-Export bis zum Einstecken in Ihren Tesla.',
          },
          {
            type: 'image',
            src: exportScreen,
            alt: 'LightShow Studio Export-Tutorial',
            caption: 'LightShow Studio f\u00fchrt Sie durch jeden Schritt',
          },
          {
            type: 'cta',
            text: 'Tesla Light Show erstellen und exportieren \u2192',
            href: '/#download',
          },
        ],
      },
      es: {
        title: 'C\u00f3mo instalar un Tesla Light Show por USB',
        description:
          'Gu\u00eda paso a paso para instalar un light show Tesla personalizado en tu Model 3, Model Y, Model S, Model X o Cybertruck con una memoria USB.',
        content: [
          {
            type: 'paragraph',
            text: 'Instalar un Tesla light show personalizado es sorprendentemente simple \u2014 solo necesitas una memoria USB y un archivo .fseq con su pista de audio.',
          },
          {
            type: 'heading',
            text: 'Lo que necesitas',
          },
          {
            type: 'list',
            items: [
              'Un Tesla con software v11.0 (2021.44.25) o posterior',
              'Veh\u00edculos compatibles: Model S (2021+), Model 3, Model X (2021+), Model Y, Cybertruck',
              'Una memoria USB (cualquier tama\u00f1o)',
              'Un archivo .fseq y su archivo de audio .mp3 o .wav',
            ],
          },
          {
            type: 'heading',
            text: 'Paso 1: Formatear la memoria USB',
          },
          {
            type: 'paragraph',
            text: 'La memoria debe estar formateada en exFAT o FAT32. NTFS no es compatible con Tesla. No debe contener una carpeta \"TeslaCam\" ni archivos de actualizaci\u00f3n de firmware.',
          },
          {
            type: 'heading',
            text: 'Paso 2: Crear la carpeta LightShow',
          },
          {
            type: 'paragraph',
            text: 'En la ra\u00edz de la memoria, crea una carpeta llamada exactamente \"LightShow\" (may\u00fasculas importan).',
          },
          {
            type: 'heading',
            text: 'Paso 3: A\u00f1adir los archivos',
          },
          {
            type: 'paragraph',
            text: 'Coloca el archivo .fseq y su audio en la carpeta LightShow. Los nombres deben coincidir exactamente (ej: show.fseq + show.mp3). Tesla recomienda .wav a 44,1 kHz. Puedes a\u00f1adir varios shows en la misma memoria.',
          },
          {
            type: 'heading',
            text: 'Paso 4: Conectar y reproducir',
          },
          {
            type: 'paragraph',
            text: 'Conecta la memoria USB en un puerto de datos. En el Model 3 y Model Y (post-2021), el puerto USB de datos est\u00e1 en la guantera.',
          },
          {
            type: 'image',
            src: glovebox,
            alt: 'Puerto USB en guantera Tesla Model 3 / Model Y',
            caption: 'El puerto USB de datos en la guantera del Model 3 y Model Y',
          },
          {
            type: 'paragraph',
            text: 'Abre Toybox, selecciona \"Light Show\" y toca \"Schedule Show\". Si todo es correcto, ver\u00e1s \"Custom Light Show\" con tus shows disponibles.',
          },
          {
            type: 'heading',
            text: 'La forma f\u00e1cil: LightShow Studio te gu\u00eda en la exportaci\u00f3n',
          },
          {
            type: 'paragraph',
            text: 'LightShow Studio incluye un tutorial integrado paso a paso que te acompa\u00f1a en todo el proceso \u2014 desde la exportaci\u00f3n del .fseq hasta conectar la memoria en tu Tesla.',
          },
          {
            type: 'image',
            src: exportScreen,
            alt: 'Tutorial de exportaci\u00f3n de LightShow Studio',
            caption: 'LightShow Studio te gu\u00eda en cada paso',
          },
          {
            type: 'cta',
            text: 'Crea y exporta tu Tesla Light Show \u2192',
            href: '/#download',
          },
        ],
      },
    },
  },
]

// --------------- Helpers ---------------
export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticleTranslation(
  article: BlogArticle,
  lang: string,
): ArticleTranslation {
  const key = lang.slice(0, 2)
  return article.translations[key] ?? article.translations['en']
}
