


import React, { useState, useRef, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function App() {
  const fruits = [
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
  ];
  const colors = [
    "#FF6384", "#FFB347", "#FFE135", "#B0E57C", "#FF6F61",
    "#FFD700", "#FF7F50", "#FFA500", "#8A2BE2", "#FC5A8D"
  ];
  const [counts, setCounts] = useState(Array(fruits.length).fill(0));
  const [graphType, setGraphType] = useState("bar");
  const [finished, setFinished] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [flyingFruit, setFlyingFruit] = useState(null);
  const flyingRef = useRef();
  // Cycle example fruit every 2 seconds
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setExampleIdx(idx => (idx + 1) % fruits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [finished]);
  const handleFruitClick = idx => {
    if (finished) return;
    setFlyingFruit({ idx, key: Math.random() });
    setTimeout(() => {
      setFlyingFruit(null);
      setCounts(counts => {
        const newCounts = [...counts];
        newCounts[idx]++;
        return newCounts;
      });
    }, 700);
  };
  // Find all fruits with max votes
  const maxVotes = Math.max(...counts);
  const winners = counts
    .map((count, idx) => (count === maxVotes && maxVotes > 0 ? idx : -1))
    .filter(idx => idx !== -1);
  const chartData = {
    labels: fruits.map(f => f.icon + " " + f.en),
    datasets: [
      {
        label: "Votes",
        data: counts,
        backgroundColor: colors,
      },
    ],
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-fruit-anim]')) {
        const style = document.createElement('style');
        style.innerHTML = `@keyframes flyFruit {
          0% {
            left: 50vw;
            bottom: 0;
            transform: scale(2) rotate(-30deg);
            opacity: 1;
          }
          40% {
            left: 55vw;
            bottom: 40vh;
            transform: scale(2.2) rotate(20deg);
            opacity: 1;
          }
          70% {
            left: 60vw;
            bottom: 70vh;
            transform: scale(1.5) rotate(60deg);
            opacity: 1;
          }
          90% {
            left: 65vw;
            bottom: 80vh;
            transform: scale(1) rotate(120deg);
            opacity: 0.7;
          }
          100% {
            left: 70vw;
            bottom: 90vh;
            transform: scale(0.5) rotate(180deg);
            opacity: 0;
          }
        }`;
        style.setAttribute('data-fruit-anim', 'true');
        document.head.appendChild(style);
      }
    }
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      fontFamily: "Comic Sans MS, cursive, sans-serif",
      background: finished ? "#FC5A8D" : "#FFF8F0", overflow: "hidden", boxSizing: "border-box",
      display: "flex", flexDirection: finished ? "column" : "row", alignItems: finished ? "center" : undefined, justifyContent: finished ? "center" : undefined
    }}>
      {/* Flying Fruit Animation */}
      {flyingFruit && (
        <div
          ref={flyingRef}
          key={flyingFruit.key}
          style={{
            position: "fixed",
            left: "50vw",
            bottom: 0,
            fontSize: "7em",
            zIndex: 1000,
            pointerEvents: "none",
            animation: "flyFruit 1.2s cubic-bezier(.5,1.5,.5,1) forwards"
          }}
        >
          {fruits[flyingFruit.idx].icon}
        </div>
      )}
      {/* Sidebar */}
      {!finished && (
        <div style={{
          width: "320px", minWidth: "320px", background: "#FFE4B5", padding: "12px 8px 12px 8px",
          display: "flex", flexDirection: "column", alignItems: "center", borderRight: "6px solid #F8B500", height: "100vh", boxSizing: "border-box", overflowY: "auto"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
            {fruits.map((fruit, idx) => (
              <button
                key={fruit.en}
                onClick={() => handleFruitClick(idx)}
                style={{
                  padding: "10px 0", fontSize: "1.1em", fontWeight: "bold",
                  background: colors[idx], color: "#fff", border: "none", borderRadius: "16px",
                  width: "100%", cursor: finished ? "not-allowed" : "pointer", boxShadow: "2px 2px 8px #f8b50033",
                  display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "12px"
                }}
                disabled={finished}
              >
                <span style={{ fontSize: "2em", marginRight: "8px" }}>{fruit.icon}</span>
                <span>{fruit.en}</span>
                <span style={{ fontSize: "0.95em", color: "#FFF8F0", marginLeft: "8px" }}>{fruit.katakana}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Main Content */}
      {!finished && (
        <div style={{ flex: 1, padding: "32px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", boxSizing: "border-box", overflow: "auto" }}>
          {/* Prompt */}
          <div style={{ fontSize: "2.2em", margin: "24px 0 12px 0", color: "#F8B500", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <span style={{ display: "inline-block", marginBottom: "-4px" }}>
              <span style={{ fontSize: "0.65em", color: "#888", letterSpacing: "1px", position: "relative", top: "0.2em" }}>
                アイ ライク&nbsp;{fruits[exampleIdx].katakana}
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "-6px" }}>
              <span style={{ fontWeight: "bold", color: "#FC5A8D", fontSize: "1em", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "2em" }}>{fruits[exampleIdx].icon}</span>
                I like {fruits[exampleIdx].en}
              </span>
            </span>
          </div>
          {/* Graph Type Selector */}
          <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
            <button
              onClick={() => setGraphType("bar")}
              style={{
                padding: "10px 24px", fontSize: "1.1em",
                background: graphType === "bar" ? "#FC5A8D" : "#FFE4B5",
                color: graphType === "bar" ? "#fff" : "#F8B500", border: "none", borderRadius: "10px", fontWeight: "bold"
              }}
              disabled={finished}
            >Bar Graph</button>
            <button
              onClick={() => setGraphType("pie")}
              style={{
                padding: "10px 24px", fontSize: "1.1em",
                background: graphType === "pie" ? "#FC5A8D" : "#FFE4B5",
                color: graphType === "pie" ? "#fff" : "#F8B500", border: "none", borderRadius: "10px", fontWeight: "bold"
              }}
              disabled={finished}
            >Pie Chart</button>
          </div>
          {/* Chart */}
          <div style={{ width: "900px", height: "400px", background: "#FFF8F0", borderRadius: "32px", padding: "32px", boxShadow: "2px 2px 24px #f8b50022", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {graphType === "bar" ? (
              <Bar data={chartData} options={{
                plugins: {
                  legend: { display: false },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const idx = context.dataIndex;
                      return fruits[idx].icon;
                    },
                    font: { size: 32 },
                  },
                },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 18 } } }, x: { ticks: { font: { size: 18 } } } },
                responsive: true,
                maintainAspectRatio: false
              }} height={400} width={900} />
            ) : (
              <Pie data={chartData} options={{
                plugins: {
                  legend: { position: "right", labels: { font: { size: 20 } } },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const idx = context.dataIndex;
                      return fruits[idx].icon;
                    },
                    font: { size: 32 },
                  },
                },
                responsive: true,
                maintainAspectRatio: false
              }} height={400} width={900} />
            )}
          </div>
          {/* Finish Button */}
          <button
            onClick={() => setFinished(true)}
            style={{
              marginTop: "36px", padding: "18px 48px", fontSize: "2em",
              background: "#FC5A8D", color: "#fff", border: "none", borderRadius: "32px",
              boxShadow: "2px 2px 16px #f8b50033", cursor: "pointer", fontWeight: "bold"
            }}
            disabled={finished}
          >Finish!</button>
        </div>
      )}
      {/* Final Results Fullscreen */}
      {finished && (
        <div style={{
          width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FC5A8D", color: "#fff", position: "absolute", top: 0, left: 0, zIndex: 2000
        }}>
          <div style={{
            fontSize: "3em", marginBottom: "32px", background: "#fffbe6", color: "#FC5A8D", borderRadius: "40px", padding: "40px", boxShadow: "2px 2px 32px #f8b50044", textAlign: "center"
          }}>
            {winners.length === 1 ? (
              <span>
                🎉 The most popular fruit is <span style={{ fontSize: "2em" }}>{fruits[winners[0]].icon}</span> <b>{fruits[winners[0]].en}</b> (<span>{fruits[winners[0]].jp}</span>)! 🎉
              </span>
            ) : (
              <span>
                🎉 It's a draw! The most popular fruits are:<br />
                {winners.map(idx => (
                  <span key={idx} style={{ margin: "0 12px", fontSize: "1.5em" }}>
                    {fruits[idx].icon} <b>{fruits[idx].en}</b> (<span>{fruits[idx].jp}</span>)
                  </span>
                ))}
                🎉
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setCounts(Array(fruits.length).fill(0));
              setFinished(false);
            }}
            style={{
              fontSize: "2em", padding: "18px 48px", background: "#fffbe6", color: "#FC5A8D", border: "none", borderRadius: "32px", fontWeight: "bold", boxShadow: "2px 2px 16px #f8b50033", cursor: "pointer"
            }}
          >Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
