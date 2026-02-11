import { createSlice } from "@reduxjs/toolkit";
import { plansApi } from "@services/career/plans/plans-api";

interface Level {
  _id?: string;
  levelName?: string;
  description?: string;
  skillLevel?: { skillId: string; text: string; _id: string; createdAt: string; updatedAt: string }[];
  createdAt: string;
  updatedAt: string;
  name?: string;
}
interface userPanelLevel {
  userId?: string;
  levelId?: string;
}

interface MatrixLevelState {
  levels: Level[];
  skills: Level[];
  userPlanLevel: userPanelLevel[];
}

const initialState: MatrixLevelState = {
  skills: [],
  levels: [],
  userPlanLevel: [],
};

function generateValidObjectId(): string {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const chars = "0123456789abcdef";
  let objectId = timestamp;

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    objectId += chars[randomIndex];
  }

  return objectId;
}

const slice = createSlice({
  name: "matrixLevel",
  initialState,
  reducers: {
    addLevel: (state, action) => {
      const { levelName, description } = action.payload;
      const _id = generateValidObjectId();
      state.levels.unshift({ _id, levelName, description, skillLevel: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    },
    updateLevel: (state, action) => {
      const { _id, levelName, description } = action.payload;
      const existingLevel = state?.levels?.find((level) => level._id === _id);
      if (existingLevel) {
        existingLevel.levelName = levelName;
        existingLevel.description = description;
        existingLevel.updatedAt = new Date().toISOString();
      }
    },
    addLevelExpectation: (state, action) => {
      const { levelId, text, skillId, _id: levelExpectationId } = action.payload;
      if (!levelExpectationId) {
        const _id = generateValidObjectId();
        const levelIndex = state.levels.findIndex((level) => level._id === levelId);
        state.levels[levelIndex]?.skillLevel?.push({
          _id,
          text,
          skillId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        const existingLevel = state?.levels?.find((level) => level._id === levelId);
        if (existingLevel) {
          const levelExpectation = existingLevel.skillLevel?.find((expectation: any) => expectation._id === levelExpectationId);
          if (levelExpectation) {
            levelExpectation.text = text;
            levelExpectation.updatedAt = new Date().toISOString();
          }
        }
      }
    },
    addSkill: (state, action) => {
      state.skills.unshift(action.payload);
    },
    setPlanLevel: (state, action) => {
      const { userId, levelId } = action.payload;
      const index = state?.userPlanLevel?.findIndex((item) => item.userId === userId);
      if (index !== -1) {
        state[index] = { userId, levelId };
      } else {
        state?.userPlanLevel?.push({ userId, levelId });
      }
    },
    resetMatix: (state) => {
      return {
        ...state,
        levels: [],
        userPlanLevel: [],
        skills: []
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(plansApi.endpoints.getSingleCareerPlan.matchFulfilled, (state, action) => {
      const data = action.payload?.data;
      state.skills = data.skills;
      state.levels = data.levels;
    });
  },
});

export const { addLevel, updateLevel, addSkill, addLevelExpectation, setPlanLevel, resetMatix } = slice.actions;
export const matrixLevelReducer = slice.reducer;
