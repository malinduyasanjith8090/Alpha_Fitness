import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import "./addWorkoutstatus.scss";

const AddCurrentWorkoutStatus = ({ onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    distance_Ran: "",
    no_of_Push_ups: "",
    no_of_Squats: "",
    no_of_Lunges: "",
    no_of_Planks: "",
    weight_Lifted: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure that the value is not negative before updating the state
    if (name === "distance_Ran" || name === "no_of_Push_ups" || name === "weight_Lifted" || name === "no_of_Squats" || name === "no_of_Lunges" || name === "no_of_Planks") {
      const newValue = Math.max(parseInt(value), 0); // Convert value to integer and take max with 0
      setFormData({ ...formData, [name]: newValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch existing workout records for the specified date
      const existingRecordResponse = await fetch(`http://localhost:8060/api/currentWorkoutStatus?date=${formData.date}`);
      const existingRecordData = await existingRecordResponse.json();

      // Check if there's any existing record for the specified date
      if (existingRecordData && existingRecordData.length > 0) {
        // If a record already exists for the date, show an error message
        Swal.fire({
          icon: "error",
          title: "You already added today's workout Status",
          text: "If you need to do any modifications update the existing workout status record",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK"
        });
      } else {
        // If no record exists for the date, proceed to save the new workout status
        const postResponse = await fetch("http://localhost:8060/api/currentWorkoutStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (postResponse.ok) {
          // Show success message upon successful submission
          Swal.fire({
            icon: "success",
            title: "Workout Status Added",
            text: "The workout status has been successfully recorded.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          }); 
          onClose(); // Close the modal
        } else {
          console.error("Failed to save workout status");
          // Show error message if failed to save the workout status
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to save the workout status. Please try again.",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK"
          });
        }
      }
    } catch (error) {
      console.error("Error saving workout status:", error);
      // Show error message for any unexpected error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while saving the workout status. Please try again later.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK"
      });
    }
  };
  
  return (
    <div className="Russa_Add_Current_Workout_Status">
      <div className="Russa_modal-overlay">
        <div className="Russa_modal-content">
          <button className="Russa_close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Add Today's Workouts Achievement</h1>
          <form onSubmit={handleSubmit}>
            <div className="user-input-box">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                readOnly // Make the input field read-only
              />
            </div>
            <div className="marking-row">
              <div className="user-input-box">
                <label htmlFor="distance_Ran">Distance Ran</label>
                <input
                  type="number"
                  id="distance_Ran"
                  name="distance_Ran"
                  placeholder="Enter distance ran"
                  value={formData.distance_Ran}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="no_of_Push_ups">Push-ups</label>
                <input
                  type="number"
                  id="no_of_Push_ups"
                  name="no_of_Push_ups"
                  placeholder="Enter number of push-ups"
                  value={formData.no_of_Push_ups}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="marking-row">
              <div className="user-input-box">
                <label htmlFor="weight_Lifted">Weight Lifted(.Kg)</label>
                <input
                  type="number"
                  id="weight_Lifted"
                  name="weight_Lifted"
                  placeholder="Enter weight lifted"
                  value={formData.weight_Lifted}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="no_of_Squats">Squats</label>
                <input
                  type="number"
                  id="no_of_Squats"
                  name="no_of_Squats"
                  placeholder="Enter number of Squats"
                  value={formData.no_of_Squats}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="marking-row">
              <div className="user-input-box">
                <label htmlFor="no_of_Lunges">Lunges</label>
                <input
                  type="number"
                  id="no_of_Lunges"
                  name="no_of_Lunges"
                  placeholder="Enter number of Lunges"
                  value={formData.no_of_Lunges}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="no_of_Planks">Planks(Seconds)</label>
                <input
                  type="number"
                  id="no_of_Planks"
                  name="no_of_Planks"
                  placeholder="Enter the number of seconds"
                  value={formData.no_of_Planks}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="user-input-box">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter workout description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-submit-btn">
              <input type="submit" value="Save Workout Record" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCurrentWorkoutStatus;
