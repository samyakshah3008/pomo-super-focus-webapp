"use client";

import { userId } from "@/constants/user";
import {
  createGoalService,
  deleteGoalService,
  getGoalsService,
  updateGoalService,
} from "@/services/goals/goal";
import { useEffect, useState } from "react";

const MyGoal = () => {
  const [goalsList, setGoalsList] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: "", description: "" });
  const [updateGoalObj, setUpdateGoalObj] = useState({
    title: "",
    description: "",
  });

  const goalValueInputChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const createNewGoalClickHandler = () => {
    createNewGoal();
  };

  const updateGoalChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setUpdateGoalObj({ ...updateGoalObj, [name]: value });
  };

  const updateGoalClickHandler = () => {
    updateGoal();
  };

  const deleteGoalClickHandler = (goalId: string) => {
    deleteGoal(goalId);
  };

  const getGoals = async () => {
    const payload = { userId: userId };
    try {
      const response = await getGoalsService(payload);
      const {
        data: {
          data: { goalsList },
        },
      } = response;
      setGoalsList(goalsList);
    } catch (error) {
      console.error(error, "something went wrong");
    }
  };

  const createNewGoal = async () => {
    const payload = { userId: userId, goalDetails: { ...newGoal } };
    try {
      const response = await createGoalService(payload);
    } catch (error) {
      console.error(error, "something went wrong goal while creating goal");
    } finally {
      getGoals();
    }
  };

  const updateGoal = async () => {
    const payload = {
      userId,
      goalDetails: { goalId: "66955bc4c20c14ab396185f3", ...updateGoalObj },
    };
    try {
      const response = await updateGoalService(payload);
    } catch (error) {
      console.error(error, "something went wrong while updating a goal");
    } finally {
      getGoals();
    }
  };

  const deleteGoal = async (goalId: string) => {
    const payload = { goalId };
    try {
      const response = await deleteGoalService(payload);
    } catch (error) {
      console.error(error, "something went wrong while deleting goal");
    } finally {
      getGoals();
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div>
      <div>Add your top 10 goals</div>

      <div>Your goals</div>

      {goalsList?.length ? (
        goalsList.map((goal: any, index) => {
          return (
            <div style={{ border: "2px solid black", width: "100%" }}>
              <div key={goal?._id}>{goal?.title}</div>
              <button onClick={() => deleteGoalClickHandler(goal?._id)}>
                Delete me
              </button>
            </div>
          );
        })
      ) : (
        <div>Get started by creating your goals today! </div>
      )}

      <button>Create a goal: </button>
      <input
        name="title"
        value={newGoal.title}
        onChange={goalValueInputChangeHandler}
        style={{ border: "2px solid black" }}
        placeholder="Title"
      />
      <br />
      <input
        name="description"
        value={newGoal.description}
        onChange={goalValueInputChangeHandler}
        style={{ border: "2px solid black" }}
        placeholder="Description"
      />
      <button onClick={createNewGoalClickHandler}>Submit</button>

      <div>Update a goal</div>
      <div>
        <input
          name="title"
          onChange={updateGoalChangeHandler}
          value={updateGoalObj.title}
          style={{ border: "2px solid black" }}
        />
        <input
          name="description"
          onChange={updateGoalChangeHandler}
          style={{ border: "2px solid black" }}
          value={updateGoalObj.description}
        />
        <button onClick={updateGoalClickHandler}>Update goal</button>
      </div>
    </div>
  );
};

export default MyGoal;
