type Workout = {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
  };
  
  type User = {
    id: string;
    name: string;
    age: number;
    weight: number; // in kg
    height: number; // in cm
    workouts: Workout[];
  };
  
  const users = new Map<string, User>();
  
  export function addUser(id: string, name: string, age: number, weight: number, height: number): void {
    if (users.has(id)) {
      throw new Error(`User with ID ${id} already exists.`);
    }
    if (!name || age <= 0 || weight <= 0 || height <= 0) {
      throw new Error("Invalid user details provided.");
    }
  
    users.set(id, { id, name, age, weight, height, workouts: [] });
  }
  
  export function logWorkout(userId: string, workout: Workout): void {
    const user = users.get(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    if (!workout.type || workout.duration <= 0 || workout.caloriesBurned <= 0) {
      throw new Error("Invalid workout details.");
    }
  
    user.workouts.push(workout);
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
    return user.workouts.filter(workout => workout.type === type);
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
  
    Object.assign(user, updatedFields);
  }
  