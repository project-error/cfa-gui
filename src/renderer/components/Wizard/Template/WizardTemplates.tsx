import React, { useEffect, useState } from 'react';
import { useProject } from '../hooks/useProject';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';
import { SiTypescript, SiJavascript, SiLua } from 'react-icons/si';
import { CFATemplate } from '../../../context/WizardProvider';

const templates: CFATemplate[] = [
    {
        // type: 'TypeScript',
        title: 'Typescript Resource',
        description: 'A complete starter kit with tsconfig and webpack.',
        // thumbnail: <SiTypescript color="white" size={90} />,
        package: 'cfa-template-lua', // FIX: Replace in the future
    },
    {
        // type: 'JavaScript',
        title: 'Javascript Resource',
        description: 'A simple boilerplate with webpack.',
        // thumbnail: <SiJavascript color="white" size={90} />,
        package: 'cfa-template-lua', // FIX: Replace in the future
    },
    {
        // type: 'Lua',
        title: 'Lua Resource',
        description: 'Includes a client and server file.',
        // thumbnail: <SiLua color="white" size={90} />,
        package: 'cfa-template-lua',
    },
];

export const WizardTemplates = () => {
    const { resourceTemplate, setResourceTemplate } = useProject();

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label>Project Templates</label>
                {/* <BorderedInput placeholder="Search project templates" /> */}
            </div>

            <div className={styles.templateList}>
                {templates &&
                    templates.map((template, i) => (
                        <TemplateItem
                            key={i}
                            active={resourceTemplate === template}
                            template={template}
                            onClick={() => setResourceTemplate(template)}
                        />
                    ))}
            </div>
        </div>
    );
};
