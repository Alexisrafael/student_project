import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import Section1 from "./Section1";
import Section2 from "./Section2"
import Section3 from "./Section3"
import Section4 from './section4';
//import { useSelector } from 'react-redux';

export default function Home() {
  const [activeSection, setActiveSection] = useState("section1");
  //const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar setActiveSection={setActiveSection} />
      <div id="content">
        {activeSection === "section1" && <Section1 />}
        {activeSection === "section2" && <Section2 />}
        {activeSection === "section3" && <Section3 />}
        {activeSection === "section4" && <Section4 />}
      </div>
    </>
    
  );
}