// src/pages/Section2.jsx
import React from "react";

export default function Section2() {
  return (
    <section id="section2" className="content-section fondo">
      <h1 className="texto-degradado">Aprendiendo las letras y los números</h1>

      <div className="letras-numeros">
        <h2 className="texto-degradado">CONOCIENDO LAS LETRAS</h2>
        <div className="grid-letters">
          {[
            ["A", "img_abeja.png", "hsl(114,100%,50%)", "ABEJA"],
            ["B", "img_buho.png", "hsl(245,100%,50%)", "BUHO"],
            ["C", "img_conejo.png", "hsl(28,100%,50%)", "CONEJO"],
            ["D", "img_delfin.png", "hsl(339,100%,50%)", "DELFIN"],
            ["E", "img_elefante.png", "hsl(128,100%,50%)", "ELEFANTE"],
            ["F", "img_foca.png", "hsl(154,100%,50%)", "FOCA"],
            ["G", "img_gato.png", "hsl(323,100%,50%)", "GATO"],
            ["H", "img_hipopotamo.png", "hsl(296,100%,50%)", "HIPOPOTAMO"],
            ["I", "img_iguana.png", "hsl(53,100%,50%)", "IGUANA"],
            ["J", "img_jirafa.png", "hsl(14,100%,50%)", "JIRAFA"],
            ["K", "img_koala.png", "hsla(295,100%,50%,0.64)", "KOALA"],
            ["L", "img_loro.png", "hsl(245,87%,35%)", "LORO"],
            ["M", "img_mapache.png", "hsl(290,28%,51%)", "MAPACHE"],
            ["N", "img_nutria.png", "hsl(293,80%,25%)", "NUTRIA"],
            ["Ñ", "img_ñandu.png", "hsl(64,93%,65%)", "ÑANDU"],
            ["O", "img_oso.png", "hsl(171,100%,50%)", "OSO"],
            ["P", "img_perro.png", "hsl(36,79%,52%)", "PERRO"],
            ["Q", "img_quetzal.png", "hsl(140,53%,53%)", "QUETZAL"],
            ["R", "img_rana.png", "hsl(322,100%,50%)", "RANA"],
            ["S", "img_serpiente.png", "hsl(309,53%,65%)", "SERPIENTE"],
            ["T", "img_topo.png", "hsla(2,96%,50%,0.84)", "TOPO"],
            ["U", "img_unicornio.png", "hsla(277,100%,50%,0.68)", "UNICORNIO"],
            ["V", "img_venado.png", "hsl(41,41%,36%)", "VENADO"],
            ["W", "img_wilsonosaura.png", "hsl(133,47%,49%)", "WILSONOSAURA"],
            ["X", "img_xenartra.png", "hsl(65,54%,63%)", "XENARTRA"],
            ["Y", "img_yegua.png", "hsl(1,57%,53%)", "YEGUA"],
            ["Z", "img_zorro.png", "hsl(26,88%,51%)", "ZORRO"],
          ].map(([letter, img, color, word]) => (
            <div key={letter} className="agrandar-div style-margin">
              <img src={`/img/seccion_1/${img}`} alt={word} />
              <label>
                <b style={{ color, fontSize: "60px" }}>{letter}</b>
                <b style={{ fontSize: "18px" }}>{word}</b>
              </label>
            </div>
          ))}
        </div>

        <h2 className="texto-degradado">CONOCIENDO LOS NÚMEROS</h2>
        <div className="grid-numbers">
          {["uno", "dos", "tres", "cuatro-", "cinco", "seis", "siete", "ocho", "nueve", "diez"].map((num) => (
            <div key={num} className="agrandar-div style-margin">
              <img src={`/img/seccion_1/img.${num}.png`} alt={num} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
