import React, { useContext, useEffect, useState } from 'react';
import './TypingSpeed.css';
import Axios from 'axios';
import randomSentence from 'random-sentence';
import { store } from '../../store';

function TypingSpeed() {
  let [input, setinput] = useState('');
  const [sentance, setsantance] = useState(randomSentence().toLowerCase());
  const [time, setime] = useState(60);
  const [start, setStart] = useState(false);
  const [correct, setcorrect] = useState(0);
  const [incrt, setincrt] = useState(0);
  const [res, setres] = useState(0);

  const { state, dispatch } = useContext(store);
  const { user } = state;

  const handleKeyPress = (event) => {
    let char = sentance.charAt(0);
    if (time <= 0 || !start) return;
    let ele = document.querySelector('.typed');
    let tped;

    if (event.key === char) {
      if (event.key !== ' ') {
        tped = document.getElementById(event.key.toUpperCase());
        tped.classList.add('pressed');
        setTimeout(() => {
          tped.classList.remove('pressed');
          clearTimeout();
        }, 500);
      }
      ele.innerHTML += char;
      setsantance(sentance.substring(1));
      setcorrect(correct + 1);
    } else {
      setincrt(incrt + 1);
    }
    if (sentance.length === 15) {
      let sent = randomSentence().toLowerCase();
      setsantance(sentance + sent.replace(/[^a-z\s]/gi, ''));
    }
  };

  useEffect(() => {
    setsantance(sentance.replace(/[^a-z\s]/gi, ''));
    const updateScore = async (score) => {
      try {
        const name = user.user.name;
        const { data } = await Axios.put(
          `/typingspeed/addscore/${user.user._id}`,
          {
            score,
            name,
          }
        );
        dispatch({ type: 'TYPING_SPEED', payload: data });
      } catch (err) {
        alert(err);
      }
    };
    if (start) {
      setTimeout(() => {
        if (time >= 0) setime(time - 1);
      }, 1000);

      if (time <= 0) {
        let acuracy = ((correct - incrt) / correct) * 100;
        let speed = correct;
        let scr = (correct / sentance.length) * 60;
        scr += (correct - incrt) / 10;
        scr = Math.round(scr * 100) / 100;
        scr = Math.max(scr, 0);

        updateScore(scr);
        setres(scr);

        // setTimeout(() => {}, 2000);

        let ele = document.querySelector('.result');
        ele.style.display = 'block';
        var res_img = document.querySelector('.res_img');
        let res_sen = document.createElement('p');
        res_sen.className = 'resSen';
        let score = document.createElement('p');
        score.className = 'score';

        score.innerHTML = scr;

        if (acuracy > 80 && speed > (sentance.length * 4) / 3) {
          res_sen.innerHTML = 'Your typing speed is pretty good';
          res_img.src =
            'https://images-platform.99static.com//movXn3xNGsemCA_oV9_ePzQ0jGE=/0x0:1500x1500/fit-in/590x590/99designs-contests-attachments/141/141276/attachment_141276722';
        } else if (acuracy > 50 && speed > sentance.length / 2) {
          res_sen.innerHTML = 'Your Typing speed is nice & normal';
          res_img.src = '/images/deer.jpg';
        } else {
          res_sen.innerHTML = 'Your typing speed can be improved';
          res_img.src =
            'https://appadvice.com/cdn-cgi/mirage/515c3b625b3744c20fadd87a6030cef13258ceb8e82375aec952d9a51cc51390/1280/https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/bc/f6/72/bcf672c4-5c46-9bd5-f175-c2c5d141f226/source/256x256bb.jpg';
        }
        ele.appendChild(res_sen);
        ele.appendChild(score);
        setStart(false);
      }
    }
  }, [start, time]);

  return (
    <div className="Typing-speed">
      <div className="result">
        <img
          className="res_img"
          // src="https://images-platform.99static.com//movXn3xNGsemCA_oV9_ePzQ0jGE=/0x0:1500x1500/fit-in/590x590/99designs-contests-attachments/141/141276/attachment_141276722"
          alt=""
        ></img>
        <button
          className="start"
          onClick={() => {
            setStart(false);
            setres(0);
            setime(60);
            let ele = document.querySelector('.result');
            console.log(ele);
            ele.style.display = 'none';
          }}
        >
          Start
        </button>
      </div>
      <h1 className="title">Test your Typing Skill</h1>
      {start && (
        <div className="wrap">
          <div className="input-text">
            <input
              type="text"
              value=""
              onChange={(val) => {
                setinput((input += val.target.value));
              }}
              id="input"
              onKeyUp={handleKeyPress}
            />
            <span className="typed"></span>
            <div className="sentance">{sentance} </div>
          </div>
          <div className="Circular-Progress">{time}</div>
        </div>
      )}
      {!start && (
        <div>
          {' '}
          <button
            className="start"
            onClick={() => {
              setStart(true);
              setres(0);
              let ele = document.querySelector('.result');
              ele.style.display = 'none';
            }}
          >
            Start
          </button>{' '}
        </div>
      )}
      <div className="sub-title">Eyes on the screen</div>
      <div className="keyboard">
        <ul className="row row-0">
          <li className="pinky" id="esc">
            ESC
          </li>
          <li className="pinky" id="1">
            1
          </li>
          <li className="ring" id="2">
            2
          </li>
          <li className="middle" id="3">
            3
          </li>
          <li className="pointer1st" id="4">
            4
          </li>
          <li className="pointer2nd" id="5">
            5
          </li>
          <li className="pointer2nd" id="6">
            6
          </li>
          <li className="pointer1st" id="7">
            7
          </li>
          <li className="middle" id="8">
            8
          </li>
          <li className="ring" id="9">
            9
          </li>
          <li className="pinky" id="10">
            0
          </li>
          <li className="pinky">-</li>
          <li className="pinky">+</li>
          <li className="pinky" id="back">
            BACK
          </li>
        </ul>
        <ul className="row row-1">
          <li className="pinky" id="tab">
            TAB
          </li>
          <li className="pinky" id="Q">
            Q
          </li>
          <li className="ring" id="W">
            W
          </li>
          <li className="middle" id="E">
            E
          </li>
          <li className="pointer1st" id="R">
            R
          </li>
          <li className="pointer2nd" id="T">
            T
          </li>
          <li className="pointer2nd" id="Y">
            Y
          </li>
          <li className="pointer1st" id="U">
            U
          </li>
          <li className="middle" id="I">
            I
          </li>
          <li className="ring" id="O">
            O
          </li>
          <li className="pinky" id="P">
            P
          </li>
          <li className="pinky">[</li>
          <li className="pinky">]</li>
          <li className="pinky">\</li>
        </ul>
        <ul className="row row-2">
          <li className="pinky" id="caps">
            CAPS
          </li>
          <li className="pinky" id="A">
            A
          </li>
          <li className="ring" id="S">
            S
          </li>
          <li className="middle" id="D">
            D
          </li>
          <li className="pointer1st" id="F">
            F
          </li>
          <li className="pointer2nd" id="G">
            G
          </li>
          <li className="pointer2nd" id="H">
            H
          </li>
          <li className="pointer1st" id="J">
            J
          </li>
          <li className="middle" id="K">
            K
          </li>
          <li className="ring" id="L">
            L
          </li>
          <li className="pinky">:</li>
          <li className="pinky">''</li>
          <li className="pinky" id="enter">
            ENTER
          </li>
        </ul>
        <ul className="row row-3">
          <li className="pinky" id="shift">
            SHIFT
          </li>
          <li className="pinky" id="Z">
            Z
          </li>
          <li className="ring" id="X">
            X
          </li>
          <li className="middle" id="C">
            C
          </li>
          <li className="pointer1st" id="V">
            V
          </li>
          <li className="pointer2nd" id="B">
            B
          </li>
          <li className="pointer2nd" id="N">
            N
          </li>
          <li className="pointer1st" id="M">
            M
          </li>
          <li className="middle">,</li>
          <li className="ring">.</li>
          <li className="pinky">;</li>
          <li className="pinky" id="shift">
            SHIFT
          </li>
        </ul>
      </div>
      <div className="sub-title">Hands on the keyboard</div>
    </div>
  );
}

export default TypingSpeed;
