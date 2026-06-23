import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

const STARTING_SCORE = 25000;

const defaultPlayers = [
  { code: "A", seat: "東家", defaultName: "プレイヤーA", score: STARTING_SCORE, change: 0, reached: false },
  { code: "B", seat: "南家", defaultName: "プレイヤーB", score: STARTING_SCORE, change: 0, reached: false },
  { code: "C", seat: "西家", defaultName: "プレイヤーC", score: STARTING_SCORE, change: 0, reached: false },
  { code: "D", seat: "北家", defaultName: "プレイヤーD", score: STARTING_SCORE, change: 0, reached: false },
];

const hanOptions = [
  { value: 1, label: "1翻" },
  { value: 2, label: "2翻" },
  { value: 3, label: "3翻" },
  { value: 4, label: "4翻" },
  { value: 5, label: "満貫" },
  { value: 6, label: "跳満" },
  { value: 7, label: "倍満" },
  { value: 8, label: "三倍満" },
  { value: 9, label: "役満" },
];

const fuByHan = {
  1: [30, 40, 50],
  2: [20, 25, 30, 40, 50],
  3: [20, 25, 30, 40, 50],
  4: [20, 25],
};

const pointTables = {
  tParent: {
    1: { 30: [1500, 500], 40: [2100, 700], 50: [2400, 800] },
    2: { 20: [2100, 700], 30: [3000, 1000], 40: [3900, 1300], 50: [4800, 1600] },
    3: { 20: [3900, 1300], 25: [4800, 1600], 30: [6000, 2000], 40: [7800, 2600], 50: [9600, 3200] },
    4: { 20: [7800, 2600], 25: [9600, 3200] },
    5: [12000, 4000],
    6: [18000, 6000],
    7: [24000, 8000],
    8: [36000, 12000],
    9: [48000, 16000],
  },
  tChild: {
    1: { 30: [500, 300], 40: [700, 400], 50: [800, 400] },
    2: { 20: [700, 400], 30: [1000, 500], 40: [1300, 700], 50: [1600, 800] },
    3: { 20: [1300, 700], 25: [1600, 800], 30: [2000, 1000], 40: [2600, 1300], 50: [3200, 1600] },
    4: { 20: [2600, 1300], 25: [3200, 1600] },
    5: [4000, 2000],
    6: [6000, 3000],
    7: [8000, 4000],
    8: [12000, 6000],
    9: [16000, 8000],
  },
  rParent: {
    1: { 30: [1500, 1500], 40: [2000, 2000], 50: [2400, 2400] },
    2: { 25: [2400, 2400], 30: [2900, 2900], 40: [3900, 3900], 50: [4800, 4800] },
    3: { 25: [4800, 4800], 30: [5800, 5800], 40: [7700, 7700], 50: [9600, 9600] },
    4: { 25: [9600, 9600] },
    5: [12000, 12000],
    6: [18000, 18000],
    7: [24000, 24000],
    8: [36000, 36000],
    9: [48000, 48000],
  },
  rChild: {
    1: { 30: [1000, 1000], 40: [1300, 1300], 50: [1600, 1600] },
    2: { 25: [1600, 1600], 30: [2000, 2000], 40: [2600, 2600], 50: [3200, 3200] },
    3: { 25: [3200, 3200], 30: [3900, 3900], 40: [5200, 5200], 50: [6400, 6400] },
    4: { 25: [6400, 6400] },
    5: [8000, 8000],
    6: [12000, 12000],
    7: [16000, 16000],
    8: [24000, 24000],
    9: [32000, 32000],
  },
};

function createPlayers(nameInputs = {}) {
  return defaultPlayers.map((player) => ({
    ...player,
    name: nameInputs[player.code]?.trim() || player.defaultName,
  }));
}

function getPoint(tableName, han, fu) {
  const table = pointTables[tableName][han];
  const values = Array.isArray(table) ? table : table?.[fu];
  return { parent: values?.[0] ?? 0, child: values?.[1] ?? 0 };
}

function nextRound(kyoku, wind) {
  if (wind === "南" && kyoku === 4) {
    return { kyoku, wind, gameOver: true };
  }

  if (kyoku < 4) {
    return { kyoku: kyoku + 1, wind, gameOver: false };
  }

  return { kyoku: 1, wind: wind === "東" ? "南" : wind, gameOver: false };
}

