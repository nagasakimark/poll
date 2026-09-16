
import cabbageImg from './assets/vegetables/cabbages.png';
import carrotImg from './assets/vegetables/carrots.png';
import cornImg from './assets/vegetables/corn.png';
import mushroomImg from './assets/vegetables/mushrooms.png';
import onionImg from './assets/vegetables/onions.png';
import peaImg from './assets/vegetables/peas.png';
import pepperImg from './assets/vegetables/peppers.png';
import potatoImg from './assets/vegetables/potatoes.png';
import pumpkinImg from './assets/vegetables/pumpkins.png';
import tomatoImg from './assets/vegetables/tomatoes.png';

import catImg from './assets/animals/cats.png';
import chickenImg from './assets/animals/chickens.png';
import cowImg from './assets/animals/cows.png';
import dogImg from './assets/animals/dogs.png';
import duckImg from './assets/animals/ducks.png';
import hamsterImg from './assets/animals/hamsters.png';
import horseImg from './assets/animals/horses.png';
import pigImg from './assets/animals/pigs.png';
import rabbitImg from './assets/animals/rabbits.png';

import aichiImg from './assets/prefectures/aichi.png';
import chibaImg from './assets/prefectures/chiba.png';
import fukuokaImg from './assets/prefectures/fukuoka.png';
import hokkaidoImg from './assets/prefectures/hokkaido.png';
import hyogoImg from './assets/prefectures/hyogo.png';
import kanagawaImg from './assets/prefectures/kanagawa.png';
import osakaImg from './assets/prefectures/osaka.png';
import saitamaImg from './assets/prefectures/saitama.png';
import shizuokaImg from './assets/prefectures/shizuoka.png';
import tokyoImg from './assets/prefectures/tokyo.png';

import blackImg from './assets/colors/black.png';
import blueImg from './assets/colors/blue.png';
import grayImg from './assets/colors/gray.png';
import greenImg from './assets/colors/green.png';
import orangeImg from './assets/colors/orange.png';
import pinkImg from './assets/colors/pink.png';
import purpleImg from './assets/colors/purple.png';
import redImg from './assets/colors/red.png';
import whiteImg from './assets/colors/white.png';
import yellowImg from './assets/colors/yellow.png';

import badmintonImg from './assets/sports/badminton.png';
import baseballImg from './assets/sports/baseball.png';
import basketballImg from './assets/sports/basketball.png';
import soccerImg from './assets/sports/soccer.png';
import tabletennisImg from './assets/sports/tabletennis.png';
import tennisImg from './assets/sports/tennis.png';
import dodgeballImg from './assets/sports/dodgeball.png';
import volleyballImg from './assets/sports/volleyball.png';

import bearImg from './assets/animals2/bear.png';
import elephantImg from './assets/animals2/elephant.png';
import gorillaImg from './assets/animals2/gorilla.png';
import lionImg from './assets/animals2/lion.png';
import monkeyImg from './assets/animals2/monkey.png';
import pandaImg from './assets/animals2/panda.png';
import tigerImg from './assets/animals2/tiger.png';

import mondayImg from './assets/days/monday.png';
import tuesdayImg from './assets/days/tuesday.png';
import wednesdayImg from './assets/days/wednesday.png';
import thursdayImg from './assets/days/thursday.png';
import fridayImg from './assets/days/friday.png';
import saturdayImg from './assets/days/saturday.png';
import sundayImg from './assets/days/sunday.png';

import januaryImg from './assets/months/january.png';
import februaryImg from './assets/months/february.png';
import marchImg from './assets/months/march.png';
import aprilImg from './assets/months/april.png';
import mayImg from './assets/months/may.png';
import juneImg from './assets/months/june.png';
import julyImg from './assets/months/july.png';
import augustImg from './assets/months/august.png';
import septemberImg from './assets/months/september.png';
import octoberImg from './assets/months/october.png';
import novemberImg from './assets/months/november.png';
import decemberImg from './assets/months/december.png';

