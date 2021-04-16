import { useContext } from 'react';
import { WizardContext } from '../../../context/WizardProvider';

export const useProject = () => {
    const {
        resourcePath,
        resourcePackages,
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
        setResourcePackages,
        setResourceDescription,
    } = useContext(WizardContext);
    return {
        resourcePath,
        resourceName,
        resourceAuthor,
        resourceVersion,
        resourceTemplate,
        resourcePackages,
        resourceDescription,
        setResourcePath,
        setResourceTemplate,
        setResourceName,
        setResourceAuthor,
        setResourceVersion,
        setResourcePackages,
        setResourceDescription,
    };
};
