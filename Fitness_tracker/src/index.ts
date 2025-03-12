import {
    addUser,
    logWorkout,
    getAllWorkoutsOf,
    getAllWorkoutsByType,
    getUsers,
    getUser,
    updateUser
} from './fitness';

addUser("1","yogananda",25,59,5.4);
addUser("2","mohan",22,50,5.7);
addUser("3","mahesh",21,45,5.9);

logWorkout("1", { type: "running", duration: 30, caloriesBurned: 300, date: new Date() });
logWorkout("2", { type: "yoga", duration: 45, caloriesBurned: 150, date: new Date() });
logWorkout("3", { type: "cycling", duration: 60, caloriesBurned: 500, date: new Date() });
logWorkout("3", { type: "gym", duration: 60, caloriesBurned: 800, date: new Date() });

console.log(getUser("1")); 

console.log(getAllWorkoutsOf("1")); 

console.log(getAllWorkoutsByType("1", "yoga")); 

updateUser("1", { weight: 64, height: 169 });
console.log(getUser("1")); 

console.log(JSON.stringify(getUsers(), null, 2));
