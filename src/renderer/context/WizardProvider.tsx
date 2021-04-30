import React, { createContext, useState } from 'react';

export const WizardContext = createContext<WizardProps>(undefined);

export const WizardProvider = ({ children }: { children: React.ReactNode }) => {
    const [resourcePath, setResourcePath] = useState('');
    const [resourceName, setResourceName] = useState('');
    const [resourceAuthor, setResourceAuthor] = useState('');
    const [resourceTemplate, setResourceTemplate] = useState<CFATemplate>({
        title: '',
        description: '',
        thumbnail: '',
        package: '',
    });
    const [resourceVersion, setResourceVersion] = useState('');
    const [resourceDescription, setResourceDescription] = useState('');
    const [resourcePackages, setResourcePackages] = useState([]);

    const [error, setError] = useState<null | string>(null);

    const [steps, setSteps] = useState(1);

    const value = {
        steps,
        setSteps,
        error,
        setError,
        resourcePath,
        resourceName,
        resourceAuthor,
        resourcePackages,
        resourceVersion,
        resourceTemplate,
        resourceDescription,
        setResourcePath,
        setResourceName,
        setResourceAuthor,
        setResourceVersion,
        setResourceTemplate,
        setResourceDescription,
        setResourcePackages,
    };

    return (
        <WizardContext.Provider value={value}>
            {children}
        </WizardContext.Provider>
    );
};

export interface CFATemplate {
    title?: string;
    description?: string;
    thumbnail?: string;
    package: string;
}

interface WizardProps {
    steps: number;
    setSteps: (step: number) => void;
    error: string | null;
    setError: (error: string) => void;

    // Resource related state
    resourcePath: string;
    resourceName: string;
    resourceAuthor: string;
    resourceVersion: string;
    resourceTemplate: CFATemplate;
    resourceDescription: string;
    resourcePackages: string[];
    setResourcePath: (val: string) => void;
    setResourceTemplate: (val: CFATemplate) => void;
    setResourceName: (val: string) => void;
    setResourcePackages: (val: string[]) => void;
    setResourceAuthor: (val: string) => void;
    setResourceVersion: (val: string) => void;
    setResourceDescription: (val: string) => void;
}
