// src/pages/Section3.jsx
import React, { useState, useEffect } from "react";

export default function Section3() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  // Función que inicia o reinicia el juego
  const comenzar = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const sum = a + b;

    setNum1(a);
    setNum2(b);
    setSelected(null);
    setMessage("");

    // Posición aleatoria de la respuesta correcta
    const correctIndex = Math.floor(Math.random() * 3);
    const opts = [];
    for (let i = 0; i < 3; i++) {
      if (i === correctIndex) opts.push(sum);
      else opts.push(sum + (i === 0 ? 1 : -1));
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
  };

  // Se ejecuta al montar el componente
  useEffect(() => {
    comenzar();
  }, []);

  const controlarRespuesta = (value) => {
    setSelected(value);
    const sum = num1 + num2;
    if (value === sum) {
      setMessage("¡EXCELENTE!");
      setTimeout(comenzar, 2000);
    } else {
      setMessage("¡UPS, intenta de nuevo!");
      setTimeout(() => {
        setSelected(null);
        setMessage("");
      }, 2000);
    }
  };

  return (
    <section id="section3" className="content-section fondo" style={{ background: "linear-gradient(to bottom, #5FAFE9 25%, #A11AF0 50%, #FC3ECC 75%)" }}>
      <h1 className="texto-degradado" style={{ padding: "2%" }}>Juego de Sumas</h1>
      <div className="container sum_court" style={{ padding: "2%" }}>
        <div className="izquierdo">
          <div className="container-operacion">
            <span style={{fontSize: "60px"}}>{num1} + {num2}</span> <span style={{fontSize: "60px"}}>=</span>  <span className="resultado" style={{fontSize: "60px"}}>{selected ?? "?"}</span>
          </div>
          {message && <span className="msj">{message}</span>}
        </div>
        <div className="derecha">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="opcion"
              onClick={() => controlarRespuesta(opt)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}