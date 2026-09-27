// ============================================================
//  CLASSROOM POLLS — data (topics, katakana readings, themes)
// ============================================================
'use strict';

// image: file in img/ (without .png); icon: emoji used when there is no picture
const POLLS = {
  "vegetables": {
    "title": "Vegetables",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#2E7D32",
      "secondary": "#A5D6A7",
      "background": "#F1F8E9",
      "finishedBackground": "#E8F5E9",
      "accent": "#EF6C00",
      "buttonColor": "#4CAF50"
    },
    "items": [
      {
        "en": "Cabbages",
        "jp": "キャベツ",
        "katakana": "キャベツ",
        "image": "cabbages"
      },
      {
        "en": "Carrots",
        "jp": "にんじん",
        "katakana": "キャロッツ",
        "image": "carrots"
      },
      {
        "en": "Corn",
        "jp": "とうもろこし",
        "katakana": "コーン",
        "image": "corn"
      },
      {
        "en": "Mushrooms",
        "jp": "きのこ",
        "katakana": "マッシュルームズ",
        "image": "mushrooms"
      },
      {
        "en": "Onions",
        "jp": "たまねぎ",
        "katakana": "オニオンズ",
        "image": "onions"
      },
      {
        "en": "Peas",
        "jp": "えんどうまめ",
        "katakana": "ピーズ",
        "image": "peas"
      },
      {
        "en": "Peppers",
        "jp": "ピーマン",
        "katakana": "ペッパーズ",
        "image": "peppers"
      },
      {
        "en": "Potatoes",
        "jp": "じゃがいも",
        "katakana": "ポテトズ",
        "image": "potatoes"
      },
      {
        "en": "Pumpkins",
        "jp": "かぼちゃ",
        "katakana": "パンプキンズ",
        "image": "pumpkins"
      },
      {
        "en": "Tomatoes",
        "jp": "トマト",
        "katakana": "トマトズ",
        "image": "tomatoes"
      }
    ]
  },
  "fruits": {
    "title": "Fruits",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#C2185B",
      "secondary": "#F48FB1",
      "background": "#FCE4EC",
      "finishedBackground": "#F8BBD0",
      "accent": "#FBC02D",
      "buttonColor": "#E91E63"
    },
    "items": [
      {
        "en": "Apples",
        "jp": "りんご",
        "katakana": "アップルズ",
        "icon": "🍎",
        "image": "apples"
      },
      {
        "en": "Peaches",
        "jp": "もも",
        "katakana": "ピーチズ",
        "icon": "🍑",
        "image": "peaches"
      },
      {
        "en": "Bananas",
        "jp": "バナナ",
        "katakana": "バナナズ",
        "icon": "🍌",
        "image": "bananas"
      },
      {
        "en": "Pears",
        "jp": "なし",
        "katakana": "ペアーズ",
        "icon": "🍐",
        "image": "pears"
      },
      {
        "en": "Cherries",
        "jp": "さくらんぼ",
        "katakana": "チェリーズ",
        "icon": "🍒",
        "image": "cherries"
      },
      {
        "en": "Pineapples",
        "jp": "パイナップル",
        "katakana": "パイナップルズ",
        "icon": "🍍",
        "image": "pineapples"
      },
      {
        "en": "Grapefruits",
        "jp": "グレープフルーツ",
        "katakana": "グレープフルーツズ",
        "icon": "🍊",
        "image": "grapefruits"
      },
      {
        "en": "Oranges",
        "jp": "オレンジ",
        "katakana": "オレンジズ",
        "icon": "🍊",
        "image": "oranges"
      },
      {
        "en": "Grapes",
        "jp": "ぶどう",
        "katakana": "グレープズ",
        "icon": "🍇",
        "image": "grapes"
      },
      {
        "en": "Strawberries",
        "jp": "いちご",
        "katakana": "ストロベリーズ",
        "icon": "🍓"
      }
    ]
  },
  "animals": {
    "title": "Animals (1st Grade)",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#1565C0",
      "secondary": "#90CAF9",
      "background": "#E3F2FD",
      "finishedBackground": "#BBDEFB",
      "accent": "#D84315",
      "buttonColor": "#2196F3"
    },
    "items": [
      {
        "en": "Cats",
        "jp": "ねこ",
        "katakana": "キャッツ",
        "image": "cats"
      },
      {
        "en": "Chickens",
        "jp": "にわとり",
        "katakana": "チキンズ",
        "image": "chickens"
      },
      {
        "en": "Cows",
        "jp": "うし",
        "katakana": "カウズ",
        "image": "cows"
      },
      {
        "en": "Dogs",
        "jp": "いぬ",
        "katakana": "ドッグズ",
        "image": "dogs"
      },
      {
        "en": "Ducks",
        "jp": "あひる",
        "katakana": "ダックス",
        "image": "ducks"
      },
      {
        "en": "Hamsters",
        "jp": "ハムスター",
        "katakana": "ハムスターズ",
        "image": "hamsters"
      },
      {
        "en": "Horses",
        "jp": "うま",
        "katakana": "ホーシズ",
        "image": "horses"
      },
      {
        "en": "Pigs",
        "jp": "ぶた",
        "katakana": "ピッグズ",
        "image": "pigs"
      },
      {
        "en": "Rabbits",
        "jp": "うさぎ",
        "katakana": "ラビッツ",
        "image": "rabbits"
      }
    ]
  },
  "animals2": {
    "title": "Animals (2nd Grade)",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#FF6F00",
      "secondary": "#FFCA28",
      "background": "#FFF8E1",
      "finishedBackground": "#FFECB3",
      "accent": "#3E2723",
      "buttonColor": "#FF8F00"
    },
    "items": [
      {
        "en": "Tigers",
        "jp": "トラ",
        "katakana": "タイガーズ",
        "image": "tiger"
      },
      {
        "en": "Pandas",
        "jp": "パンダ",
        "katakana": "パンダズ",
        "image": "panda"
      },
      {
        "en": "Lions",
        "jp": "ライオン",
        "katakana": "ライオンズ",
        "image": "lion"
      },
      {
        "en": "Monkeys",
        "jp": "サル",
        "katakana": "モンキーズ",
        "image": "monkey"
      },
      {
        "en": "Elephants",
        "jp": "ゾウ",
        "katakana": "エレファンツ",
        "image": "elephant"
      },
      {
        "en": "Gorillas",
        "jp": "ゴリラ",
        "katakana": "ゴリラズ",
        "image": "gorilla"
      },
      {
        "en": "Bears",
        "jp": "クマ",
        "katakana": "ベアーズ",
        "image": "bear"
      }
    ]
  },
  "colors": {
    "title": "Colors",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#607D8B",
      "secondary": "#CFD8DC",
      "background": "#ECEFF1",
      "finishedBackground": "#CFD8DC",
      "accent": "#FF4081",
      "buttonColor": "#78909C"
    },
    "items": [
      {
        "en": "Red",
        "jp": "赤",
        "katakana": "アカ",
        "image": "red"
      },
      {
        "en": "Blue",
        "jp": "青",
        "katakana": "アオ",
        "image": "blue"
      },
      {
        "en": "Yellow",
        "jp": "黄色",
        "katakana": "キイロ",
        "image": "yellow"
      },
      {
        "en": "Orange",
        "jp": "オレンジ",
        "katakana": "オレンジ",
        "image": "orange"
      },
      {
        "en": "Purple",
        "jp": "紫",
        "katakana": "ムラサキ",
        "image": "purple"
      },
      {
        "en": "Green",
        "jp": "緑",
        "katakana": "ミドリ",
        "image": "green"
      },
      {
        "en": "Black",
        "jp": "黒",
        "katakana": "クロ",
        "image": "black"
      },
      {
        "en": "White",
        "jp": "白",
        "katakana": "シロ",
        "image": "white"
      },
      {
        "en": "Pink",
        "jp": "ピンク",
        "katakana": "ピンク",
        "image": "pink"
      },
      {
        "en": "Gray",
        "jp": "灰色",
        "katakana": "グレー",
        "image": "gray"
      }
    ]
  },
  "sports": {
    "title": "Sports",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#0277BD",
      "secondary": "#81D4FA",
      "background": "#E1F5FE",
      "finishedBackground": "#B3E5FC",
      "accent": "#FF6D00",
      "buttonColor": "#039BE5"
    },
    "items": [
      {
        "en": "Baseball",
        "jp": "野球",
        "katakana": "ベースボール",
        "image": "baseball"
      },
      {
        "en": "Basketball",
        "jp": "バスケットボール",
        "katakana": "バスケットボール",
        "image": "basketball"
      },
      {
        "en": "Tennis",
        "jp": "テニス",
        "katakana": "テニス",
        "image": "tennis"
      },
      {
        "en": "Badminton",
        "jp": "バドミントン",
        "katakana": "バドミントン",
        "image": "badminton"
      },
      {
        "en": "Volleyball",
        "jp": "バレーボール",
        "katakana": "バレーボール",
        "image": "volleyball"
      },
      {
        "en": "Table Tennis",
        "jp": "卓球",
        "katakana": "テーブルテニス",
        "image": "tabletennis"
      },
      {
        "en": "Soccer",
        "jp": "サッカー",
        "katakana": "サッカー",
        "image": "soccer"
      },
      {
        "en": "Dodgeball",
        "jp": "ドッジボール",
        "katakana": "ドッジボール",
        "image": "dodgeball"
      }
    ]
  },
  "prefectures": {
    "title": "Prefectures",
    "prompt": {
      "en": "I want to go to",
      "jp": "〜にいきたい"
    },
    "theme": {
      "primary": "#B71C1C",
      "secondary": "#FFCDD2",
      "background": "#FFEBEE",
      "finishedBackground": "#FFCDD2",
      "accent": "#FFD600",
      "buttonColor": "#D32F2F"
    },
    "items": [
      {
        "en": "Hokkaido",
        "jp": "北海道",
        "katakana": "ホッカイドウ",
        "image": "hokkaido"
      },
      {
        "en": "Tokyo",
        "jp": "東京",
        "katakana": "トウキョウ",
        "image": "tokyo"
      },
      {
        "en": "Aichi",
        "jp": "愛知",
        "katakana": "アイチ",
        "image": "aichi"
      },
      {
        "en": "Osaka",
        "jp": "大阪",
        "katakana": "オオサカ",
        "image": "osaka"
      },
      {
        "en": "Fukuoka",
        "jp": "福岡",
        "katakana": "フクオカ",
        "image": "fukuoka"
      },
      {
        "en": "Saitama",
        "jp": "埼玉",
        "katakana": "サイタマ",
        "image": "saitama"
      },
      {
        "en": "Chiba",
        "jp": "千葉",
        "katakana": "チバ",
        "image": "chiba"
      },
      {
        "en": "Kanagawa",
        "jp": "神奈川",
        "katakana": "カナガワ",
        "image": "kanagawa"
      },
      {
        "en": "Hyogo",
        "jp": "兵庫",
        "katakana": "ヒョウゴ",
        "image": "hyogo"
      },
      {
        "en": "Shizuoka",
        "jp": "静岡",
        "katakana": "シズオカ",
        "image": "shizuoka"
      }
    ]
  },
  "days": {
    "title": "Days of the Week",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#512DA8",
      "secondary": "#B39DDB",
      "background": "#EDE7F6",
      "finishedBackground": "#D1C4E9",
      "accent": "#FFAB40",
      "buttonColor": "#673AB7"
    },
    "items": [
      {
        "en": "Monday",
        "jp": "月曜日",
        "katakana": "マンデー",
        "image": "monday"
      },
      {
        "en": "Tuesday",
        "jp": "火曜日",
        "katakana": "チューズデー",
        "image": "tuesday"
      },
      {
        "en": "Wednesday",
        "jp": "水曜日",
        "katakana": "ウェンズデー",
        "image": "wednesday"
      },
      {
        "en": "Thursday",
        "jp": "木曜日",
        "katakana": "サーズデー",
        "image": "thursday"
      },
      {
        "en": "Friday",
        "jp": "金曜日",
        "katakana": "フライデー",
        "image": "friday"
      },
      {
        "en": "Saturday",
        "jp": "土曜日",
        "katakana": "サタデー",
        "image": "saturday"
      },
      {
        "en": "Sunday",
        "jp": "日曜日",
        "katakana": "サンデー",
        "image": "sunday"
      }
    ]
  },
  "months": {
    "title": "Months",
    "prompt": {
      "en": "My birthday is in",
      "jp": "マイ バースデー イズ イン"
    },
    "theme": {
      "primary": "#00796B",
      "secondary": "#80CBC4",
      "background": "#E0F2F1",
      "finishedBackground": "#B2DFDB",
      "accent": "#FF5252",
      "buttonColor": "#009688"
    },
    "items": [
      {
        "en": "January",
        "jp": "1月",
        "katakana": "ジャヌアリー",
        "image": "january"
      },
      {
        "en": "February",
        "jp": "2月",
        "katakana": "フェブラリー",
        "image": "february"
      },
      {
        "en": "March",
        "jp": "3月",
        "katakana": "マーチ",
        "image": "march"
      },
      {
        "en": "April",
        "jp": "4月",
        "katakana": "エイプリル",
        "image": "april"
      },
      {
        "en": "May",
        "jp": "5月",
        "katakana": "メイ",
        "image": "may"
      },
      {
        "en": "June",
        "jp": "6月",
        "katakana": "ジューン",
        "image": "june"
      },
      {
        "en": "July",
        "jp": "7月",
        "katakana": "ジュライ",
        "image": "july"
      },
      {
        "en": "August",
        "jp": "8月",
        "katakana": "オーガスト",
        "image": "august"
      },
      {
        "en": "September",
        "jp": "9月",
        "katakana": "セプテンバー",
        "image": "september"
      },
      {
        "en": "October",
        "jp": "10月",
        "katakana": "オクトーバー",
        "image": "october"
      },
      {
        "en": "November",
        "jp": "11月",
        "katakana": "ノーベンバー",
        "image": "november"
      },
      {
        "en": "December",
        "jp": "12月",
        "katakana": "ディセンバー",
        "image": "december"
      }
    ]
  },
  "seasons": {
    "title": "Seasons",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#F57C00",
      "secondary": "#FFE0B2",
      "background": "#FFF3E0",
      "finishedBackground": "#FFE0B2",
      "accent": "#1976D2",
      "buttonColor": "#FF9800"
    },
    "items": [
      {
        "en": "Spring",
        "jp": "春",
        "katakana": "スプリング",
        "image": "spring"
      },
      {
        "en": "Summer",
        "jp": "夏",
        "katakana": "サマー",
        "image": "summer"
      },
      {
        "en": "Autumn",
        "jp": "秋",
        "katakana": "オータム",
        "image": "autumn"
      },
      {
        "en": "Winter",
        "jp": "冬",
        "katakana": "ウィンター",
        "image": "winter"
      }
    ]
  },
  "seaAnimals": {
    "title": "Sea Animals",
    "prompt": {
      "en": "I like",
      "jp": "アイ ライク"
    },
    "theme": {
      "primary": "#0288D1",
      "secondary": "#81D4FA",
      "background": "#E1F5FE",
      "finishedBackground": "#B3E5FC",
      "accent": "#FFAB00",
      "buttonColor": "#039BE5"
    },
    "items": [
      {
        "en": "Crabs",
        "jp": "カニ",
        "katakana": "クラブズ",
        "image": "crab"
      },
      {
        "en": "Dolphins",
        "jp": "イルカ",
        "katakana": "ドルフィンズ",
        "image": "dolphin"
      },
      {
        "en": "Fish",
        "jp": "さかな",
        "katakana": "フィッシュ",
        "image": "fish"
      },
      {
        "en": "Jellyfish",
        "jp": "クラゲ",
        "katakana": "ジェリーフィッシュ",
        "image": "jellyfish"
      },
      {
        "en": "Octopuses",
        "jp": "タコ",
        "katakana": "オクトパシズ",
        "image": "octopus"
      },
      {
        "en": "Penguins",
        "jp": "ペンギン",
        "katakana": "ペンギンズ",
        "image": "penguin"
      },
      {
        "en": "Sharks",
        "jp": "サメ",
        "katakana": "シャークス",
        "image": "shark"
      },
      {
        "en": "Squids",
        "jp": "イカ",
        "katakana": "スクイッズ",
        "image": "squid"
      },
      {
        "en": "Turtles",
        "jp": "カメ",
        "katakana": "タートルズ",
        "image": "turtle"
      },
      {
        "en": "Whales",
        "jp": "クジラ",
        "katakana": "ホエールズ",
        "image": "whale"
      }
    ]
  },
  "feelings": {
    "title": "Feelings",
    "prompt": {
      "en": "I am",
      "jp": "アイ アム"
    },
    "question": {
      "en": "How are you?",
      "jp": "ハウ アー ユー？"
    },
    "theme": {
      "primary": "#E65100",
      "secondary": "#FFCC80",
      "background": "#FFF3E0",
      "finishedBackground": "#FFE0B2",
      "accent": "#D81B60",
      "buttonColor": "#FB8C00"
    },
    "items": [
      {
        "en": "Happy",
        "jp": "うれしい",
        "katakana": "ハッピー",
        "image": "happy"
      },
      {
        "en": "Sad",
        "jp": "かなしい",
        "katakana": "サッド",
        "image": "sad"
      },
      {
        "en": "Angry",
        "jp": "おこっている",
        "katakana": "アングリー",
        "image": "angry"
      },
      {
        "en": "Hungry",
        "jp": "おなかがすいた",
        "katakana": "ハングリー",
        "image": "hungry"
      },
      {
        "en": "Sleepy",
        "jp": "ねむい",
        "katakana": "スリーピー",
        "image": "sleepy"
      },
      {
        "en": "Tired",
        "jp": "つかれた",
        "katakana": "タイアード",
        "image": "tired"
      },
      {
        "en": "Hot",
        "jp": "あつい",
        "katakana": "ホット",
        "image": "hot"
      },
      {
        "en": "Cold",
        "jp": "さむい",
        "katakana": "コールド",
        "image": "cold"
      }
    ]
  }
};
