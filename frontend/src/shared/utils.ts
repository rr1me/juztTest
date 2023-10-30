export const combinedStyle = (condition: boolean, style: string) => condition ? ' ' + style : '';

export const delay = (t: number) => new Promise(x => setTimeout(x, t));

export const isNullOrEmpty = (s: string) => !s || !!s.match(/^ *$/);
