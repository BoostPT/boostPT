import {error, success} from "../../log";
import {hashPassword} from "../../../middleware/auth/bcrypt";
import db from "../../../config/database";

export const addUserDummyData = async () => {

  const hashedPassword = await hashPassword('password');

  try {
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'gus@cheesemail.com'}', '${'gus'}', '${hashedPassword}', '${'true'}')`
    );
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'aaron@gmail.com'}', '${'AaronMelendez'}', '${hashedPassword}', '${'false'}')`
    );
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'jakecbarber@gmail.com'}', '${'jake'}', '${hashedPassword}', '${'false'}')`
    );
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'vijuhas@gmail.com'}', '${'david'}', '${hashedPassword}', '${'true'}')`
    );
    await db.query(
      `INSERT INTO users (email, username, password, istrainer) VALUES ('${'zach@gallagher.com'}', '${'zgallagher'}', '${hashedPassword}', '${'true'}')`
    );
    success('successfully seeded users table');
  } catch (err) {
    error('error adding dummy user', err);
  }
};

export const addWorkoutDummyData = async () => {
  try {
    await db.query(
      `INSERT INTO workouts (name, creator_id, is_public) VALUES ('${'Cardio Workout'}', '${'2'}', '${'true'}')`
    );
    await db.query(
      `INSERT INTO exercises (name, description, type, distance) VALUES ('${'Stair Master'}', '${'Difficulty set to 6'}', '${'2'}', '${'10 flights'}')`
    );
    await db.query(
      `INSERT INTO exerciseWorkout (exercise_id, workout_id, order_index) VALUES ('${'1'}', '${'1'}', '${'0'}')`
    );
    success('successfully seeded users table');
  } catch (err) {
    error('error adding dummy user', err);
  }
};

export const addTrainerClientNonUserDummyData = async () => {
  try {
    await db.query(
      `INSERT INTO trainerClientNonUser (trainer_id, client_name) 
      VALUES 
      ('${1}', '${'David_Johnson'}'),
      ('${1}', '${'Pete_Matthews'}'),
      ('${1}', '${'Sally_Fuller'}'),
      ('${1}', '${'Phillip_Phillips'}'),
      ('${1}', '${'John_Smith'}'),
      ('${1}', '${'James_Johnson'}')`
    );
    success('successfully seeded trainerClientNonUser table');
  } catch (err) {
    error('error adding dummy non user client', err);
  }
};