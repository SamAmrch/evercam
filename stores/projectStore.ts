import { defineStore } from "pinia";

interface Project {
  id: number;
  exid: string;
  name: "The Great Project",
  status: "In Progress",
  started_at: "2019-03-27T05:04:07.000000Z",
  feature_flags: [
    "gate_report",
    "drone_view"
    ],
 cameras_count: number;
}