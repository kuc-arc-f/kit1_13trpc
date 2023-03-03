import { writable } from 'svelte/store';

export const count = writable(0);

export const chatData = writable({name: ""});

export const showData = writable({});

const arr1: any[] = [];
export const arrData = writable(arr1);

