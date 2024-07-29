import { Data } from "@/components/DropdownList/DropdownList";

type DataType = {
  question: string;
  options: { index: string; title: string }[];
  correct_option: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  score: number;
  phoneNumber: string;
  level: { id: number; title: string; value: string };
  university: { id: number; title: string; value: string };
};

// Users
export const Users: User[] = [
  {
    id: 1,
    name: "مؤمن مصطفي",
    email: "momen@gmail.com",
    password: "123456",
    score: 0,
    phoneNumber: "0124578652",
    level: { id: 1, title: "المستوي الاول", value: "1" },
    university: { id: 2, title: "جامعة الازهر", value: "option 2" },
  },
  {
    id: 2,
    name: "Mustafa",
    email: "Mm@mm.com",
    password: "12345678",
    phoneNumber: "+201127078911",
    score: 0,
    level: { id: 1, title: "المستوي الاول", value: "1" },
    university: { id: 2, title: "جامعة الازهر", value: "option 2" },
  },
  {
    id: 4,
    email: "Mm@mm.com",
    name: "Mustafa",
    password: "12345678",
    phoneNumber: "+201127078911",
    score: 0,
    level: { id: 2, title: "المستوي الثاني", value: "2" },
    university: { id: 4, title: "جامعهة عين شمس", value: "option 4" },
  },
];

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

// Universities

export const universities: Data[] = [
  { id: 1, title: "جامعة بني سويف الحكومية / الأهلية", value: "option 1" },
];

// Levels

export const levels = [
  { id: 1, value: "1", title: "المستوي الاول" },
  { id: 2, value: "2", title: "المستوي الثاني" },
  { id: 3, value: "3", title: "المستوي الثالث" },
  { id: 4, value: "4", title: "المستوي الرابع" },
  { id: 5, value: "5", title: "المستوي الخامس" },
];
