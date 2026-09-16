
import React, { useState, useRef, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { polls } from './data';

Chart.register(...registerables, ChartDataLabels);

// --- Helper Components ---

const GameButton = ({ onClick, color, children, style, className }) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: color,
        border: "none",
        borderRadius: "20px",
        padding: "15px 20px",
        color: "#fff",
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: "700",
        fontSize: "1.2rem",
        cursor: "pointer",
        position: "relative",
        boxShadow: "0px 6px 0px rgba(0,0,0,0.2), 0px 10px 10px rgba(0,0,0,0.1)",
        transition: "all 0.1s ease",
        transform: "translateY(0)",
        outline: "none",
        ...style
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(6px)";
        e.currentTarget.style.boxShadow = "0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px rgba(0,0,0,0.1)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0px 6px 0px rgba(0,0,0,0.2), 0px 10px 10px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0px 6px 0px rgba(0,0,0,0.2), 0px 10px 10px rgba(0,0,0,0.1)";
      }}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style }) => (
  <div style={{
    background: "#fff",
    borderRadius: "30px",
    boxShadow: "0 8px 0 rgba(0,0,0,0.05), 0 20px 30px rgba(0,0,0,0.1)",
    border: "4px solid rgba(0,0,0,0.05)",
    overflow: "hidden",
    ...style
  }}>
    {children}
  </div>
);

// --- Main App ---

