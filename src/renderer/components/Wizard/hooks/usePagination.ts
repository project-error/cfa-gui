import { useContext } from 'react';
import { WizardContext } from '../../../context/WizardProvider';

export const usePagination = () => {
    const { steps, setSteps } = useContext(WizardContext);
    return { steps, setSteps };
};
