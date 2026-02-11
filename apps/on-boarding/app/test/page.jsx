"use client";

import React, { useState, useEffect } from "react";

const initialData = {
  id: "",
  name: "",
  email: "",
  role: "",
  skill: "",
  skills: [],
};

//Candidate list page Logic

// const search = "";
// const candidates = [];

// let filteredCandidates = search
//   ? candidates.filter((candidate) => candidate.skills.includes(search))
//   : candidates;

//END Candidate List PAGE Logic

// function isValidName(name) {
//   const regex = /^[a-zA-Z0-9\s]+$/;
//   return regex.test(name);
// }

//HOME PAGE TOTAL CANDIDATES LOGIC:
// let totalCandidates = 0;
// let storedData = localStorage.getItem("candidates");
// if(storedData) {
//  storedData = JSON.parse(storedData);
//  totalCandidates = storedData.length;
// }

/*
import { BrowserRouter } from "react-router-dom";
<BrowserRouter>

</BrowserRouter>

*/

// In Home Page we Have Conditional Rendering of Nav Buttons

/* 
  import { Routes , Route } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Home from "./components/Home";
  import CandidateList from "./components/CandidateList";
  import CandidateRegistration from "./components/CandidateRegistration";

  <Navbar/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/candidate/list" element={<CandidateList />} />
    <Route path="/candidate/registration" element={<CandidateRegistration />} />
  </Routes>; 
  */

function Test() {
  const [formData, setFormData] = useState(initialData);
  const [candidates, setCandidates] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Handle OnChange Input Fields Start
  const handleFormData = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };
  // Handle OnChange Input Fields End

  // Handle Add Skills
  const handleSkills = () => {
    setFormData((pre) => ({
      ...pre,
      skill: "",
      skills: [...pre.skills, formData.skill],
    }));
  };

  //Handle Reset
  const handleReset = () => {
    setFormData(initialData);
  };

  // Helper Functions Start
  const isEmailExist = () => {
    const isEmailFound = candidates.find(
      (item) => item.email === formData.email
    );
    return isEmailFound;
  };
  const isSkillButtonDisabled = () => {
    return !formData.skill || formData.skills.length >= 5;
  };
  const isSubmitButtonDisabled = () => {
    return (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      formData.skills.length === 0
    );
  };
  // Helper Functions End

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidName(formData.name)) {
      alert("Name Must Be Valid String");
      return;
    }
    if (!isValidName(formData.role)) {
      alert("Role Must Be Valid String");
      return;
    }

    if (isEmailExist()) {
      setRegistrationStatus("Email already exists");
      return;
    } else {
      delete formData.skill;
      setCandidates((pre) => [
        ...pre,
        { ...formData, id: candidates.length + 1 },
      ]);
      setRegistrationStatus("Candidate profile created");
    }
    handleReset();
  };

  useEffect(() => {
    if (candidates.length > 0) {
      localStorage.setItem("candidates", JSON.stringify(candidates));
    }
  }, [candidates]);

  useEffect(() => {
    const storedData = localStorage.getItem("candidates");
    if (storedData) {
      setCandidates(JSON.parse(storedData));
    }
  }, []);

  return (
    <form
      data-testid="registration-form"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "400px",
          height: "50vh",
          rowGap: "2rem",
        }}
      >
        <input
          data-testid="form-input-name"
          type="text"
          name="name"
          id="name"
          required
          onChange={handleFormData}
          value={formData.name}
          placeholder="name"
        />
        <input
          data-testid="form-input-email"
          type="email"
          name="email"
          id="email"
          required
          onChange={handleFormData}
          value={formData.email}
          placeholder="email"
        />
        <input
          data-testid="form-input-role"
          type="text"
          name="role"
          id="role"
          required
          onChange={handleFormData}
          value={formData.role}
          placeholder="role"
        />
        <div>
          <input
            data-testid="form-input-skill"
            type="text"
            name="skill"
            id="skill"
            onChange={handleFormData}
            value={formData.skill}
            placeholder="skill"
          />
          <button
            data-testid="add-btn"
            onClick={handleSkills}
            disabled={isSkillButtonDisabled()}
            type="button"
          >
            Add Skill
          </button>
        </div>
        <div>
          {formData.skills.map((item, index) => (
            <div
              data-testid="skill-tag"
              key={index}
              style={{ border: "1px solid red" }}
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <button
            data-testid="submit-btn"
            type="submit"
            disabled={isSubmitButtonDisabled()}
          >
            Submit
          </button>
          <button data-testid="reset-btn" onClick={handleReset} type="button">
            Reset
          </button>
          {registrationStatus && (
            <div data-testid="alertMessage">{registrationStatus}</div>
          )}
        </div>
      </div>
    </form>
  );
}

export default Test;
