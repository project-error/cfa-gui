import React, { useContext, createContext, useState } from 'react';

export const WizardContext = createContext<WizardProps>(undefined);

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
    const [project, setProject] = useState<ProjectTypes>('TypeScript');

    const value = {
        project,
        setProject,
    };

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};

interface WizardProps {
    project: ProjectTypes;
    setProject: (type: ProjectTypes) => void;
}

type ProjectTypes = 'TypeScript' | 'JavaScript';
