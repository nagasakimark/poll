


import React, { useState, useRef, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Import vegetable images
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

Chart.register(...registerables, ChartDataLabels);

function App() {
  const vegetables = [
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
  ];
  // Vibrant, kid-friendly colors
  const colors = [
    "#90EE90", "#FFA500", "#FFD700", "#D2B48C", "#FFB6C1",
    "#98FB98", "#FF6347", "#F0E68C", "#FFA07A", "#FF4500"
  ];
  const [counts, setCounts] = useState(Array(vegetables.length).fill(0));
  const [graphType, setGraphType] = useState("bar");
  const [finished, setFinished] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [flyingVegetable, setFlyingVegetable] = useState(null);
  const flyingRef = useRef();

  // Cycle example vegetable every 3 seconds (slower for kids to read)
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setExampleIdx(idx => (idx + 1) % vegetables.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [finished]);

  const handleVegetableClick = idx => {
    if (finished) return;
    setFlyingVegetable({ idx, key: Math.random() });
    setTimeout(() => {
      setFlyingVegetable(null);
      setCounts(counts => {
        const newCounts = [...counts];
        newCounts[idx]++;
        return newCounts;
      });
    }, 1200); // Slightly longer animation for fun
  };

  // Find all vegetables with max votes
  const maxVotes = Math.max(...counts);
  const winners = counts
    .map((count, idx) => (count === maxVotes && maxVotes > 0 ? idx : -1))
    .filter(idx => idx !== -1);

  const chartData = {
    labels: vegetables.map(v => v.en),
    datasets: [
      {
        label: "Votes",
        data: counts,
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-veg-anim]')) {
        const style = document.createElement('style');
        style.innerHTML = `@keyframes flyVegetable {
          0% {
            left: 25vw;
            bottom: 10vh;
            transform: scale(0.5) rotate(-30deg);
            opacity: 1;
          }
          50% {
            left: 50vw;
            bottom: 50vh;
            transform: scale(1.5) rotate(20deg);
            opacity: 1;
          }
          100% {
            left: 75vw;
            bottom: 80vh;
            transform: scale(0.5) rotate(180deg);
            opacity: 0;
          }
        }`;
        style.setAttribute('data-veg-anim', 'true');
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif", // Kid-friendly font
      background: finished ? "#e0f7fa" : "#f0f9e8", // Soft background
      overflow: "hidden", boxSizing: "border-box",
      display: "flex", flexDirection: "row"
    }}>
      {/* Flying Vegetable Animation */}
      {flyingVegetable && (
        <div
          ref={flyingRef}
          key={flyingVegetable.key}
          style={{
            position: "fixed",
            left: "50vw",
            bottom: 0,
            width: "200px",
            height: "200px",
            zIndex: 2000,
            pointerEvents: "none",
            animation: "flyVegetable 1.2s cubic-bezier(.25, .8, .25, 1) forwards",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.3))"
          }}
        >
          <img src={vegetables[flyingVegetable.idx].image} alt="flying vegetable" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      )}

      {/* Left Panel: Voting Grid */}
      {!finished && (
        <div style={{
          width: "35%", height: "100%", padding: "10px",
          background: "#fff", borderRight: "8px solid #8BC34A",
          display: "flex", flexDirection: "column", justifyContent: "center",
          boxShadow: "5px 0 15px rgba(0,0,0,0.1)", zIndex: 10,
          boxSizing: "border-box"
        }}>
          <h2 style={{ textAlign: "center", color: "#558B2F", margin: "0 0 10px 0", fontSize: "clamp(1.5em, 3vh, 2em)", textShadow: "2px 2px 0px #DCEDC8", flexShrink: 0 }}>
            I like...
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(5, 1fr)", gap: "10px",
            height: "100%", overflow: "hidden", // Prevent scrolling
            minHeight: 0 // Allow grid to shrink
          }}>
            {vegetables.map((veg, idx) => (
              <button
                key={veg.en}
                onClick={() => handleVegetableClick(idx)}
                style={{
                  background: `linear-gradient(135deg, ${colors[idx]} 0%, #ffffff 150%)`,
                  border: "4px solid #fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "5px",
                  transition: "transform 0.1s active",
                  position: "relative",
                  overflow: "hidden",
                  minWidth: 0, // Allow shrinking
                  height: "100%" // Fill grid cell
                }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ height: "55%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2px" }}>
                  <img src={veg.image} alt={veg.en} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.2))" }} />
                </div>
                <div style={{ textAlign: "center", lineHeight: "1.1", width: "100%" }}>
                  <div style={{ fontSize: "clamp(1em, 2.5vw, 1.4em)", fontWeight: "bold", color: "#333", textShadow: "1px 1px 0 #fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{veg.en}</div>
                  <div style={{ fontSize: "clamp(0.8em, 2vw, 1.1em)", color: "#006400", fontWeight: "bold" }}>{veg.katakana}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right Panel: Results & Prompt */}
      {!finished && (
        <div style={{
          flex: 1, padding: "15px", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "space-between", height: "100vh",
          background: "#f1f8e9", minWidth: 0, // Fix for flex child overflow
          boxSizing: "border-box", overflow: "hidden"
        }}>
          {/* Prompt Area - Prominent for ESL practice */}
          <div style={{
            background: "#fff", padding: "10px 20px", borderRadius: "20px",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            display: "flex", flexDirection: "column", alignItems: "center",
            border: "4px solid #8BC34A", marginBottom: "10px", width: "90%",
            flexShrink: 0 // Don't shrink this
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={vegetables[exampleIdx].image} alt={vegetables[exampleIdx].en} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.4em", color: "#558B2F" }}>
                  アイ ライク <span style={{ fontWeight: "bold", color: "#E65100" }}>{vegetables[exampleIdx].katakana}</span>
                </div>
                <div style={{ fontSize: "2em", fontWeight: "bold", color: "#33691E", lineHeight: "1" }}>
                  I like <span style={{ color: "#E65100" }}>{vegetables[exampleIdx].en}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div style={{
            flex: 1, width: "100%", background: "#fff", borderRadius: "30px",
            padding: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative", minHeight: 0 // Allow shrinking vertically
          }}>
            <div style={{ position: "absolute", top: "15px", right: "20px", zIndex: 10, display: "flex", gap: "10px" }}>
              <button onClick={() => setGraphType("bar")} style={{ padding: "8px 16px", borderRadius: "20px", border: "none", background: graphType === "bar" ? "#8BC34A" : "#eee", color: graphType === "bar" ? "#fff" : "#666", fontWeight: "bold", cursor: "pointer", fontSize: "1.2em" }}>Bar</button>
              <button onClick={() => setGraphType("pie")} style={{ padding: "8px 16px", borderRadius: "20px", border: "none", background: graphType === "pie" ? "#8BC34A" : "#eee", color: graphType === "pie" ? "#fff" : "#666", fontWeight: "bold", cursor: "pointer", fontSize: "1.2em" }}>Pie</button>
            </div>
            <div style={{ width: "100%", height: "100%", padding: "5px", position: "relative" }}>
              {graphType === "bar" ? (
                <Bar data={chartData} options={{
                  plugins: {
                    legend: { display: false },
                    datalabels: {
                      display: true,
                      anchor: 'end',
                      align: 'top',
                      formatter: (value) => value > 0 ? value : "",
                      font: { size: 32, weight: 'bold' },
                      color: '#33691E'
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1, font: { size: 24 } },
                      grid: { display: false },
                      grace: '10%' // Add space at top for labels
                    },
                    x: { ticks: { font: { size: 20, weight: 'bold' }, maxRotation: 45, minRotation: 45 } }
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: { padding: { top: 40 } } // Add padding for labels
                }} />
              ) : (
                <Pie data={chartData} options={{
                  plugins: {
                    legend: { position: "right", labels: { font: { size: 24 } } },
                    datalabels: {
                      display: true,
                      formatter: (value) => value > 0 ? value : "",
                      font: { size: 32, weight: 'bold' },
                      color: '#fff',
                      textShadowBlur: 4,
                      textShadowColor: '#000'
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false
                }} />
              )}
            </div>
          </div>

          {/* Finish Button */}
          <button
            onClick={() => setFinished(true)}
            style={{
              marginTop: "15px", padding: "10px 40px", fontSize: "1.8em",
              background: "linear-gradient(to bottom, #FF7043, #E64A19)",
              color: "#fff", border: "none", borderRadius: "50px",
              boxShadow: "0 6px 0 #BF360C, 0 10px 10px rgba(0,0,0,0.2)",
              cursor: "pointer", fontWeight: "bold",
              transition: "transform 0.1s",
              textTransform: "uppercase", letterSpacing: "2px",
              flexShrink: 0
            }}
            onMouseDown={e => { e.currentTarget.style.transform = "translateY(4px)"; e.currentTarget.style.boxShadow = "0 2px 0 #BF360C, 0 4px 4px rgba(0,0,0,0.2)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 0 #BF360C, 0 10px 10px rgba(0,0,0,0.2)"; }}
          >
            Finish Voting!
          </button>
        </div>
      )}

      {/* Final Results Fullscreen */}
      {finished && (
        <div style={{
          width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle, #f1f8e9 0%, #c5e1a5 100%)",
          color: "#33691E", position: "absolute", top: 0, left: 0, zIndex: 3000
        }}>
          <div style={{
            fontSize: "2em", marginBottom: "20px", background: "#fff",
            color: "#33691E", borderRadius: "40px", padding: "30px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)", textAlign: "center",
            border: "8px solid #8BC34A", maxWidth: "90vw",
            maxHeight: "80vh", overflow: "auto" // Ensure it doesn't overflow screen
          }}>
            {winners.length === 1 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "0.8em", color: "#558B2F" }}>The Winner is...</div>
                <div style={{ width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                  <img src={vegetables[winners[0]].image} alt={vegetables[winners[0]].en} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }} />
                </div>
                <div>
                  <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>{vegetables[winners[0]].en}</div>
                  <div style={{ fontSize: "1em", color: "#E65100" }}>{vegetables[winners[0]].katakana}</div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "0.8em", color: "#558B2F", marginBottom: "15px" }}>It's a Draw!</div>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                  {winners.map(idx => (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                      <div style={{ width: "150px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px" }}>
                        <img src={vegetables[idx].image} alt={vegetables[idx].en} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.2))" }} />
                      </div>
                      <div style={{ fontSize: "0.8em", fontWeight: "bold" }}>{vegetables[idx].en}</div>
                      <div style={{ fontSize: "0.6em", color: "#E65100" }}>{vegetables[idx].katakana}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCounts(Array(vegetables.length).fill(0));
              setFinished(false);
            }}
            style={{
              fontSize: "1.5em", padding: "15px 40px", background: "#fff", color: "#33691E",
              border: "4px solid #33691E", borderRadius: "50px", fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)", cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#33691E"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#33691E"; }}
          >
            Start New Vote
          </button>
          <style>{`
            @keyframes popIn {
              0% { transform: scale(0); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default App;
