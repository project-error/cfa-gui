import React, { useContext, createContext, useState } from 'react';

export const WizardContext = createContext<WizardProps>(undefined);

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
    const [project, setProject] = useState<ProjectObject | null>(null);
    const [steps, setSteps] = useState(1);

    const value = {
        project,
        setProject,
        steps,
        setSteps,
    };

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};

interface WizardProps {
    project: ProjectObject;
    setProject: (project: ProjectObject) => void;
    steps: number;
    setSteps: (step: number) => void;
}

type ProjectObject = {
    path: string | null;
    resource: string | null;
    author: string | null;
    version: string | null;
    description: string | null;
    templateType: string | null;
};
