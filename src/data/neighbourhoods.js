import mayfairImg from '../assets/neighbourhoods/mayfair.jpg'
import maryleboneImg from '../assets/neighbourhoods/marylebone.jpg'
import belgraviaImg from '../assets/neighbourhoods/belgravia.jpg'
import knightsbridgeImg from '../assets/neighbourhoods/knightsbridge.jpg'
import sloaneSquareImg from '../assets/neighbourhoods/sloane-square.jpg'
import chelseaImg from '../assets/neighbourhoods/chelsea.jpg'
import southKensingtonImg from '../assets/neighbourhoods/south-kensington.jpg'
import kensingtonImg from '../assets/neighbourhoods/kensington.jpg'
import nottingHillImg from '../assets/neighbourhoods/notting-hill.jpg'
import sohoImg from '../assets/neighbourhoods/soho.jpg'
import coventGardenImg from '../assets/neighbourhoods/covent-garden.jpg'
import stJamessImg from '../assets/neighbourhoods/st-jamess.jpg'
import westminsterImg from '../assets/neighbourhoods/westminster.jpg'

// Central London Neighbourhoods page (Discover London > Lifestyle &
// Experiences). Order matches the card grid and the modal's loop order.
// knownFor / landmarks / gettingAround are place names, so they stay
// English-only like universities.js's academicAreas.
export const NEIGHBOURHOODS = [
  {
    id: 'mayfair',
    name: 'Mayfair',
    image: mayfairImg,
    tagline: {
      en: 'Timeless elegance in the heart of London.',
      tr: 'Londra’nın kalbinde zamansız bir zarafet.',
    },
    about: {
      en: "Bordered by Hyde Park, Oxford Street, Regent Street and Piccadilly, Mayfair is one of London's most established central neighbourhoods. Historic squares, elegant architecture, galleries, landmark hotels and internationally recognised shopping streets give the area its distinctive blend of heritage and contemporary London life.",
      tr: 'Hyde Park, Oxford Street, Regent Street ve Piccadilly ile çevrili Mayfair, Londra’nın en köklü merkezi semtlerinden biridir. Tarihi meydanlar, zarif mimari, galeriler, simge oteller ve uluslararası üne sahip alışveriş caddeleri, bölgeye miras ile çağdaş Londra yaşamını buluşturan kendine özgü bir karakter kazandırır.',
    },
    knownFor: ['Bond Street', 'Berkeley Square', 'Grosvenor Square', 'Mount Street', 'Savile Row', 'Shepherd Market'],
    landmarks: ['Royal Academy of Arts', 'Grosvenor Square', 'Berkeley Square', 'Green Park', 'Hyde Park'],
    gettingAround: ['Bond Street', 'Green Park', 'Marble Arch', 'Oxford Circus'],
    experiences: {
      en: [
        'Explore the boutiques, galleries and flagship stores around Bond Street.',
        'Walk through Berkeley Square, Mount Street and the surrounding historic streets.',
        "Experience Mayfair's renowned restaurant and hotel dining scene.",
        'Stop for coffee around Mount Street or Shepherd Market.',
        'Continue into Green Park or Hyde Park for a relaxing walk.',
      ],
      tr: [
        'Bond Street çevresindeki butikleri, galerileri ve amiral mağazaları keşfedin.',
        'Berkeley Square, Mount Street ve çevresindeki tarihi sokaklarda yürüyün.',
        'Mayfair’in ünlü restoran ve otel gastronomi sahnesini deneyimleyin.',
        'Mount Street ya da Shepherd Market civarında bir kahve molası verin.',
        'Keyifli bir yürüyüş için Green Park ya da Hyde Park’a devam edin.',
      ],
    },
  },
  {
    id: 'marylebone',
    name: 'Marylebone',
    image: maryleboneImg,
    tagline: {
      en: 'Village character in the heart of the capital.',
      tr: 'Başkentin kalbinde bir köy havası.',
    },
    about: {
      en: "Just north of Oxford Street, Marylebone offers a noticeably calmer atmosphere than the surrounding West End. Elegant Georgian and Edwardian streets, independent shops, cultural institutions and the neighbourhood feel of Marylebone High Street combine with easy access to Regent's Park.",
      tr: 'Oxford Street’in hemen kuzeyinde yer alan Marylebone, çevresindeki West End’e kıyasla belirgin biçimde daha sakin bir atmosfer sunar. Zarif Georgian ve Edwardian sokaklar, bağımsız dükkânlar, kültür kurumları ve Marylebone High Street’in mahalle havası, Regent’s Park’a kolay erişimle bir araya gelir.',
    },
    knownFor: ['Marylebone High Street', 'Chiltern Street', 'Baker Street', 'Harley Street', 'Manchester Square'],
    landmarks: ['The Wallace Collection', "Regent's Park", 'Paddington Street Gardens', 'Madame Tussauds', 'Sherlock Holmes Museum'],
    gettingAround: ['Baker Street', 'Bond Street', "Regent's Park", 'Marylebone'],
    experiences: {
      en: [
        'Browse the independent shops along Marylebone High Street.',
        'Enjoy coffee or brunch around the High Street and Chiltern Street.',
        'Visit The Wallace Collection at Manchester Square.',
        "Discover the area's quieter Georgian streets on foot.",
        "Finish with a walk through Regent's Park.",
      ],
      tr: [
        'Marylebone High Street boyunca uzanan bağımsız dükkânları gezin.',
        'High Street ve Chiltern Street çevresinde kahve ya da brunch keyfi yapın.',
        'Manchester Square’deki The Wallace Collection’ı ziyaret edin.',
        'Bölgenin daha sakin Georgian sokaklarını yürüyerek keşfedin.',
        'Günü Regent’s Park’ta bir yürüyüşle tamamlayın.',
      ],
    },
  },
  {
    id: 'belgravia',
    name: 'Belgravia',
    image: belgraviaImg,
    tagline: {
      en: 'Grand architecture with a discreet neighbourhood character.',
      tr: 'Görkemli mimari, sakin bir mahalle karakteri.',
    },
    about: {
      en: 'Belgravia is characterised by grand white stucco terraces, garden squares and elegant Georgian architecture. Despite its central location, it retains a quieter neighbourhood feel, with Elizabeth Street, Motcomb Street and Pimlico Road forming three distinctive local destinations.',
      tr: 'Belgravia, görkemli beyaz sıvalı sıra evleri, bahçeli meydanları ve zarif Georgian mimarisiyle öne çıkar. Merkezi konumuna rağmen daha sakin bir mahalle havasını korur; Elizabeth Street, Motcomb Street ve Pimlico Road ise bölgenin üç ayrı karakterdeki yerel buluşma noktasıdır.',
    },
    knownFor: ['Belgrave Square', 'Eaton Square', 'Elizabeth Street', 'Motcomb Street', 'Pimlico Road'],
    landmarks: ['Belgrave Square', 'Eaton Square', "St Peter's Church", 'Buckingham Palace (nearby)', 'Hyde Park Corner'],
    gettingAround: ['Victoria', 'Sloane Square', 'Knightsbridge', 'Hyde Park Corner'],
    experiences: {
      en: [
        'Explore the independent boutiques and cafés around Elizabeth Street.',
        'Discover Motcomb Street and its relaxed neighbourhood atmosphere.',
        "Walk through Belgravia's elegant streets and garden squares.",
        'Enjoy dining around Motcomb Street or towards nearby Sloane Square.',
        'Continue towards Buckingham Palace, Green Park or Hyde Park Corner.',
      ],
      tr: [
        'Elizabeth Street çevresindeki bağımsız butikleri ve kafeleri keşfedin.',
        'Motcomb Street’i ve rahat mahalle atmosferini keşfedin.',
        'Belgravia’nın zarif sokaklarında ve bahçeli meydanlarında yürüyün.',
        'Motcomb Street’te ya da yakındaki Sloane Square yönünde yemeğin tadını çıkarın.',
        'Buckingham Sarayı, Green Park ya da Hyde Park Corner yönüne devam edin.',
      ],
    },
  },
  {
    id: 'knightsbridge',
    name: 'Knightsbridge',
    image: knightsbridgeImg,
    tagline: {
      en: 'An iconic destination between Hyde Park and South Kensington.',
      tr: 'Hyde Park ile South Kensington arasında ikonik bir adres.',
    },
    about: {
      en: "Knightsbridge combines internationally recognised shopping with elegant residential streets and immediate access to Hyde Park. Harrods, Harvey Nichols, Brompton Road and Sloane Street define much of its character, while South Kensington's museums and cultural institutions are within easy reach.",
      tr: 'Knightsbridge, uluslararası üne sahip alışveriş olanaklarını zarif konut sokakları ve Hyde Park’a doğrudan erişimle bir araya getirir. Harrods, Harvey Nichols, Brompton Road ve Sloane Street semtin karakterini büyük ölçüde belirlerken, South Kensington’ın müzeleri ve kültür kurumları da kolayca ulaşılabilecek mesafededir.',
    },
    knownFor: ['Harrods', 'Harvey Nichols', 'Brompton Road', 'Sloane Street', 'Hyde Park'],
    landmarks: ['Harrods', 'Hyde Park', 'One Hyde Park', 'Royal Albert Hall (nearby)', 'V&A Museum (nearby)'],
    gettingAround: ['Knightsbridge', 'Hyde Park Corner', 'South Kensington'],
    experiences: {
      en: [
        'Explore Harrods and Harvey Nichols.',
        'Discover the boutiques along Sloane Street and Brompton Road.',
        "Enjoy afternoon tea or dining at one of the area's landmark hotels.",
        'Take a leisurely walk through Hyde Park.',
        "Continue towards South Kensington's museums and Exhibition Road.",
      ],
      tr: [
        'Harrods ve Harvey Nichols’ı keşfedin.',
        'Sloane Street ve Brompton Road boyunca sıralanan butikleri gezin.',
        'Bölgenin simge otellerinden birinde ikindi çayı ya da yemek keyfi yapın.',
        'Hyde Park’ta keyifli bir yürüyüşe çıkın.',
        'South Kensington’ın müzelerine ve Exhibition Road’a doğru devam edin.',
      ],
    },
  },
  {
    id: 'sloane-square',
    name: 'Sloane Square',
    image: sloaneSquareImg,
    tagline: {
      en: 'Elegant Chelsea living with culture, shopping and dining on the doorstep.',
      tr: 'Kültür, alışveriş ve gastronominin hemen yanı başında zarif Chelsea yaşamı.',
    },
    about: {
      en: 'At the meeting point of Chelsea and Belgravia, Sloane Square is one of West London’s most distinctive destinations. Elegant architecture, cultural venues and sophisticated shopping surround the square, while King’s Road, Duke of York Square and the quieter residential streets of Chelsea and Belgravia are all within easy reach.',
      tr: 'Chelsea ile Belgravia’nın buluştuğu noktada yer alan Sloane Square, Batı Londra’nın en özgün adreslerinden biridir. Meydanı zarif mimari, kültür mekânları ve seçkin mağazalar çevreler; King’s Road, Duke of York Square ve Chelsea ile Belgravia’nın daha sakin konut sokakları da kolayca ulaşılabilecek mesafededir.',
    },
    knownFor: ['Sloane Square', 'King’s Road', 'Duke of York Square', 'Sloane Street', 'Pavilion Road'],
    landmarks: ['Royal Court Theatre', 'Saatchi Gallery', 'Duke of York Square', 'Cadogan Hall', 'Chelsea Physic Garden', 'Battersea Park (nearby)'],
    gettingAround: ['Sloane Square (District & Circle lines)', 'Victoria', 'South Kensington'],
    experiences: {
      en: [
        'Explore the boutiques and independent stores along King’s Road and around Duke of York Square.',
        'Discover the cafés, restaurants and independent businesses of Pavilion Road.',
        'Visit the Saatchi Gallery or enjoy a performance at the Royal Court Theatre or Cadogan Hall.',
        'Walk through Chelsea’s elegant residential streets towards the Thames and Chelsea Embankment.',
        'Continue towards Belgravia, Knightsbridge or Battersea Park for a longer London walk.',
      ],
      tr: [
        'King’s Road boyunca ve Duke of York Square çevresindeki butikleri ve bağımsız mağazaları keşfedin.',
        'Pavilion Road’un kafelerini, restoranlarını ve bağımsız işletmelerini keşfedin.',
        'Saatchi Gallery’yi ziyaret edin ya da Royal Court Theatre veya Cadogan Hall’da bir gösteri izleyin.',
        'Chelsea’nin zarif konut sokaklarından Thames’e ve Chelsea Embankment’a doğru yürüyün.',
        'Daha uzun bir Londra yürüyüşü için Belgravia, Knightsbridge ya da Battersea Park’a devam edin.',
      ],
    },
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    image: chelseaImg,
    tagline: {
      en: 'Creative heritage with a distinctive riverside character.',
      tr: 'Yaratıcı bir miras, kendine özgü bir nehir kıyısı karakteri.',
    },
    about: {
      en: "Chelsea combines elegant residential streets with a long-standing connection to art, design and fashion. King's Road remains at the heart of the neighbourhood, while Duke of York Square, the Saatchi Gallery, Chelsea Physic Garden and the Thames contribute to its distinctive cultural and lifestyle character.",
      tr: 'Chelsea, zarif konut sokaklarını sanat, tasarım ve modayla uzun soluklu bağıyla bir araya getirir. King’s Road semtin kalbi olmayı sürdürürken Duke of York Square, Saatchi Gallery, Chelsea Physic Garden ve Thames de bölgenin kendine özgü kültür ve yaşam karakterine katkı sağlar.',
    },
    knownFor: ["King's Road", 'Sloane Square', 'Duke of York Square', 'Cheyne Walk', 'Chelsea Embankment'],
    landmarks: ['Saatchi Gallery', 'Chelsea Physic Garden', 'Royal Hospital Chelsea', 'Thames Path', 'Battersea Park (across the river)'],
    gettingAround: ['Sloane Square', 'South Kensington'],
    experiences: {
      en: [
        "Browse the boutiques and independent stores along King's Road.",
        'Visit the Saatchi Gallery at Duke of York Square.',
        "Enjoy Chelsea's cafés and neighbourhood dining scene.",
        'Explore the quieter residential streets around Cheyne Walk.',
        'Walk along the Thames and Chelsea Embankment.',
      ],
      tr: [
        'King’s Road boyunca sıralanan butikleri ve bağımsız mağazaları gezin.',
        'Duke of York Square’deki Saatchi Gallery’yi ziyaret edin.',
        'Chelsea’nin kafelerinin ve mahalle restoranlarının tadını çıkarın.',
        'Cheyne Walk çevresindeki daha sakin konut sokaklarını keşfedin.',
        'Thames ve Chelsea Embankment boyunca yürüyün.',
      ],
    },
  },
  {
    id: 'south-kensington',
    name: 'South Kensington',
    image: southKensingtonImg,
    tagline: {
      en: 'Culture and learning at the heart of West London.',
      tr: 'Batı Londra’nın kalbinde kültür ve bilgi.',
    },
    about: {
      en: "South Kensington is home to one of London's most important concentrations of museums, educational institutions and cultural landmarks. Exhibition Road brings together the Natural History Museum, V&A and Science Museum, while the surrounding streets connect easily with Knightsbridge, Chelsea, Kensington Gardens and Hyde Park.",
      tr: 'South Kensington, Londra’da müzelerin, eğitim kurumlarının ve kültürel simgelerin en yoğun bulunduğu bölgelerden biridir. Exhibition Road; Natural History Museum, V&A ve Science Museum’u bir araya getirirken çevredeki sokaklar Knightsbridge, Chelsea, Kensington Gardens ve Hyde Park ile kolayca bağlantı kurar.',
    },
    knownFor: ['Exhibition Road', 'Cromwell Road', 'Old Brompton Road', 'Museum Quarter', 'Imperial College London'],
    landmarks: ['Natural History Museum', 'V&A Museum', 'Science Museum', 'Royal Albert Hall', 'Kensington Gardens', 'Hyde Park'],
    gettingAround: ['South Kensington', 'Gloucester Road'],
    experiences: {
      en: [
        'Spend a morning or afternoon exploring the museums around Exhibition Road.',
        'Enjoy the cafés and restaurants surrounding South Kensington station.',
        'Attend a performance at the Royal Albert Hall.',
        'Walk north towards Kensington Gardens and Hyde Park.',
        'Combine a museum visit with nearby Knightsbridge or Chelsea.',
      ],
      tr: [
        'Bir sabahı ya da öğleden sonrayı Exhibition Road çevresindeki müzeleri keşfederek geçirin.',
        'South Kensington istasyonu çevresindeki kafelerin ve restoranların tadını çıkarın.',
        'Royal Albert Hall’da bir gösteri izleyin.',
        'Kuzeye, Kensington Gardens ve Hyde Park’a doğru yürüyün.',
        'Müze ziyaretinizi yakındaki Knightsbridge ya da Chelsea ile birleştirin.',
      ],
    },
  },
  {
    id: 'kensington',
    name: 'Kensington',
    image: kensingtonImg,
    tagline: {
      en: 'Royal heritage, green spaces and classic London architecture.',
      tr: 'Kraliyet mirası, yeşil alanlar ve klasik Londra mimarisi.',
    },
    about: {
      en: "Kensington combines royal history, major green spaces and some of West London's most recognisable residential streets. Kensington Palace and Kensington Gardens define its eastern side, while High Street Kensington provides a lively local centre and Holland Park offers a quieter landscape further west.",
      tr: 'Kensington; kraliyet tarihini, geniş yeşil alanları ve Batı Londra’nın en tanınmış konut sokaklarından bazılarını bir araya getirir. Kensington Sarayı ve Kensington Gardens semtin doğu yakasını tanımlarken High Street Kensington canlı bir yerel merkez sunar, batıdaki Holland Park ise daha sakin bir manzara sağlar.',
    },
    knownFor: ['Kensington Palace', 'High Street Kensington', 'Kensington Church Street', 'Holland Park', 'Kensington Gardens'],
    landmarks: ['Kensington Palace', 'Kensington Gardens', 'Holland Park', 'Kyoto Garden', 'Design Museum', 'Albert Memorial'],
    gettingAround: ['High Street Kensington', 'Notting Hill Gate', 'Gloucester Road', 'Holland Park'],
    experiences: {
      en: [
        'Visit Kensington Palace and explore Kensington Gardens.',
        'Browse High Street Kensington and Kensington Church Street.',
        'Discover exhibitions at the Design Museum.',
        "Stop for coffee or lunch around Kensington's quieter side streets.",
        'Walk through Holland Park and visit the Kyoto Garden.',
      ],
      tr: [
        'Kensington Sarayı’nı ziyaret edin ve Kensington Gardens’ı keşfedin.',
        'High Street Kensington ve Kensington Church Street’i gezin.',
        'Design Museum’daki sergileri keşfedin.',
        'Kensington’ın daha sakin ara sokaklarında kahve ya da öğle yemeği molası verin.',
        'Holland Park’ta yürüyün ve Kyoto Garden’ı ziyaret edin.',
      ],
    },
  },
  {
    id: 'notting-hill',
    name: 'Notting Hill',
    image: nottingHillImg,
    tagline: {
      en: 'Colourful streets, market culture and unmistakable character.',
      tr: 'Renkli sokaklar, pazar kültürü ve eşsiz bir karakter.',
    },
    about: {
      en: "Notting Hill is one of London's most recognisable neighbourhoods, known for colourful terraces, historic markets and a strong independent character. Portobello Road forms its best-known centre, while Westbourne Grove, Golborne Road and the surrounding residential streets reveal a more relaxed side of the neighbourhood.",
      tr: 'Notting Hill, renkli sıra evleri, tarihi pazarları ve güçlü bağımsız karakteriyle Londra’nın en tanınmış semtlerinden biridir. Portobello Road semtin en bilinen merkezini oluştururken Westbourne Grove, Golborne Road ve çevredeki konut sokakları bölgenin daha rahat yüzünü ortaya koyar.',
    },
    knownFor: ['Portobello Road', 'Westbourne Grove', 'Golborne Road', 'Notting Hill Carnival', 'Colourful streets and mews'],
    landmarks: ['Portobello Road Market', 'Museum of Brands', "St Luke's Mews", 'Holland Park (nearby)', 'Kyoto Garden'],
    gettingAround: ['Notting Hill Gate', 'Ladbroke Grove', 'Westbourne Park'],
    experiences: {
      en: [
        'Explore Portobello Road and its famous market.',
        'Browse independent boutiques around Westbourne Grove.',
        "Discover Notting Hill's colourful streets, mews and architecture.",
        "Stop at one of the area's many independent cafés.",
        'Continue towards Holland Park and the Kyoto Garden for a quieter walk.',
      ],
      tr: [
        'Portobello Road’u ve ünlü pazarını keşfedin.',
        'Westbourne Grove çevresindeki bağımsız butikleri gezin.',
        'Notting Hill’in renkli sokaklarını, mews’larını ve mimarisini keşfedin.',
        'Bölgedeki pek çok bağımsız kafeden birinde mola verin.',
        'Daha sakin bir yürüyüş için Holland Park ve Kyoto Garden’a devam edin.',
      ],
    },
  },
  {
    id: 'soho',
    name: 'Soho',
    image: sohoImg,
    tagline: {
      en: 'London at its most energetic.',
      tr: 'Londra’nın en enerjik hâli.',
    },
    about: {
      en: "At the heart of the West End, Soho has long been associated with music, entertainment, theatre, dining and London's evolving cultural scene. Its compact network of streets brings together Carnaby, Soho Square and Chinatown, surrounded by some of the capital's best-known shopping and entertainment destinations.",
      tr: 'West End’in kalbinde yer alan Soho, uzun zamandır müzik, eğlence, tiyatro, gastronomi ve Londra’nın sürekli gelişen kültür sahnesiyle özdeşleşmiştir. Sıkı dokulu sokakları Carnaby, Soho Square ve Chinatown’ı bir araya getirir; çevresinde ise başkentin en bilinen alışveriş ve eğlence adreslerinden bazıları bulunur.',
    },
    knownFor: ['Carnaby Street', 'Soho Square', 'Old Compton Street', 'Chinatown', 'Dean Street', 'Berwick Street'],
    landmarks: ['Carnaby', 'Chinatown', 'Soho Square', "The Photographers' Gallery", 'Piccadilly Circus (nearby)', 'West End theatres'],
    gettingAround: ['Tottenham Court Road', 'Oxford Circus', 'Piccadilly Circus', 'Leicester Square'],
    experiences: {
      en: [
        "Explore Carnaby and Soho's independent stores and side streets.",
        "Discover one of London's most diverse dining scenes.",
        'Stop for coffee around Soho Square or neighbouring streets.',
        'Experience Chinatown and the atmosphere of the West End.',
        'Walk from Carnaby through Soho towards Covent Garden.',
      ],
      tr: [
        'Carnaby’yi, Soho’nun bağımsız mağazalarını ve ara sokaklarını keşfedin.',
        'Londra’nın en çeşitli gastronomi sahnelerinden birini keşfedin.',
        'Soho Square ya da çevredeki sokaklarda bir kahve molası verin.',
        'Chinatown’ı ve West End atmosferini deneyimleyin.',
        'Carnaby’den Soho üzerinden Covent Garden’a doğru yürüyün.',
      ],
    },
  },
  {
    id: 'covent-garden',
    name: 'Covent Garden',
    image: coventGardenImg,
    tagline: {
      en: "Historic charm at the centre of London's Theatreland.",
      tr: 'Londra’nın tiyatro bölgesinin merkezinde tarihi bir çekicilik.',
    },
    about: {
      en: 'Covent Garden combines its historic Piazza and Market Building with theatre, culture, shopping and lively pedestrian streets. Seven Dials, Neal\'s Yard and the surrounding West End theatres give the neighbourhood a distinctive energy throughout the day and into the evening.',
      tr: 'Covent Garden, tarihi Piazza’sını ve Market Building’ini tiyatro, kültür, alışveriş ve canlı yaya sokaklarıyla bir araya getirir. Seven Dials, Neal’s Yard ve çevredeki West End tiyatroları semte gün boyu ve akşam saatlerinde de süren kendine özgü bir enerji katar.',
    },
    knownFor: ['Covent Garden Piazza', 'Seven Dials', "Neal's Yard", 'Floral Street', 'The Strand'],
    landmarks: ['Covent Garden Market', 'Royal Ballet and Opera', 'London Transport Museum', 'Somerset House', 'Victoria Embankment Gardens (nearby)'],
    gettingAround: ['Covent Garden', 'Leicester Square', 'Charing Cross', 'Holborn'],
    experiences: {
      en: [
        'Explore the historic Market Building and Piazza.',
        "Discover the smaller streets around Seven Dials and Neal's Yard.",
        "Enjoy Covent Garden's extensive café and dining scene.",
        'Attend a performance at the Royal Ballet and Opera or a nearby West End theatre.',
        'Walk from the Piazza towards Somerset House and the Thames.',
      ],
      tr: [
        'Tarihi Market Building’i ve Piazza’yı keşfedin.',
        'Seven Dials ve Neal’s Yard çevresindeki küçük sokakları keşfedin.',
        'Covent Garden’ın zengin kafe ve restoran sahnesinin tadını çıkarın.',
        'Royal Ballet and Opera’da ya da yakındaki bir West End tiyatrosunda bir gösteri izleyin.',
        'Piazza’dan Somerset House’a ve Thames’e doğru yürüyün.',
      ],
    },
  },
  {
    id: 'st-jamess',
    name: "St James's",
    image: stJamessImg,
    tagline: {
      en: 'Royal heritage and centuries of London tradition.',
      tr: 'Kraliyet mirası ve yüzyıllık Londra geleneği.',
    },
    about: {
      en: "Positioned between Mayfair, Westminster and the West End, St James's is one of central London's most historic districts. Royal parks and palaces sit alongside traditional shops, galleries and heritage businesses, while Jermyn Street, St James's Street and Piccadilly retain a distinctive sense of old London.",
      tr: 'Mayfair, Westminster ve West End arasında konumlanan St James’s, merkezi Londra’nın en tarihi bölgelerinden biridir. Kraliyet parkları ve sarayları geleneksel dükkânlar, galeriler ve köklü işletmelerle yan yana yer alırken Jermyn Street, St James’s Street ve Piccadilly eski Londra’nın kendine özgü havasını korur.',
    },
    knownFor: ['Jermyn Street', "St James's Street", 'Pall Mall', "St James's Square", 'Piccadilly'],
    landmarks: ["St James's Palace", "St James's Park", 'Green Park', 'Royal Academy of Arts', 'Buckingham Palace (nearby)', 'National Gallery'],
    gettingAround: ['Green Park', 'Piccadilly Circus', 'Charing Cross', "St James's Park"],
    experiences: {
      en: [
        "Explore the heritage shops of Jermyn Street and St James's Street.",
        "Visit the area's galleries and historic businesses.",
        'Enjoy afternoon tea or traditional London dining.',
        "Walk through both Green Park and St James's Park.",
        'Continue towards Buckingham Palace, Mayfair or Trafalgar Square.',
      ],
      tr: [
        'Jermyn Street ve St James’s Street’in köklü dükkânlarını keşfedin.',
        'Bölgenin galerilerini ve tarihi işletmelerini ziyaret edin.',
        'İkindi çayının ya da geleneksel Londra mutfağının tadını çıkarın.',
        'Green Park ve St James’s Park’ta yürüyün.',
        'Buckingham Sarayı, Mayfair ya da Trafalgar Square yönüne devam edin.',
      ],
    },
  },
  {
    id: 'westminster',
    name: 'Westminster',
    image: westminsterImg,
    tagline: {
      en: 'The historic and ceremonial heart of London.',
      tr: 'Londra’nın tarihi ve törensel kalbi.',
    },
    about: {
      en: "Westminster brings together many of Britain's most recognisable political, royal and historic landmarks. The Palace of Westminster, Westminster Abbey and Whitehall sit close to the Thames and St James's Park, creating an exceptional concentration of architecture, history and national institutions.",
      tr: 'Westminster, Britanya’nın en tanınmış siyasi, kraliyet ve tarihi simgelerinin pek çoğunu bir araya getirir. Westminster Sarayı, Westminster Abbey ve Whitehall, Thames ile St James’s Park’ın hemen yakınında yer alarak mimari, tarih ve ulusal kurumların olağanüstü bir yoğunluğunu oluşturur.',
    },
    knownFor: ['Parliament Square', 'Whitehall', 'The Mall', 'Victoria Street', 'The Thames'],
    landmarks: ['Houses of Parliament', 'Big Ben', 'Westminster Abbey', 'Buckingham Palace', "St James's Park", 'Victoria Tower Gardens'],
    gettingAround: ['Westminster', "St James's Park", 'Victoria', 'Embankment'],
    experiences: {
      en: [
        'Explore Parliament Square and Westminster Abbey.',
        "Walk along the Thames for classic views of London's landmarks.",
        'Follow Whitehall towards Trafalgar Square.',
        "Walk through St James's Park towards Buckingham Palace.",
        'Cross Westminster Bridge for panoramic views back towards Parliament.',
      ],
      tr: [
        'Parliament Square’i ve Westminster Abbey’i keşfedin.',
        'Londra’nın simge yapılarının klasik manzaraları için Thames boyunca yürüyün.',
        'Whitehall’u takip ederek Trafalgar Square’e ulaşın.',
        'St James’s Park’tan Buckingham Sarayı’na doğru yürüyün.',
        'Parlamento’nun panoramik manzarası için Westminster Köprüsü’nden karşıya geçin.',
      ],
    },
  },
]
