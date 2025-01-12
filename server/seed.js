import mongoose from 'mongoose';
import config from './config/config.js';
import Question from './models/Question.js';

const sampleQuestions = [
    {
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      text: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare"
    },
    {
      text: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean"
    },
    {
      text: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Gold", "Silver"],
      correctAnswer: "Oxygen"
    },
    {
      text: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8"
    },
    {
      text: "Who painted the 'Mona Lisa'?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      text: "What is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      correctAnswer: "Nile River"
    },
    {
      text: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
      correctAnswer: "Japan"
    },
    {
      text: "Who discovered penicillin?",
      options: ["Alexander Fleming", "Marie Curie", "Isaac Newton", "Albert Einstein"],
      correctAnswer: "Alexander Fleming"
    }
  ];
  

export async function seedDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

