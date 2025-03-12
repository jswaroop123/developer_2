type Workout = {
  type: string;
  duration: number; 
  caloriesBurned: number;
  date: Date;
};

type User = {
  id: string;
  name: string;
  age: number;
  weight: number; 
  height: number; 
  workouts: Workout[];
};

const users = new Map<string, User>();


export function addUser(id: string, name: string, age: number, weight: number, height: number): void {
  if (users.has(id)) {
    throw new Error(`User with ID ${id} already exists.`);
  }

  if (!id || !name || age <= 0 || weight <= 0 || height <= 0) {
    throw new Error("Invalid user details. Ensure ID, name, age, weight, and height are valid.");
  }

  users.set(id, { id, name, age, weight, height, workouts: [] });
  console.log(`User '${name}' added with ID: ${id}`);
}


export function logWorkout(userId: string, workout: Workout): void {
  const user = users.get(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  if (!workout.type || workout.duration <= 0 || workout.caloriesBurned <= 0 || !workout.date) {
    throw new Error("Invalid workout details. Ensure type, duration, calories burned, and date are provided.");
  }

  user.workouts.push(workout);
  console.log(`Workout logged for user ID: ${userId}`);
}


export function getAllWorkoutsOf(userId: string): Workout[] {
  const user = users.get(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }
  return user.workouts;
}


export function getAllWorkoutsByType(userId: string, type: string): Workout[] {
  const user = users.get(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const filteredWorkouts = user.workouts.filter(workout => workout.type.toLowerCase() === type.toLowerCase());

  if (filteredWorkouts.length === 0) {
    console.warn( `No workouts of type '${type}' found for user ID: ${userId}`);
  }

  return filteredWorkouts;
}


export function getUsers(): User[] {
  return Array.from(users.values());
}


export function getUser(id: string): User {
  const user = users.get(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }
  return user;
}

export function updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
  const user = users.get(id);
  if (!user) {
    throw new Error(`User with ID ${id} not found.`);
  }

  // Validate updated fields
  if (updatedFields.age !== undefined && updatedFields.age <= 0) {
    throw new Error("Invalid age. Age should be greater than zero.");
  }
  if (updatedFields.weight !== undefined && updatedFields.weight <= 0) {
    throw new Error("Invalid weight. Weight should be greater than zero.");
  }
  if (updatedFields.height !== undefined && updatedFields.height <= 0) {
    throw new Error("Invalid height. Height should be greater than zero.");
  }

  Object.assign(user, updatedFields);
  console.log(`User ID ${id} updated successfully.`);
}