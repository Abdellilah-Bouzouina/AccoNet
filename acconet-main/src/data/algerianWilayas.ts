export interface Translation {
  ar: string;
  fr: string;
  en: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: Translation;
  region: Translation;
}

export const algerianWilayas: Wilaya[] = [
  { id: 1,  code: "01", name: { ar: "أدرار",           fr: "Adrar",              en: "Adrar"              }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 2,  code: "02", name: { ar: "الشلف",           fr: "Chlef",              en: "Chlef"              }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 3,  code: "03", name: { ar: "الأغواط",         fr: "Laghouat",           en: "Laghouat"           }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 4,  code: "04", name: { ar: "أم البواقي",      fr: "Oum El Bouaghi",     en: "Oum El Bouaghi"     }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 5,  code: "05", name: { ar: "باتنة",           fr: "Batna",              en: "Batna"              }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 6,  code: "06", name: { ar: "بجاية",           fr: "Béjaïa",             en: "Béjaïa"             }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 7,  code: "07", name: { ar: "بسكرة",           fr: "Biskra",             en: "Biskra"             }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 8,  code: "08", name: { ar: "بشار",            fr: "Béchar",             en: "Béchar"             }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 9,  code: "09", name: { ar: "البليدة",         fr: "Blida",              en: "Blida"              }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 10, code: "10", name: { ar: "البويرة",         fr: "Bouira",             en: "Bouira"             }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 11, code: "11", name: { ar: "تمنراست",         fr: "Tamanrasset",        en: "Tamanrasset"        }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 12, code: "12", name: { ar: "تبسة",            fr: "Tébessa",            en: "Tébessa"            }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 13, code: "13", name: { ar: "تلمسان",          fr: "Tlemcen",            en: "Tlemcen"            }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 14, code: "14", name: { ar: "تيارت",           fr: "Tiaret",             en: "Tiaret"             }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 15, code: "15", name: { ar: "تيزي وزو",        fr: "Tizi Ouzou",         en: "Tizi Ouzou"         }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 16, code: "16", name: { ar: "الجزائر",         fr: "Alger",              en: "Algiers"            }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 17, code: "17", name: { ar: "الجلفة",          fr: "Djelfa",             en: "Djelfa"             }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 18, code: "18", name: { ar: "جيجل",            fr: "Jijel",              en: "Jijel"              }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 19, code: "19", name: { ar: "سطيف",            fr: "Sétif",              en: "Sétif"              }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 20, code: "20", name: { ar: "سعيدة",           fr: "Saïda",              en: "Saïda"              }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 21, code: "21", name: { ar: "سكيكدة",          fr: "Skikda",             en: "Skikda"             }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 22, code: "22", name: { ar: "سيدي بلعباس",    fr: "Sidi Bel Abbès",     en: "Sidi Bel Abbès"     }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 23, code: "23", name: { ar: "عنابة",           fr: "Annaba",             en: "Annaba"             }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 24, code: "24", name: { ar: "قالمة",           fr: "Guelma",             en: "Guelma"             }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 25, code: "25", name: { ar: "قسنطينة",         fr: "Constantine",        en: "Constantine"        }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 26, code: "26", name: { ar: "المدية",          fr: "Médéa",              en: "Médéa"              }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 27, code: "27", name: { ar: "مستغانم",         fr: "Mostaganem",         en: "Mostaganem"         }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 28, code: "28", name: { ar: "المسيلة",         fr: "M'Sila",             en: "M'Sila"             }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 29, code: "29", name: { ar: "معسكر",           fr: "Mascara",            en: "Mascara"            }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 30, code: "30", name: { ar: "ورقلة",           fr: "Ouargla",            en: "Ouargla"            }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 31, code: "31", name: { ar: "وهران",           fr: "Oran",               en: "Oran"               }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 32, code: "32", name: { ar: "البيض",           fr: "El Bayadh",          en: "El Bayadh"          }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 33, code: "33", name: { ar: "إيليزي",          fr: "Illizi",             en: "Illizi"             }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 34, code: "34", name: { ar: "برج بوعريريج",   fr: "Bordj Bou Arréridj", en: "Bordj Bou Arréridj" }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 35, code: "35", name: { ar: "بومرداس",         fr: "Boumerdès",          en: "Boumerdès"          }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 36, code: "36", name: { ar: "الطارف",          fr: "El Tarf",            en: "El Tarf"            }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 37, code: "37", name: { ar: "تندوف",           fr: "Tindouf",            en: "Tindouf"            }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 38, code: "38", name: { ar: "تيسمسيلت",       fr: "Tissemsilt",         en: "Tissemsilt"         }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 39, code: "39", name: { ar: "الوادي",          fr: "El Oued",            en: "El Oued"            }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 40, code: "40", name: { ar: "خنشلة",           fr: "Khenchela",          en: "Khenchela"          }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 41, code: "41", name: { ar: "سوق أهراس",       fr: "Souk Ahras",         en: "Souk Ahras"         }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 42, code: "42", name: { ar: "تيبازة",          fr: "Tipaza",             en: "Tipaza"             }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 43, code: "43", name: { ar: "ميلة",            fr: "Mila",               en: "Mila"               }, region: { ar: "الشرق",  fr: "Est",    en: "East"   } },
  { id: 44, code: "44", name: { ar: "عين الدفلى",      fr: "Aïn Defla",          en: "Aïn Defla"          }, region: { ar: "الوسط",  fr: "Centre", en: "Centre" } },
  { id: 45, code: "45", name: { ar: "النعامة",         fr: "Naâma",              en: "Naâma"              }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 46, code: "46", name: { ar: "عين تموشنت",      fr: "Aïn Témouchent",     en: "Aïn Témouchent"     }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  { id: 47, code: "47", name: { ar: "غرداية",          fr: "Ghardaïa",           en: "Ghardaïa"           }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 48, code: "48", name: { ar: "غليزان",          fr: "Relizane",           en: "Relizane"           }, region: { ar: "الغرب",  fr: "Ouest",  en: "West"   } },
  // New wilayas added in 2019 (total 58)
  { id: 49, code: "49", name: { ar: "تيميمون",         fr: "Timimoun",           en: "Timimoun"           }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 50, code: "50", name: { ar: "برج باجي مختار", fr: "Bordj Badji Mokhtar",en: "Bordj Badji Mokhtar"}, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 51, code: "51", name: { ar: "أولاد جلال",     fr: "Ouled Djellal",      en: "Ouled Djellal"      }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 52, code: "52", name: { ar: "بني عباس",       fr: "Béni Abbès",         en: "Béni Abbès"         }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 53, code: "53", name: { ar: "عين صالح",       fr: "In Salah",           en: "In Salah"           }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 54, code: "54", name: { ar: "عين قزام",       fr: "In Guezzam",         en: "In Guezzam"         }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 55, code: "55", name: { ar: "توقرت",          fr: "Touggourt",          en: "Touggourt"          }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 56, code: "56", name: { ar: "جانت",           fr: "Djanet",             en: "Djanet"             }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 57, code: "57", name: { ar: "المنيعة",        fr: "El M'Niaa",          en: "El M'Niaa"          }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
  { id: 58, code: "58", name: { ar: "المغير",         fr: "El M'Ghair",         en: "El M'Ghair"         }, region: { ar: "الجنوب", fr: "Sud",    en: "South"  } },
];
