document.addEventListener("DOMContentLoaded", () => {
  const patientNameEl = document.getElementById("patient-name");
  const patientDetailsEl = document.getElementById("patient-details");
  const profilePicEl = document.getElementById("profile-picture");
  const ctx = document.getElementById("bloodPressureChart").getContext("2d");

  const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
  const AUTH_HEADER = {
    "Authorization": "Basic " + btoa("coalition:skills-test")
  };

  async function fetchPatientData() {
    try {
      const response = await fetch(API_URL, {
        headers: AUTH_HEADER
      });

      const data = await response.json();

      // Find Jessica Taylor in the response data
      const jessica = data.find(patient => patient.name === "Jessica Taylor");

      if (jessica) {
        // Populate basic patient details
        patientNameEl.textContent = jessica.name;
        profilePicEl.src = jessica.profile_picture;  // Display profile picture
        patientDetailsEl.innerHTML = `
          <p>Age: ${jessica.age}</p>
          <p>Gender: ${jessica.gender}</p>
          <p>Date of Birth: ${new Date(jessica.date_of_birth).toLocaleDateString()}</p>
          <p>Phone: ${jessica.phone_number}</p>
          <p>Emergency Contact: ${jessica.emergency_contact}</p>
          <p>Insurance: ${jessica.insurance_type}</p>
          <h3>Diagnosis History:</h3>
          ${jessica.diagnosis_history.map(item => `
            <p>
              ${item.month} ${item.year} - Blood Pressure: ${item.blood_pressure.systolic.value}/${item.blood_pressure.diastolic.value}<br>
              Heart Rate: ${item.heart_rate.value} (${item.heart_rate.levels})<br>
              Respiratory Rate: ${item.respiratory_rate.value} (${item.respiratory_rate.levels})<br>
              Temperature: ${item.temperature.value}°F (${item.temperature.levels})
            </p>
          `).join("")}
          <h3>Diagnostic List:</h3>
          <ul>
            ${jessica.diagnostic_list.map(diagnosis => `
              <li>
                <strong>${diagnosis.name}</strong>: ${diagnosis.description} (Status: ${diagnosis.status})
              </li>
            `).join("")}
          </ul>
          <h3>Lab Results:</h3>
          <ul>
            ${jessica.lab_results.map(lab => `
              <li>${lab}</li>
            `).join("")}
          </ul>
        `;

        // Render the blood pressure chart
        const bloodPressureData = jessica.diagnosis_history.map(entry => ({
          year: entry.year,
          systolic: entry.blood_pressure.systolic.value,
          diastolic: entry.blood_pressure.diastolic.value
        }));

        renderChart(bloodPressureData);
      } else {
        patientDetailsEl.textContent = "Patient not found.";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      patientDetailsEl.textContent = "Failed to load data.";
    }
  }

  function renderChart(bloodPressureData) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: bloodPressureData.map(entry => entry.year),
        datasets: [{
          label: "Systolic Blood Pressure",
          data: bloodPressureData.map(entry => entry.systolic),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
        {
          label: "Diastolic Blood Pressure",
          data: bloodPressureData.map(entry => entry.diastolic),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  fetchPatientData();
});
