const mongoose = require('mongoose');
const { Bird } = require('./schema')
const dotenv = require('dotenv');
dotenv.config();

// MongoDB connection
mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() =>
        console.log('Connected to MongoDB')
    );

// Bird data
const birds = [
    {
        name: "House sparrow",
        maoriName: "Tiu",
        scientificName: "Passer domesticus",
        otherNames: ["English sparrow"],
        conservationStatus: "Introduced and Naturalised",
        weight: "28-30 g",
        length: "15-20 cm",
        food: " grain, crops",
        habitat: "Everywhere except for high mountains and bush",
        description: "One of the world's most successful introduced species, the house sparrow is found from sub-Arctic to sub-Tropical regions everywhere, except Western Australia and some small islands. It lives mostly in close association with man. This ubiquity has led to many studies of it as a pest and of its physiology, energetics, behaviour, genetics and evolution. There is even a scientific journal devoted to work on the house sparrow and other Passer species.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/IMG_5492.JPG",
            "https://nzbirdsonline.org.nz/sites/all/files/1200599Male%20sparrow%20Hamilton.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the House sparrow?",
                answers: ["Tiu", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the House sparrow?",
                answers: ["Passer domesticus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the House sparrow?",
                answers: ["10-15 cm", "20-30 cm", "15-20 cm"],
                correctAnswer: "3"
            },
            {
                question: "What do House sparrows eat?",
                answers: ["Seeds", "Insects", "grain and crops"],
                correctAnswer: "3"
            },
            {
                question: "What is the weight range of the House sparrow?",
                answers: ["30-35 g", "350-400 g", "28-30 g"],
                correctAnswer: "3"
            },
            {
                question: "What is the typical habitat of the House sparrow?",
                answers: ["bush", "urban areas", "high mountains"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the House sparrow?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Rock pigeon",
        maoriName: "Kererū aropari",
        scientificName: "Columba livia",
        otherNames: [" domestic pigeon", "racing pigeon"],
        conservationStatus: "Introduced and Naturalised",
        weight: "265-432 g",
        length: "29-37 cm",
        food: "commercial grains",
        habitat: "Urban areas",
        description: "The rock pigeon is a familiar species to most New Zealanders, given its distribution from Northland to Southland, and being present in both urban and rural areas. While rural birds are usually quite timid, flying off at close approach, urban birds are often quite the opposite, walking about at one's feet and even alighting on people to take food. It is a gregarious species, often roosting, commuting and foraging in flocks.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Rock%20Pigeon_Mt%20Cook_Oct16_Scott%20Brooks_IMG_2337.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200462Lake%20Rotoroa%2C%20Hamilton%2011%20Jan%202012%20pigeon%20035.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Rock pigeon?",
                answers: ["Kererū aropari", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Rock pigeon?",
                answers: ["Columba livia", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Rock pigeon?",
                answers: ["10-20 cm", "29-37 cm", "41 cm-50 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Rock pigeon",
                answers: ["30-35 g", "35-100 g", "265-432 g"],
                correctAnswer: "3"
            },
            {
                question: "What do Rock pigeons eat?",
                answers: ["Insects", "commercial grains", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Rock pigeon?",
                answers: ["Forests", "Urban areas", "Mountains"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Rock pigeon?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },
    {
        name: "Eurasian blackbird",
        maoriName: "Manu pango",
        scientificName: "Turdus merula Linnaeus",
        otherNames: ["Common blackbird"],
        conservationStatus: "Introduced and Naturalised",
        weight: "90-100 g",
        length: "24-27 cm",
        food: "earthworms, insects, spiders, snails and slugs",
        habitat: "Forests, gardens, urban areas",
        description: "The Eurasian blackbird was introduced to New Zealand, and is now our most widely distributed bird species. Adult males are entirely black apart from their yellow bill and eye-ring. Females and juveniles are mostly dark brown, slightly mottled on the belly. Blackbirds are common in a wide range of habitats including suburban gardens, farmland, woodlands and indigenous forests. Their song is given from winter to summer, with the singing male usually perched on a high branch, tree top or power line. They sing most in the early morning and evening. Blackbirds feed mostly on the ground on earthworms, snails, and insects. They also take berries while perched in foliage.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/1200593Turdus-merula_9973.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/12005932011_08_21_1117.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Eurasian blackbird?",
                answers: ["Manu pango", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Eurasian blackbird?",
                answers: ["Turdus merula Linnaeus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Eurasian blackbird?",
                answers: ["10-20 cm", "24-27 cm", "41-44 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Eurasian blackbird",
                answers: ["30-40 g", "90-100 g", "265-432 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Eurasian blackbirds eat?",
                answers: ["Seeds", "Insects, fruits, worms", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Eurasian blackbird?",
                answers: ["Mountains", "Forests, gardens, urban areas", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Eurasian blackbird?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Chaffinch",
        maoriName: "Pahirini",
        scientificName: "Fringilla coelebs  Linnaeus",
        otherNames: ["Common chaffinch"],
        conservationStatus: "Least Concern",
        weight: "19-25 g",
        length: "14-16 cm",
        food: "Seeds in winter, insects",
        habitat: "Forests, woodlands, gardens",
        description: "Chaffinches are the commonest and most widespread of New Zealand's introduced finches, and are found in a wide range of habitats from sea-level to 1400 m. They are self-introduced to many off-shore islands. Chaffinches frequently visit suburban gardens, especially in winter, and are often seen feeding with house sparrows and silvereyes around bird-tables, on lawns and in parks. The sexes may segregate into separate flocks in winter, especially males; hence the specific name of coelebs (bachelor).",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/2L1A1774_0.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200607Chaffinch3.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Chaffinch?",
                answers: ["Pahirini", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Chaffinch?",
                answers: ["Fringilla coelebs  Linnaeus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Chaffinch?",
                answers: ["10-20 cm", "14-16 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight of the Chaffinch",
                answers: ["30 g", "90-100 g", "19 - 25 g"],
                correctAnswer: "3"
            },
            {
                question: "What do Chaffinches eat in winter?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "1"
            },
            {
                question: "What is the typical habitat of the Chaffinch?",
                answers: ["Mountains", "Forests, woodlands, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Chaffinch?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "New Zealand pigeon",
        maoriName: "Kererū",
        scientificName: "Hemiphaga novaeseelandiae",
        otherNames: ["Kereru", "Wood pigeon"],
        conservationStatus: "Not Threatened",
        weight: "550-850 g",
        length: "50-55 cm",
        food: "Fruits, leaves, flowers",
        habitat: "Forests, gardens",
        description: "A large arboreal pigeon with a red bill, feet and eyes. The upperparts are blue-green with purple-bronze iridescence on the neck, mantle and wing coverts, and the underparts are white with a sharp demarcation between the white and blue-green on the upper breast.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/BirdsAug08%20039.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200466Kereru.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the New Zealand pigeon?",
                answers: ["Kererū", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the New Zealand pigeon?",
                answers: ["Hemiphaga novaeseelandiae", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the New Zealand pigeon?",
                answers: ["10-20 cm", "50-55 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the New Zealand pigeon?",
                answers: ["30-60 g", "90-120 g", "550-850 g"],
                correctAnswer: "3"
            },
            {
                question: "What do New Zealand pigeons eat?",
                answers: ["Seeds", "Fruits, leaves, flowers", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the New Zealand pigeon?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the New Zealand pigeon?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "European goldfinch",
        maoriName: "Kōurarini",
        scientificName: "Carduelis carduelis",
        otherNames: ["Goldfinch"],
        conservationStatus: "Introduced and Naturalised",
        weight: "14-19 g",
        length: "12-13 cm",
        food: "Seeds, insects",
        habitat: "Open woodlands, gardens",
        description: "Goldfinches are small finches with flashes of bright yellow and red, common in open country throughout New Zealand. Introduced from Britain 1862-1883, their tinkling calls contribute to the collective noun “a charm of goldfinches”. They are mainly seed-eaters, and often gather in flocks to feed on thistle seed. Goldfinches frequently stray to outlying island groups, and are resident on the Chatham Islands.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Goldfinch_D804966-1024web.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200609Carduelis-carduelis_5591.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the European goldfinch?",
                answers: ["Kōurarini", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the European goldfinch?",
                answers: ["Carduelis carduelis", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the European goldfinch?",
                answers: ["10-20 cm", "12-13 cm", "20-25 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the European goldfinch?",
                answers: ["30-40 g", "90-100 g", "14-19 g"],
                correctAnswer: "3"
            },
            {
                question: "What do European goldfinches eat?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "1"
            },
            {
                question: "What is the typical habitat of the European goldfinch?",
                answers: ["Mountains", "Open woodlands, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the European goldfinch?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "European greenfinch",
        maoriName: "Kākāriki",
        scientificName: "Chloris chloris",
        otherNames: ["Greenfinch"],
        conservationStatus: "Introduced and Naturalised",
        weight: "20-32 g",
        length: "15-16 cm",
        food: "Seeds, insects",
        habitat: "Woodlands, parks",
        description: "The European greenfinch, also known as Greenfinch, is a small bird found in woodlands and parks. It is known for its green plumage and distinctive call. European greenfinches primarily feed on seeds and insects. They are commonly seen in various parts of the world, including New Zealand.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/1200608Greenfinchm.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200608IMG_0879.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the European greenfinch?",
                answers: ["Kākāriki", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the European greenfinch?",
                answers: ["Chloris chloris", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the European greenfinch?",
                answers: ["10-20 cm", "15-16 cm", "40-41 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the European greenfinch?",
                answers: ["10-20 g", "20-32 g", "30-40 g"],
                correctAnswer: "2"
            },
            {
                question: "What do European greenfinches eat?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "1"
            },
            {
                question: "What is the typical habitat of the European greenfinch?",
                answers: ["Mountains", "Woodlands, parks", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the European greenfinch?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Song thrush",
        maoriName: "Manu-kai-hua-rakau",
        scientificName: "Turdus philomelos Brehm",
        otherNames: ["thrush"],
        conservationStatus: "Introduced and Naturalised",
        weight: "70-120 g",
        length: "21-23 cm",
        food: "Insects, earthworms, snails, fruits",
        habitat: "Forests, gardens",
        description: "The song thrush is easily recognised by its speckled brown-on-cream breast. It is often heard before it is seen, as it is one of the main songsters of suburban New Zealand, with a very long singing season. Thrushes sing from a high branch, at the top of a tree or on power poles and lines. Their distinctive song comprising a wide range of notes, with each phrase typically repeated 2-3 times in succession. They are common throughout mainland New Zealand and nearby offshore islands, also Stewart Island, Chatham Islands, Snares Islands and Auckland Islands.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/1200595Songthrush%205707.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200595IMG_5711.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Song thrush?",
                answers: ["Manu-kai-hua-rakau", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Song thrush?",
                answers: ["Turdus philomelos Brehm", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Song thrush?",
                answers: ["10-20 cm", "21-23 cm", "41 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Song thrush?",
                answers: ["30-60 g", "70-120 g", "100-150 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Song thrushes eat?",
                answers: ["Seeds", "Insects, earthworms, snails, fruits", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Song thrush?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Song thrush?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Australian magpie",
        maoriName: "Makipai",
        scientificName: "Gymnorhina tibicen",
        otherNames: ["magpie", "white-backed magpie", "black-backed magpie", "makipae"],
        conservationStatus: "Introduced and Naturalised",
        weight: "350-360 g",
        length: "41-45 cm",
        food: "earthworms",
        habitat: "North Island and Kaikoura to Southland",
        description: "The black-and-white Australian magpie is a common and conspicuous inhabitant of open country throughout much of New Zealand. It was introduced from Australia and Tasmania by Acclimatisation Societies between 1864 and 1874, mainly to control insect pests. There are three subspecies; the black-backed, and two white-backed forms, with white-backed birds predominating in most parts of New Zealand. Some authorities group the Australian magpie with butcherbirds in the genus Cracticus.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Australian%20magpie_2.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200552DSC_0001_0.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Australian magpie?",
                answers: ["Makipai", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Australian magpie?",
                answers: ["Sparrow domesticus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "2"
            },
            {
                question: "What is the length range of the Australian magpie?",
                answers: ["10-20 cm", "20-30 cm", "41-45 cm"],
                correctAnswer: "3"
            },
            {
                question: "What do Australian magpies eat?",
                answers: ["Seeds", "Insects", "earthworms"],
                correctAnswer: "3"
            },
            {
                question: "What is the weight range of the Australian magpie?",
                answers: ["30-35 g", "350 -360 g", "25-30 g"],
                correctAnswer: "2"
            },
            {
                question: "What is the distribution and habitat of the Australian magpie?",
                answers: ["Forests", "Mountains", "North Island and Kaikoura to Southland"],
                correctAnswer: "3"
            },
            {
                question: "What is the Conservation status of the Australian magpie?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Tui",
        maoriName: "Tui",
        scientificName: "Prosthemadera novaeseelandiae",
        otherNames: ["parson bird", "tūī", "kōkō", "koko"],
        conservationStatus: "Not Threatened",
        weight: "90-120 g",
        length: "30-32 cm",
        food: "Nectar, fruits, insects",
        habitat: "Forests, gardens",
        description: "Tui are boisterous, medium-sized, common and widespread bird of forest and suburbia - unless you live in Canterbury. They look black from a distance, but in good light tui have a blue, green and bronze iridescent sheen, and distinctive white throat tufts (poi). They are usually very vocal, with a complicated mix of tuneful notes interspersed with coughs, grunts and wheezes. In flight, their bodies slant with the head higher than the tail, and their noisy whirring flight is interspersed with short glides.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Tui1.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200543Prosthemadera-novaeseelandiae_1986.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Tui?",
                answers: ["Tui", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Tui?",
                answers: ["Prosthemadera novaeseelandiae", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Tui?",
                answers: ["10-20 cm", "30-32 cm", "41 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Tui?",
                answers: ["60-90 g", "90-125 g ", "100-150 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Tui primarily eat?",
                answers: ["Seeds", "Nectar, fruits, insects", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Tui?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Tui?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Common myna",
        maoriName: "Maina",
        scientificName: "Acridotheres tristis",
        otherNames: ["Indian myna", "mynah"],
        conservationStatus: "Introduced and Naturalised",
        weight: "120-140 g",
        length: "23-26 cm",
        food: "Insects, fruits, scraps",
        habitat: "Urban areas, parks",
        description: "The common myna is a native of India, east and west Pakistan and Burma. It was introduced to many Pacific lands, including New Zealand, usually to combat invertebrate pests. Mynas are large, conspicuous passerines. A shiny black head and shoulder plumage merges into vinous brown for the remainder of the body and a large patch of white is flashed from each wing during flight.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Common_Myna_20110721_White_Grass_Tanna_Vanuatu_1.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200598IMG_1476.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Common myna?",
                answers: [" Maina", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Common myna?",
                answers: ["Acridotheres tristis", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Common myna?",
                answers: ["10-20 cm", "23-26 cm", "41 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Common myna?",
                answers: ["60-80 g", "120-140 g", "90-110 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Common mynas primarily eat?",
                answers: ["Seeds", "Insects, fruits, scraps", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Common myna?",
                answers: ["Mountains", "Urban areas, parks", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Common myna?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Yellowhammer",
        maoriName: "Hurukōwhai",
        scientificName: "Emberiza citrinella Linnaeus",
        otherNames: ["yellow bunting"],
        conservationStatus: "Introduced and Naturalised",
        weight: "18-30 g",
        length: "16-17 cm",
        food: "Seeds, insects",
        habitat: "Grasslands, farmlands",
        description: "The colourful yellowhammer is a common inhabitant of open country throughout much of New Zealand. Introduced from Britain by Acclimatisation Societies between 1865 and 1879, it has spread widely, including reaching many off-shore islands. Yellowhammers feed on a variety of seeds and invertebrates. They are frequently seen feeding on the seeds in hay fed to livestock, and also on newly-sown grass seed.",
        rarity: 1,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/0I9A0175.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200612Perched%20Yellowhammer-0093_0.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Yellowhammer?",
                answers: ["Hurukōwhai", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Yellowhammer?",
                answers: ["Emberiza citrinella Linnaeus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Yellowhammer?",
                answers: ["10-20 cm", "16-17 cm", "41 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Yellowhammer?",
                answers: ["10-20 g", "18-30 g", "30-40 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Yellowhammers primarily eat?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "1"
            },
            {
                question: "What is the typical habitat of the Yellowhammer?",
                answers: ["Mountains", "Grasslands, farmlands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Yellowhammer?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Dunnock",
        maoriName: "no maoriname",
        scientificName: "Prunella modularis",
        otherNames: ["Hedge sparrow"],
        conservationStatus: "Introduced and Naturalised",
        weight: "18-22 g",
        length: "13-14 cm",
        food: "Insects, seeds",
        habitat: "Woodlands, gardens",
        description: "Dunnocks are small brown songbirds that were introduced from England into multiple regions of New Zealand between 1865 and 1896. They are a common sight in urban gardens and open country in southern New Zealand, but are scarcer in the northern North Island. The drab appearance of dunnocks is compensated by their stunningly complex breeding behaviours.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/dunnock.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200606Dunnock.jpg"
        ],
        questions: [
            {
                question: "What is the other name for the Dunnock?",
                answers: ["Hedge sparrow", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Dunnock?",
                answers: ["Prunella modularis", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Dunnock?",
                answers: ["10-20 cm", "13-14 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Dunnock?",
                answers: ["10-20 g", "18-22 g", "30-40 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Dunnocks primarily eat?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Dunnock?",
                answers: ["Mountains", "Woodlands, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Dunnock?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "Red-billed Gull",
        maoriName: "Tarāpunga",
        scientificName: "Chroicocephalus scopulinus",
        otherNames: ["silver gull", "tarapunga", "mackerel gull"],
        conservationStatus: "Declining",
        weight: "240-320g",
        length: "35-37 cm",
        food: "Fish, invertebrates",
        habitat: "Coastal areas",
        description: "The red-billed gull is the commonest gull on the New Zealand coast. Except for a colony at Lake Rotorua, it rarely is found inland. It is commonly seen in coastal towns, garbage dumps and at fish processing facilities. Immature adults are often confused with the closely related black-billed gull. Recently the largest colonies in different parts of New Zealand have exhibited a marked decline in numbers.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Red-billedGull.AdultAlternate.OscarThomas.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200428Red-billed%20Gull%2019%20Sept%202010%20015.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Red-billed Gull?",
                answers: ["Tarāpunga", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Red-billed Gull?",
                answers: ["Chroicocephalus scopulinus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Red-billed Gull?",
                answers: ["10-20 cm", "35-37 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Red-billed Gull?",
                answers: ["100-200 g", "240-320g", "250-350 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Red-billed Gulls primarily eat?",
                answers: ["Seeds", "Fish, invertebrates", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Red-billed Gull?",
                answers: ["Mountains", "Coastal areas", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Red-billed Gull?",
                answers: ["Endangered", "Declining", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Southern black-backed gull",
        maoriName: "Karoro",
        scientificName: "Larus dominicanus Lichtenstein",
        otherNames: ["Kelp gull", "dominican gull"],
        conservationStatus: "Not Threatened",
        weight: "650-1,200 g",
        length: "58-66 cm",
        food: "Fish, invertebrates",
        habitat: "Coastal areas",
        description: "The southern black-backed gull, also known as the kelp gull, is a large gull species with dark plumage. It primarily feeds on fish and invertebrates and is commonly found in coastal areas. Southern black-backed gulls are known for their scavenging behavior and are often seen near fishing boats.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Black%20bill%20gull%20copy.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/120026LaridaeJan07-Mar07%20140.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Southern black-backed gull?",
                answers: ["Karoro", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Southern black-backed gull?",
                answers: ["Larus dominicanus Lichtenstein", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Southern black-backed gull?",
                answers: ["10-20 cm", "58-66 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Southern black-backed gull?",
                answers: ["100-200 g", "650-1,200 g", "250-350 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Southern black-backed gulls primarily eat?",
                answers: ["Seeds", "Fish, invertebrates", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Southern black-backed gull?",
                answers: ["Mountains", "Coastal areas", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Southern black-backed gull?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Eurasian skylark",
        maoriName: "Kairaka",
        scientificName: "Alauda arvensis Linnaeus",
        otherNames: ["skylark", "kaireka", "common skylark"],
        conservationStatus: "Introduced and Naturalised",
        weight: "35-40 g",
        length: "16-18 cm",
        food: "Seeds, insects",
        habitat: "Grasslands, farmlands",
        description: "Eurasian skylarks are more often heard than seen. Their small size and streaked brown plumage make them difficult to see on the ground, but their vibrant aerial song quickly reveals their presence, a song that has inspired poets and musicians for centuries. Skylarks were introduced into New Zealand from England between 1864 and 1879, when more than 1000 birds were released. Birds from New Zealand were released in turn on the Hawaiian Islands in 1870, supplementing a population introduced there from England five years earlier.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/skylark.JPG",
            "https://nzbirdsonline.org.nz/sites/all/files/1200579IMG_0638ac.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Eurasian skylark?",
                answers: ["Kairaka", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Eurasian skylark?",
                answers: ["Alauda arvensis Linnaeus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Eurasian skylark?",
                answers: ["10-20 cm", "16-18 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Eurasian skylark?",
                answers: ["10-20 g", "35-40 g", "30-35 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Eurasian skylarks primarily eat?",
                answers: ["Seeds", "Insects", "Fish"],
                correctAnswer: "1"
            },
            {
                question: "What is the typical habitat of the Eurasian skylark?",
                answers: ["Mountains", "Grasslands, farmlands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Eurasian skylark?",
                answers: ["Endangered", "Least Concern", "Introduced and Naturalised"],
                correctAnswer: "3"
            }
        ]
    },

    {
        name: "White-faced heron",
        maoriName: "Matuku moana",
        scientificName: "Egretta novaehollandiae",
        otherNames: ["matuku", "blue heron", "blue crane"],
        conservationStatus: "Not Threatened",
        weight: "500-600 g",
        length: "66-68 cm",
        food: "Fish, crustaceans",
        habitat: "Wetlands, riversides",
        description: "The white-faced heron is New Zealand's most common heron, despite being a relatively new arrival to this country. It is a tall, elegant, blue-grey bird that can be seen stalking its prey in almost any aquatic habitat, including damp pasture and playing fields. Because it occupies space also shared with people it is usually well habituated to their presence, and may allow close approach.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Adult%20breeding%20plumage%20january%202012.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200277WFHeron.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the White-faced heron?",
                answers: ["Matuku moana", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the White-faced heron?",
                answers: ["Egretta novaehollandiae", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the White-faced heron?",
                answers: ["10-20 cm", "66-68 cm", "41 -45cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the White-faced heron?",
                answers: ["300-400 g", "500-600 g", "400-500 g"],
                correctAnswer: "2"
            },
            {
                question: "What do White-faced herons primarily eat?",
                answers: ["Seeds", "Fish, crustaceans", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the White-faced heron?",
                answers: ["Mountains", "Wetlands, riversides", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the White-faced heron?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Spur-winged plover",
        maoriName: "No maoriname",
        scientificName: "Vanellus miles",
        otherNames: ["Masked lapwing"],
        conservationStatus: "Not Threatened",
        weight: " 350 - 370 g",
        length: "32-38 cm",
        food: "Insects, worms",
        habitat: "Grasslands, wetlands",
        description: "The New Zealand spur-winged plover population has a unique conservation trajectory among our native bird species. In just over 80 years since the first breeding record, it has gone from a fully protected native to having that protection removed in 2010. First recorded breeding near Invercargill in 1932, it subsequently spread northwards through the country, becoming established in Northland in the 1980s",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/2850-4%20Spur%20Winged%20Plover.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200417spurwing_spurs_%20PBattley_IMG_0976.jpg"
        ],
        questions: [
            {
                question: "What is the other name for the Spur-winged plover?",
                answers: ["Masked lapwing", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Spur-winged plover?",
                answers: ["Vanellus miles", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Spur-winged plover?",
                answers: ["10-20 cm", "32-38 cm", "41 -45cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Spur-winged plover?",
                answers: ["100-200 g", " 350 - 370g", "200-300 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Spur-winged plovers primarily eat?",
                answers: ["Seeds", "Insects, worms", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Spur-winged plover?",
                answers: ["Mountains", "Grasslands, wetlands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Spur-winged plover?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Welcome swallow",
        maoriName: "Warou",
        scientificName: "Hirundo neoxena Gould",
        otherNames: ["House swallow "],
        conservationStatus: "Not Threatened",
        weight: "9-20 g",
        length: "14-16 cm",
        food: "Flying insects",
        habitat: "Open country, farmlands",
        description: "Welcome swallows are small fast-flying birds found in open country particularly around lakes, coasts, riverbeds and ponds. Their flight is circular and darting in style, and they may be seen singly, in pairs or in flocks. Flocks often perch en masse, lined up on fences or power lines.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/WelcomeSwallow_D804226-1024web.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200587IMG_3352.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Welcome swallow?",
                answers: ["Warou", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Welcome swallow?",
                answers: ["Hirundo neoxena Gould", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Welcome swallow?",
                answers: ["10-20 cm", "14-16 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Welcome swallow?",
                answers: ["10-15 g", "9-20 g", "20-25 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Welcome swallows primarily eat?",
                answers: ["Seeds", "Flying insects", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Welcome swallow?",
                answers: ["Mountains", "Open country, farmlands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Welcome swallow?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "New Zealand fantail",
        maoriName: "Piwakawaka",
        scientificName: "Rhipidura fuliginosa",
        otherNames: ["grey fantail", "pied fantail"],
        conservationStatus: "Not Threatened",
        weight: "6-9 g",
        length: "16-20 cm",
        food: "Insects",
        habitat: "Forests, gardens",
        description: "The fantail is one of New Zealand's best known birds, with its distinctive fanned tail and loud song, and particularly because it often approaches within a metre or two of people. Its wide distribution and habitat preferences, including frequenting well-treed urban parks and gardens, means that most people encounter fantails occasionally. They can be quite confiding, continuing to nest build or visit their nestlings with food when people watch quietly.",
        rarity: 2,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/2L1A9564_0.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200555IMG_0690.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the New Zealand fantail?",
                answers: ["Piwakawaka", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the New Zealand fantail?",
                answers: ["Rhipidura fuliginosa", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the New Zealand fantail?",
                answers: ["10-20 cm", "16-20 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the New Zealand fantail?",
                answers: ["5-7 g", "6-9 g", "9-12 g"],
                correctAnswer: "2"
            },
            {
                question: "What do New Zealand fantails primarily eat?",
                answers: ["Seeds", "Insects", "Fruits"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the New Zealand fantail?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the New Zealand fantail?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Eastern rosella",
        maoriName: "Kākā uhi whero",
        scientificName: "Platycercus eximius",
        otherNames: ["white-cheeked rosella"],
        conservationStatus: "Introduced and Naturalised",
        weight: "90-120 g",
        length: "30-33 cm",
        food: "Seeds, fruits",
        habitat: "Forests, farmlands",
        description: "The eastern rosella is a brightly coloured, broad-tailed parakeet native to south-eastern Australia. It was introduced to New Zealand in the early 1900s, and is now common over much of the North Island, with a smaller population centred on Dunedin. They typically move around the landscape in pairs or small flocks, often given away by their noisy chatter or loud, in-flight alarm call.",
        rarity: 3,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Eastern%20Rosella%20Whangarei%20Oct%202021.jpg",
            "Ihttps://nzbirdsonline.org.nz/sites/all/files/1200476Perched%20Eastern%20Rosella-7824.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Eastern rosella?",
                answers: ["Kākā uhi whero", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Eastern rosella?",
                answers: ["Platycercus eximius", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Eastern rosella?",
                answers: ["10-20 cm", "30-33 cm", "41-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Eastern rosella?",
                answers: ["60-80 g", "90-120 g", "120-150 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Eastern rosellas primarily eat?",
                answers: ["Insects", "Seeds, fruits", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Eastern rosella?",
                answers: ["Mountains", "Forests, farmlands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Eastern rosella?",
                answers: ["Endangered", "Introduced and Naturalised", "At risk"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Grey warbler",
        maoriName: "Riroriro",
        scientificName: "Gerygone igata",
        otherNames: ["Rainbird", "Teetotum", "Grey gerygone"],
        conservationStatus: "Not Threatened",
        weight: "5.5-6.5 g",
        length: "11-13 cm",
        food: "Insects",
        habitat: "Forests, shrublands",
        description: "The grey warbler is New Zealand's most widely distributed endemic bird species, based on the number of 10 x 10 km grid squares it occupied over the whole country in a 1999-2004 survey. It vies with rifleman for the title of New Zealand's smallest bird, with both weighing about 6 g. The title usually goes to rifleman, based on its shorter tail and therefore shorter body length.",
        rarity: 3,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Wypych%20grey%20warbler.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200536GreyWarbler1.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Grey warbler?",
                answers: ["Riroriro", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Grey warbler?",
                answers: ["Gerygone igata", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Grey warbler?",
                answers: ["10-15 cm", "11-13 cm", "15-18 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Grey warbler?",
                answers: ["5-6 g", "5.5-6.5 g", "7-8 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Grey warblers primarily eat?",
                answers: ["Seeds", "Insects", "Fruits"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Grey warbler?",
                answers: ["Mountains", "Forests, shrublands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Grey warbler?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Bellbird",
        maoriName: "Korimako",
        scientificName: "Anthornis melanura",
        otherNames: ["Korimako"],
        conservationStatus: "Not Threatened",
        weight: "26-34 g",
        length: "19-22 cm",
        food: "Nectar, insects, fruits",
        habitat: "Forests, gardens",
        description: "Bellbirds are the most widespread and familiar honeyeater in the South Island, and are also common over much of the North Island. Their song is a welcome sound in mainland forests that otherwise may have little native bird song. Although they have a brush-like tongue which is used to reach deeply into flowers to reach nectar, bellbirds also feed on fruits and insects. In feeding on nectar they play an important ecological role in pollinating the flowers of many native trees and shrubs.",
        rarity: 4,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Bellbird2.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200538IMG_9590%20copy.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Bellbird?",
                answers: ["Korimako", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Bellbird?",
                answers: ["Anthornis melanura", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Bellbird?",
                answers: ["10-15 cm", "19-22 cm", "30-35 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Bellbird?",
                answers: ["20-30 g", "26-34 g", "50-70 g"],
                correctAnswer: "2"
            },
            {
                question: "What do Bellbirds primarily eat?",
                answers: ["Seeds", "Nectar, insects, fruits", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Bellbird?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Bellbird?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "North Island robin",
        maoriName: "Toutouwai",
        scientificName: "Petroica longipes",
        otherNames: ["Toutouwai"],
        conservationStatus: "Declining",
        weight: "35-38 g",
        length: "18-20 cm",
        food: "Insects",
        habitat: "Forests, shrublands",
        description: "The North Island robin occurs in forest and scrub habitats. It can be recognised by its erect stance and relatively long legs, and spends much time foraging on the ground. It is a territorial species, males in particular inhabiting the same patch of mainland forest of 1-5 ha throughout their lives. Male are great songsters, particularly bachelors, singing loudly and often for many minutes at a time. Where robins are regularly exposed to people, such as along public walking tracks, they become quite confiding, often approaching to within a metre of a person sitting quietly. Naïve juveniles will sometimes stand on a person's boot.",
        rarity: 4,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Petroica-australis_4318.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200574North%20Island%20Robin%20-%20male.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the North Island robin?",
                answers: ["Toutouwai", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the North Island robin?",
                answers: ["Petroica longipes", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length of the North Island robin?",
                answers: ["10-15 cm", "18-20 cm", "25-30 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the North Island robin?",
                answers: ["20-25 g", "35-38 g", "30-35 g"],
                correctAnswer: "2"
            },
            {
                question: "What do North Island robins primarily eat?",
                answers: ["Seeds", "Insects", "Fruits"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the North Island robin?",
                answers: ["Mountains", "Forests, shrublands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the North Island robin?",
                answers: ["Endangered", "Declining", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Shining cuckoo",
        maoriName: "Pīpīwharauroa",
        scientificName: "Chrysococcyx lucidus",
        otherNames: ["Pīpīwharauroa"],
        conservationStatus: "Not Threatened",
        weight: "20-25 g",
        length: "16-18 cm",
        food: "Insects, caterpillars",
        habitat: "Forests, gardens",
        description: "The shining cuckoo (shining bronze-cuckoo in Australia) is a summer migrant to New Zealand. It is common throughout New Zealand but it is small and cryptically-coloured and so is more often heard than seen. It has a distinctive whistling call. Two intriguing aspects of its life history are its brood-parasitic habits and the long annual trans-oceanic migration. The New Zealand subspecies breeds only in New Zealand (including Chatham Islands) but other subspecies breed in southern Australia, Vanuatu, New Caledonia and on Rennell and Bellona Islands (Solomon Islands).",
        rarity: 4,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/2L1A1512%20copy.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200491Shining%20Cuckoo%2C%20Belmont.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Shining cuckoo?",
                answers: ["Pīpīwharauroa", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Shining cuckoo?",
                answers: ["Chrysococcyx lucidus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Shining cuckoo?",
                answers: ["10-12 cm", "16-18 cm", "20-25 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Shining cuckoo?",
                answers: ["10-15 g", "15-20 g", "20-25 g"],
                correctAnswer: "3"
            },
            {
                question: "What do Shining cuckoos primarily eat?",
                answers: ["Seeds", "Insects, caterpillars", "Fruits"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Shining cuckoo?",
                answers: ["Mountains", "Forests, gardens", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Shining cuckoo?",
                answers: ["Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "2"
            }
        ]
    },

    {
        name: "Black-fronted tern",
        maoriName: "Tarapirohe",
        scientificName: "Chlidonias albostriatus",
        otherNames: ["Tarapirohe"],
        conservationStatus: "Nationally Endangered",
        weight: "80-100g",
        length: "28-30 cm",
        food: "Insects, small fish",
        habitat: "Lakes, rivers",
        description: "The black-fronted tern is a small grey tern commonly seen on braided rivers, estuaries and harbours of the eastern South Island. They breed on the braided rivers of the eastern South Island, dispersing to coastal areas after breeding; it is during this time that some birds are seen in the North Island. The black-fronted tern is an attractive and highly distinctive bird in breeding plumage, with the slate grey plumage contrasting with the black cap and bright orange bill. Juveniles and immature birds may be confused with other vagrant tern species but all are easily separable.",
        rarity: 5,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/IMG_3269%20copy%20Black%20Fronted%20Tern.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/1200452Black-frontedTern3.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the Black-fronted tern?",
                answers: ["Tarapirohe", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Black-fronted tern?",
                answers: ["Chlidonias albostriatus", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length of the Black-fronted tern?",
                answers: ["20-25 cm", "28-30 cm", "40-45 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Black-fronted tern?",
                answers: ["40-60 g", "60-80 g", "80-100 g"],
                correctAnswer: "3"
            },
            {
                question: "What do Black-fronted terns primarily eat?",
                answers: ["Seeds", "Insects, small fish", "Nectar"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Black-fronted tern?",
                answers: ["Mountains", "Lakes, rivers", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Black-fronted tern?",
                answers: ["Nationally Endangered", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "1"
            }
        ]
    },

    {
        name: "Southern brown kiwi",
        maoriName: "Tokoeka",
        scientificName: "Apteryx australis Shaw",
        otherNames: ["Tokoeka"],
        conservationStatus: "Naturally Uncommon",
        weight: "2.4- 3.1 kg",
        length: "45-55 cm",
        food: "Insects, worms, fruits",
        habitat: "Forests, scrublands",
        description: "The Stewart Island tokoeka is the largest of the kiwi. Fiordland tokoeka are also very large, but Haast birds are smaller. Widespread in forest, scrub, tussock grasslands and subalpine zones of the south-western South Island and on Stewart Island. Flightless, with tiny vestigial wings and no tail. Generally nocturnal, therefore more often heard than seen, except on Stewart Island where birds often forage during the day.",
        rarity: 5,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Stewart%20island%20Kiwi%20%284%29.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/120049IMG_0587.JPG"
        ],
        questions: [
            {
                question: "What is the Maori name for the Southern brown kiwi?",
                answers: ["Tokoeka", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the Southern brown kiwi?",
                answers: ["Apteryx australis Shaw,", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the Southern brown kiwi?",
                answers: ["30-40 cm", "45-55 cm", "60-70 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the Southern brown kiwi?",
                answers: ["1-2 kg", "2.4-3.1 kg", "3-4 kg"],
                correctAnswer: "2"
            },
            {
                question: "What do Southern brown kiwis primarily eat?",
                answers: ["Seeds", "Insects, worms, fruits", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the Southern brown kiwi?",
                answers: ["Mountains", "Forests, scrublands", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the Southern brown kiwi?",
                answers: ["Naturally Uncommond", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "1"
            }
        ]
    },

    {
        name: "New Zealand swan",
        maoriName: "Matapu",
        scientificName: "Cygnus sumnerensis",
        otherNames: ["pouwa"],
        conservationStatus: "Extinct",
        weight: "6-9 kg",
        length: "120-150 cm",
        food: "soft plants",
        habitat: "Lakes, rivers",
        description: "The New Zealand swan is a large waterbird known for its graceful appearance. It primarily feeds on aquatic plants and is commonly found in lakes and rivers. New Zealand swans are known for their elegant necks and distinctive calls.",
        rarity: 6,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/NZ%20Swan.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/120019274Cygnus-chathamensis-mounted-photo-by-Charles-Lindsay-768x1222.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the New Zealand swan?",
                answers: ["Matapu", "Kakapo", "Kiwi"],
                correctAnswer: "1"
            },
            {
                question: "What is the scientific name of the New Zealand swan?",
                answers: ["Cygnus sumnerensis", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What is the length range of the New Zealand swan?",
                answers: ["80-100 cm", "120-150 cm", "180-200 cm"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight range of the New Zealand swan?",
                answers: ["3-6 kg", "6-9 kg", "9-12 kg"],
                correctAnswer: "2"
            },
            {
                question: "What do New Zealand swans primarily eat?",
                answers: ["Seeds", " soft plants", "Fish"],
                correctAnswer: "2"
            },
            {
                question: "What is the typical habitat of the New Zealand swan?",
                answers: ["Mountains", "Lakes, rivers", "Deserts"],
                correctAnswer: "2"
            },
            {
                question: "What is the Conservation status of the New Zealand swan?",
                answers: ["Extinct", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "1"
            }
        ]
    },

    {
        name: "Stilwell's penguin",
        maoriName: "No Maori name",
        scientificName: "Kupoupou stilwelli Blokland",
        otherNames: ["No other names"],
        conservationStatus: "Extinct",
        weight: "28-32 kg",
        length: "Less than 1 metre",
        food: "Fish, squid",
        habitat: "the shoreline of ephemeral islands and adjacent nearshore or shallow-marine environments",
        description: "Stilwell's penguin is one of the earliest penguins known. Fossils were recovered from 62.5-60-million-year-old (late early to middle Paleocene) marine deposits of the Takatika Grit, at Maunganui Beach, Chatham Island (Wharekauri / Rēkohu).",
        rarity: 6,
        images: [
            "https://nzbirdsonline.org.nz/sites/all/files/Kupoupou_stilwelli_Left_bird_40_percent_1605x2396px.jpg",
            "https://nzbirdsonline.org.nz/sites/all/files/120019290Kupoupou_stilwelli_illustration_1577x2250px_resized.jpg"
        ],
        questions: [
            {
                question: "What is the Maori name for the New Zealand swan?",
                answers: ["Matapu", "Kakapo", "No Maori name"],
                correctAnswer: "3"
            },
            {
                question: "What is the scientific name of the Stilwell's penguin?",
                answers: ["Kupoupou stilwelli Blokland", "Gymnorhina tibicen", "Sparrowus passer"],
                correctAnswer: "1"
            },
            {
                question: "What was the estimated length of Stilwell's penguin?",
                answers: ["Less than 0.5 meters", "Less than 1 metre", "More than 2 meters"],
                correctAnswer: "2"
            },
            {
                question: "What is the weight of Stilwell's penguin?",
                answers: ["5-10 kg", "28-32 kg", "48-52 kg"],
                correctAnswer: "2"
            },
            {
                question: "What do Stilwell's penguin primarily eat?",
                answers: ["Seeds", " soft plants", "Fish, squid"],
                correctAnswer: "3"
            },
            {
                question: "What is a typical habitat of the Stilwell's penguin?",
                answers: ["Mountains", "Deep oceans", "the shoreline of ephemeral islands"],
                correctAnswer: "3"
            },
            {
                question: "What is the Conservation status of the Stilwell's penguin?",
                answers: ["Extinct", "Not Threatened", "Introduced and Naturalised"],
                correctAnswer: "1"
            }
        ]
    }
];

// Clear the Bird collection
Bird.deleteMany({})
    .then(() => {
        console.log('Bird collection cleared');

        // Insert bird data into MongoDB
        Bird.insertMany(birds)
            .then(() => {
                console.log('Bird data populated successfully');
                mongoose.connection.close();  // Close the connection after insertion
            })
            .catch(error => {
                console.error('Error populating bird data:', error);
            });
    })
    .catch(error => {
        console.error('Error clearing Bird collection:', error);
    });