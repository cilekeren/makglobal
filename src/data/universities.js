import imperialImg from '../assets/universities/imperial.jpg'
import uclImg from '../assets/universities/ucl.jpg'
import kingsImg from '../assets/universities/kings.jpg'
import lseImg from '../assets/universities/lse.jpg'
import queenMaryImg from '../assets/universities/queen-mary.jpg'
import cityStGeorgesImg from '../assets/universities/city-st-georges.jpg'
import brunelImg from '../assets/universities/brunel.jpg'
import soasImg from '../assets/universities/soas.jpg'
import royalHollowayImg from '../assets/universities/royal-holloway.jpg'
import royalCollegeOfArtImg from '../assets/universities/royal-college-of-art.jpg'

// Campus photos are CC-BY / CC-BY-SA licensed images from Wikimedia
// Commons — free to use commercially with attribution. Credit each
// photographer/uploader wherever this page's imagery is credited.
export const UNIVERSITY_IMAGE_CREDITS = [
  { file: 'imperial.jpg', title: 'Main Entrance, Imperial College London, Exhibition Road', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Main_Entrance,_Imperial_College_London,_Exhibition_Road.jpg' },
  { file: 'ucl.jpg', title: 'UCL Portico Building', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:UCL_Portico_Building.jpg' },
  { file: 'kings.jpg', title: "Strand Building, King's College London", license: 'CC BY-SA 4.0', source: "https://commons.wikimedia.org/wiki/File:Strand_Building,_King's_College_London_01.jpg" },
  { file: 'lse.jpg', title: 'LSE Old Building Entrance, Houghton Street', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:LSE_Old_Building_Entrance,_Houghton_Street.jpg' },
  { file: 'queen-mary.jpg', title: "Queens' Building, Queen Mary University of London", license: 'CC BY-SA 4.0', source: "https://commons.wikimedia.org/wiki/File:Queens'_Building,_Queen_Mary_University_of_London.jpg" },
  { file: 'city-st-georges.jpg', title: 'City University of London, Northampton Square', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:City_University_of_London_Northampton_Square_Clerkenwell_London_EC1V_0HB.jpg' },
  { file: 'brunel.jpg', title: 'Brunel University London Campus', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Brunel_University_London_Campus_(August_2023)_01.jpg' },
  { file: 'soas.jpg', title: 'SOAS Building, London', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:SOAS-Building-London.jpg' },
  { file: 'royal-holloway.jpg', title: "Founder's Building, Royal Holloway, University of London (Diliff)", license: 'CC BY-SA 3.0', source: "https://commons.wikimedia.org/wiki/File:Founder's_Building,_Royal_Holloway,_University_of_London_-_Diliff.jpg" },
  { file: 'royal-college-of-art.jpg', title: 'Darwin Building, Royal College of Art, Kensington Gore', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Darwin_Building,_Royal_College_of_Art,_Kensington_Gore_looking_east.jpg' },
]

// The Ranking Source link per university points straight to that
// university's own profile page on topuniversities.com, not the generic
// rankings list.
const qsProfileUrl = (slug) => `https://www.topuniversities.com/universities/${slug}`

// QS World University Rankings 2026 (subject ranking for the Royal College
// of Art, whose specialism has no meaningful overall-world rank). Order
// matches the Education section's card grid and the modal's loop order.
export const UNIVERSITIES = [
  {
    id: 'imperial',
    name: "Imperial College London",
    image: imperialImg,
    officialWebsite: 'https://www.imperial.ac.uk/',
    coords: [51.4988, -0.1749],
    location: 'South Kensington, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#2 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'Imperial College London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "Imperial College London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('imperial-college-london'),
    },
    academicAreas: ['Engineering', 'Technology', 'Medicine', 'Natural Sciences', 'Business'],
    about: {
      en: 'A world-leading university specialising in science, engineering, medicine and business, with a strong international reputation for research, technology and innovation.',
      tr: 'Fen bilimleri, mühendislik, tıp ve iş dünyasında uzmanlaşmış, araştırma, teknoloji ve inovasyon alanlarında güçlü bir uluslararası üne sahip dünya çapında lider bir üniversite.',
    },
    stationsLabel: 'Nearest Stations',
    stations: [
      { name: 'South Kensington', lines: 'Circle · District · Piccadilly', time: '~10 min walk' },
    ],
    stationsNote: {
      en: 'Imperial confirms South Kensington as the nearest Underground station, approximately a 10-minute walk from the campus.',
      tr: 'Imperial, South Kensington istasyonunun kampüse en yakın metro istasyonu olduğunu ve yürüyerek yaklaşık 10 dakika sürdüğünü belirtiyor.',
    },
    livingNear: ['South Kensington', 'Chelsea', 'Knightsbridge', 'Kensington', 'Fulham'],
  },
  {
    id: 'ucl',
    name: 'University College London (UCL)',
    image: uclImg,
    officialWebsite: 'https://www.ucl.ac.uk/',
    coords: [51.5246, -0.1339],
    location: 'Bloomsbury, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#9 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'UCL ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "UCL sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('ucl'),
    },
    academicAreas: ['Architecture', 'Medicine', 'Engineering', 'Law', 'Social Sciences'],
    about: {
      en: "One of London's leading multidisciplinary universities, UCL combines a central Bloomsbury location with internationally recognised teaching and research across a broad range of disciplines.",
      tr: "Londra'nın önde gelen çok disiplinli üniversitelerinden biri olan UCL, merkezi Bloomsbury konumunu geniş bir disiplin yelpazesinde uluslararası düzeyde tanınan eğitim ve araştırmayla bir araya getiriyor.",
    },
    stationsLabel: 'Nearest Stations',
    stations: [
      { name: 'Euston Square', lines: 'Circle · Hammersmith & City · Metropolitan' },
      { name: 'Warren Street', lines: 'Northern · Victoria' },
      { name: 'Euston', lines: 'Northern · Victoria · National Rail' },
      { name: 'Russell Square', lines: 'Piccadilly' },
      { name: "St Pancras / King's Cross", lines: 'National Rail · Eurostar · multiple Underground lines' },
    ],
    stationsNote: {
      en: "UCL identifies Euston Square, Warren Street, Euston and Russell Square as its closest Tube stations, and states that Euston, St Pancras and King's Cross mainline stations are within approximately 15 minutes' walk.",
      tr: "UCL, Euston Square, Warren Street, Euston ve Russell Square'i en yakın metro istasyonları olarak belirtiyor; Euston, St Pancras ve King's Cross ana tren istasyonlarının ise yürüyerek yaklaşık 15 dakika mesafede olduğunu ifade ediyor.",
    },
    livingNear: ['Bloomsbury', 'Fitzrovia', "King's Cross", 'Marylebone', "Regent's Park"],
  },
  {
    id: 'kings',
    name: "King's College London",
    image: kingsImg,
    officialWebsite: 'https://www.kcl.ac.uk/',
    coords: [51.5115, -0.116],
    location: 'Strand, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#31 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: "King's College London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.",
        tr: "King's College London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('kings-college-london'),
    },
    academicAreas: ['Medicine', 'Law', 'Politics', 'International Relations', 'Humanities'],
    about: {
      en: 'A historic London university with a strong international reputation across medicine, law, politics and the humanities, with several campuses positioned across central London.',
      tr: "Tıp, hukuk, siyaset ve beşeri bilimlerde güçlü bir uluslararası üne sahip, merkezi Londra genelinde çeşitli kampüsleri bulunan tarihi bir üniversite.",
    },
    stationsLabel: 'Nearest Stations — Strand Campus',
    stations: [
      { name: 'Temple', lines: 'Circle · District', time: '~2 min' },
      { name: 'Charing Cross', lines: 'Bakerloo · Northern · National Rail', time: '~9–10 min' },
      { name: 'Embankment', lines: 'Bakerloo · Circle · District · Northern', time: '~10 min' },
      { name: 'Waterloo East', lines: 'National Rail', time: '~10 min' },
      { name: 'Waterloo', lines: 'Bakerloo · Jubilee · Northern · Waterloo & City · National Rail', time: '~12 min' },
      { name: 'Holborn', lines: 'Central · Piccadilly', time: '~12 min' },
      { name: 'Blackfriars', lines: 'National Rail', time: '~12 min' },
    ],
    stationsNote: {
      en: "These walking times are provided by King's for its Strand Campus.",
      tr: "Bu yürüme süreleri King's College tarafından Strand Kampüsü için belirtilmiştir.",
    },
    livingNear: ['Covent Garden', 'Holborn', 'South Bank', 'Waterloo', 'Westminster'],
  },
  {
    id: 'lse',
    name: 'London School of Economics and Political Science (LSE)',
    image: lseImg,
    officialWebsite: 'https://www.lse.ac.uk/',
    coords: [51.5144, -0.116],
    location: 'Aldwych / Houghton Street, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#56 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'LSE ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "LSE sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('london-school-economics-political-science-lse'),
    },
    academicAreas: ['Economics', 'Finance', 'Politics', 'Law', 'Social Sciences'],
    about: {
      en: 'A globally recognised specialist university focused on economics, politics, law and the social sciences, located in the heart of central London.',
      tr: "Merkezi Londra'nın kalbinde yer alan, ekonomi, siyaset, hukuk ve sosyal bilimlere odaklanmış, dünya çapında tanınan uzman bir üniversite.",
    },
    stationsLabel: 'Nearest Stations',
    stations: [
      { name: 'Holborn', lines: 'Central · Piccadilly', time: '~5 min' },
      { name: 'Temple', lines: 'Circle · District', time: '~5 min' },
      { name: 'Charing Cross', lines: 'Bakerloo · Northern · National Rail', time: '~10 min' },
      { name: 'Waterloo', lines: 'Tube · National Rail', time: '~10–15 min' },
      { name: 'Blackfriars', lines: 'National Rail / Thameslink', time: '~10–15 min' },
    ],
    stationsNote: {
      en: 'LSE provides these approximate walking times in its public transport guidance.',
      tr: 'LSE, bu yaklaşık yürüme sürelerini kendi ulaşım rehberinde belirtmektedir.',
    },
    livingNear: ['Covent Garden', 'Holborn', 'Bloomsbury', 'Fitzrovia', 'South Bank'],
  },
  {
    id: 'queen-mary',
    name: 'Queen Mary University of London',
    image: queenMaryImg,
    officialWebsite: 'https://www.qmul.ac.uk/',
    coords: [51.5246, -0.0393],
    location: 'Mile End, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#110 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'Queen Mary University of London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "Queen Mary University of London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('queen-mary-university-london'),
    },
    academicAreas: ['Medicine', 'Dentistry', 'Law', 'Engineering', 'Economics'],
    about: {
      en: "A research-intensive London university with particular strengths in medicine, dentistry, law and engineering, with its main campus located in East London's Mile End.",
      tr: "Tıp, diş hekimliği, hukuk ve mühendislikte özellikle güçlü olan, ana kampüsü Doğu Londra'daki Mile End'de bulunan araştırma odaklı bir üniversite.",
    },
    stationsLabel: 'Nearest Stations — Mile End Campus',
    stations: [
      { name: 'Mile End', lines: 'Central · District · Hammersmith & City', time: '~5 min' },
      { name: 'Stepney Green', lines: 'District · Hammersmith & City', time: '~5 min' },
    ],
    stationsNote: {
      en: "Queen Mary identifies both stations as the closest to its Mile End campus; university material places both within roughly five minutes' walk.",
      tr: 'Queen Mary, her iki istasyonu da Mile End kampüsüne en yakın istasyonlar olarak belirtiyor; üniversite kaynakları ikisinin de yaklaşık beş dakika yürüme mesafesinde olduğunu ifade ediyor.',
    },
    livingNear: ['Mile End', 'Bow', 'Bethnal Green', 'Whitechapel', 'Canary Wharf'],
  },
  {
    id: 'city-st-georges',
    name: "City St George's, University of London",
    image: cityStGeorgesImg,
    officialWebsite: 'https://www.citystgeorges.ac.uk/',
    coords: [51.5281, -0.1022],
    location: 'Clerkenwell / Northampton Square, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#=310 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: "City St George's, University of London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.",
        tr: "City St George's, University of London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('city-st-georges-university-london'),
    },
    academicAreas: ['Business', 'Finance', 'Law', 'Medicine', 'Health Sciences'],
    about: {
      en: "Formed through the merger of City, University of London and St George's, University of London, the institution combines strengths in professional education, business, law, medicine and health sciences.",
      tr: "City, University of London ile St George's, University of London'ın birleşmesiyle oluşan kurum; mesleki eğitim, iş dünyası, hukuk, tıp ve sağlık bilimlerindeki güçlü yönlerini bir araya getiriyor.",
    },
    stationsLabel: 'Nearest Stations — Clerkenwell Campus',
    stations: [
      { name: 'Angel', lines: 'Northern' },
      { name: 'Old Street', lines: 'Northern · National Rail' },
      { name: 'Barbican', lines: 'Circle · Hammersmith & City · Metropolitan' },
      { name: 'Farringdon', lines: 'Elizabeth · Circle · Hammersmith & City · Metropolitan · National Rail' },
    ],
    stationsNote: {
      en: 'University information identifies these as the nearest stations to the Northampton Square campus, around a 10-minute walk.',
      tr: 'Üniversite kaynakları bu istasyonları Northampton Square kampüsüne en yakın istasyonlar olarak belirtiyor; yürüme mesafesi yaklaşık 10 dakika.',
    },
    livingNear: ['Clerkenwell', 'Islington', 'Farringdon', 'Barbican', 'Shoreditch'],
  },
  {
    id: 'brunel',
    name: 'Brunel University of London',
    image: brunelImg,
    officialWebsite: 'https://www.brunel.ac.uk/',
    coords: [51.5332, -0.4692],
    location: 'Uxbridge, West London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#=385 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'Brunel University of London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "Brunel University of London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('brunel-university-london'),
    },
    academicAreas: ['Engineering', 'Design', 'Business', 'Computer Science', 'Sport Sciences'],
    about: {
      en: 'A campus-based university in West London with particular strengths in engineering, design, technology and professionally focused education.',
      tr: "Batı Londra'da yer alan, mühendislik, tasarım, teknoloji ve mesleğe yönelik eğitimde özellikle güçlü olan, kampüs temelli bir üniversite.",
    },
    stationsLabel: 'Nearest Station',
    stations: [{ name: 'Uxbridge', lines: 'Metropolitan · Piccadilly', time: '~15 min walk' }],
    stationsNote: {
      en: "Brunel's official directions state that the walk from Uxbridge station to the university is approximately one mile, taking around 15 minutes. West Drayton, the nearest mainline station, is roughly 1.5 miles from campus.",
      tr: "Brunel'in resmi yol tarifine göre Uxbridge istasyonundan üniversiteye yürüyüş yaklaşık bir mil olup 15 dakika sürüyor. En yakın ana tren istasyonu olan West Drayton ise kampüse yaklaşık 1,5 mil uzaklıkta.",
    },
    livingNear: ['Uxbridge', 'Hillingdon', 'Ickenham', 'West Drayton'],
  },
  {
    id: 'soas',
    name: 'SOAS University of London',
    image: soasImg,
    officialWebsite: 'https://www.soas.ac.uk/',
    coords: [51.5222, -0.129],
    location: 'Russell Square / Bloomsbury, London',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#=511 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'SOAS University of London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "SOAS University of London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('soas-university-london'),
    },
    academicAreas: ['Politics', 'International Relations', 'Development Studies', 'Law', 'Languages'],
    about: {
      en: 'A specialist university internationally recognised for its focus on Africa, Asia and the Middle East, with distinctive strengths across politics, development, law, languages and international studies.',
      tr: "Afrika, Asya ve Orta Doğu odağıyla uluslararası düzeyde tanınan; siyaset, kalkınma, hukuk, diller ve uluslararası çalışmalarda ayırt edici güçlü yönlere sahip uzman bir üniversite.",
    },
    stationsLabel: 'Nearest Stations',
    stations: [
      { name: 'Russell Square', lines: 'Piccadilly', time: '~5 min' },
      { name: 'Goodge Street', lines: 'Northern', time: '~9 min' },
      { name: 'Holborn', lines: 'Central · Piccadilly', time: '~12 min' },
      { name: 'Tottenham Court Road', lines: 'Central · Northern · Elizabeth', time: '~12 min' },
    ],
    stationsNote: {
      en: "SOAS publishes these walking times for its Russell Square campus. It also notes that Euston, St Pancras and King's Cross mainline stations are within approximately 15 minutes' walk.",
      tr: "SOAS, Russell Square kampüsü için bu yürüme sürelerini yayımlıyor. Ayrıca Euston, St Pancras ve King's Cross ana tren istasyonlarının yürüyerek yaklaşık 15 dakika mesafede olduğunu belirtiyor.",
    },
    livingNear: ['Bloomsbury', 'Fitzrovia', "King's Cross", 'Marylebone', 'Covent Garden'],
  },
  {
    id: 'royal-holloway',
    name: 'Royal Holloway, University of London',
    image: royalHollowayImg,
    officialWebsite: 'https://www.royalholloway.ac.uk/',
    coords: [51.4247, -0.5667],
    location: 'Egham, Surrey',
    qsRankingLabel: 'QS World Ranking 2026',
    qsRanking: '#=461 World',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'Royal Holloway, University of London ranking is based on the QS World University Rankings 2026. Rankings are subject to change.',
        tr: "Royal Holloway, University of London sıralaması QS Dünya Üniversite Sıralamaları 2026'ya dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('royal-holloway-university-london'),
    },
    academicAreas: ['Psychology', 'Humanities', 'Computer Science', 'Business', 'Performing Arts'],
    about: {
      en: 'Part of the University of London, Royal Holloway offers a distinctive parkland campus environment in Egham, combining access to London with a more traditional university campus setting.',
      tr: "University of London'ın bir parçası olan Royal Holloway, Egham'da Londra'ya erişimi daha geleneksel bir kampüs ortamıyla birleştiren, ayırt edici bir parklık kampüs sunuyor.",
    },
    stationsLabel: 'Nearest Station',
    stations: [{ name: 'Egham', lines: 'South Western Railway', time: '~20 min walk' }],
    stationsNote: {
      en: "Egham is the university's nearest railway station, with direct services towards London Waterloo. Royal Holloway states that the campus is approximately a 20-minute walk from the station and also provides a shuttle connection.",
      tr: "Egham, üniversiteye en yakın tren istasyonu olup Londra Waterloo'ya doğrudan seferler sunuyor. Royal Holloway, kampüsün istasyondan yaklaşık 20 dakika yürüme mesafesinde olduğunu ve ayrıca bir servis bağlantısı sağladığını belirtiyor.",
    },
    livingNear: ['Egham', 'Englefield Green', 'Virginia Water', 'Windsor', 'Staines-upon-Thames'],
  },
  {
    id: 'royal-college-of-art',
    name: 'Royal College of Art',
    image: royalCollegeOfArtImg,
    officialWebsite: 'https://www.rca.ac.uk/',
    coords: [51.5011, -0.1794],
    location: 'South Kensington, London',
    qsRankingLabel: 'QS World Ranking by Subject 2026',
    qsRanking: '#1 World — Art & Design',
    rankingDetail: {
      source: 'QS World University Rankings 2026.',
      note: {
        en: 'Royal College of Art ranking is based on the QS World University Rankings by Subject 2026: Art & Design. Rankings are subject to change.',
        tr: "Royal College of Art sıralaması, QS Dünya Üniversite Sıralamaları (Konu Bazlı) 2026: Sanat ve Tasarım kategorisine dayanmaktadır. Sıralamalar değişikliğe tabidir.",
      },
      link: qsProfileUrl('royal-college-art'),
    },
    academicAreas: ['Art', 'Design', 'Architecture', 'Fashion', 'Visual Communication'],
    about: {
      en: "A specialist postgraduate university dedicated to art and design, the Royal College of Art holds the world's #1 position for Art & Design in the QS World University Rankings by Subject 2026.",
      tr: "Sanat ve tasarıma adanmış uzman bir lisansüstü üniversite olan Royal College of Art, QS Dünya Üniversite Sıralamaları (Konu Bazlı) 2026'da Sanat ve Tasarım alanında dünya birincisi konumunda.",
    },
    stationsLabel: 'Nearest Stations — Kensington Campus',
    stations: [
      { name: 'South Kensington', lines: 'Circle · District · Piccadilly', time: '~10 min' },
      { name: 'High Street Kensington', lines: 'Circle · District', time: '~10 min' },
      { name: 'Lancaster Gate', lines: 'Central', time: '~15 min' },
    ],
    livingNear: ['South Kensington', 'Kensington', 'Knightsbridge', 'Chelsea', 'Notting Hill'],
  },
]