import springImg from './assets/seasons/spring.png';
import summerImg from './assets/seasons/summer.png';
import autumnImg from './assets/seasons/autumn.png';
import winterImg from './assets/seasons/winter.png';

import crabImg from './assets/sea-animals/crab.png';
import dolphinImg from './assets/sea-animals/dolphin.png';
import fishImg from './assets/sea-animals/fish.png';
import jellyfishImg from './assets/sea-animals/jellyfish.png';
import octopusImg from './assets/sea-animals/octopus.png';
import penguinImg from './assets/sea-animals/penguin.png';
import sharkImg from './assets/sea-animals/shark.png';
import squidImg from './assets/sea-animals/squid.png';
import turtleImg from './assets/sea-animals/turtle.png';
import whaleImg from './assets/sea-animals/whale.png';

import angryImg from './assets/feelings/angry.png';
import coldImg from './assets/feelings/cold.png';
import happyImg from './assets/feelings/happy.png';
import hotImg from './assets/feelings/hot.png';
import hungryImg from './assets/feelings/hungry.png';
import sadImg from './assets/feelings/sad.png';
import sleepyImg from './assets/feelings/sleepy.png';
import tiredImg from './assets/feelings/tired.png';

export const polls = {
  vegetables: {
    title: "Vegetables",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#2E7D32", // Darker Green for better contrast
      secondary: "#A5D6A7", // Soft Green
      background: "#F1F8E9", // Very subtle green
      finishedBackground: "#E8F5E9",
      accent: "#EF6C00", // Deep Orange
      buttonColor: "#4CAF50"
    },
    items: [
      { en: "Cabbages", jp: "キャベツ", katakana: "キャベツ", image: cabbageImg },
      { en: "Carrots", jp: "にんじん", katakana: "キャロッツ", image: carrotImg },
      { en: "Corn", jp: "とうもろこし", katakana: "コーン", image: cornImg },
      { en: "Mushrooms", jp: "きのこ", katakana: "マッシュルームズ", image: mushroomImg },
      { en: "Onions", jp: "たまねぎ", katakana: "オニオンズ", image: onionImg },
      { en: "Peas", jp: "えんどうまめ", katakana: "ピーズ", image: peaImg },
      { en: "Peppers", jp: "ピーマン", katakana: "ペッパーズ", image: pepperImg },
      { en: "Potatoes", jp: "じゃがいも", katakana: "ポテトズ", image: potatoImg },
      { en: "Pumpkins", jp: "かぼちゃ", katakana: "パンプキンズ", image: pumpkinImg },
      { en: "Tomatoes", jp: "トマト", katakana: "トマトズ", image: tomatoImg },
    ]
  },
  fruits: {
    title: "Fruits",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#C2185B", // Dark Pink
      secondary: "#F48FB1", // Soft Pink
      background: "#FCE4EC", // Very subtle pink
      finishedBackground: "#F8BBD0",
      accent: "#FBC02D", // Gold
      buttonColor: "#E91E63"
    },
    items: [
      { en: "Apples", jp: "りんご", katakana: "アップルズ", icon: "🍎" },
      { en: "Peaches", jp: "もも", katakana: "ピーチズ", icon: "🍑" },
      { en: "Bananas", jp: "バナナ", katakana: "バナナズ", icon: "🍌" },
      { en: "Pears", jp: "なし", katakana: "ペアーズ", icon: "🍐" },
      { en: "Cherries", jp: "さくらんぼ", katakana: "チェリーズ", icon: "🍒" },
      { en: "Pineapples", jp: "パイナップル", katakana: "パイナップルズ", icon: "🍍" },
      { en: "Grapefruits", jp: "グレープフルーツ", katakana: "グレープフルーツズ", icon: "🍊" },
      { en: "Oranges", jp: "オレンジ", katakana: "オレンジズ", icon: "🍊" },
      { en: "Grapes", jp: "ぶどう", katakana: "グレープズ", icon: "🍇" },
      { en: "Strawberries", jp: "いちご", katakana: "ストロベリーズ", icon: "🍓" },
    ]
  },
  animals: {
    title: "Animals (1st Grade)",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#1565C0", // Dark Blue
      secondary: "#90CAF9", // Soft Blue
      background: "#E3F2FD", // Very subtle blue
      finishedBackground: "#BBDEFB",
      accent: "#D84315", // Deep Orange
      buttonColor: "#2196F3"
    },
    items: [
      { en: "Cats", jp: "ねこ", katakana: "キャッツ", image: catImg },
      { en: "Chickens", jp: "にわとり", katakana: "チキンズ", image: chickenImg },
      { en: "Cows", jp: "うし", katakana: "カウズ", image: cowImg },
      { en: "Dogs", jp: "いぬ", katakana: "ドッグズ", image: dogImg },
      { en: "Ducks", jp: "あひる", katakana: "ダックス", image: duckImg },
      { en: "Hamsters", jp: "ハムスター", katakana: "ハムスターズ", image: hamsterImg },
      { en: "Horses", jp: "うま", katakana: "ホーシズ", image: horseImg },
      { en: "Pigs", jp: "ぶた", katakana: "ピッグズ", image: pigImg },
      { en: "Rabbits", jp: "うさぎ", katakana: "ラビッツ", image: rabbitImg },
    ]
  },
  animals2: {
    title: "Animals (2nd Grade)",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#FF6F00", // Amber
      secondary: "#FFCA28", // Amber Light
      background: "#FFF8E1", // Very subtle amber
      finishedBackground: "#FFECB3",
      accent: "#3E2723", // Brown
      buttonColor: "#FF8F00"
    },
    items: [
      { en: "Tigers", jp: "トラ", katakana: "タイガーズ", image: tigerImg },
      { en: "Pandas", jp: "パンダ", katakana: "パンダズ", image: pandaImg },
      { en: "Lions", jp: "ライオン", katakana: "ライオンズ", image: lionImg },
      { en: "Monkeys", jp: "サル", katakana: "モンキーズ", image: monkeyImg },
      { en: "Elephants", jp: "ゾウ", katakana: "エレファンツ", image: elephantImg },
      { en: "Gorillas", jp: "ゴリラ", katakana: "ゴリラズ", image: gorillaImg },
      { en: "Bears", jp: "クマ", katakana: "ベアーズ", image: bearImg },
    ]
  },
  colors: {
    title: "Colors",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#607D8B", // Blue Grey
      secondary: "#CFD8DC", // Light Blue Grey
      background: "#ECEFF1", // Very subtle blue grey
      finishedBackground: "#CFD8DC",
      accent: "#FF4081", // Pink Accent
      buttonColor: "#78909C"
    },
    items: [
      { en: "Red", jp: "赤", katakana: "アカ", image: redImg },
      { en: "Blue", jp: "青", katakana: "アオ", image: blueImg },
      { en: "Yellow", jp: "黄色", katakana: "キイロ", image: yellowImg },
      { en: "Orange", jp: "オレンジ", katakana: "オレンジ", image: orangeImg },
      { en: "Purple", jp: "紫", katakana: "ムラサキ", image: purpleImg },
      { en: "Green", jp: "緑", katakana: "ミドリ", image: greenImg },
      { en: "Black", jp: "黒", katakana: "クロ", image: blackImg },
      { en: "White", jp: "白", katakana: "シロ", image: whiteImg },
      { en: "Pink", jp: "ピンク", katakana: "ピンク", image: pinkImg },
      { en: "Gray", jp: "灰色", katakana: "グレー", image: grayImg },
    ]
  },
  sports: {
    title: "Sports",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#0277BD", // Light Blue
      secondary: "#81D4FA", // Lighter Blue
      background: "#E1F5FE", // Very subtle light blue
      finishedBackground: "#B3E5FC",
      accent: "#FF6D00", // Orange for better contrast
      buttonColor: "#039BE5"
    },
    items: [
      { en: "Baseball", jp: "野球", katakana: "ベースボール", image: baseballImg },
      { en: "Basketball", jp: "バスケットボール", katakana: "バスケットボール", image: basketballImg },
      { en: "Tennis", jp: "テニス", katakana: "テニス", image: tennisImg },
      { en: "Badminton", jp: "バドミントン", katakana: "バドミントン", image: badmintonImg },
      { en: "Volleyball", jp: "バレーボール", katakana: "バレーボール", image: volleyballImg },
      { en: "Table Tennis", jp: "卓球", katakana: "テーブルテニス", image: tabletennisImg },
      { en: "Soccer", jp: "サッカー", katakana: "サッカー", image: soccerImg },
      { en: "Dodgeball", jp: "ドッジボール", katakana: "ドッジボール", image: dodgeballImg },
    ]
  },
  prefectures: {
    title: "Prefectures",
    prompt: {
      en: "I want to go to",
      jp: "〜にいきたい"
    },
    theme: {
      primary: "#B71C1C", // Japan Red
      secondary: "#FFCDD2", // Light Red
      background: "#FFEBEE", // Very subtle red
      finishedBackground: "#FFCDD2",
      accent: "#FFD600", // Gold
      buttonColor: "#D32F2F"
    },
    items: [
      { en: "Hokkaido", jp: "北海道", katakana: "ホッカイドウ", image: hokkaidoImg },
      { en: "Tokyo", jp: "東京", katakana: "トウキョウ", image: tokyoImg },
      { en: "Aichi", jp: "愛知", katakana: "アイチ", image: aichiImg },
      { en: "Osaka", jp: "大阪", katakana: "オオサカ", image: osakaImg },
      { en: "Fukuoka", jp: "福岡", katakana: "フクオカ", image: fukuokaImg },
      { en: "Saitama", jp: "埼玉", katakana: "サイタマ", image: saitamaImg },
      { en: "Chiba", jp: "千葉", katakana: "チバ", image: chibaImg },
      { en: "Kanagawa", jp: "神奈川", katakana: "カナガワ", image: kanagawaImg },
      { en: "Hyogo", jp: "兵庫", katakana: "ヒョウゴ", image: hyogoImg },
      { en: "Shizuoka", jp: "静岡", katakana: "シズオカ", image: shizuokaImg },
    ]
  },
  days: {
    title: "Days of the Week",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#512DA8", // Deep Purple
      secondary: "#B39DDB", // Light Purple
      background: "#EDE7F6", // Very subtle purple
      finishedBackground: "#D1C4E9",
      accent: "#FFAB40", // Orange Accent
      buttonColor: "#673AB7"
    },
    items: [
      { en: "Monday", jp: "月曜日", katakana: "マンデー", image: mondayImg },
      { en: "Tuesday", jp: "火曜日", katakana: "チューズデー", image: tuesdayImg },
      { en: "Wednesday", jp: "水曜日", katakana: "ウェンズデー", image: wednesdayImg },
      { en: "Thursday", jp: "木曜日", katakana: "サーズデー", image: thursdayImg },
      { en: "Friday", jp: "金曜日", katakana: "フライデー", image: fridayImg },
      { en: "Saturday", jp: "土曜日", katakana: "サタデー", image: saturdayImg },
      { en: "Sunday", jp: "日曜日", katakana: "サンデー", image: sundayImg },
    ]
  },
  months: {
    title: "Months",
    prompt: {
      en: "My birthday is in",
      jp: "マイ バースデー イズ イン"
    },
    theme: {
      primary: "#00796B", // Teal
      secondary: "#80CBC4", // Light Teal
      background: "#E0F2F1", // Very subtle teal
      finishedBackground: "#B2DFDB",
      accent: "#FF5252", // Red Accent
      buttonColor: "#009688"
    },
    items: [
      { en: "January", jp: "1月", katakana: "ジャヌアリー", image: januaryImg },
      { en: "February", jp: "2月", katakana: "フェブラリー", image: februaryImg },
      { en: "March", jp: "3月", katakana: "マーチ", image: marchImg },
      { en: "April", jp: "4月", katakana: "エイプリル", image: aprilImg },
      { en: "May", jp: "5月", katakana: "メイ", image: mayImg },
      { en: "June", jp: "6月", katakana: "ジューン", image: juneImg },
      { en: "July", jp: "7月", katakana: "ジュライ", image: julyImg },
      { en: "August", jp: "8月", katakana: "オーガスト", image: augustImg },
      { en: "September", jp: "9月", katakana: "セプテンバー", image: septemberImg },
      { en: "October", jp: "10月", katakana: "オクトーバー", image: octoberImg },
      { en: "November", jp: "11月", katakana: "ノーベンバー", image: novemberImg },
      { en: "December", jp: "12月", katakana: "ディセンバー", image: decemberImg },
    ]
  },
  seasons: {
    title: "Seasons",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#F57C00", // Orange
      secondary: "#FFE0B2", // Light Orange
      background: "#FFF3E0", // Very subtle orange
      finishedBackground: "#FFE0B2",
      accent: "#1976D2", // Blue Accent
      buttonColor: "#FF9800"
    },
    items: [
      { en: "Spring", jp: "春", katakana: "スプリング", image: springImg },
      { en: "Summer", jp: "夏", katakana: "サマー", image: summerImg },
      { en: "Autumn", jp: "秋", katakana: "オータム", image: autumnImg },
      { en: "Winter", jp: "冬", katakana: "ウィンター", image: winterImg },
    ]
  },
  seaAnimals: {
    title: "Sea Animals",
    prompt: {
      en: "I like",
      jp: "アイ ライク"
    },
    theme: {
      primary: "#0288D1", // Light Blue 700
      secondary: "#81D4FA", // Light Blue 200
      background: "#E1F5FE", // Light Blue 50
      finishedBackground: "#B3E5FC", // Light Blue 100
      accent: "#FFAB00", // Amber Accent
      buttonColor: "#039BE5"
    },
    items: [
      { en: "Crabs", jp: "カニ", katakana: "クラブズ", image: crabImg },
      { en: "Dolphins", jp: "イルカ", katakana: "ドルフィンズ", image: dolphinImg },
      { en: "Fish", jp: "さかな", katakana: "フィッシュ", image: fishImg },
      { en: "Jellyfish", jp: "クラゲ", katakana: "ジェリーフィッシュ", image: jellyfishImg },
      { en: "Octopuses", jp: "タコ", katakana: "オクトパシズ", image: octopusImg },
      { en: "Penguins", jp: "ペンギン", katakana: "ペンギンズ", image: penguinImg },
      { en: "Sharks", jp: "サメ", katakana: "シャークス", image: sharkImg },
      { en: "Squids", jp: "イカ", katakana: "スクイッズ", image: squidImg },
      { en: "Turtles", jp: "カメ", katakana: "タートルズ", image: turtleImg },
      { en: "Whales", jp: "クジラ", katakana: "ホエールズ", image: whaleImg },
    ]
  },
  feelings: {
    title: "Feelings",
    prompt: {
      en: "I am",
      jp: "アイ アム"
    },
    question: {
      en: "How are you?",
      jp: "ハウ アー ユー？"
    },
    theme: {
      primary: "#E65100", // Warm Orange
      secondary: "#FFCC80", // Light Orange
      background: "#FFF3E0", // Very subtle orange
      finishedBackground: "#FFE0B2",
      accent: "#D81B60", // Pink Accent
      buttonColor: "#FB8C00"
    },
    items: [
      { en: "Happy", jp: "うれしい", katakana: "ハッピー", image: happyImg },
      { en: "Sad", jp: "かなしい", katakana: "サッド", image: sadImg },
      { en: "Angry", jp: "おこっている", katakana: "アングリー", image: angryImg },
      { en: "Hungry", jp: "おなかがすいた", katakana: "ハングリー", image: hungryImg },
      { en: "Sleepy", jp: "ねむい", katakana: "スリーピー", image: sleepyImg },
      { en: "Tired", jp: "つかれた", katakana: "タイアード", image: tiredImg },
      { en: "Hot", jp: "あつい", katakana: "ホット", image: hotImg },
      { en: "Cold", jp: "さむい", katakana: "コールド", image: coldImg },
    ]
  }
};
