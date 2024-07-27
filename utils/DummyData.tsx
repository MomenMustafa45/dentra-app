type DataType = {
  question: string;
  options: { index: string; title: string }[];
  correct_option: string;
};

export const data: DataType[] = [
  {
    question: "What should you do when approaching a yellow traffic light?",
    options: [
      { index: "A", title: "Speed up and cross the intersection quickly" },
      { index: "B", title: "Come to a complete stop" },
      { index: "C", title: "Slow down and prepare to stop" },
      { index: "D", title: "Ignore the light and continue driving" },
    ],
    correct_option: "C",
  },
  {
    question: "What does a red octagonal sign indicate?",
    options: [
      { index: "A", title: "Yield right of way" },
      { index: "B", title: "Stop and proceed when safe" },
      { index: "C", title: "Merge with traffic" },
      { index: "D", title: "No left turn allowed" },
    ],
    correct_option: "B",
  },
  {
    question: "What is the purpose of a crosswalk?",
    options: [
      { index: "A", title: "A designated area for parking" },
      { index: "B", title: "A place to stop and rest" },
      { index: "C", title: "A path for pedestrians to cross the road" },
      { index: "D", title: "A location for U-turns" },
    ],
    correct_option: "C",
  },
  {
    question: "What is the purpose of a crosswalk?",
    options: [
      { index: "A", title: "A designated area for parking" },
      { index: "B", title: "A place to stop and rest" },
      { index: "C", title: "A path for pedestrians to cross the road" },
      { index: "D", title: "A location for U-turns" },
    ],
    correct_option: "C",
  },
  {
    question: "What is the purpose of a crosswalk?",
    options: [
      { index: "A", title: "A designated area for parking" },
      { index: "B", title: "A place to stop and rest" },
      { index: "C", title: "A path for pedestrians to cross the road" },
      { index: "D", title: "A location for U-turns" },
    ],
    correct_option: "C",
  },
  {
    question: "What is the purpose of a crosswalk?",
    options: [
      { index: "A", title: "A designated area for parking" },
      { index: "B", title: "A place to stop and rest" },
      { index: "C", title: "A path for pedestrians to cross the road" },
      { index: "D", title: "A location for U-turns" },
    ],
    correct_option: "C",
  },
];
