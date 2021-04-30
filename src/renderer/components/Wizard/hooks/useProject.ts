import { useContext } from 'react';
import { WizardContext } from '../../../context/WizardProvider';

export const useProject = () => {
    const {
        resourcePath,
        resourceOptions,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceTemplate,
        resourceDescription,
        setResourcePath,
        setResourceName,
        setResourceAuthor,
        setResourceTemplate,
        setResourceVersion,
        setResourceOptions,
        setResourceDescription,
    } = useContext(WizardContext);
    return {
        resourcePath,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceTemplate,
        resourceOptions,
        resourceDescription,
        setResourcePath,
        setResourceTemplate,
        setResourceName,
        setResourceAuthor,
        setResourceVersion,
        setResourceOptions,
        setResourceDescription,
    };
};
