import { useContext } from 'react';
import { WizardContext } from '../../../context/WizardProvider';

export const useProject = () => {
    const { project, setProject } = useContext(WizardContext);
    return { project, setProject };
};
