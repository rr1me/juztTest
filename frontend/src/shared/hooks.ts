import { useRef } from 'react';

export const useDebounce = (f: (...args: unknown[]) => void, delay: number) => {
	const ref = useRef<NodeJS.Timeout | null>(null);

	return (...args: unknown[]) => {
		clearTimeout(ref.current!);
		ref.current = setTimeout(() => f(...args), delay);
	};
};

export const useIsFirstRender = () => {
	const ref = useRef(true);
	const isFirstRender = ref.current;
	ref.current = false;
	return isFirstRender;
};
