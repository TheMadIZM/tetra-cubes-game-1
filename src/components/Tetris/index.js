import React, { useRef, useEffect, useCallback, useState } from "react";
import cn from "bem-cn-lite";
import { Col, Row } from "react-bootstrap";
import { Cube } from "../../pages/ChooseCubePage/ChooseCubePage";

import TetrisCanvas from "./TetrisCanvas/TetrisCanvas";
import TetrisControllers from "./TetrisControllers/TetrisControllers";
import ClassicTetris from "../../units/tetris/classic-tetris";

import { LIGHT_GRAY, DARK_GRAY } from "../../constants";

import "./index.scss";

const b = cn("tetris");

function loadFont() {
  const tetrisFont = new FontFace(
    "tetris-font",
    "url(./files/press-start-2p-cyrillic-ext-400-normal.woff2)"
  );

  tetrisFont
    .load()
    .then((font) => {
      document.fonts.add(font);
      console.log("Font loaded");
    })
    .catch((e) => console.log(e));
}

function Tetris(props) {
  const tetris = useRef(null);
  const [level, setLevel] = useState(5);
  const [isStarted, setIsStarted] = useState(false);
  const { cube, colors, onChangeCube } = props;

  const onGameOver = useCallback(() => {
    setIsStarted(false);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");

    const tetrisConfig = {
      ...colors,
      borderColor: LIGHT_GRAY,
      gridColor: "transparent",
      tetrisBackgroundColor: "transparent",
      backgroundColor: "transparent",
      canvasFont: '17px "Press Start 2P"',
      canvasFontColor: DARK_GRAY,
      ghostColor: [LIGHT_GRAY, "transparent"],
      gameOverColor: ["#fff", LIGHT_GRAY],
    };

    tetris.current = new ClassicTetris(canvas, tetrisConfig);

    tetris.current.on(ClassicTetris.GAME_OVER, onGameOver);

    return () => {
      tetris.current.off(ClassicTetris.GAME_OVER, onGameOver);
    };
  }, [colors, level]);

  const onStart = useCallback(() => {
    tetris.current.setStartLevel(level);
    tetris.current.togglePlayPause();
    setIsStarted(true);
  }, [level]);

  const onQuit = useCallback(() => {
    tetris.current.quit();
    setIsStarted(false);
  }, []);

  return (
    <div className={b()}>
      <Row xs="auto">
        <Col>
          <TetrisCanvas />
          <TetrisControllers
            onStart={onStart}
            onQuit={onQuit}
            onChangeCube={onChangeCube}
            isStarted={isStarted}
            onChangeLevel={setLevel}
            level={level}
            className={b("controllers")}
          />
        </Col>
        <Col>
          <div className={b("cube-info")}>
            <span className="text-secondary">Chosen cube</span>
            <Cube {...cube} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Tetris;
