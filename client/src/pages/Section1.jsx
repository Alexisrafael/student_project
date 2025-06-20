import React from 'react';

export default function Section1() {
  return (
    <>
      {/* Sección 1 – Página de Inicio */}
        <section
          id="section1"
          className="background-home content-section"
          style={{
            display: "block",
            padding: "2%",
            background:
              "linear-gradient(to bottom, rgb(95, 171, 233) 25%, rgb(161, 26, 240) 50%, rgb(252, 62, 204) 75%)",
          }}
        >
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="border-bottom" style={{ padding: "1%" }}>
              <h1 className="montserrat" style={{ fontSize: "3.5rem" }}>
                ¡Pequeños exploradores!
              </h1>
            </div>

            <p className="texto" style={{ padding: "3%", fontSize: "1.6rem", textAlign: "center" }}>
              Descubran una nueva forma de aprender jugando.
              <br />
              <br />
              Ésta plataforma está diseñada para transformar el aprendizaje de los niños en una experiencia divertida y emocionante.
              <br />
              <br />
              Con juegos interactivos y personajes amigables, los niños pueden aprender letras y números mientras se divierten.
            </p>

            <h4 className="que_papel" style={{ fontSize: "1.4rem", textAlign: "center", padding: "1%" }}>
              ¿Qué papel importante juega esta página para el aprendizaje de tus niños?
            </h4>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "2%" }}>
                <img className='img_shadow' style={{ width: "486px" }} src="./img/home/img_monster_inc.png" alt="" />
                <p className="babas-estatico" style={{ fontSize: "1.875rem", padding: "5%" }}>
                  Fomenta una base sólida: <span className="destacado"> Ayuda a los niños a desarrollar las habilidades de lectura y escritura, así como el pensamiento matemático.</span>
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p className="babas-estatico" style={{ fontSize: "1.875rem", padding: "5%" }}>
                  Despierta la curiosidad: <span className="destacado"> Estimula el interés por el aprendizaje y la exploración a través de juegos.</span>
                </p>
                <img className='img_shadow' style={{ width: "250px" }} src="./img/home/img_doki.png" alt="" />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <img className='img_shadow' style={{ width: "318px" }} src="./img/home/img_exploradores_aprendiendo.png" alt="" />
                <p className="babas-estatico" style={{ fontSize: "1.875rem", padding: "5%" }}>
                  Desarrolla habilidades cognitivas: <span className="destacado"> Mejora la memoria, atención y resolución de problemas.</span>
                </p>
              </div>
            </div>

            <p className="destacado" style={{ fontSize: "1.375rem", margin: "2rem 0" }}>
              "El aprendizaje es un juego, ¡descúbrelo con nosotros!"
            </p>
          </div>
        </section>
      </>
  );
}