function formatDiff(value) {
  return value > 0 ? `+${value}` : String(value);
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [nameInputs, setNameInputs] = useState({});
  const [players, setPlayers] = useState(createPlayers());
  const [dealer, setDealer] = useState(0);
  const [wind, setWind] = useState("東");
  const [kyoku, setKyoku] = useState(1);
  const [honba, setHonba] = useState(0);
  const [kyotaku, setKyotaku] = useState(0);
  const [reachCount, setReachCount] = useState(0);
  const [winMenuOpen, setWinMenuOpen] = useState(false);
  const [drawMenuOpen, setDrawMenuOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pendingGameOver, setPendingGameOver] = useState(false);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedHan, setSelectedHan] = useState(null);
  const [selectedFu, setSelectedFu] = useState(null);
  const [selectedLoser, setSelectedLoser] = useState(null);
  const [tempaiPlayers, setTempaiPlayers] = useState([]);

  const visibleFuOptions = useMemo(() => fuByHan[selectedHan] ?? [], [selectedHan]);

  function startGame(event) {
    event.preventDefault();
    setPlayers(createPlayers(nameInputs));
    setDealer(0);
    setWind("東");
    setKyoku(1);
    setHonba(0);
    setKyotaku(0);
    setReachCount(0);
    setTempaiPlayers([]);
    setResultOpen(false);
    setGameOver(false);
    setPendingGameOver(false);
    setWinMenuOpen(false);
    setDrawMenuOpen(false);
    resetWinInput();
    setIsStarted(true);
  }

  function resetWinInput() {
    setSelectedType(null);
    setSelectedHan(null);
    setSelectedFu(null);
    setSelectedLoser(null);
    setCurrentWinner(null);
  }

  function rotateDealerAndRound() {
    const next = nextRound(kyoku, wind);
    if (next.gameOver) {
      setPendingGameOver(true);
      return;
    }

    setKyoku(next.kyoku);
    setWind(next.wind);
    setDealer((current) => (current + 1) % 4);
  }

  function toggleReach(index) {
    const wasReached = players[index].reached;

    setPlayers((current) =>
      current.map((player, i) => {
        if (i !== index) {
          return player;
        }

        return {
          ...player,
          reached: !player.reached,
          score: player.score + (player.reached ? 1000 : -1000),
        };
      }),
    );
    setKyotaku((current) => current + (wasReached ? -1000 : 1000));
    setReachCount((current) => current + (wasReached ? -1 : 1));
  }

  function openWinMenu(index) {
    setCurrentWinner(index);
    setWinMenuOpen(true);
    setDrawMenuOpen(false);
    resetWinInput();
    setCurrentWinner(index);
  }

  function selectType(type) {
    setSelectedType(type);
    setSelectedHan(null);
    setSelectedFu(null);
    setSelectedLoser(null);
  }

  function selectHan(han) {
    setSelectedHan(han);
    setSelectedFu(null);
  }

  function confirmWin() {
    const changes = [0, 0, 0, 0];

    if (selectedType === "t") {
      if (currentWinner === dealer) {
        const point = getPoint("tParent", selectedHan, selectedFu);
        players.forEach((_, i) => {
          changes[i] = i === currentWinner
            ? point.parent + kyotaku
            : -(point.child + honba * 100);
        });
        setHonba((current) => current + 1);
        setKyotaku(reachCount > 0 ? kyotaku - reachCount * 1000 + 300 : kyotaku + 300);
      } else {
        const point = getPoint("tChild", selectedHan, selectedFu);
        players.forEach((_, i) => {
          if (i === currentWinner) {
            changes[i] = point.parent + point.child * 2 + kyotaku;
          } else if (i === dealer) {
            changes[i] = -(point.parent + honba * 100);
          } else {
            changes[i] = -(point.child + honba * 100);
          }
        });
        setHonba(0);
        setKyotaku(0);
        rotateDealerAndRound();
      }
    }

    if (selectedType === "r") {
      if (currentWinner === dealer) {
        const point = getPoint("rParent", selectedHan, selectedFu);
        changes[selectedLoser] = -(point.child + honba * 300);
        changes[currentWinner] = point.parent + kyotaku;
        setHonba((current) => current + 1);
        setKyotaku(reachCount > 0 ? kyotaku - reachCount * 1000 + 300 : kyotaku + 300);
      } else {
        const point = getPoint("rChild", selectedHan, selectedFu);
        changes[selectedLoser] = -(point.child + honba * 300);
        changes[currentWinner] = point.child + kyotaku;
        setHonba(0);
        setKyotaku(0);
        rotateDealerAndRound();
      }
    }

    setPlayers((current) =>
      current.map((player, i) => ({
        ...player,
        change: changes[i],
      })),
    );
    setResultOpen(true);
    setWinMenuOpen(false);
    setDrawMenuOpen(false);
  }

  function openDrawMenu() {
    setSelectedType("d");
    setTempaiPlayers([]);
    setDrawMenuOpen(true);
    setWinMenuOpen(false);
  }

  function toggleTempai(index) {
    setTempaiPlayers((current) =>
      current.includes(index)
        ? current.filter((playerIndex) => playerIndex !== index)
        : [...current, index],
    );
  }

  function confirmDraw() {
    const changes = [0, 0, 0, 0];
    const tempaiCount = tempaiPlayers.length;

    players.forEach((_, i) => {
      if (tempaiCount === 0 || tempaiCount === 4) {
        changes[i] = 0;
      } else if (tempaiPlayers.includes(i)) {
        changes[i] = 3000 / tempaiCount;
      } else {
        changes[i] = -(3000 / (4 - tempaiCount));
      }
    });

    if (!tempaiPlayers.includes(dealer)) {
      rotateDealerAndRound();
    }

    setHonba((current) => current + 1);
    setKyotaku((current) => current + 300);
    setPlayers((current) => current.map((player, i) => ({ ...player, change: changes[i] })));
    setResultOpen(true);
    setDrawMenuOpen(false);
  }

  function settle() {
    const settledPlayers = players.map((player) => ({
        ...player,
        score: player.score + player.change,
        change: 0,
        reached: false,
      }));

    setPlayers(settledPlayers);
    setReachCount(0);
    setTempaiPlayers([]);
    setResultOpen(false);
    resetWinInput();

    if (pendingGameOver) {
      setPendingGameOver(false);
      setGameOver(true);
    }
  }

  const canConfirmWin =
    selectedType === "t"
      ? selectedHan && (selectedHan >= 5 || selectedFu)
      : selectedLoser !== null && selectedHan && (selectedHan >= 5 || selectedFu);

  if (!isStarted) {
    return (
      <main className="app-shell">
        <form className="setup-panel" onSubmit={startGame}>
          <h1>麻雀点数管理</h1>
          <div className="setup-grid">
            {defaultPlayers.map((player) => (
              <label className="name-field" key={player.code}>
                <span>{player.seat}</span>
                <input
                  type="text"
                  value={nameInputs[player.code] ?? ""}
                  placeholder={player.defaultName}
                  maxLength={12}
                  onChange={(event) =>
                    setNameInputs((current) => ({
                      ...current,
                      [player.code]: event.target.value,
                    }))
                  }
                />
              </label>
            ))}
          </div>
          <button className="start-button" type="submit">対局開始</button>
        </form>
      </main>
    );
  }

  if (gameOver) {
    return (
      <main className="app-shell">
        <section className="final-panel">
          <h1>対局終了</h1>
          <div className="ranking-list">
            {[...players]
              .sort((a, b) => b.score - a.score)
              .map((player, index) => {
                const totalDiff = player.score - STARTING_SCORE;

                return (
                  <div className="ranking-row" key={player.code}>
                    <span className="rank">{index + 1}位</span>
                    <span className="ranking-name">{player.name}</span>
                    <span className="ranking-score">{player.score}</span>
                    <span className={`ranking-diff ${totalDiff >= 0 ? "plus" : "minus"}`}>
                      {formatDiff(totalDiff)}
                    </span>
                  </div>
                );
              })}
          </div>
          <button type="button" onClick={() => setIsStarted(false)}>新しい対局へ</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <h1>麻雀点数管理</h1>

      <section className="table-layout" aria-label="麻雀卓">
        <PlayerPanel
          player={players[0]}
          index={0}
          isDealer={dealer === 0}
          position="top"
          onReach={toggleReach}
          onWin={openWinMenu}
        />

        <div className="middle-area">
          <PlayerPanel
            player={players[1]}
            index={1}
            isDealer={dealer === 1}
            position="left"
            onReach={toggleReach}
            onWin={openWinMenu}
          />

          <div className="game-info">
            <h2>{wind}{kyoku}局</h2>
            <p>{honba}本場</p>
            <p>供託 {kyotaku}</p>
            <button type="button" onClick={openDrawMenu}>流局</button>
          </div>

          <PlayerPanel
            player={players[3]}
            index={3}
            isDealer={dealer === 3}
            position="right"
            onReach={toggleReach}
            onWin={openWinMenu}
          />
        </div>

        <PlayerPanel
          player={players[2]}
          index={2}
          isDealer={dealer === 2}
          position="bottom"
          onReach={toggleReach}
          onWin={openWinMenu}
        />
      </section>

      {winMenuOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="和了入力">
          <h2>和了入力</h2>
          <p>和了タイプ</p>
          <div className="button-row">
            <button className={selectedType === "t" ? "selected" : ""} type="button" onClick={() => selectType("t")}>ツモ</button>
            <button className={selectedType === "r" ? "selected" : ""} type="button" onClick={() => selectType("r")}>ロン</button>
          </div>

          {selectedType === "r" && (
            <SelectionGroup title="放銃者">
              {players.map((player, i) => (
                <button
                  className={selectedLoser === i ? "selected" : ""}
                  disabled={i === currentWinner}
                  key={player.code}
                  type="button"
                  onClick={() => setSelectedLoser(i)}
                >
                  {player.name}
                </button>
              ))}
            </SelectionGroup>
          )}

          {selectedType && (selectedType === "t" || selectedLoser !== null) && (
            <SelectionGroup title="翻数">
              {hanOptions.map((option) => (
                <button
                  className={selectedHan === option.value ? "selected" : ""}
                  key={option.value}
                  type="button"
                  onClick={() => selectHan(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </SelectionGroup>
          )}

          {selectedHan && selectedHan < 5 && (
            <SelectionGroup title="符数">
              {visibleFuOptions.map((fu) => (
                <button
                  className={selectedFu === fu ? "selected" : ""}
                  key={fu}
                  type="button"
                  onClick={() => setSelectedFu(fu)}
                >
                  {fu}符
                </button>
              ))}
            </SelectionGroup>
          )}

          <div className="modal-actions">
            <button disabled={!canConfirmWin} type="button" onClick={confirmWin}>確定</button>
            <button type="button" onClick={() => setWinMenuOpen(false)}>キャンセル</button>
          </div>
        </div>
      )}

      {drawMenuOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="流局">
          <h2>流局</h2>
          <p>聴牌者を選択してください</p>
          <div className="tempai-layout">
            {players.map((player, i) => (
              <button
                className={tempaiPlayers.includes(i) ? "selected" : ""}
                key={player.code}
                type="button"
                onClick={() => toggleTempai(i)}
              >
                {player.name}
              </button>
            ))}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={confirmDraw}>確定</button>
            <button type="button" onClick={() => setDrawMenuOpen(false)}>キャンセル</button>
          </div>
        </div>
      )}

      {resultOpen && (
        <div className="result-panel" role="dialog" aria-modal="true" aria-label="精算画面">
          <h2>精算画面</h2>
          {players.map((player) => (
            <div className="settlement-row" key={player.code}>
              <span className="name">{player.name}</span>
              <span className="score">{player.score}</span>
              <span className={`diff ${player.change >= 0 ? "plus" : "minus"}`}>
                {formatDiff(player.change)}
              </span>
            </div>
          ))}
          <button type="button" onClick={settle}>精算</button>
        </div>
      )}
    </main>
  );
}

function PlayerPanel({ player, index, isDealer, position, onReach, onWin }) {
  return (
    <div className={`player ${position} ${isDealer ? "dealer" : ""}`}>
      <div className="tile-mark" aria-hidden="true">{player.code}</div>
      <h2>{player.name}</h2>
      <p>{player.score}</p>
      <div className="player-actions">
        <button
          className={player.reached ? "selected" : ""}
          type="button"
          onClick={() => onReach(index)}
        >
          リーチ
        </button>
        <button type="button" onClick={() => onWin(index)}>
          和了
        </button>
      </div>
    </div>
  );
}

function SelectionGroup({ title, children }) {
  return (
    <div className="selection-group">
      <p>{title}</p>
      <div className="button-grid">{children}</div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
