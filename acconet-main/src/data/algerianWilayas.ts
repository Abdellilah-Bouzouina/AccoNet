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
  { id: 1, code: "01", name: { ar: "أدرار", fr: "Adrar", en: "Adrar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 2, code: "02", name: { ar: "الشلف", fr: "Chlef", en: "Chlef" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 3, code: "03", name: { ar: "الأغواط", fr: "Laghouat", en: "Laghouat" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 4, code: "04", name: { ar: "أم البواقي", fr: "Oum El Bouaghi", en: "Oum El Bouaghi" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 5, code: "05", name: { ar: "باتنة", fr: "Batna", en: "Batna" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 6, code: "06", name: { ar: "بجاية", fr: "Béjaïa", en: "Bejaia" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 7, code: "07", name: { ar: "بسكرة", fr: "Biskra", en: "Biskra" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 8, code: "08", name: { ar: "بشار", fr: "Béchar", en: "Bechar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 9, code: "09", name: { ar: "البليدة", fr: "Blida", en: "Blida" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 10, code: "10", name: { ar: "البويرة", fr: "Bouira", en: "Bouira" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 11, code: "11", name: { ar: "تمنراست", fr: "Tamanrasset", en: "Tamanrasset" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 12, code: "12", name: { ar: "تبسة", fr: "Tébessa", en: "Tebessa" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 13, code: "13", name: { ar: "تلمسان", fr: "Tlemcen", en: "Tlemcen" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 14, code: "14", name: { ar: "تيارت", fr: "Tiaret", en: "Tiaret" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 15, code: "15", name: { ar: "تيزي وزو", fr: "Tizi Ouzou", en: "Tizi Ouzou" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 16, code: "16", name: { ar: "الجزائر", fr: "Alger", en: "Algiers" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 17, code: "17", name: { ar: "الجلفة", fr: "Djelfa", en: "Djelfa" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 18, code: "18", name: { ar: "جيجل", fr: "Jijel", en: "Jijel" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 19, code: "19", name: { ar: "سطيف", fr: "Sétif", en: "Setif" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 20, code: "20", name: { ar: "سعيدة", fr: "Saïda", en: "Saida" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 21, code: "21", name: { ar: "سكيكدة", fr: "Skikda", en: "Skikda" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 22, code: "22", name: { ar: "سيدي بلعباس", fr: "Sidi Bel Abbès", en: "Sidi Bel Abbes" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 23, code: "23", name: { ar: "عنابة", fr: "Annaba", en: "Annaba" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 24, code: "24", name: { ar: "قالمة", fr: "Guelma", en: "Guelma" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 25, code: "25", name: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 26, code: "26", name: { ar: "المدية", fr: "Médéa", en: "Medea" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 27, code: "27", name: { ar: "مستغانم", fr: "Mostaganem", en: "Mostaganem" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 28, code: "28", name: { ar: "المسيلة", fr: "M'Sila", en: "M'Sila" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 29, code: "29", name: { ar: "معسكر", fr: "Mascara", en: "Mascara" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 30, code: "30", name: { ar: "ورقلة", fr: "Ouargla", en: "Ouargla" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 31, code: "31", name: { ar: "وهران", fr: "Oran", en: "Oran" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 32, code: "32", name: { ar: "البيض", fr: "El Bayadh", en: "El Bayadh" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 33, code: "33", name: { ar: "إليزي", fr: "Illizi", en: "Illizi" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 34, code: "34", name: { ar: "برج بوعريريج", fr: "Bordj Bou Arréridj", en: "Bordj Bou Arreridj" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 35, code: "35", name: { ar: "بومرداس", fr: "Boumerdès", en: "Boumerdes" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 36, code: "36", name: { ar: "الطارف", fr: "El Tarf", en: "El Tarf" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 37, code: "37", name: { ar: "تندوف", fr: "Tindouf", en: "Tindouf" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 38, code: "38", name: { ar: "تيسمسيلت", fr: "Tissemsilt", en: "Tissemsilt" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 39, code: "39", name: { ar: "الوادي", fr: "El Oued", en: "El Oued" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 40, code: "40", name: { ar: "خنشلة", fr: "Khenchela", en: "Khenchela" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 41, code: "41", name: { ar: "سوق أهراس", fr: "Souk Ahras", en: "Souk Ahras" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 42, code: "42", name: { ar: "تيبازة", fr: "Tipaza", en: "Tipaza" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 43, code: "43", name: { ar: "ميلة", fr: "Mila", en: "Mila" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 44, code: "44", name: { ar: "عين الدفلى", fr: "Aïn Defla", en: "Ain Defla" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 45, code: "45", name: { ar: "النعامة", fr: "Naâma", en: "Naama" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 46, code: "46", name: { ar: "عين تموشنت", fr: "Aïn Témouchent", en: "Ain Temouchent" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 47, code: "47", name: { ar: "غرداية", fr: "Ghardaïa", en: "Ghardaia" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 48, code: "48", name: { ar: "غليزان", fr: "Relizane", en: "Relizane" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 49, code: "49", name: { ar: "تيميمون", fr: "Timimoun", en: "Timimoun" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 50, code: "50", name: { ar: "برج باجي مختار", fr: "Bordj Badji Mokhtar", en: "Bordj Badji Mokhtar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 51, code: "51", name: { ar: "أولاد جلال", fr: "Ouled Djellal", en: "Ouled Djellal" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 52, code: "52", name: { ar: "بني عباس", fr: "Béni Abbès", en: "Beni Abbes" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 53, code: "53", name: { ar: "عين صالح", fr: "In Salah", en: "In Salah" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 54, code: "54", name: { ar: "عين قزام", fr: "In Guezzam", en: "In Guezzam" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 55, code: "55", name: { ar: "تقرت", fr: "Touggourt", en: "Touggourt" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 56, code: "56", name: { ar: "جانت", fr: "Djanet", en: "Djanet" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 57, code: "57", name: { ar: "المغير", fr: "El M'Ghair", en: "El M'Ghair" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 58, code: "58", name: { ar: "المنيعة", fr: "El Meniaa", en: "El Meniaa" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 59, code: "59", name: { ar: "أولاد رشاش", fr: "Ouled Rechache", en: "Ouled Rechache" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 60, code: "60", name: { ar: "بوقطب", fr: "Bougtob", en: "Bougtob" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 61, code: "61", name: { ar: "مسعد", fr: "Messaad", en: "Messaad" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 62, code: "62", name: { ar: "العلمة", fr: "El Eulma", en: "El Eulma" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 63, code: "63", name: { ar: "بوسعادة", fr: "Bou Saâda", en: "Bou Saada" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 64, code: "64", name: { ar: "فرندة", fr: "Frenda", en: "Frenda" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 65, code: "65", name: { ar: "مغنية", fr: "Maghnia", en: "Maghnia" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 66, code: "66", name: { ar: "عين وسارة", fr: "Aïn Oussera", en: "Ain Oussera" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 67, code: "67", name: { ar: "بريكة", fr: "Barika", en: "Barika" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 68, code: "68", name: { ar: "قصر الشلالة", fr: "Ksar Chellala", en: "Ksar Chellala" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 69, code: "69", name: { ar: "شلوغ العيد", fr: "Chelghoum Laïd", en: "Chelghoum Laid" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } }
];
