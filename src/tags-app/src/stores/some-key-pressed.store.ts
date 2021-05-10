import type { Readable, Subscriber} from 'svelte/store';
import { readable } from 'svelte/store';

export const someKeyPressed: (keys: string | string[]) => Readable<boolean>
    = (keys: string | string[]) => readable<boolean>(false, (set: Subscriber<boolean>) => {
            keys = Array.isArray(keys) ? keys : [keys];
            const observedKeys: Map<string, boolean> = new Map(
                keys.map((key: string) => [key, false])
            );
            const updateValue: () => void
                = () => set(
                    Array.from(observedKeys.values())
                        .some((value: boolean) => value)
                );
            const handleKeydown: (event: KeyboardEvent) => void
                = (event: KeyboardEvent) => {
                    if (observedKeys.has(event.key)) {
                        observedKeys.set(event.key, true);
                        updateValue();
                    }
                };
            const handleKeyup: (event: KeyboardEvent) => void
                = (event: KeyboardEvent) => {
                    if (observedKeys.has(event.key)) {
                        observedKeys.set(event.key, false);
                        updateValue();
                    }
                };

            window.addEventListener('keydown', handleKeydown);
            window.addEventListener('keyup', handleKeyup);

            return () => {
                window.removeEventListener('keydown', handleKeydown);
                window.removeEventListener('keyup', handleKeyup);
            };
        });
