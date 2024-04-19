import { Zadatak } from "./zadatak";

export interface TodoList{
    id: number;
    title: string;
    tag: string;
    listItems: [Zadatak];
}