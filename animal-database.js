// Animal Database for Verbal Fluency Test
// Each animal has boolean values for all categories

const ANIMAL_CATEGORIES = {
    // 포유류 (Mammals)
    '개': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고양이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '말': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '돼지': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '양': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '염소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '원숭이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '호랑이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '토끼': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '용': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '사자': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코끼리': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '기린': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '늑대': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '여우': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사슴': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노루': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고라니': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '멧돼지': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쥐': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '햄스터': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '다람쥐': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청설모': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '박쥐': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고래': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '돌고래': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물개': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다표범': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '수달': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '너구리': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오소리': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '족제비': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '낙타': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '알파카': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '라마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '당나귀': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노새': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '얼룩말': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코뿔소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '표범': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '재규어': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '치타': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '퓨마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '스라소니': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '살쾡이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하이에나': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '캥거루': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코알라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '판다': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '침팬지': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고릴라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오랑우탄': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '긴팔원숭이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개코원숭이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '기니피그': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '친칠라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '페럿': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '두더지': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고슴도치': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '호저': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '비버': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '뉴트리아': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카피바라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '미어캣': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '몽구스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '담비': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '밍크': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '해달': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '북극곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '불곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '반달가슴곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '말레이곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '라쿤': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레서판다': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '들개': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '승냥이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코요테': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '자칼': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '딩고': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '북극여우': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사막여우': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰꼬리사슴': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '순록': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '엘크': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '무스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '영양': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가젤': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '들소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '야크': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '산양': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '무플론': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '날다람쥐': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '프레리도그': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '마모트': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나무늘보': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개미핥기': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아르마딜로': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 조류 (Birds)
    '닭': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거위': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '칠면조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '비둘기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '까치': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '까마귀': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '제비': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '독수리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '올빼미': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '부엉이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '학': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '백로': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '왜가리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갈매기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '펠리컨': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '앵무새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '잉꼬': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카나리아': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '공작': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '타조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '펭귄': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '플라밍고': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '뻐꾸기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '딱따구리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '종달새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꾀꼬리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '휘파람새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '백조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '기러기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오색딱따구리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청딱따구리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개똥지빠귀': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '검은딱새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '호랑지빠귀': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '울새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '직박구리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '박새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '곤줄박이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '어치': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물총새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쇠백로': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '중백로': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대백로': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '황로': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '해오라기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '저어새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노랑부리저어새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '따오기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청사조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '십자매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '문조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오목눈이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '큰오목눈이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노랑턱멧새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '멧새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '촉새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '되새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방울새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '솔새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쇠솔새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '큰솔새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '딱새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쇠딱새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '홍머리오리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청머리오리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰뺨검둥오리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '원앙': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가창오리': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물닭': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰죽지': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '댕기물떼새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꼬마물떼새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰목물떼새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '중부리도요': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '마도요': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장다리물떼새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개구리매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '조롱이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '새매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '황조롱이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '팔색조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파랑새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '삼광조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '호반새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰발농발게': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '때까치': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '칼새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다제비': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쇠제비갈매기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쓸매': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '솔부엉이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '수리부엉이': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소쩍새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '토종닭': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '메추라기': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꿩': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 파충류 (Reptiles)
    '뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: true, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도마뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거북이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '악어': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '이구아나': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카멜레온': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도마뱀붙이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코브라': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '보아뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방울뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '살모사': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '구렁이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '능구렁이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '유혈목이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '비어드드래곤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레오파드게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '볼파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '블루텅스킨크': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '모니터리자드': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코모도드래곤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '육지거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '자라': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '남생이': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아나콘다': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '비단뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '킹코브라': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '매머': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '독사': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '푸른바다거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '매부리바다거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '붉은바다거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장수거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '상자거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '러시아육지거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '헤르만거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '알리게이터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가리알': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카이만': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나일악어': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바닷물악어': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '크레스티드게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가고일게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '우산파다게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '토케이게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '스키니야모리게코': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '그린아놀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바실리스크': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '그린이구아나': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '마린이구아나': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '척차걸': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '발굽새': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰머리신': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갈색나무뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '까치살모사': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '무자치': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '실뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고무뱀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '킹스네이크': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '밀크스네이크': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하우스스네이크': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '켄얀샌드보아': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '로지보아': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카펫파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '버미스파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레티큘레이티드파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아프리칸록파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '블러드파이톤': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '스네이크넥터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '머스크터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '머드터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '페인티드터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레드이어드슬라이더': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '옐로우벨리슬라이더': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쿠터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '맵터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '스내핑터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '알리게이터스내핑터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갈라파고스거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '설카타거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레드풋거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '옐로우풋거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아르간거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '마지나타거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '이집트거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '인도별거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하인즈거북': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파프랙터틀': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '둥근모래보아': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '룸보아': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사막모니터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사바나모니터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나일모니터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '워터모니터': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '공룡': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '티라노사우루스': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '트리케라톱스': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '스테고사우루스': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '브라키오사우루스': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '벨로키랍토르': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '프테라노돈': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '아르켈론': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '맘모스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '검치호': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    '메갈로돈': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: true
    },
    
    // 양서류 (Amphibians)
    '개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '두꺼비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '올챙이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '맹꽁이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '무당개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '황소개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '영원': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '계곡산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '금개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '옴개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '북방산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '수원청개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아무르산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '한국산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '한국도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '제주도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '계곡도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '얼룩도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고리도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '일본도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '붉은등개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나무개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '두꺼비올챙이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개구리올챙이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도마뱀붙이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '애기청개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃무늬개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '줄무늬청개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '검은점개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰줄개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고슴도치개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '뉴트': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '시베리아도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '축소개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아프리카개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '화이트트리개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벨벳개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파이어벨리뉴트': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '스페인뉴트': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '축실롱롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '미국황소개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거대도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '일본대산개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '에쿠아도르개구리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 어류 (Fish)
    '붕어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '잉어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '금붕어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '메기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '미꾸라지': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가물치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '송사리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '피라미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '은어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '연어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '송어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고등어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '상어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가오리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '광어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '삼치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갈치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '명태': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대구': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '복어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아귀': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '열대어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '구피': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '베타': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '피라냐': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '해마': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '조기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '농어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '메기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '송어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '구피': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '네온테트라': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '베타': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '상어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고래상어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가오리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '삼치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '광어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '우럭': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아귀': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '볼락': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '전갱이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '학꽁치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '멸치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '정어리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽁치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '돔': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쏘가리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '배스': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '블루길': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쭈꾸미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '우볼락': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노래미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가자미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '양태': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '홍어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '까나리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '전복': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '복어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '제비활치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '엔젤피시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '디스커스': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '구라미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '몰리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '플래티': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소드테일': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코리도라스': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오토클리누스': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '플레코': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '크라운로치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '제브라다니오': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바브': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '라스보라': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '시클리드': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '킬리피시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '아로와나': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오스카': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '드래곤피시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나이프피시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '엘리펀트노즈': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '피라냐': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카라신': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참돔': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민물고기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다고기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '열대어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '심해어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '숭어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '농어과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '전어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고둥어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '준치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '밴댕이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민어과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '샛돔': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '돌돔': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '감성돔': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참돔과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '뱅어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '병어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '문치가자미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '넙치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가자미과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '임연수어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '조피볼락': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노래미과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쥐치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쥐치과': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쏨뱅이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 곤충류 (Insects)
    '개미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벌': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '잠자리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '모기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '매미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '메뚜기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '귀뚜라미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사마귀': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바퀴벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '딱정벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '무당벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '반딧불이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장수풍뎅이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '사슴벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '누에': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벼룩': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '빈대': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '진드기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '전갈': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '지네': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꿀벌': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '말벌': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '땅벌': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노린재': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '매실파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '초파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '집파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '등에': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쇠파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '진딧물': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '깍지벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '응애': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰개미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개미귀신': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '풀무치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '여치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꼽등이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방아깨비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물방개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '게아재비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소금쟁이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '장구벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물자라': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하루살이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '강도래': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '날도래': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃등에': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벌파리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거저리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바구미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코끼리벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '하늘소': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃무지': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '왕바구미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '송충이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '독나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '호랑나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '배추흰나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '제비나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '청띠제비나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '부전나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '팔랑나비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '산누에나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '박각시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '천적곤충': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '애벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '번데기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노래기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쥐며느리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '투구벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '왕사슴벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '톱사슴벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물레방아벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '검정날개오동잎벌': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개미집게벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '집게벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '잎벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '십각벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '방아벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '풍뎅이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '금풍뎅이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참진드기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '먼지다듬이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '좀': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '좀벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '좀나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '옷좀나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '쌀바구미': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '곡식좀나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '권연벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '캐나다밀나방': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 연체동물 (Mollusks)
    '달팽이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오징어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '문어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '굴': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '홍합': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '전복': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소라': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고동': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '우렁이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '다슬기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '재첩': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바지락': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가리비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꼬막': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민달팽이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '콘치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오징어다리': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '해삼': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '멍게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '킹콘크': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '백합': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '모시조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '동죽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '개량조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '새조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '키조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '피조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대합': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대파조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '맛조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소라게딱지': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '진주조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '띠무늬목걸이달팽이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갯지렁이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '털조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가무락조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벌레먹은조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '나팔고둥': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '거북손': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파래고둥': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '학꽃조개': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참소라': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물레고둥': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '검은담치': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽈리고둥': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '애플달팽이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '레드램혼달팽이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    
    // 갑각류 (Crustaceans)
    '게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가재': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '랍스터': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민물게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '소라게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '집게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '털게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '홍게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바닷가재': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '닭새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '흰다리새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '대하': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '보리새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '젓새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '밴댕이새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도화새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물렁새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '긴꼬리물떼새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '왕게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '박달게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '참게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '다슬기게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가시게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '긴발톱게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '부채게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '말똥게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갯게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '농게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '털보게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '유령게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '꽃무늬게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다가재': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '연가시류': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갯강구': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '따개비': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물벼룩': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '알테미아': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바닷가재붙이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '풀새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '모래새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '곤쟁이': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '돛새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갈색새우': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바위게': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '봉황': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '유니콘': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '페가수스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '인어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '켄타우로스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '그리핀': {
        MAMMAL: true, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '히드라': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '미노타우로스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '스핑크스': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '키메라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '불사조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '천마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '구미호': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '해태': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '기린_신화': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '청룡': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '백호': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '주작': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '현무': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '불새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '피닉스': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '트롤': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '오크': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '엘프': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '드워프': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '고블린': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '네시': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '크라켄': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    '레비아탄': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    // 추가된 동물들 - 아프리카
    '개미핥기': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '영양': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카멜레온': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '치타': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '침팬지': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가젤': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '얼룩말': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고릴라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '홍학': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '누': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 오세아니아
    '키위': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '주머니쥐': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '왈라비': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 북극
    '사향소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '북극곰': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물범': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 아시아
    '시라소니': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '고라니': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '승냥이': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '삵': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '산양': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 북아메리카
    '스컹크': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '들소': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 농장 동물
    '당나귀': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '페럿': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노새': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '칠면조': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 물에 사는 동물
    '가재': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오리너구리': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '도롱뇽': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물개': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '자라': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    // 기타 동물
    '라마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '친칠라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '밍크': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '기니피그': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '잉꼬': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '카나리아': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '콘돌': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '펠리컨': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '코요테': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '자칼': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '이리': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '임팔라': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '순록': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '노루': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '재규어': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '퓨마': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '구피': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '농어': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '오랑우탄': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '이구아나': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: true, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '담비': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '불새': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: true, IMAGINARY: true, PREHISTORIC: false
    },
    // 범주 용어들 - 하위 동물들과 함께 사용시 정반응 처리
    '포유류': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '새': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '조류': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '파충류': {
        MAMMAL: false, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '양서류': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '어류': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물고기': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '곤충': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '벌레': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '연체동물': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: true, CRUSTACEAN: false,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '갑각류': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '동물': {
        MAMMAL: true, BIRD: true, REPTILE: true, AMPHIBIAN: true, 
        FISH: true, INSECT: true, MOLLUSK: true, CRUSTACEAN: true,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '짐승': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '가축': {
        MAMMAL: true, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '애완동물': {
        MAMMAL: true, BIRD: true, REPTILE: true, AMPHIBIAN: true, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: true, PET: true, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '야생동물': {
        MAMMAL: true, BIRD: true, REPTILE: true, AMPHIBIAN: true, 
        FISH: true, INSECT: true, MOLLUSK: true, CRUSTACEAN: true,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '해양동물': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: true, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '바다동물': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: true, INSECT: false, MOLLUSK: true, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '민물동물': {
        MAMMAL: false, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: true, INSECT: false, MOLLUSK: false, CRUSTACEAN: true,
        AQUATIC: true, MARINE: false, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: false,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '육지동물': {
        MAMMAL: true, BIRD: false, REPTILE: true, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '날짐승': {
        MAMMAL: false, BIRD: true, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: true, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: true,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '들짐승': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '산짐승': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: false, 
        FISH: false, INSECT: false, MOLLUSK: false, CRUSTACEAN: false,
        AQUATIC: false, MARINE: false, FRESHWATER: false, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    },
    '물짐승': {
        MAMMAL: true, BIRD: false, REPTILE: false, AMPHIBIAN: true, 
        FISH: true, INSECT: false, MOLLUSK: true, CRUSTACEAN: true,
        AQUATIC: true, MARINE: true, FRESHWATER: true, AERIAL: false,
        DOMESTIC: false, PET: false, WILD: true,
        ZODIAC: false, MYTHOLOGY: false, IMAGINARY: false, PREHISTORIC: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANIMAL_CATEGORIES };
}
