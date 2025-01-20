import { create } from "zustand";
import { persist } from "zustand/middleware";
import { timeToZero } from "@/lib/utils";
import P90xWorkouts from "@/workouts/P90xWorkouts";
import P90x3Workouts from "@/workouts/P90x3Workouts";
import Rest from "@/workouts/Rest";

const initialState = {
  currentDate: timeToZero(new Date()).toISOString(),
  currentUser: "defaultUser",
  exercisesByDate: {},
  savedWorkouts: {
    ...P90xWorkouts,
    ...P90x3Workouts,
    ...Rest,
  },
  workoutNames: {},
  currentPage: "workout",
};

const useAppStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      setCurrentDate: (date) =>
        set({ currentDate: timeToZero(date).toISOString() }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setExercisesByDate: (exercises) => set({ exercisesByDate: exercises }),
      removeExerciseFromDate: (key) => {
        const { currentUser, currentDate, exercisesByDate } = get();
        const userExercises = exercisesByDate[currentUser] || {};
        const dateExercises = userExercises[currentDate] || [];

        const updatedExercises = dateExercises.filter(
          (exercise) => exercise.key !== key
        );

        set({
          exercisesByDate: {
            ...exercisesByDate,
            [currentUser]: {
              ...userExercises,
              [currentDate]: updatedExercises,
            },
          },
        });
      },
      setSavedWorkouts: (workouts) => set({ savedWorkouts: workouts }),
      saveWorkout: (name) => {
        const { currentUser, savedWorkouts, currentDate, exercisesByDate } =
          get();
        const userExercises = exercisesByDate[currentUser] || {};
        const dateExercises = userExercises[currentDate] || [];

        set({
          savedWorkouts: {
            ...savedWorkouts,
            [name]: { exercises: dateExercises, name },
          },
        });
      },
      deleteWorkout: (name) => {
        const { savedWorkouts } = get();
        const updatedWorkouts = { ...savedWorkouts };
        delete updatedWorkouts[name];
        set({ savedWorkouts: updatedWorkouts });
      },
      loadWorkout: (name) => {
        const { currentUser, savedWorkouts, exercisesByDate } = get();
        const dateExercises = savedWorkouts[name] || [];
        if (dateExercises.length === 0) return;

        set({
          exercisesByDate: {
            ...exercisesByDate,
            [currentUser]: {
              ...exercisesByDate[currentUser],
              [currentDate]: dateExercises,
            },
          },
        });
      },
      setWorkoutNames: (names) => set({ workoutNames: names }),
      setCurrentPage: (page) => set({ currentPage: page }),
      resetState: () => {
        set(initialState);
      },
    }),
    {
      name: "workoutAppData",
      getStorage: () => localStorage,
    }
  )
);

export default useAppStore;