function App() {
  const [pollType, setPollType] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPoll = pollType ? polls[pollType] : null;
  const items = currentPoll ? currentPoll.items : [];
  const theme = currentPoll ? currentPoll.theme : {
    primary: "#666",
    secondary: "#eee",
    background: "#f5f5f5",
    finishedBackground: "#ddd",
    accent: "#888",
    buttonColor: "#666"
  };

  // Chart Colors (Bright & Playful)
  const chartColors = [
    "#FF6B6B", "#4ECDC4", "#FFE66D", "#FF9F43", "#54A0FF",
    "#5F27CD", "#FF9FF3", "#00D2D3", "#2E86DE", "#EE5253"
  ];
  
  const [counts, setCounts] = useState([]);
  const [graphType, setGraphType] = useState("bar");
  const [finished, setFinished] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [flyingItem, setFlyingItem] = useState(null);
  const flyingRef = useRef();
  const [chartImages, setChartImages] = useState({});
  const [imageVersion, setImageVersion] = useState(0);

  // Preload images for chart
  useEffect(() => {
    if (!items.length) return;
    const newImages = {};
    let loadedCount = 0;
    const totalImages = items.filter(i => i.image).length;
    
    if (totalImages === 0) {
      setChartImages({});
      setImageVersion(v => v + 1);
      return;
    }

    items.forEach((item, index) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
             // Force re-render when all images are loaded
             setChartImages(prev => ({...prev})); 
          }
        };
        newImages[index] = img;
      }
    });
    setChartImages(newImages);
    setImageVersion(v => v + 1);
  }, [items]);

  // Reset counts when poll type changes
  useEffect(() => {
    if (!items.length) return;
    setCounts(Array(items.length).fill(0));
    setFinished(false);
    setExampleIdx(0);
    setIsMenuOpen(false);
  }, [pollType, items.length]);

  // Cycle example item
  useEffect(() => {
    if (finished || !items.length) return;
    const interval = setInterval(() => {
      setExampleIdx(idx => (idx + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [finished, items.length]);

  const handleItemClick = idx => {
    if (finished) return;
    setFlyingItem({ idx, key: Math.random() });
    setTimeout(() => {
      setFlyingItem(null);
      setCounts(counts => {
        const newCounts = [...counts];
        newCounts[idx]++;
        return newCounts;
      });
    }, 1000);
  };

  const maxVotes = Math.max(...counts);
  const winners = counts
    .map((count, idx) => (count === maxVotes && maxVotes > 0 ? idx : -1))
    .filter(idx => idx !== -1);

  const chartData = {
    labels: items.map(v => v.en),
    datasets: [
      {
        label: "Votes",
        data: counts,
        backgroundColor: chartColors,
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 12,
        hoverOffset: 10
      },
    ],
  };

  // Custom Plugin to draw images on X-axis
  const imageAxisPlugin = {
    id: 'imageAxis',
    afterDraw: (chart) => {
      if (chart.config.type !== 'bar') return;
      
      const ctx = chart.ctx;
      const xAxis = chart.scales['x'];
      const yAxis = chart.scales['y'];
      
      const count = chart.data.labels.length;
      for (let index = 0; index < count; index++) {
        const img = chartImages[index];
        const x = xAxis.getPixelForValue(index);
        const y = xAxis.bottom;
        
        if (img) {
          const size = 60;
          const aspect = img.width / img.height;
          let w = size;
          let h = size;
          if (aspect >= 1) {
            h = size / aspect;
          } else {
            w = size * aspect;
          }

          try {
            ctx.drawImage(img, x - w / 2, y + 10, w, h);
          } catch (e) {
            // Image might not be loaded yet
          }
        } else if (items[index].icon) {
           ctx.font = "30px Arial";
           ctx.textAlign = "center";
           ctx.fillText(items[index].icon, x, y + 35);
        }
      }
    }
  };

  const renderItemImage = (item, style = {}) => {
    if (item.image) {
      return <img src={item.image} alt={item.en} style={{ ...style, objectFit: "contain" }} />;
    } else if (item.icon) {
      return <span style={{ ...style, fontSize: "4em", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>;
    }
    return null;
  };

  // Inject Global Styles & Animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-game-styles]')) {
        const style = document.createElement('style');
        style.innerHTML = `
          body {
            margin: 0;
            font-family: 'Fredoka', sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          @keyframes flyItem {
            0% { left: 20vw; bottom: 10vh; transform: scale(0.5) rotate(-10deg); opacity: 1; }
            50% { left: 50vw; bottom: 50vh; transform: scale(1.2) rotate(10deg); opacity: 1; }
            100% { left: 80vw; bottom: 80vh; transform: scale(0.5) rotate(180deg); opacity: 0; }
          }
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .pattern-bg {
            background-image: radial-gradient(${theme.secondary} 20%, transparent 20%), radial-gradient(${theme.secondary} 20%, transparent 20%);
            background-color: ${theme.background};
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
          }
        `;
        style.setAttribute('data-game-styles', 'true');
        document.head.appendChild(style);
      }
    }
  }, [theme]);

  return (
    <div className="pattern-bg" style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "background-color 0.5s ease"
    }}>
      
      {/* --- Header / Top Bar --- */}
      <div style={{
        height: "80px", padding: "0 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 100
      }}>
        {currentPoll && (
          <GameButton 
            color="#fff" 
            style={{ color: theme.primary, width: "60px", height: "60px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}
            onClick={() => setIsMenuOpen(true)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </GameButton>
        )}

        {currentPoll && (
          <div style={{ 
            background: "#fff", padding: "10px 30px", borderRadius: "50px", 
            boxShadow: "0 4px 0 rgba(0,0,0,0.1)", border: `3px solid ${theme.primary}`,
            color: theme.primary, fontSize: "1.5rem", fontWeight: "700",
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <span>{currentPoll.title} Poll</span>
          </div>
        )}

        <div style={{ width: "60px" }}></div> {/* Spacer for balance */}
      </div>

      {/* --- Main Content Area --- */}
      {currentPoll ? (
      <div style={{ flex: 1, display: "flex", padding: "10px 20px 20px 20px", gap: "20px", height: "calc(100vh - 80px)" }}>
        
        {/* LEFT: Voting Pad */}
        {!finished && (
          <Card style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", padding: "15px", background: theme.secondary, border: `4px solid ${theme.primary}` }}>
            <div style={{ 
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", 
              flex: 1, minHeight: 0, padding: "5px", alignContent: "center",
              gridAutoRows: "1fr"
            }}>
              {items.map((item, idx) => (
                <button
                  key={item.en}
                  onClick={() => handleItemClick(idx)}
                  style={{
                    background: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    boxShadow: "0 6px 0 #E0E0E0, 0 10px 10px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "5px",
                    transition: "transform 0.1s",
                    position: "relative",
                    outline: "none",
                    height: "100%",
                    width: "100%",
                    minHeight: 0,
                    overflow: "hidden"
                  }}
                  onMouseDown={e => {
                    e.currentTarget.style.transform = "translateY(6px)";
                    e.currentTarget.style.boxShadow = "0 0 0 #E0E0E0, 0 0 0 rgba(0,0,0,0)";
                  }}
                  onMouseUp={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 0 #E0E0E0, 0 10px 10px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 0 #E0E0E0, 0 10px 10px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2px", minHeight: 0 }}>
                    {renderItemImage(item, { maxHeight: "100%", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.1))" })}
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: "700", color: "#444", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{item.en}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: "600", color: theme.primary, lineHeight: 1.1 }}>{item.katakana}</div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* RIGHT: Results & Prompt */}
        {!finished && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Prompt Bubble */}
            <Card style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", animation: "float 6s ease-in-out infinite" }}>
              {currentPoll.question && (
                <div style={{ textAlign: "center", borderBottom: `3px dashed ${theme.secondary}`, paddingBottom: "10px" }}>
                  <div style={{ fontSize: "1.2rem", color: theme.primary, fontWeight: "600" }}>
                    {currentPoll.question.jp}
                  </div>
                  <div style={{ fontSize: "2rem", color: "#333", fontWeight: "700", lineHeight: 1.1 }}>
                    {currentPoll.question.en}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "80px", height: "80px", background: theme.background,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  border: `4px solid ${theme.secondary}`
                }}>
                  {renderItemImage(items[exampleIdx], { maxWidth: "70%", maxHeight: "70%" })}
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", color: theme.primary, fontWeight: "600" }}>
                    {currentPoll.prompt.jp} <span style={{ color: theme.accent }}>{items[exampleIdx].katakana}</span>
                  </div>
                  <div style={{ fontSize: "2.5rem", color: "#333", fontWeight: "700", lineHeight: 1 }}>
                    {currentPoll.prompt.en} <span style={{ color: theme.accent }}>{items[exampleIdx].en}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chart Monitor */}
            <Card style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", position: "relative" }}>
              
              <div style={{ flex: 1, width: "100%", minHeight: 0 }}>
                {graphType === "bar" ? (
                  <Bar 
                    key={pollType + imageVersion}
                    data={chartData} 
                    plugins={[imageAxisPlugin]}
                    options={{
                      plugins: {
                        legend: { display: false },
                        datalabels: {
                          display: true, anchor: 'end', align: 'top',
                          formatter: (value) => value > 0 ? value : "",
                          font: { size: 24, family: "'Fredoka', sans-serif", weight: '700' },
                          color: theme.primary
                        },
                      },
                      scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: "'Fredoka', sans-serif" } }, grid: { display: false } },
                        x: { 
                          ticks: { color: 'transparent' }, // Hide text but keep ticks for plugin
                          grid: { display: false } 
                        }
                      },
                      responsive: true, 
                      maintainAspectRatio: false, 
                      layout: { padding: { top: 30, bottom: 80 } } // Add bottom padding for images
                    }} 
                  />
                ) : (
                  <Pie data={chartData} options={{
                    plugins: {
                      legend: { position: "right", labels: { font: { size: 16, family: "'Fredoka', sans-serif" }, boxWidth: 20 } },
                      datalabels: {
                        display: true, formatter: (value) => value > 0 ? value : "",
                        font: { size: 24, family: "'Fredoka', sans-serif", weight: '700' },
                        color: '#fff', textShadowBlur: 4, textShadowColor: '#000'
                      },
                    },
                    responsive: true, maintainAspectRatio: false
                  }} />
                )}
              </div>
            </Card>

            {/* Finish Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GameButton 
                onClick={() => setFinished(true)} 
                color={theme.buttonColor}
                style={{ fontSize: "1.5rem", padding: "10px 30px", borderRadius: "60px", border: "4px solid rgba(255,255,255,0.3)" }}
              >
                FINISH!
              </GameButton>
            </div>
          </div>
        )}
      </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Placeholder for when no poll is selected, though the menu modal will cover this */}
        </div>
      )}

      {/* --- Flying Item Animation --- */}
      {flyingItem && (
        <div
          ref={flyingRef}
          key={flyingItem.key}
          style={{
            position: "fixed", left: "50vw", bottom: 0, width: "150px", height: "150px",
            zIndex: 2000, pointerEvents: "none",
            animation: "flyItem 1s cubic-bezier(.25, .8, .25, 1) forwards",
            display: "flex", alignItems: "center", justifyContent: "center",
            filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.2))"
          }}
        >
          {renderItemImage(items[flyingItem.idx], { width: "100%", height: "100%" })}
        </div>
      )}

      {/* --- Menu Modal --- */}
      {(isMenuOpen || !pollType) && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.6)", zIndex: 4000,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(5px)"
        }} onClick={() => pollType && setIsMenuOpen(false)}>
          <Card style={{ 
            padding: "40px", width: "80%", maxWidth: "600px", 
            display: "flex", flexDirection: "column", gap: "20px",
            animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}>
            <h2 style={{ textAlign: "center", color: theme.primary, margin: 0, fontSize: "2.5rem" }}>Select a Poll</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
              {Object.keys(polls).map(key => (
                <GameButton
                  key={key}
                  onClick={() => setPollType(key)}
                  color={pollType === key ? theme.accent : "#eee"}
                  style={{ 
                    color: pollType === key ? "#fff" : "#666", 
                    fontSize: "1.2rem", padding: "20px",
                    boxShadow: pollType === key ? "0 6px 0 rgba(0,0,0,0.2)" : "0 6px 0 #ccc"
                  }}
                >
                  {polls[key].title}
                </GameButton>
              ))}
            </div>
            {pollType && <GameButton onClick={() => setIsMenuOpen(false)} color="#ff4757" style={{ marginTop: "20px" }}>Close Menu</GameButton>}
          </Card>
        </div>
      )}

      {/* --- Finished Screen --- */}
      {finished && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: `radial-gradient(circle, ${theme.finishedBackground} 0%, ${theme.primary} 100%)`,
          zIndex: 3000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }}>
          <Card style={{ 
            padding: "40px", maxWidth: "800px", width: "90%", 
            display: "flex", flexDirection: "column", alignItems: "center", gap: "30px",
            animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}>
            <h1 style={{ margin: 0, fontSize: "3rem", color: theme.primary, textTransform: "uppercase", letterSpacing: "2px" }}>
              {winners.length > 1 ? "It's a Draw!" : "The Winner is..."}
            </h1>
            
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
              {winners.map(idx => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "float 3s ease-in-out infinite" }}>
                  <div style={{ width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                    {renderItemImage(items[idx], { maxWidth: "100%", maxHeight: "100%", filter: "drop-shadow(0 10px 0 rgba(0,0,0,0.1))" })}
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#333" }}>{items[idx].en}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "600", color: theme.accent }}>{items[idx].katakana}</div>
                </div>
              ))}
            </div>

            <GameButton 
              onClick={() => { setCounts(Array(items.length).fill(0)); setFinished(false); }}
              color={theme.buttonColor}
              style={{ fontSize: "1.5rem", padding: "15px 40px", marginTop: "20px" }}
            >
              Play Again
            </GameButton>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
