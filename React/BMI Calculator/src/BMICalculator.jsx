import React, { useState } from 'react'

export const BMICalculator = () => {
  let [height, setHeight] = useState("")
  let [weight, setWeight] = useState("")
  let [bmi, setBmi] = useState(null)
  let [bmiStatus, setBmiStatus] = useState("")
  let [errorMessage , setErrorMessage] = useState("")
  let handleHeight = (e) => {
    setHeight(e.target.value)
  }
  let handleWeight = (e) => {
    setWeight(e.target.value)
  }
  let calculateBmi = () => {
    let isValidHeight = /^\d+$/.test(height)
    let isValidWeight = /^\d+$/.test(weight)
    if (isValidHeight && isValidWeight) {
      let heightInMeters = height / 100;
      let bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if (bmiValue < 18.5) {
        setBmiStatus("underWeight")
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setBmiStatus("NormalWeight")

      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setBmiStatus("overWeight")

      } else {
        setBmiStatus("obisity")

      }
    } else {
      setBmi(null);
      setBmiStatus("")
      setErrorMessage("please enter numeric value for height and weight")
    }
  }
  let clearAll=()=>{
    setHeight("");
    setWeight("");
    setBmiStatus("");
    setBmi(null);
  }
  return (
    <>
      <div className="bmi-container">
        <div className="box"> </div>
        <div className="data">
          <h1>BMI-Calculator</h1>
          { errorMessage && <p className="error"> {errorMessage} </p>}
          <div className="input-container">
            <label htmlFor="height">Height(cm) </label>
            <input type="text" id="height" value={height} onChange={handleHeight} />
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight(kgs) </label>
            <input type="text" id="weight" value={weight} onChange={handleWeight} />
          </div>

          <button onClick={calculateBmi} >CalculateBMI</button>
          <button onClick={clearAll}>Clear</button>
         {bmi !==null &&  <div className="result">
            <p>Your BMI is: {bmi} </p>
            <p>Status:{bmiStatus} </p>
          </div>}

        </div>
      </div>


    </>
  )
}
