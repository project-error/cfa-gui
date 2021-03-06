import React, { useEffect, useState } from 'react';
import { useProject } from '../hooks/useProject';
import { TemplateItem } from './TemplateItem';
import styles from './WizardTemplates.module.scss';
import { SiTypescript, SiJavascript, SiLua } from 'react-icons/si';

const templates = [
    {
        type: 'TypeScript',
        title: 'Typescript Resource',
        description: 'A complete starter kit with tsconfig and webpack.',
        thumbnail: <SiTypescript color="white" size={90} />,
    },
    {
        type: 'JavaScript',
        title: 'Javascript Resource',
        description: 'A simple boilerplate with webpack.',
        thumbnail: <SiJavascript color="white" size={90} />,
    },
    {
        type: 'Lua',
        title: 'Lua Resource',
        description: 'Includes a client and server file.',
        thumbnail: <SiLua color="white" size={90} />,
    },
];

export const WizardTemplates = () => {
    const { resourceTemplate, setResourceTemplate } = useProject();

    const setTemplate = (temp: string) => {
        setResourceTemplate(temp);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <label>Project Templates</label>
                {/* <BorderedInput placeholder="Search project templates" /> */}
            </div>

            <div className={styles.templateList}>
                {templates &&
                    templates.map((temp) => (
                        <TemplateItem
                            key={temp.type}
                            active={resourceTemplate === temp.type}
                            thumbnail={temp.thumbnail}
                            title={temp.title}
                            description={temp.description}
                            type={temp.type}
                            selectTemplate={(type) => setTemplate(type)}
                        />
                    ))}
            </div>
        </div>
    );
};
