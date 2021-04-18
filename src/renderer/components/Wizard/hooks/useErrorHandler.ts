import { useContext } from 'react';
import { WizardContext } from '../../../context/WizardProvider';

export const useErrorHandler = () => {
    const { error, setError } = useContext(WizardContext);
    return { error, setError };
};
