import { useMemo, createContext, useContext, type ReactNode } from 'react';
import { createAvatar } from '@dicebear/core';
import { notionistsNeutral } from '@dicebear/collection';
import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator';

export interface User {
    name: string;
    avatar: string;
}

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const user = useMemo(() => {
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

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): User => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
