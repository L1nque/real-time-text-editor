import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { notionistsNeutral } from '@dicebear/collection';
import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';

export interface User {
    name: string;
    avatar: string;
}

export const useUser = (): User => {
    return useMemo(() => {
        const name = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            length: 2,
            separator: '-',
            style: 'capital',
        });

        const avatar = createAvatar(notionistsNeutral, {
            seed: name,
        }).toDataUri();

        return {
            name,
            avatar,
        };
    }, []);
};
